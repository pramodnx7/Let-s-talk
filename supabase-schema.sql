create table if not exists public.site_content (
  id text primary key,
  content jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key,
  name text not null,
  email text not null,
  topic text not null default 'General inquiry',
  message text not null default '',
  created_at timestamptz not null default now()
);

alter table public.site_content enable row level security;
alter table public.contact_messages enable row level security;

