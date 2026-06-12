-- Membership subscriptions, synced from Stripe.
-- One row per Stripe subscription; a user who cancels and re-subscribes gets a new row
-- (new stripe_subscription_id), so user_id is intentionally NOT unique.

create table public.subscriptions (
  id                     uuid primary key default gen_random_uuid(),
  user_id                uuid not null references auth.users(id) on delete cascade,
  stripe_customer_id     text not null,
  stripe_subscription_id text not null unique,
  price_id               text not null,
  status                 text not null check (status in (
    'trialing','active','past_due','canceled','unpaid',
    'incomplete','incomplete_expired','paused')),
  cancel_at_period_end   boolean not null default false,
  current_period_start   timestamptz,
  current_period_end     timestamptz,
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now()
);

create index subscriptions_user_id_idx  on public.subscriptions (user_id);
create index subscriptions_customer_idx on public.subscriptions (stripe_customer_id);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

create trigger subscriptions_updated_at
  before update on public.subscriptions
  for each row execute function public.set_updated_at();

-- All writes go through the service role (bypasses RLS). The select policy is
-- defense in depth: an authenticated browser client can only read its own rows.
alter table public.subscriptions enable row level security;

create policy "Users read own subscription"
  on public.subscriptions for select
  using (auth.uid() = user_id);
