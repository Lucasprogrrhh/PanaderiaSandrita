-- Script SQL para configurar Autenticación, Perfiles y Storage en Supabase
-- Ejecutar en: Supabase Dashboard → SQL Editor → New Query

-- 1. Crear tabla de perfiles (profiles) vinculada a auth.users
create table if not exists public.profiles (
  id           uuid        primary key references auth.users(id) on delete cascade,
  nombre       text,
  apellido     text,
  telefono     text,
  email        text,
  avatar_url   text,
  created_at   timestamptz default now()
);

-- Habilitar RLS en profiles
alter table public.profiles enable row level security;

-- Eliminar políticas viejas si existen
drop policy if exists "Permitir lectura propia" on public.profiles;
drop policy if exists "Permitir actualización propia" on public.profiles;

-- Crear políticas para profiles
create policy "Permitir lectura propia" on public.profiles
  for select using (auth.uid() = id);

create policy "Permitir actualización propia" on public.profiles
  for update using (auth.uid() = id);

-- 2. Función trigger para crear automáticamente el perfil al registrarse
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, nombre, apellido, telefono, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'nombre', ''),
    coalesce(new.raw_user_meta_data->>'apellido', ''),
    coalesce(new.raw_user_meta_data->>'telefono', ''),
    new.email
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger que se dispara después de insertar en auth.users
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 3. Relacionar la tabla de pedidos con profiles agregando user_id
alter table public.pedidos 
  add column if not exists user_id uuid references public.profiles(id) on delete set null;

-- 4. Configurar Bucket de Storage 'avatars'
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- Políticas de RLS en storage.objects para el bucket 'avatars'
drop policy if exists "Avatars lectura pública" on storage.objects;
drop policy if exists "Avatars propietario insert" on storage.objects;
drop policy if exists "Avatars propietario update" on storage.objects;
drop policy if exists "Avatars propietario delete" on storage.objects;

-- Lectura pública para cualquier usuario (incluso no autenticados)
create policy "Avatars lectura pública"
  on storage.objects for select
  using (bucket_id = 'avatars');

-- Permitir inserción solo al propietario autenticado en su propia carpeta (user_id/)
create policy "Avatars propietario insert"
  on storage.objects for insert
  with check (
    bucket_id = 'avatars' 
    and auth.role() = 'authenticated' 
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Permitir actualización de su propia foto
create policy "Avatars propietario update"
  on storage.objects for update
  using (
    bucket_id = 'avatars' 
    and auth.role() = 'authenticated' 
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Permitir eliminación de su propia foto
create policy "Avatars propietario delete"
  on storage.objects for delete
  using (
    bucket_id = 'avatars' 
    and auth.role() = 'authenticated' 
    and (storage.foldername(name))[1] = auth.uid()::text
  );
