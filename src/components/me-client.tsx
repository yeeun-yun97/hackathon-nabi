"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";

import { useAuth } from "@/components/auth-provider";
import { useLanguage } from "@/components/language-provider";
import { ScrapButton } from "@/components/community-scrap-button";
import { type UserProfile } from "@/lib/data";
import {
  fetchPostsByCurrentUser,
  fetchRepliesByCurrentUser,
  fetchScrappedPosts,
  removeScrap,
  type RemoteCommunityPost,
  type ReplyWithPost,
} from "@/lib/community-db";
import { defaultProfile, readStoredProfile } from "@/lib/profile";
import type { TranslationKey } from "@/lib/i18n";

const cardClass = "rounded-3xl border border-black/[0.06] bg-white p-6 md:p-8";

const TABS = ["posts", "replies", "scraps"] as const;
type TabId = (typeof TABS)[number];

export function MeClient() {
  const { t } = useLanguage();
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl px-6 pb-20 pt-10">
        <div className={`${cardClass} text-center text-[#52615b]`}>...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-4xl px-6 pb-20 pt-10">
        <div className={`${cardClass} text-center`}>
          <p className="text-2xl font-bold tracking-[-0.02em]">{t("me.notSignedIn.title")}</p>
          <p className="mt-3 text-[#52615b]">{t("me.notSignedIn.subtitle")}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              className="rounded-full bg-[#2B4FA5] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#23408a]"
              href="/login"
            >
              {t("me.notSignedIn.signIn")}
            </Link>
            <Link
              className="rounded-full border border-black/[0.08] bg-white px-5 py-2.5 text-sm font-semibold text-[#52615b] transition hover:border-[#2B4FA5]/40 hover:text-[#2B4FA5]"
              href="/signup"
            >
              {t("me.notSignedIn.signUp")}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <SignedInView key={user.id} />;
}

function SignedInView() {
  const { t, tCity, tCategory, tOption } = useLanguage();
  const { user, profile: authProfile, signOut } = useAuth();
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [activeTab, setActiveTab] = useState<TabId>("posts");
  const [myPosts, setMyPosts] = useState<RemoteCommunityPost[]>([]);
  const [myReplies, setMyReplies] = useState<ReplyWithPost[]>([]);
  const [scraps, setScraps] = useState<RemoteCommunityPost[]>([]);
  const [contentLoading, setContentLoading] = useState(true);

  useEffect(() => {
    queueMicrotask(() => {
      setProfile(readStoredProfile());
    });
  }, []);

  useEffect(() => {
    let active = true;
    Promise.all([
      fetchPostsByCurrentUser(),
      fetchRepliesByCurrentUser(),
      fetchScrappedPosts(),
    ])
      .then(([posts, replies, scrappedPosts]) => {
        if (!active) return;
        setMyPosts(posts);
        setMyReplies(replies);
        setScraps(scrappedPosts);
        setContentLoading(false);
      })
      .catch(() => {
        if (active) setContentLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  async function handleRemoveScrap(slug: string) {
    const previous = scraps;
    setScraps((current) => current.filter((post) => post.slug !== slug));
    const result = await removeScrap(slug);
    if (result.error) {
      setScraps(previous);
    }
  }

  const displayName = authProfile?.displayName ?? user?.email?.split("@")[0] ?? "";

  return (
    <div className="mx-auto max-w-4xl px-6 pb-20 pt-10">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2B4FA5]">
        {t("me.eyebrow")}
      </p>
      <h1 className="mt-3 text-5xl font-bold tracking-[-0.04em]">
        {t("me.title", { name: displayName })}
      </h1>
      <p className="mt-5 text-lg leading-8 text-[#52615b]">{t("me.subtitle")}</p>

      <section className={`${cardClass} mt-10`}>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2B4FA5]">
          {t("me.profile.title")}
        </p>
        <p className="mt-2 text-sm leading-6 text-[#52615b]">{t("me.profile.description")}</p>

        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          <ProfileRow label={t("me.profile.city")} value={tCity(profile.city)} />
          <ProfileRow
            label={t("me.profile.visa")}
            value={tOption("visaSubtype", profile.currentVisaSubtype)}
          />
          <ProfileRow
            label={t("me.profile.residency")}
            value={tOption("residency", profile.residencyStatus)}
          />
          <ProfileRow
            label={t("me.profile.family")}
            value={tOption("family", profile.familyStatus)}
          />
        </dl>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            className="rounded-full bg-[#2B4FA5] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#23408a]"
            href="/onboarding"
          >
            {t("me.actions.editProfile")}
          </Link>
          <button
            className="rounded-full border border-black/[0.08] bg-white px-5 py-2.5 text-sm font-semibold text-[#52615b] transition hover:border-[#2B4FA5]/40 hover:text-[#2B4FA5]"
            onClick={() => {
              void signOut();
            }}
            type="button"
          >
            {t("me.actions.signOut")}
          </button>
        </div>
      </section>

      <section className="mt-10">
        <nav
          aria-label={t("me.sections.tabs.aria")}
          className="mb-6 inline-flex max-w-full flex-wrap gap-1 rounded-full bg-white p-1.5 ring-1 ring-black/[0.06]"
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab;
            const labelKey = `me.sections.tabs.${tab}` satisfies TranslationKey;
            return (
              <button
                aria-pressed={isActive}
                className={
                  isActive
                    ? "rounded-full bg-[#2B4FA5] px-5 py-2 text-sm font-semibold text-white"
                    : "rounded-full px-5 py-2 text-sm font-semibold text-[#52615b] transition hover:text-[#2B4FA5]"
                }
                key={tab}
                onClick={() => setActiveTab(tab)}
                type="button"
              >
                {t(labelKey)}
              </button>
            );
          })}
        </nav>

        {contentLoading ? (
          <div className={`${cardClass} text-[#52615b]`}>{t("common.loading")}</div>
        ) : activeTab === "posts" ? (
          <PostList
            emptyCta={
              <Link
                className="mt-4 inline-flex rounded-full bg-[#2B4FA5] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#23408a]"
                href="/community/new"
              >
                {t("me.sections.posts.cta")}
              </Link>
            }
            emptyText={t("me.sections.posts.empty")}
            posts={myPosts}
            renderChips={(post) => (
              <>
                <span className="rounded-full bg-[#2B4FA5]/10 px-3 py-1 text-xs font-semibold text-[#2B4FA5]">
                  {tCategory(post.category)}
                </span>
                <span className="rounded-full bg-[#0f172a]/[0.05] px-3 py-1 text-xs font-semibold text-[#52615b]">
                  {tCity(post.city)}
                </span>
                <span className="rounded-full bg-[#13C3A8]/10 px-3 py-1 text-xs font-semibold text-[#0E9D86]">
                  {t(`community.language.${post.language}` as const)}
                </span>
              </>
            )}
          />
        ) : activeTab === "replies" ? (
          <ReplyList emptyText={t("me.sections.replies.empty")} replies={myReplies} />
        ) : (
          <PostList
            emptyText={t("me.sections.scraps.empty")}
            posts={scraps}
            renderChips={(post) => (
              <>
                <span className="rounded-full bg-[#2B4FA5]/10 px-3 py-1 text-xs font-semibold text-[#2B4FA5]">
                  {tCategory(post.category)}
                </span>
                <span className="rounded-full bg-[#0f172a]/[0.05] px-3 py-1 text-xs font-semibold text-[#52615b]">
                  {tCity(post.city)}
                </span>
                <span className="rounded-full bg-[#13C3A8]/10 px-3 py-1 text-xs font-semibold text-[#0E9D86]">
                  {t(`community.language.${post.language}` as const)}
                </span>
              </>
            )}
            renderTopRight={(post) => (
              <ScrapButton
                isScrapped
                onToggle={() => handleRemoveScrap(post.slug)}
                size="sm"
              />
            )}
          />
        )}
      </section>
    </div>
  );
}

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-black/[0.06] bg-[#f6f7fb] p-4">
      <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[#52615b]">{label}</dt>
      <dd className="mt-2 text-base font-semibold text-[#17211f]">{value}</dd>
    </div>
  );
}

function PostList({
  posts,
  emptyText,
  emptyCta,
  renderChips,
  renderTopRight,
}: {
  posts: RemoteCommunityPost[];
  emptyText: string;
  emptyCta?: ReactNode;
  renderChips: (post: RemoteCommunityPost) => ReactNode;
  renderTopRight?: (post: RemoteCommunityPost) => ReactNode;
}) {
  if (posts.length === 0) {
    return (
      <div className={`${cardClass} text-center`}>
        <p className="text-[#52615b]">{emptyText}</p>
        {emptyCta}
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {posts.map((post) => (
        <div className="relative" key={post.id}>
          <Link
            className="block rounded-3xl border border-black/[0.06] bg-white p-6 transition hover:-translate-y-0.5 hover:border-[#2B4FA5]/30 hover:shadow-lg hover:shadow-[#2B4FA5]/5"
            href={`/community/${post.slug}`}
          >
            <div className="flex flex-wrap gap-2 pr-12">{renderChips(post)}</div>
            <h3 className="mt-4 text-xl font-bold tracking-[-0.02em]">{post.title}</h3>
            <p className="mt-3 line-clamp-2 leading-7 text-[#52615b]">{post.body}</p>
            <p className="mt-3 text-xs font-semibold text-[#52615b]">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </Link>
          {renderTopRight ? (
            <div className="absolute right-5 top-5">{renderTopRight(post)}</div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function ReplyList({
  replies,
  emptyText,
}: {
  replies: ReplyWithPost[];
  emptyText: string;
}) {
  const { t } = useLanguage();

  if (replies.length === 0) {
    return (
      <div className={`${cardClass} text-center`}>
        <p className="text-[#52615b]">{emptyText}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {replies.map((reply) => (
        <Link
          className="block rounded-3xl border border-black/[0.06] bg-white p-6 transition hover:border-[#2B4FA5]/30 hover:shadow-lg hover:shadow-[#2B4FA5]/5"
          href={`/community/${reply.postSlug}`}
          key={reply.id}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2B4FA5]">
            {t("me.sections.replies.onPost", { title: reply.postTitle ?? reply.postSlug })}
          </p>
          <p className="mt-3 whitespace-pre-wrap leading-7 text-[#17211f]">{reply.body}</p>
          <p className="mt-3 text-xs font-semibold text-[#52615b]">
            {new Date(reply.createdAt).toLocaleDateString()}
          </p>
        </Link>
      ))}
    </div>
  );
}
