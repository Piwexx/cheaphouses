create table if not exists public.listings (
  id              integer primary key,
  country         text not null,
  flag            text not null,
  country_short   text not null,
  location        text not null,
  location_short  text not null,
  price           text not null,
  currency_symbol text not null,
  title           text not null,
  meta            text[] not null default '{}',
  note            text not null,
  image           text not null,
  tone            text not null,
  is_new          boolean not null default false,
  created_at      timestamptz not null default now()
);

alter table public.listings enable row level security;

-- Listings are public content (not PII), so allow anonymous reads
create policy "listings_public_read"
  on public.listings
  for select
  using (true);
