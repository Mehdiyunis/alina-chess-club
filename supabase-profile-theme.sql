-- Profil, tema və istifadəçiyə təyin edilmiş kitablar üçün Supabase qurulumu.
-- Bu faylı Supabase SQL Editor-da bir dəfə icra edin.
-- Təhlükəsizlik: service_role açarını heç vaxt sayt koduna və ya GitHub-a əlavə etməyin.

-- 1. Profilə tema seçimi əlavə edirik (default: ağ).
alter table public.profiles
  add column if not exists theme text not null default 'light';

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'profiles_theme_check'
      and conrelid = 'public.profiles'::regclass
  ) then
    alter table public.profiles
      add constraint profiles_theme_check check (theme in ('light', 'dark'));
  end if;
end $$;

update public.profiles set theme = 'light' where theme is null;

-- İstifadəçi yalnız öz profilinin tema sahəsini yeniləyə bilər.
-- Bu policy mövcud update policy-lərinə əlavə olunur (OR məntiqi ilə).
drop policy if exists "Users can update own theme" on public.profiles;
create policy "Users can update own theme"
  on public.profiles
  for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- 2. "Aldığı kitablar" cədvəli: admin panel istifadəçiyə kitab təyin edir.
create table if not exists public.user_books (
  user_id uuid not null references auth.users (id) on delete cascade,
  book_id uuid not null references public.books (id) on delete cascade,
  created_at timestamp with time zone not null default timezone('utc'::text, now()),
  primary key (user_id, book_id)
);

create index if not exists user_books_book_id_idx on public.user_books (book_id);

alter table public.user_books enable row level security;

-- İstifadəçi yalnız öz kitablarını oxuya bilər.
drop policy if exists "Users can read own books" on public.user_books;
create policy "Users can read own books"
  on public.user_books
  for select
  to authenticated
  using (auth.uid() = user_id);

-- Admin paneli (public.admin_profiles) kitab təyin edə və geri ala bilər.
-- Service_role istifadə edildiyində RLS avtomatik olaraq bypass edilir.
drop policy if exists "Admins manage user books" on public.user_books;
create policy "Admins manage user books"
  on public.user_books
  for all
  to authenticated
  using (
    exists (
      select 1 from public.admin_profiles ap
      where ap.id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.admin_profiles ap
      where ap.id = auth.uid()
    )
  );
