-- Naja — full schema, RLS, grants, and storage bucket.
-- Run this once, top to bottom, in the Supabase SQL editor (or via the CLI).

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table if not exists products (
  id text primary key,
  name text not null,
  description text not null,
  price numeric not null,
  sort_order int4 default 99
);

create table if not exists product_colors (
  id uuid primary key default gen_random_uuid(),
  product_id text not null references products(id) on delete cascade,
  color_name text not null,
  hex text not null,
  in_stock boolean not null default true,
  image_url text
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  customer_name text not null,
  phone text not null,
  address text not null,
  city text not null,
  postal_code text not null,
  items jsonb not null,
  total numeric not null,
  status text not null default 'pending'
);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
-- Postgres/Supabase has TWO permission layers that both need satisfying:
-- RLS policies (row-level) AND base table grants (grant select/insert/...).
-- Missing either one causes a silent "permission denied" even when the
-- other is set correctly. Both are applied below, for both roles that
-- need access (anon for the public storefront, service_role for the
-- admin panel's server-side writes).

alter table products enable row level security;
alter table product_colors enable row level security;
alter table orders enable row level security;

-- public (anon) can read products/colors, and create orders — nothing else
create policy "Public can view products" on products for select to anon using (true);
create policy "Public can view product colors" on product_colors for select to anon using (true);
create policy "Anyone can place an order" on orders for insert to anon with check (true);

grant select on products to anon;
grant select on product_colors to anon;
grant insert on orders to anon;

-- service_role (used only in server-side admin Server Actions) needs full
-- access too — RLS bypass alone is NOT enough, the base grant is still
-- required.
grant all on products to service_role;
grant all on product_colors to service_role;
grant all on orders to service_role;

-- ---------------------------------------------------------------------------
-- Storage — public bucket for color photos
-- ---------------------------------------------------------------------------
-- Uploads happen server-side via the admin Server Actions using the
-- service_role key, which bypasses storage RLS entirely, so no insert/
-- update/delete policy is needed. Marking the bucket public makes
-- getPublicUrl() reads work without a select policy either.

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;
