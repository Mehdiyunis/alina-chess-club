-- Turnir funksiyasının tam axışını sınayır: cütləşdirmə -> nəticə -> növbəti tur -> bitmiş status.
-- BÜTÜN DƏYİŞİKLİKLƏR AVTOMATİK GERİ QAYTARILIR (sentinel exception ilə).
-- Supabase SQL Editor-də New query -> məzmunu yapışdır -> Run.
-- Gözlənilən sonuncu notice: TEST_OK (rollback edildi).

do $$
declare
  v_admin uuid;
  v_tid uuid;
  v_round int;
  v_pending int;
  v_status text;
  v_match record;
  v_i int;
  v_rounds int;
begin
  -- Admin icazəsini təqlid et (is_tournament_editor -> auth.uid())
  select ap.id into v_admin
  from public.admin_profiles ap
  where ap.role in ('administrator', 'worker')
  order by case when ap.role = 'administrator' then 0 else 1 end
  limit 1;

  if v_admin is null then
    raise exception 'Test üçün admin profili tapılmadı';
  end if;

  perform set_config('request.jwt.claim.sub', v_admin::text, true);
  perform set_config('request.jwt.claims', json_build_object('sub', v_admin::text)::text, true);

  -- 1) Müvəqqəti turnir
  insert into public.tournaments
    (title_az, starts_at, ends_at, round_count, is_published)
  values
    ('TEST - Isvecre cuplesdirme yoxlamasi', now(), now() + interval '6 hours', 3, false)
  returning id into v_tid;

  -- 2) Eyni kateqoriyada 4 oyunçu
  insert into public.tournament_players
    (tournament_id, full_name, age_category, grade)
  select v_tid, x.full_name, 'U12', 'UNRATED'
  from (values ('Test A'), ('Test B'), ('Test C'), ('Test D')) as x(full_name);

  -- 3) Qəbulu bitir -> 1-ci tur yaranır
  raise notice 'ACTIVATE_MATCHES=%', public.activate_tournament(v_tid);

  -- Trigger yalnız "started" statusunda işlədiyi üçün turniri başlat
  update public.tournaments set status = 'started' where id = v_tid;

  -- 4) Hər turun nəticəsini daxil et, avtomatik irəliləməni yoxla
  for v_round in 1..3 loop
    select count(*) into v_pending
    from public.tournament_matches
    where tournament_id = v_tid and round_number = v_round;

    raise notice 'ROUND_%_MATCHES=%', v_round, v_pending;

    if v_pending = 0 then
      raise exception 'Tur % yaradilmadi', v_round;
    end if;

    -- Cütləşdirmədə təkrar rəqib yoxlaması (1-ci turda hamı fərqli olmalı)
    if v_round = 1 then
      select count(*) into v_pending
      from (
        select white_player_id, black_player_id
        from public.tournament_matches
        where tournament_id = v_tid and round_number = 1
        group by white_player_id, black_player_id
        having count(*) > 1
      ) d;
      raise notice 'DUPLICATE_PAIRINGS=%', v_pending;
    end if;

    v_i := 0;
    for v_match in
      select id from public.tournament_matches
      where tournament_id = v_tid and round_number = v_round
      order by board_number
    loop
      update public.tournament_matches
      set result = case when v_i % 2 = 0 then 'white' else 'draw' end
      where id = v_match.id;
      v_i := v_i + 1;
    end loop;

    select status into v_status from public.tournaments where id = v_tid;
    select count(*) into v_rounds from public.tournament_rounds where tournament_id = v_tid;
    raise notice 'AFTER_ROUND_%_STATUS=% TOTAL_ROUNDS=%', v_round, v_status, v_rounds;
  end loop;

  select status into v_status from public.tournaments where id = v_tid;
  if v_status <> 'finished' then
    raise exception 'Son status "finished" olmadi: %', v_status;
  end if;

  -- Bütün dəyişiklikləri geri qaytarmaq üçün süni xəta
  raise exception 'TEST_ROLLBACK';
exception
  when sqlstate 'P0001' then
    if sqlerrm = 'TEST_ROLLBACK' then
      raise notice 'TEST_OK (rollback edildi)';
    else
      raise;
    end if;
end $$;
