create table if not exists public.subscribers (
  id         uuid primary key default gen_random_uuid(),
  email      text not null unique,
  created_at timestamptz not null default now()
);

create unique index if not exists subscribers_email_lower_idx
  on public.subscribers (lower(email));

alter table public.subscribers enable row level security;
-- No RLS policies: service role key bypasses RLS; anon/authenticated cannot read
