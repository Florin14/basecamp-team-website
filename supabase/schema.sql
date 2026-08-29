-- =====================================================================
-- FC Base Camp — schema pentru datele actualizate fără deploy.
--
-- Site-ul citește cu cheia publică (anon), read-only prin RLS.
-- Aplicația de scraping scrie cu service_role key (ocolește RLS).
-- Rulează o singură dată, în SQL Editor din Supabase.
-- =====================================================================

-- ---------- Meciuri ----------
create table if not exists public.matches (
  id           text primary key,
  competition  text not null check (competition in ('lnm', 'cupa', 'judetean', 'corporate')),
  round        text not null,
  kickoff      timestamptz not null,
  venue        text not null,

  home_name    text not null,
  home_short   text not null,
  home_crest   text,
  away_name    text not null,
  away_short   text not null,
  away_crest   text,

  -- NULL până la disputarea meciului; site-ul îl tratează ca „programat”.
  home_score   integer,
  away_score   integer,

  report       text,
  updated_at   timestamptz not null default now()
);

create index if not exists matches_kickoff_idx on public.matches (kickoff);
create index if not exists matches_competition_idx on public.matches (competition);

-- ---------- Clasamente ----------
create table if not exists public.standings (
  competition    text not null check (competition in ('lnm', 'cupa', 'judetean', 'corporate')),
  -- 'regular' | 'playoff' | 'playout'
  phase          text not null default 'regular' check (phase in ('regular', 'playoff', 'playout')),
  position       integer not null,
  team           text not null,
  short          text not null,
  played         integer not null default 0,
  won            integer not null default 0,
  drawn          integer not null default 0,
  lost           integer not null default 0,
  goals_for      integer not null default 0,
  goals_against  integer not null default 0,
  points         integer not null default 0,
  -- Ultimele rezultate, cel mai recent la final: {'V','E','Î'}
  form           text[] not null default '{}',
  updated_at     timestamptz not null default now(),

  primary key (competition, phase, position)
);

-- ---------- Actualizare automată a lui updated_at ----------
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists matches_touch on public.matches;
create trigger matches_touch before update on public.matches
  for each row execute function public.touch_updated_at();

drop trigger if exists standings_touch on public.standings;
create trigger standings_touch before update on public.standings
  for each row execute function public.touch_updated_at();

-- ---------- Acces public, doar la citire ----------
alter table public.matches enable row level security;
alter table public.standings enable row level security;

drop policy if exists "citire publică meciuri" on public.matches;
create policy "citire publică meciuri" on public.matches
  for select to anon, authenticated using (true);

drop policy if exists "citire publică clasamente" on public.standings;
create policy "citire publică clasamente" on public.standings
  for select to anon, authenticated using (true);

-- Nu definim politici de insert/update/delete: scrierea se face exclusiv
-- cu service_role key, din aplicația de scraping.
