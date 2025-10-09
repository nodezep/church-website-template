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
  email text,
  created_at timestamp with time zone default now()
);

-- Contact page editable content
create table if not exists public.contact_page (
  id uuid primary key default gen_random_uuid(),
  hero_title text default 'Contact Us',
  hero_description text default 'We''d love to hear from you! Reach out any time.',
  address_line1 text default '123 Divine Grace Avenue',
  address_line2 text default 'Faith City, FC 12345',
  country text default 'United Kingdom',
  map_link text default 'https://www.google.com/maps/search/?api=1&query=Jerusalem+Spiritual+Centre',
  phone_general text default '+44 20 1234 5678',
  phone_prayer text default '+44 20 9876 5432',
  email_general text default 'info@jsc.org',
  email_prayer text default 'prayer@jsc.org',
  sunday_service text default 'Sunday Worship: 10:00 AM - 12:00 PM',
  wednesday_study text default 'Wednesday Bible Study: 7:00 PM - 8:30 PM',
  friday_prayer text default 'Friday Prayer Meeting: 7:00 PM - 8:00 PM',
  faqs jsonb default '[]'::jsonb,
  updated_at timestamp with time zone default now()
);

alter table public.contact_page enable row level security;

create policy if not exists "public read contact_page" on public.contact_page
for select using (true);

create policy if not exists "admin write contact_page" on public.contact_page
for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Zones: ensure members column exists for displaying counts
alter table if exists public.jsc_zones add column if not exists members int default 0;

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


