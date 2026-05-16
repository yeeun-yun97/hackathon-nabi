import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase";
import type { City, ServiceCategory } from "@/lib/data";

export type PostLanguage = "en" | "ko" | "zh";

export const postLanguages: readonly PostLanguage[] = ["ko", "en", "zh"] as const;

export type RemoteCommunityPost = {
  id: string;
  slug: string;
  userId: string;
  authorName: string;
  title: string;
  body: string;
  category: ServiceCategory;
  city: City;
  language: PostLanguage;
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
  language: string;
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

const POST_COLUMNS =
  "id, slug, user_id, author_name, title, body, category, city, language, created_at, updated_at";
const REPLY_COLUMNS = "id, post_slug, user_id, author_name, body, created_at";

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
    language: (row.language as PostLanguage) ?? "en",
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
    .select(POST_COLUMNS)
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return (data as DbPostRow[]).map(mapPost);
}

export async function fetchRemotePostBySlug(slug: string): Promise<RemoteCommunityPost | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = getSupabaseBrowserClient();
  const { data } = await supabase
    .from("community_posts")
    .select(POST_COLUMNS)
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
    .select(REPLY_COLUMNS)
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
  language: PostLanguage;
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
      language: input.language,
    })
    .select(POST_COLUMNS)
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
    .select(REPLY_COLUMNS)
    .single();

  if (error || !data) {
    return { reply: null, error: error?.message ?? "Failed to post reply." };
  }
  return { reply: mapReply(data as DbReplyRow), error: null };
}

// -- Scraps --------------------------------------------------------------------

export async function fetchScrappedPostSlugs(): Promise<Set<string>> {
  if (!isSupabaseConfigured()) return new Set();
  const supabase = getSupabaseBrowserClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return new Set();

  const { data, error } = await supabase
    .from("community_scraps")
    .select("post_slug")
    .eq("user_id", userData.user.id);

  if (error || !data) return new Set();
  return new Set((data as Array<{ post_slug: string }>).map((row) => row.post_slug));
}

export async function fetchScrappedPosts(): Promise<RemoteCommunityPost[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = getSupabaseBrowserClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return [];

  const { data: scrapRows, error: scrapError } = await supabase
    .from("community_scraps")
    .select("post_slug, created_at")
    .eq("user_id", userData.user.id)
    .order("created_at", { ascending: false });

  if (scrapError || !scrapRows || scrapRows.length === 0) return [];

  const slugs = (scrapRows as Array<{ post_slug: string }>).map((row) => row.post_slug);
  const { data: postRows, error: postError } = await supabase
    .from("community_posts")
    .select(POST_COLUMNS)
    .in("slug", slugs);

  if (postError || !postRows) return [];

  const bySlug = new Map<string, RemoteCommunityPost>();
  for (const row of postRows as DbPostRow[]) {
    bySlug.set(row.slug, mapPost(row));
  }
  return slugs
    .map((slug) => bySlug.get(slug))
    .filter((post): post is RemoteCommunityPost => Boolean(post));
}

export async function addScrap(postSlug: string): Promise<{ error: string | null }> {
  if (!isSupabaseConfigured()) {
    return { error: "Supabase is not configured." };
  }
  const supabase = getSupabaseBrowserClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) {
    return { error: "You must be signed in." };
  }

  const { error } = await supabase
    .from("community_scraps")
    .insert({ user_id: userData.user.id, post_slug: postSlug });

  if (error && !/duplicate key|unique/i.test(error.message)) {
    return { error: error.message };
  }
  return { error: null };
}

export async function removeScrap(postSlug: string): Promise<{ error: string | null }> {
  if (!isSupabaseConfigured()) {
    return { error: "Supabase is not configured." };
  }
  const supabase = getSupabaseBrowserClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) {
    return { error: "You must be signed in." };
  }

  const { error } = await supabase
    .from("community_scraps")
    .delete()
    .eq("user_id", userData.user.id)
    .eq("post_slug", postSlug);

  if (error) return { error: error.message };
  return { error: null };
}

// -- My-page helpers -----------------------------------------------------------

export async function fetchPostsByCurrentUser(): Promise<RemoteCommunityPost[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = getSupabaseBrowserClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return [];

  const { data, error } = await supabase
    .from("community_posts")
    .select(POST_COLUMNS)
    .eq("user_id", userData.user.id)
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return (data as DbPostRow[]).map(mapPost);
}

export type ReplyWithPost = RemoteCommunityReply & {
  postTitle: string | null;
};

export async function fetchRepliesByCurrentUser(): Promise<ReplyWithPost[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = getSupabaseBrowserClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return [];

  const { data: replyRows, error: replyError } = await supabase
    .from("community_replies")
    .select(REPLY_COLUMNS)
    .eq("user_id", userData.user.id)
    .order("created_at", { ascending: false });

  if (replyError || !replyRows || replyRows.length === 0) return [];

  const replies = (replyRows as DbReplyRow[]).map(mapReply);
  const slugs = Array.from(new Set(replies.map((r) => r.postSlug)));
  const { data: postRows } = await supabase
    .from("community_posts")
    .select("slug, title")
    .in("slug", slugs);

  const titleBySlug = new Map<string, string>();
  if (postRows) {
    for (const row of postRows as Array<{ slug: string; title: string }>) {
      titleBySlug.set(row.slug, row.title);
    }
  }

  return replies.map((reply) => ({
    ...reply,
    postTitle: titleBySlug.get(reply.postSlug) ?? null,
  }));
}
