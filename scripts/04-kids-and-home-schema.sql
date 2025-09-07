-- Kids and Home dynamic content schema
-- Run this in Supabase SQL editor

-- Pastor profile
create table if not exists public.pastor_profile (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  title text not null default 'Senior Pastor',
  bio text not null,
  photo_url text,
  years_service int default 0,
  sermons_count int default 0,
  quote text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Testimonials
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  content text not null,
  rating int not null default 5 check (rating between 1 and 5),
  image_url text,
  created_at timestamp with time zone default now()
);

-- Kids classes
create table if not exists public.kids_classes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  age_range text not null,
  description text not null,
  capacity text,
  features text[] default '{}',
  color text default 'from-yellow-400 to-orange-500',
  icon text default 'Heart',
  order_index int default 0,
  active boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Kids transport settings (single row expected, but allow multiple for flexibility)
create table if not exists public.kids_transport (
  id uuid primary key default gen_random_uuid(),
  description text not null,
  sunday_pickup text,
  sunday_dropoff text,
  wednesday_time text,
  features text[] default '{}',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Gallery for kids sections
create table if not exists public.kids_gallery (
  id uuid primary key default gen_random_uuid(),
  section text not null check (section in ('transport','devotion','discipleship','worship','preaching','games','tours')),
  image_url text not null,
  caption text,
  order_index int default 0,
  created_at timestamp with time zone default now()
);

-- Basic RLS setup
alter table public.pastor_profile enable row level security;
alter table public.testimonials enable row level security;
alter table public.kids_classes enable row level security;
alter table public.kids_transport enable row level security;
alter table public.kids_gallery enable row level security;

-- Public read for site content
create policy if not exists "public read pastor_profile" on public.pastor_profile
for select using (true);

create policy if not exists "public read testimonials" on public.testimonials
for select using (true);

create policy if not exists "public read kids_classes" on public.kids_classes
for select using (true);

create policy if not exists "public read kids_transport" on public.kids_transport
for select using (true);

create policy if not exists "public read kids_gallery" on public.kids_gallery
for select using (true);

-- Authenticated upsert/update/delete for admin
create policy if not exists "admin write pastor_profile" on public.pastor_profile
for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy if not exists "admin write testimonials" on public.testimonials
for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy if not exists "admin write kids_classes" on public.kids_classes
for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy if not exists "admin write kids_transport" on public.kids_transport
for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy if not exists "admin write kids_gallery" on public.kids_gallery
for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');


