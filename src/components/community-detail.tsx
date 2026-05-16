"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

import { useAuth } from "@/components/auth-provider";
import { useLanguage } from "@/components/language-provider";
import { ScrapButton } from "@/components/community-scrap-button";
import type { CommunityPost } from "@/lib/data";
import {
  addScrap,
  createRemoteReply,
  fetchRemotePostBySlug,
  fetchRepliesForSlug,
  fetchScrappedPostSlugs,
  removeScrap,
  type RemoteCommunityPost,
  type RemoteCommunityReply,
} from "@/lib/community-db";

const cardClass = "rounded-3xl border border-black/[0.06] bg-white p-8";
const inputClass =
  "mt-2 w-full rounded-2xl border border-black/[0.08] bg-[#f6f7fb] px-4 py-3 text-base outline-none transition focus:border-[#2B4FA5] focus:ring-2 focus:ring-[#2B4FA5]/20";

export function CommunityDetail({
  staticPost,
  slug,
}: {
  staticPost: CommunityPost | null;
  slug: string;
}) {
  const { t, tCategory, tCity, tLocalized } = useLanguage();
  const { user, profile, isLoading: authLoading } = useAuth();

  const [remotePost, setRemotePost] = useState<RemoteCommunityPost | null>(null);
  const [remoteLoading, setRemoteLoading] = useState(!staticPost);
  const [replies, setReplies] = useState<RemoteCommunityReply[]>([]);
  const [replyBody, setReplyBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isScrapped, setIsScrapped] = useState(false);

  useEffect(() => {
    if (staticPost) return;
    let active = true;
    fetchRemotePostBySlug(slug)
      .then((post) => {
        if (active) setRemotePost(post);
      })
      .finally(() => {
        if (active) setRemoteLoading(false);
      });
    return () => {
      active = false;
    };
  }, [slug, staticPost]);

  useEffect(() => {
    let active = true;
    fetchRepliesForSlug(slug).then((rows) => {
      if (active) setReplies(rows);
    });
    return () => {
      active = false;
    };
  }, [slug]);

  useEffect(() => {
    if (authLoading || !user || staticPost) return;
    let active = true;
    fetchScrappedPostSlugs().then((slugs) => {
      if (active) setIsScrapped(slugs.has(slug));
    });
    return () => {
      active = false;
    };
  }, [authLoading, user, slug, staticPost]);

  async function handleReplySubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    if (!user) return;

    const trimmed = replyBody.trim();
    if (trimmed.length < 2) return;

    const authorName =
      profile?.displayName?.trim() || user.email?.split("@")[0] || "member";

    setSubmitting(true);
    try {
      const result = await createRemoteReply({
        postSlug: slug,
        body: trimmed,
        authorName,
      });
      if (result.error || !result.reply) {
        setError(result.error ?? "Failed to post reply.");
        return;
      }
      setReplies((current) => [...current, result.reply!]);
      setReplyBody("");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleToggleScrap() {
    if (!user || staticPost) return;
    const previous = isScrapped;
    setIsScrapped(!previous);
    const result = previous ? await removeScrap(slug) : await addScrap(slug);
    if (result.error) {
      setIsScrapped(previous);
    }
  }

  const seedReplies = staticPost?.replies ?? [];
  const totalReplies = seedReplies.length + replies.length;

  if (!staticPost && remoteLoading) {
    return (
      <article className="mx-auto max-w-4xl px-6 pb-20 pt-10">
        <p className="text-[#52615b]">{t("common.loading")}</p>
      </article>
    );
  }

  if (!staticPost && !remotePost) {
    return (
      <article className="mx-auto max-w-4xl px-6 pb-20 pt-10">
        <Link className="text-sm font-semibold text-[#2B4FA5] hover:underline" href="/community">
          {t("community.detail.back")}
        </Link>
        <p className="mt-8 text-lg font-semibold">{t("community.empty")}</p>
      </article>
    );
  }

  const isStatic = Boolean(staticPost);
  const titleText = staticPost ? tLocalized(staticPost.title) : remotePost!.title;
  const bodyText = staticPost ? tLocalized(staticPost.body) : remotePost!.body;
  const author = staticPost ? staticPost.author : remotePost!.authorName;
  const dateText = staticPost
    ? staticPost.updatedAt
    : new Date(remotePost!.createdAt).toLocaleDateString();
  const category = staticPost ? staticPost.category : remotePost!.category;
  const city = staticPost ? staticPost.city : remotePost!.city;
  const language = !staticPost ? remotePost!.language : null;

  return (
    <article className="mx-auto max-w-4xl px-6 pb-20 pt-10">
      <Link className="text-sm font-semibold text-[#2B4FA5] hover:underline" href="/community">
        {t("community.detail.back")}
      </Link>
      <div className={`${cardClass} relative mt-8`}>
        <div className="flex flex-wrap gap-2 pr-12">
          <span className="rounded-full bg-[#2B4FA5]/10 px-3 py-1 text-xs font-semibold text-[#2B4FA5]">
            {tCategory(category)}
          </span>
          <span className="rounded-full bg-[#0f172a]/[0.05] px-3 py-1 text-xs font-semibold text-[#52615b]">
            {tCity(city)}
          </span>
          {language ? (
            <span className="rounded-full bg-[#13C3A8]/10 px-3 py-1 text-xs font-semibold text-[#0E9D86]">
              {t(`community.language.${language}` as const)}
            </span>
          ) : null}
          {!isStatic ? (
            <span className="rounded-full bg-[#16a34a]/10 px-3 py-1 text-xs font-semibold text-[#16a34a]">
              {t("community.userPostBadge")}
            </span>
          ) : null}
        </div>
        {!isStatic && user ? (
          <div className="absolute right-6 top-6">
            <ScrapButton isScrapped={isScrapped} onToggle={handleToggleScrap} />
          </div>
        ) : null}
        <h1 className="mt-5 text-5xl font-bold tracking-[-0.04em]">{titleText}</h1>
        <p className="mt-3 text-sm font-semibold text-[#2B4FA5]">
          {isStatic
            ? t("community.detail.byAuthorUpdated", { name: author, date: dateText })
            : t("community.detail.byAuthorOn", { name: author, date: dateText })}
        </p>
        <p className="mt-8 whitespace-pre-wrap text-lg leading-8 text-[#52615b]">{bodyText}</p>
        <div className="mt-8 rounded-2xl border border-black/[0.06] bg-[#f6f7fb] p-5">
          <p className="font-semibold">{t("community.detail.safetyNote")}</p>
          <p className="mt-2 leading-7 text-[#52615b]">
            {t("community.detail.safetyNoteDescription")}
          </p>
        </div>
      </div>

      <section className="mt-8 grid gap-4">
        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl font-bold tracking-[-0.02em]">
            {t("community.detail.replies")}
          </h2>
          <p className="text-sm font-semibold text-[#52615b]">
            {t("community.detail.repliesCount", { count: totalReplies })}
          </p>
        </div>

        {seedReplies.map((reply) => (
          <div
            className="rounded-3xl border border-black/[0.06] bg-white p-6"
            key={`seed-${reply.author}-${reply.body.en}`}
          >
            <p className="font-semibold">{reply.author}</p>
            <p className="mt-3 leading-7 text-[#52615b]">{tLocalized(reply.body)}</p>
          </div>
        ))}

        {replies.map((reply) => (
          <div
            className="rounded-3xl border border-black/[0.06] bg-white p-6"
            key={reply.id}
          >
            <div className="flex items-baseline justify-between gap-4">
              <p className="font-semibold">{reply.authorName}</p>
              <p className="text-xs font-semibold text-[#52615b]">
                {new Date(reply.createdAt).toLocaleDateString()}
              </p>
            </div>
            <p className="mt-3 whitespace-pre-wrap leading-7 text-[#52615b]">{reply.body}</p>
          </div>
        ))}

        <div className="rounded-3xl border border-black/[0.06] bg-white p-6">
          {!authLoading && user ? (
            <form onSubmit={handleReplySubmit}>
              <label className="block">
                <span className="text-sm font-semibold">
                  {t("community.detail.replies")}
                </span>
                <textarea
                  className={`${inputClass} min-h-32 resize-y`}
                  maxLength={2000}
                  onChange={(event) => setReplyBody(event.target.value)}
                  placeholder={t("community.detail.replyPlaceholder")}
                  required
                  value={replyBody}
                />
              </label>
              {error ? (
                <p className="mt-3 rounded-2xl bg-[#ffe1e1] px-4 py-3 text-sm font-medium text-[#a40000]">
                  {error}
                </p>
              ) : null}
              <button
                className="mt-4 rounded-full bg-[#2B4FA5] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#23408a] disabled:cursor-not-allowed disabled:opacity-60"
                disabled={submitting}
                type="submit"
              >
                {submitting ? t("community.detail.posting") : t("community.detail.postReply")}
              </button>
            </form>
          ) : !authLoading ? (
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="font-semibold text-[#52615b]">{t("auth.requiredToReply")}</p>
              <Link
                className="rounded-full border border-[#2B4FA5]/30 bg-white px-5 py-2.5 text-sm font-semibold text-[#2B4FA5] transition hover:border-[#2B4FA5] hover:bg-[#2B4FA5]/5"
                href={`/login?redirectTo=${encodeURIComponent(`/community/${slug}`)}`}
              >
                {t("auth.signIn")}
              </Link>
            </div>
          ) : null}
        </div>
      </section>
    </article>
  );
}
