-- Velora Racing Exports: run this in Supabase SQL Editor.
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  price numeric(12,2) not null default 0 check (price >= 0),
  description text not null default '',
  image_url text not null default '',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.admin_users enable row level security;
alter table public.products enable row level security;
create or replace function public.is_velora_admin(check_user uuid default auth.uid())
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.admin_users where user_id = check_user); $$;
drop policy if exists "Admins can view admin allowlist" on public.admin_users;
create policy "Admins can view admin allowlist" on public.admin_users for select to authenticated using (public.is_velora_admin());
drop policy if exists "Anyone can view active products" on public.products;
create policy "Anyone can view active products" on public.products for select to anon, authenticated using (active = true or public.is_velora_admin());
drop policy if exists "Admins can insert products" on public.products;
create policy "Admins can insert products" on public.products for insert to authenticated with check (public.is_velora_admin());
drop policy if exists "Admins can update products" on public.products;
create policy "Admins can update products" on public.products for update to authenticated using (public.is_velora_admin()) with check (public.is_velora_admin());
drop policy if exists "Admins can delete products" on public.products;
create policy "Admins can delete products" on public.products for delete to authenticated using (public.is_velora_admin());
