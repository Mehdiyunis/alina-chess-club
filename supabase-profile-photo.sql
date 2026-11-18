-- Profil şəkilləri üçün Supabase Storage qurulumu.
-- Bu faylı Supabase SQL Editor-da bir dəfə icra edin.
-- Qeyd: public.profiles.photo sahəsi artıq mövcuddur, yeni sütun əlavə olunmur.

-- 1. Şəkillər ictimai oxunan "avatars" bucket-inda saxlanılır.
insert into storage.buckets (id, name, public, file_size_limit)
values ('avatars', 'avatars', true, 2097152) -- 2 MB
on conflict (id) do update
  set public = true,
      file_size_limit = 2097152;

-- 2. Hər kəs şəkilləri görə bilər (profil şəkli ictimai URL ilə göstərilir).
drop policy if exists "Avatar images are publicly readable" on storage.objects;
create policy "Avatar images are publicly readable"
  on storage.objects
  for select
  using (bucket_id = 'avatars');

-- 3. İstifadəçi yalnız öz qovluğuna (<user_id>/avatar) yazır, dəyişir və silir.
drop policy if exists "Users can upload own avatar" on storage.objects;
create policy "Users can upload own avatar"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "Users can update own avatar" on storage.objects;
create policy "Users can update own avatar"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  )
  with check (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "Users can delete own avatar" on storage.objects;
create policy "Users can delete own avatar"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
