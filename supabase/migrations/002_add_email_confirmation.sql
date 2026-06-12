alter table public.subscribers
  add column if not exists confirmed_at      timestamptz,
  add column if not exists confirm_token     text unique,
  add column if not exists token_expires_at  timestamptz;

create index if not exists subscribers_confirm_token_idx
  on public.subscribers (confirm_token)
  where confirm_token is not null;
