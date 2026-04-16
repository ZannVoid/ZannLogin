create extension if not exists pgcrypto;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text not null,
  description text not null,
  impact text not null,
  tags text[] not null default '{}',
  image text not null,
  href text not null,
  status text not null default 'draft' check (status in ('draft', 'published')),
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.archives (
  id uuid primary key default gen_random_uuid(),
  year text not null,
  category text not null,
  title text not null,
  summary text not null,
  link text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.contact_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  handle text not null,
  project_need text not null,
  budget text not null default '',
  timeline text not null default '',
  message text not null default '',
  source text not null default 'contact-page',
  status text not null default 'new' check (status in ('new', 'reviewed')),
  ip_fingerprint text,
  user_agent text,
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at
before update on public.projects
for each row
execute function public.set_updated_at();

drop trigger if exists archives_set_updated_at on public.archives;
create trigger archives_set_updated_at
before update on public.archives
for each row
execute function public.set_updated_at();

alter table public.projects disable row level security;
alter table public.archives disable row level security;
alter table public.contact_leads disable row level security;
