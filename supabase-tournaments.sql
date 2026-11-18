-- Turnirlər funksiyası üçün Supabase qurulumu.
-- Bu skripti sayt və admin panelinin istifadə etdiyi ORTAQ Supabase layihəsində
-- Supabase SQL Editor vasitəsilə icra edin. Bir dəfə icra etmək kifayətdir.

-- ---------------------------------------------------------------------------
-- 1. Admin yoxlama funksiyaları (news skriptindəki ilə eyni prinsip)
-- ---------------------------------------------------------------------------
create or replace function public.is_tournament_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_profiles ap
    where ap.id = auth.uid()
  );
$$;

create or replace function public.is_tournament_editor()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_profiles ap
    where ap.id = auth.uid()
      and ap.role in ('administrator', 'worker')
  );
$$;

revoke all on function public.is_tournament_staff() from public;
grant execute on function public.is_tournament_staff() to authenticated;
revoke all on function public.is_tournament_editor() from public;
grant execute on function public.is_tournament_editor() to authenticated;

-- ---------------------------------------------------------------------------
-- 2. Cədvəllər
--    Yaş kateqoriyaları FIDE gənclər standartıdır: U8..U18 + Yetkin.
--    Dərəcələr: I, II, III, IV, V, dərəcəsiz (UNRATED).
--    Status: registration (qəbul açıqdır), upcoming (gözlənilir),
--            started (başlayıb), finished (bitib).
-- ---------------------------------------------------------------------------
create table if not exists public.tournaments (
  id uuid primary key default gen_random_uuid(),
  title_az text not null check (btrim(title_az) <> ''),
  title_en text,
  title_ru text,
  description_az text,
  description_en text,
  description_ru text,
  cover_url text,
  starts_at timestamp with time zone not null,
  ends_at timestamp with time zone not null,
  round_count integer not null check (round_count between 1 and 20),
  status text not null default 'registration'
    check (status in ('registration', 'upcoming', 'started', 'finished')),
  is_published boolean not null default false,
  created_at timestamp with time zone not null default timezone('utc'::text, now()),
  updated_at timestamp with time zone not null default timezone('utc'::text, now()),
  check (ends_at >= starts_at)
);

create index if not exists tournaments_published_starts_idx
  on public.tournaments (is_published, starts_at desc);

-- Fasilələrlə keçirilən turnirlər üçün dəqiq günlər/saatlar
create table if not exists public.tournament_days (
  id uuid primary key default gen_random_uuid(),
  tournament_id uuid not null references public.tournaments (id) on delete cascade,
  starts_at timestamp with time zone not null,
  ends_at timestamp with time zone not null,
  note_az text,
  note_en text,
  note_ru text,
  sort_order integer not null default 0,
  check (ends_at >= starts_at)
);

create index if not exists tournament_days_tournament_idx
  on public.tournament_days (tournament_id, sort_order);

create table if not exists public.tournament_players (
  id uuid primary key default gen_random_uuid(),
  tournament_id uuid not null references public.tournaments (id) on delete cascade,
  profile_id uuid references auth.users (id) on delete set null,
  full_name text not null check (btrim(full_name) <> ''),
  age_category text not null
    check (age_category in ('U8', 'U10', 'U12', 'U14', 'U16', 'U18', 'ADULT')),
  grade text not null
    check (grade in ('I', 'II', 'III', 'IV', 'V', 'UNRATED')),
  created_at timestamp with time zone not null default timezone('utc'::text, now()),
  unique (tournament_id, profile_id)
);

create index if not exists tournament_players_tournament_idx
  on public.tournament_players (tournament_id, age_category, grade);

create table if not exists public.tournament_rounds (
  id uuid primary key default gen_random_uuid(),
  tournament_id uuid not null references public.tournaments (id) on delete cascade,
  round_number integer not null check (round_number between 1 and 20),
  is_manual boolean not null default false,
  generated_at timestamp with time zone not null default timezone('utc'::text, now()),
  unique (tournament_id, round_number)
);

create table if not exists public.tournament_matches (
  id uuid primary key default gen_random_uuid(),
  tournament_id uuid not null references public.tournaments (id) on delete cascade,
  round_id uuid not null references public.tournament_rounds (id) on delete cascade,
  round_number integer not null,
  board_number integer not null,
  age_category text not null
    check (age_category in ('U8', 'U10', 'U12', 'U14', 'U16', 'U18', 'ADULT')),
  grade text not null
    check (grade in ('I', 'II', 'III', 'IV', 'V', 'UNRATED')),
  white_player_id uuid references public.tournament_players (id) on delete set null,
  black_player_id uuid references public.tournament_players (id) on delete set null,
  -- white = 1–0, black = 0–1, draw = ½–½
  result text check (result in ('white', 'black', 'draw')),
  is_bye boolean not null default false,
  updated_at timestamp with time zone not null default timezone('utc'::text, now()),
  unique (round_id, board_number)
);

create index if not exists tournament_matches_round_idx
  on public.tournament_matches (tournament_id, round_number, board_number);

-- updated_at trigger
create or replace function public.set_tournament_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

drop trigger if exists tournaments_set_updated_at on public.tournaments;
create trigger tournaments_set_updated_at
  before update on public.tournaments
  for each row execute function public.set_tournament_updated_at();

-- ---------------------------------------------------------------------------
-- 3. İsveçrə sistemi ilə avtomatik cütləşdirmə
--    - eyni yaş + dərəcə qrupunda cütləyir
--    - əvvəl oynamış rəqibləri təkrar cütləmir (mümkün olduqca)
--    - ağ/qara rəngləri balanslaşdırır
--    - tək qalmiş oyunçuya "bye" (bayraq) verir
--    - növbəti tur yalnız əvvəlki turun bütün nəticələri dolanda yaranır
-- ---------------------------------------------------------------------------
create or replace function public._generate_tournament_round_internal(
  p_tournament_id uuid,
  p_round_number integer,
  p_force boolean default false
)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_tournament record;
  v_group record;
  v_player record;
  v_opponent record;
  v_round_id uuid;
  v_board integer := 0;
  v_created integer := 0;
  v_existing integer;
  v_has_opponent boolean;
begin
  select id, round_count into v_tournament
    from public.tournaments where id = p_tournament_id;
  if not found then
    raise exception 'Turnir tapılmadı';
  end if;
  if p_round_number < 1 or p_round_number > v_tournament.round_count then
    raise exception 'Tur nömrəsi turnirin tur sayından kənardadır';
  end if;

  select count(*) into v_existing
    from public.tournament_rounds
   where tournament_id = p_tournament_id and round_number = p_round_number;
  if v_existing > 0 then
    if not p_force then
      return 0;
    end if;
    -- admin yenidən yaratmaq istəyir: köhnə cütlüklər silinir
    delete from public.tournament_rounds
     where tournament_id = p_tournament_id and round_number = p_round_number;
  end if;

  insert into public.tournament_rounds (tournament_id, round_number)
  values (p_tournament_id, p_round_number)
  returning id into v_round_id;

  drop table if exists pg_temp.tournament_pairing;
  create temp table tournament_pairing on commit drop as
  select
    p.id,
    p.age_category,
    p.grade,
    case p.grade
      when 'I' then 1 when 'II' then 2 when 'III' then 3
      when 'IV' then 4 when 'V' then 5 else 6 end as grade_rank,
    coalesce((
      select sum(case
        when m.is_bye and m.white_player_id = p.id then 1
        when m.white_player_id = p.id and m.result = 'white' then 1
        when m.white_player_id = p.id and m.result = 'draw' then 0.5
        when m.black_player_id = p.id and m.result = 'black' then 1
        when m.black_player_id = p.id and m.result = 'draw' then 0.5
        else 0 end)
      from public.tournament_matches m
     where m.tournament_id = p.tournament_id
       and m.round_number < p_round_number
       and (m.white_player_id = p.id or m.black_player_id = p.id)
    ), 0) as points,
    (select count(*) from public.tournament_matches m
      where m.tournament_id = p.tournament_id and m.round_number < p_round_number
        and m.white_player_id = p.id and not m.is_bye) as whites,
    (select count(*) from public.tournament_matches m
      where m.tournament_id = p.tournament_id and m.round_number < p_round_number
        and m.black_player_id = p.id) as blacks,
    false as paired
  from public.tournament_players p
  where p.tournament_id = p_tournament_id;

  for v_group in
    select distinct tp.age_category, tp.grade, tp.grade_rank
      from pg_temp.tournament_pairing tp
     order by tp.age_category, tp.grade_rank
  loop
    loop
      select tp.* into v_player
        from pg_temp.tournament_pairing tp
       where tp.age_category = v_group.age_category
         and tp.grade = v_group.grade
         and not tp.paired
       order by tp.points desc, tp.grade_rank,
                (tp.whites - tp.blacks), tp.id
       limit 1;
      exit when not found;

      update pg_temp.tournament_pairing
         set paired = true where id = v_player.id;

      v_has_opponent := false;
      select tp.* into v_opponent
        from pg_temp.tournament_pairing tp
       where tp.age_category = v_group.age_category
         and tp.grade = v_group.grade
         and not tp.paired
         and tp.id <> v_player.id
         and not exists (
           select 1 from public.tournament_matches m
            where m.tournament_id = p_tournament_id
              and m.round_number < p_round_number
              and not m.is_bye
              and ((m.white_player_id = v_player.id and m.black_player_id = tp.id)
                or (m.black_player_id = v_player.id and m.white_player_id = tp.id))
         )
       order by abs(tp.points - v_player.points),
                abs((tp.whites - tp.blacks) - (v_player.whites - v_player.blacks)),
                tp.id
       limit 1;
      v_has_opponent := found;

      if not v_has_opponent then
        -- hamısı artıq bir-biri ilə oynayıbsa, qalanları yenidən cütlə
        select tp.* into v_opponent
          from pg_temp.tournament_pairing tp
         where tp.age_category = v_group.age_category
           and tp.grade = v_group.grade
           and not tp.paired
           and tp.id <> v_player.id
         order by abs(tp.points - v_player.points), tp.id
         limit 1;
        v_has_opponent := found;
      end if;

      v_board := v_board + 1;
      if v_has_opponent then
        update pg_temp.tournament_pairing
           set paired = true where id = v_opponent.id;

        if (v_player.whites - v_player.blacks) <=
           (v_opponent.whites - v_opponent.blacks) then
          insert into public.tournament_matches
            (tournament_id, round_id, round_number, board_number,
             age_category, grade, white_player_id, black_player_id)
          values
            (p_tournament_id, v_round_id, p_round_number, v_board,
             v_group.age_category, v_group.grade, v_player.id, v_opponent.id);
        else
          insert into public.tournament_matches
            (tournament_id, round_id, round_number, board_number,
             age_category, grade, white_player_id, black_player_id)
          values
            (p_tournament_id, v_round_id, p_round_number, v_board,
             v_group.age_category, v_group.grade, v_opponent.id, v_player.id);
        end if;
      else
        insert into public.tournament_matches
          (tournament_id, round_id, round_number, board_number,
           age_category, grade, white_player_id, black_player_id,
           result, is_bye)
        values
          (p_tournament_id, v_round_id, p_round_number, v_board,
           v_group.age_category, v_group.grade, v_player.id, null,
           'white', true);
      end if;
      v_created := v_created + 1;
    end loop;
  end loop;

  drop table if exists pg_temp.tournament_pairing;
  return v_created;
end;
$$;

-- Admin üçün açıq funksiya (icazə yoxlaması ilə)
create or replace function public.generate_tournament_round(
  p_tournament_id uuid,
  p_round_number integer,
  p_force boolean default false
)
returns integer
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_tournament_editor() then
    raise exception 'Bu əməliyyat üçün icazəniz yoxdur';
  end if;
  return public._generate_tournament_round_internal(
    p_tournament_id, p_round_number, p_force
  );
end;
$$;

revoke all on function public._generate_tournament_round_internal(uuid, integer, boolean) from public;
revoke all on function public.generate_tournament_round(uuid, integer, boolean) from public;
grant execute on function public.generate_tournament_round(uuid, integer, boolean) to authenticated;

-- "Qəbul açıqdır" -> "Gözlənilir": statusu dəyişir və 1-ci turu yaradır
create or replace function public.activate_tournament(p_tournament_id uuid)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_status text;
  v_generated integer;
begin
  if not public.is_tournament_editor() then
    raise exception 'Bu əməliyyat üçün icazəniz yoxdur';
  end if;
  select status into v_status from public.tournaments where id = p_tournament_id;
  if not found then raise exception 'Turnir tapılmadı'; end if;
  if v_status <> 'registration' then
    raise exception 'Yalnız qəbul açıq olan turnir gözlənilirə keçirilə bilər';
  end if;
  update public.tournaments set status = 'upcoming' where id = p_tournament_id;
  v_generated := public._generate_tournament_round_internal(p_tournament_id, 1, true);
  return v_generated;
end;
$$;

revoke all on function public.activate_tournament(uuid) from public;
grant execute on function public.activate_tournament(uuid) to authenticated;

-- Son nəticə daxil edildikdə növbəti turu / bitmiş statusunu avtomatik tətbiq et
create or replace function public._tournament_after_match_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_tournament record;
  v_pending integer;
begin
  select id, status, round_count into v_tournament
    from public.tournaments where id = new.tournament_id;
  if not found or v_tournament.status <> 'started' then
    return null;
  end if;

  select count(*) into v_pending
    from public.tournament_matches
   where tournament_id = new.tournament_id
     and round_number = new.round_number
     and result is null;
  if v_pending > 0 then
    return null;
  end if;

  if new.round_number >= v_tournament.round_count then
    update public.tournaments
       set status = 'finished'
     where id = new.tournament_id;
  else
    perform public._generate_tournament_round_internal(
      new.tournament_id, new.round_number + 1, false
    );
  end if;
  return null;
end;
$$;

drop trigger if exists tournament_match_auto_advance on public.tournament_matches;
create trigger tournament_match_auto_advance
  after insert or update of result on public.tournament_matches
  for each row execute function public._tournament_after_match_change();

-- ---------------------------------------------------------------------------
-- 4. RLS: hamı yalnız dərc olunmuş turnirləri oxuyur; admin bütünləri görür
--    və yalnız administrator / worker redaktə edə bilər.
-- ---------------------------------------------------------------------------
alter table public.tournaments enable row level security;
alter table public.tournament_days enable row level security;
alter table public.tournament_players enable row level security;
alter table public.tournament_rounds enable row level security;
alter table public.tournament_matches enable row level security;

drop policy if exists "Public reads published tournaments" on public.tournaments;
create policy "Public reads published tournaments"
  on public.tournaments for select
  to anon, authenticated
  using (is_published);

drop policy if exists "Tournament staff reads all tournaments" on public.tournaments;
create policy "Tournament staff reads all tournaments"
  on public.tournaments for select
  to authenticated
  using (public.is_tournament_staff());

drop policy if exists "Tournament editors insert tournaments" on public.tournaments;
create policy "Tournament editors insert tournaments"
  on public.tournaments for insert
  to authenticated
  with check (public.is_tournament_editor());

drop policy if exists "Tournament editors update tournaments" on public.tournaments;
create policy "Tournament editors update tournaments"
  on public.tournaments for update
  to authenticated
  using (public.is_tournament_editor())
  with check (public.is_tournament_editor());

drop policy if exists "Tournament editors delete tournaments" on public.tournaments;
create policy "Tournament editors delete tournaments"
  on public.tournaments for delete
  to authenticated
  using (public.is_tournament_editor());

-- Uşaq cədvəllər üçün oxuma icazəsi: turnir dərc olunubsa və ya staff
do $$
declare
  t text;
begin
  foreach t in array array[
    'tournament_days', 'tournament_players',
    'tournament_rounds', 'tournament_matches'
  ] loop
    execute format('drop policy if exists "Public reads %1$s of published tournaments" on public.%1$s', t);
    execute format($f$
      create policy "Public reads %1$s of published tournaments"
        on public.%1$s for select
        to anon, authenticated
        using (
          exists (
            select 1 from public.tournaments tr
            where tr.id = tournament_id and tr.is_published
          )
        )
    $f$, t);

    execute format('drop policy if exists "Tournament staff reads all %1$s" on public.%1$s', t);
    execute format($f$
      create policy "Tournament staff reads all %1$s"
        on public.%1$s for select
        to authenticated
        using (public.is_tournament_staff())
    $f$, t);

    execute format('drop policy if exists "Tournament editors insert %1$s" on public.%1$s', t);
    execute format($f$
      create policy "Tournament editors insert %1$s"
        on public.%1$s for insert
        to authenticated
        with check (public.is_tournament_editor())
    $f$, t);

    execute format('drop policy if exists "Tournament editors update %1$s" on public.%1$s', t);
    execute format($f$
      create policy "Tournament editors update %1$s"
        on public.%1$s for update
        to authenticated
        using (public.is_tournament_editor())
        with check (public.is_tournament_editor())
    $f$, t);

    execute format('drop policy if exists "Tournament editors delete %1$s" on public.%1$s', t);
    execute format($f$
      create policy "Tournament editors delete %1$s"
        on public.%1$s for delete
        to authenticated
        using (public.is_tournament_editor())
    $f$, t);
  end loop;
end;
$$;

-- ---------------------------------------------------------------------------
-- 5. Storage: cover şəkilləri public bucket, yükləmə/silmə yalnız redaktorlara
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('tournament-covers', 'tournament-covers', true, 5242880,
   array['image/jpeg', 'image/png', 'image/webp']::text[])
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Tournament editors upload cover files" on storage.objects;
create policy "Tournament editors upload cover files"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'tournament-covers'
    and public.is_tournament_editor()
  );

drop policy if exists "Tournament editors update cover files" on storage.objects;
create policy "Tournament editors update cover files"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'tournament-covers'
    and public.is_tournament_editor()
  )
  with check (
    bucket_id = 'tournament-covers'
    and public.is_tournament_editor()
  );

drop policy if exists "Tournament editors delete cover files" on storage.objects;
create policy "Tournament editors delete cover files"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'tournament-covers'
    and public.is_tournament_editor()
  );
