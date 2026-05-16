-- nabi: community + auth schema
-- This file mirrors the migrations applied to the Supabase project:
--   1) community_and_auth_schema
--   2) community_rls_perf_and_indexes
-- Re-running it is safe (everything is idempotent).

-- ----------------------------------------------------------------------------
-- Profiles: 1 row per auth user, exposes a public display_name we can show
-- in community posts/comments.
-- ----------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "Profiles are readable by everyone" on public.profiles;
create policy "Profiles are readable by everyone"
  on public.profiles for select
  using (true);

drop policy if exists "Users can insert their own profile" on public.profiles;
create policy "Users can insert their own profile"
  on public.profiles for insert
  with check ((select auth.uid()) = id);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
  on public.profiles for update
  using ((select auth.uid()) = id);

-- ----------------------------------------------------------------------------
-- Community posts authored by signed-in users.
-- ----------------------------------------------------------------------------
create table if not exists public.community_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  user_id uuid not null references auth.users (id) on delete cascade,
  author_name text not null,
  title text not null,
  body text not null,
  category text not null,
  city text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists community_posts_created_at_idx
  on public.community_posts (created_at desc);
create index if not exists community_posts_city_category_idx
  on public.community_posts (city, category);
create index if not exists community_posts_user_id_idx
  on public.community_posts (user_id);

alter table public.community_posts enable row level security;

drop policy if exists "Posts are readable by everyone" on public.community_posts;
create policy "Posts are readable by everyone"
  on public.community_posts for select
  using (true);

drop policy if exists "Users can insert their own posts" on public.community_posts;
create policy "Users can insert their own posts"
  on public.community_posts for insert
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update their own posts" on public.community_posts;
create policy "Users can update their own posts"
  on public.community_posts for update
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can delete their own posts" on public.community_posts;
create policy "Users can delete their own posts"
  on public.community_posts for delete
  using ((select auth.uid()) = user_id);

-- ----------------------------------------------------------------------------
-- Replies (comments) on community posts. We use the post slug to allow
-- attaching replies to seed posts that live in the codebase as well.
-- ----------------------------------------------------------------------------
create table if not exists public.community_replies (
  id uuid primary key default gen_random_uuid(),
  post_slug text not null,
  user_id uuid not null references auth.users (id) on delete cascade,
  author_name text not null,
  body text not null,
  created_at timestamptz not null default now()
);

create index if not exists community_replies_post_slug_idx
  on public.community_replies (post_slug, created_at);
create index if not exists community_replies_user_id_idx
  on public.community_replies (user_id);

alter table public.community_replies enable row level security;

drop policy if exists "Replies are readable by everyone" on public.community_replies;
create policy "Replies are readable by everyone"
  on public.community_replies for select
  using (true);

drop policy if exists "Users can insert their own replies" on public.community_replies;
create policy "Users can insert their own replies"
  on public.community_replies for insert
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update their own replies" on public.community_replies;
create policy "Users can update their own replies"
  on public.community_replies for update
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can delete their own replies" on public.community_replies;
create policy "Users can delete their own replies"
  on public.community_replies for delete
  using ((select auth.uid()) = user_id);
