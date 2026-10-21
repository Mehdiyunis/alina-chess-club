-- ============================================================
-- Şahmat Məktəbi - Supabase Database & Storage Schema
-- Paste this script directly into Supabase SQL Editor and click RUN
-- ============================================================

-- 1. Profiles Table
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Contact Requests Table
create table if not exists public.contact_requests (
  id uuid default gen_random_uuid() primary key,
  value text not null,
  type text not null check (type in ('email', 'phone')),
  status text not null default 'new' check (status in ('new', 'contacted')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Books Table (PART 2: Books Feature)
create table if not exists public.books (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  author text,
  description text,
  level text not null check (level in ('beginner', 'intermediate', 'advanced')),
  cover_url text,
  file_url text not null,
  file_name text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Trigger Function: automatically add profile row when new user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(coalesce(new.email, new.phone, 'Şahmatçı'), '@', 1)),
    'user'
  );
  return new;
end;
$$;

-- Drop trigger if already exists and recreate
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 5. Helper function to check if the current user is admin
create or replace function public.is_admin()
returns boolean
language sql
security definer
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- 6. Enable Row Level Security (RLS) on all tables
alter table public.profiles enable row level security;
alter table public.contact_requests enable row level security;
alter table public.books enable row level security;

-- 7. RLS Policies for Profiles
-- Users can read their own profile, or admins can view all profiles
create policy "Users can read own profile"
  on public.profiles
  for select
  using (auth.uid() = id or public.is_admin());

create policy "Users can update own profile"
  on public.profiles
  for update
  using (auth.uid() = id or public.is_admin())
  with check (
    public.is_admin()
    or (
      auth.uid() = id
      and role = (select role from public.profiles where id = auth.uid())
    )
  );

create policy "Admins can view all profiles"
  on public.profiles
  for all
  using (public.is_admin());

-- 8. RLS Policies for Contact Requests
-- Anyone (including anonymous visitors) can insert contact requests
create policy "Anyone can insert contact requests"
  on public.contact_requests
  for insert
  with check (true);

-- Only admins can select, update, or delete contact requests
create policy "Only admins can select contact requests"
  on public.contact_requests
  for select
  using (public.is_admin());

create policy "Only admins can update contact requests"
  on public.contact_requests
  for update
  using (public.is_admin());

create policy "Only admins can delete contact requests"
  on public.contact_requests
  for delete
  using (public.is_admin());

-- 9. RLS Policies for Books
-- Anyone (including anonymous visitors) can view books
create policy "Anyone can select books"
  on public.books
  for select
  using (true);

-- Only admins can insert, update or delete books
create policy "Only admins can insert books"
  on public.books
  for insert
  with check (public.is_admin());

create policy "Only admins can update books"
  on public.books
  for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "Only admins can delete books"
  on public.books
  for delete
  using (public.is_admin());

-- 10. Supabase Storage: Buckets and Storage Policies
-- Create two public buckets if storage extension is active
insert into storage.buckets (id, name, public)
values ('book-covers', 'book-covers', true)
on conflict (id) do update set public = true;

insert into storage.buckets (id, name, public)
values ('book-files', 'book-files', true)
on conflict (id) do update set public = true;

-- Storage RLS: Public read access for book covers and book files
create policy "Public read access for book covers"
  on storage.objects
  for select
  using (bucket_id = 'book-covers');

create policy "Public read access for book files"
  on storage.objects
  for select
  using (bucket_id = 'book-files');

-- Storage RLS: Admins can upload, update, and delete in book storage
create policy "Admin upload access for book covers"
  on storage.objects
  for insert
  with check (bucket_id = 'book-covers' and public.is_admin());

create policy "Admin update access for book covers"
  on storage.objects
  for update
  using (bucket_id = 'book-covers' and public.is_admin());

create policy "Admin delete access for book covers"
  on storage.objects
  for delete
  using (bucket_id = 'book-covers' and public.is_admin());

create policy "Admin upload access for book files"
  on storage.objects
  for insert
  with check (bucket_id = 'book-files' and public.is_admin());

create policy "Admin update access for book files"
  on storage.objects
  for update
  using (bucket_id = 'book-files' and public.is_admin());

create policy "Admin delete access for book files"
  on storage.objects
  for delete
  using (bucket_id = 'book-files' and public.is_admin());

-- ============================================================
-- HOW TO PROMOTE YOUR FIRST ADMIN USER:
-- UPDATE public.profiles SET role = 'admin' WHERE id = (SELECT id FROM auth.users WHERE email = 'your-email@example.com');
-- ============================================================
