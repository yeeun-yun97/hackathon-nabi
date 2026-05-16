import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase";
import type { City, ServiceCategory } from "@/lib/data";

export type RemoteCommunityPost = {
  id: string;
  slug: string;
  userId: string;
  authorName: string;
  title: string;
  body: string;
  category: ServiceCategory;
  city: City;
  createdAt: string;
  updatedAt: string;
};

export type RemoteCommunityReply = {
  id: string;
  postSlug: string;
  userId: string;
  authorName: string;
  body: string;
  createdAt: string;
};

type DbPostRow = {
  id: string;
  slug: string;
  user_id: string;
  author_name: string;
  title: string;
  body: string;
  category: string;
  city: string;
  created_at: string;
  updated_at: string;
};

type DbReplyRow = {
  id: string;
  post_slug: string;
  user_id: string;
  author_name: string;
  body: string;
  created_at: string;
};

function mapPost(row: DbPostRow): RemoteCommunityPost {
  return {
    id: row.id,
    slug: row.slug,
    userId: row.user_id,
    authorName: row.author_name,
    title: row.title,
    body: row.body,
    category: row.category as ServiceCategory,
    city: row.city as City,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapReply(row: DbReplyRow): RemoteCommunityReply {
  return {
    id: row.id,
    postSlug: row.post_slug,
    userId: row.user_id,
    authorName: row.author_name,
    body: row.body,
    createdAt: row.created_at,
  };
}

export async function fetchRemotePosts(): Promise<RemoteCommunityPost[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = getSupabaseBrowserClient();
  const { data, error } = await supabase
    .from("community_posts")
    .select("id, slug, user_id, author_name, title, body, category, city, created_at, updated_at")
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return (data as DbPostRow[]).map(mapPost);
}

export async function fetchRemotePostBySlug(slug: string): Promise<RemoteCommunityPost | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = getSupabaseBrowserClient();
  const { data } = await supabase
    .from("community_posts")
    .select("id, slug, user_id, author_name, title, body, category, city, created_at, updated_at")
    .eq("slug", slug)
    .maybeSingle();

  if (!data) return null;
  return mapPost(data as DbPostRow);
}

export async function fetchRepliesForSlug(slug: string): Promise<RemoteCommunityReply[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = getSupabaseBrowserClient();
  const { data, error } = await supabase
    .from("community_replies")
    .select("id, post_slug, user_id, author_name, body, created_at")
    .eq("post_slug", slug)
    .order("created_at", { ascending: true });

  if (error || !data) return [];
  return (data as DbReplyRow[]).map(mapReply);
}

export type CreatePostInput = {
  title: string;
  body: string;
  category: ServiceCategory;
  city: City;
  authorName: string;
};

function slugify(input: string): string {
  const base = input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9가-힣\u4e00-\u9fff\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);
  return base.length > 0 ? base : "post";
}

export async function createRemotePost(
  input: CreatePostInput,
): Promise<{ post: RemoteCommunityPost | null; error: string | null }> {
  if (!isSupabaseConfigured()) {
    return { post: null, error: "Supabase is not configured." };
  }
  const supabase = getSupabaseBrowserClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) {
    return { post: null, error: "You must be signed in." };
  }

  const baseSlug = slugify(input.title);
  const slug = `${baseSlug}-${Math.random().toString(36).slice(2, 7)}`;

  const { data, error } = await supabase
    .from("community_posts")
    .insert({
      slug,
      user_id: userData.user.id,
      author_name: input.authorName,
      title: input.title,
      body: input.body,
      category: input.category,
      city: input.city,
    })
    .select("id, slug, user_id, author_name, title, body, category, city, created_at, updated_at")
    .single();

  if (error || !data) {
    return { post: null, error: error?.message ?? "Failed to create post." };
  }
  return { post: mapPost(data as DbPostRow), error: null };
}

export async function createRemoteReply(input: {
  postSlug: string;
  body: string;
  authorName: string;
}): Promise<{ reply: RemoteCommunityReply | null; error: string | null }> {
  if (!isSupabaseConfigured()) {
    return { reply: null, error: "Supabase is not configured." };
  }
  const supabase = getSupabaseBrowserClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) {
    return { reply: null, error: "You must be signed in." };
  }

  const { data, error } = await supabase
    .from("community_replies")
    .insert({
      post_slug: input.postSlug,
      user_id: userData.user.id,
      author_name: input.authorName,
      body: input.body,
    })
    .select("id, post_slug, user_id, author_name, body, created_at")
    .single();

  if (error || !data) {
    return { reply: null, error: error?.message ?? "Failed to post reply." };
  }
  return { reply: mapReply(data as DbReplyRow), error: null };
}
