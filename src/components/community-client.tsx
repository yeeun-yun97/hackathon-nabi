"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useAuth } from "@/components/auth-provider";
import { useLanguage } from "@/components/language-provider";
import { ScrapButton } from "@/components/community-scrap-button";
import {
  serviceCategories,
  type City,
  type ServiceCategory,
} from "@/lib/data";
import {
  addScrap,
  fetchRemotePosts,
  fetchScrappedPostSlugs,
  removeScrap,
  type RemoteCommunityPost,
} from "@/lib/community-db";
import { defaultProfile, readStoredProfile } from "@/lib/profile";

function toggleCategory(categories: ServiceCategory[], category: ServiceCategory) {
  return categories.includes(category)
    ? categories.filter((item) => item !== category)
    : [...categories, category];
}

const cardClass = "rounded-3xl border border-black/[0.06] bg-white p-6";

export function CommunityClient() {
  const { t, tCity, tCategory } = useLanguage();
  const { user, isLoading: authLoading } = useAuth();
  const [city, setCity] = useState<City>(defaultProfile.city);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [remotePosts, setRemotePosts] = useState<RemoteCommunityPost[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [scrappedSlugs, setScrappedSlugs] = useState<Set<string>>(new Set());

  useEffect(() => {
    queueMicrotask(() => {
      const profile = readStoredProfile();
      setCity(profile.city);
    });
  }, []);

  useEffect(() => {
    let active = true;
    fetchRemotePosts()
      .then((rows) => {
        if (active) setRemotePosts(rows);
      })
      .finally(() => {
        if (active) setPostsLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (authLoading || !user) return;
    let active = true;
    fetchScrappedPostSlugs().then((slugs) => {
      if (active) setScrappedSlugs(slugs);
    });
    return () => {
      active = false;
    };
  }, [authLoading, user]);

  const filteredRemote = useMemo(
    () =>
      remotePosts.filter(
        (post) =>
          post.city === city &&
          (categories.length === 0 || categories.includes(post.category)),
      ),
    [categories, city, remotePosts],
  );

  const handleToggleScrap = useCallback(
    async (slug: string) => {
      if (!user) return;
      const isCurrentlyScrapped = scrappedSlugs.has(slug);
      setScrappedSlugs((current) => {
        const next = new Set(current);
        if (isCurrentlyScrapped) {
          next.delete(slug);
        } else {
          next.add(slug);
        }
        return next;
      });
      const result = isCurrentlyScrapped ? await removeScrap(slug) : await addScrap(slug);
      if (result.error) {
        setScrappedSlugs((current) => {
          const next = new Set(current);
          if (isCurrentlyScrapped) {
            next.add(slug);
          } else {
            next.delete(slug);
          }
          return next;
        });
      }
    },
    [scrappedSlugs, user],
  );

  const writeCta = user ? (
    <Link
      className="inline-flex w-fit items-center justify-center rounded-full bg-[#2B4FA5] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#23408a]"
      href="/community/new"
    >
      {t("community.writePost")}
    </Link>
  ) : (
    <Link
      className="inline-flex w-fit items-center justify-center rounded-full border border-[#2B4FA5]/30 bg-white px-5 py-2.5 text-sm font-semibold text-[#2B4FA5] transition hover:border-[#2B4FA5] hover:bg-[#2B4FA5]/5"
      href="/login?redirectTo=/community/new"
    >
      {t("auth.requiredToWrite")}
    </Link>
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
      <aside className={`${cardClass} h-fit`}>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2B4FA5]">
          {t("community.filtersLabel")}
        </p>
        <p className="mt-3 text-2xl font-bold tracking-[-0.02em]">{tCity(city)}</p>
        <div className="mt-5 grid gap-2">
          {serviceCategories.map((category) => {
            const isActive = categories.includes(category.id);

            return (
              <button
                className={`rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                  isActive
                    ? "bg-[#2B4FA5] text-white"
                    : "border border-black/[0.06] bg-[#f6f7fb] text-[#52615b] hover:border-[#2B4FA5]/40 hover:text-[#2B4FA5]"
                }`}
                key={category.id}
                onClick={() => setCategories((current) => toggleCategory(current, category.id))}
                type="button"
              >
                {tCategory(category.id)}
              </button>
            );
          })}
        </div>
        <div className="mt-6 border-t border-black/[0.06] pt-5">{!authLoading ? writeCta : null}</div>
      </aside>
      <section className="grid gap-4">
        {postsLoading ? (
          <div className={cardClass}>
            <p className="text-[#52615b]">{t("common.loading")}</p>
          </div>
        ) : filteredRemote.length === 0 ? (
          <div className={cardClass}>
            <p className="font-semibold">{t("community.empty")}</p>
          </div>
        ) : (
          filteredRemote.map((post) => (
            <RemotePostCard
              isScrapped={scrappedSlugs.has(post.slug)}
              key={post.id}
              onToggleScrap={() => handleToggleScrap(post.slug)}
              post={post}
              showScrapButton={Boolean(user)}
            />
          ))
        )}
      </section>
    </div>
  );
}

function RemotePostCard({
  post,
  isScrapped,
  onToggleScrap,
  showScrapButton,
}: {
  post: RemoteCommunityPost;
  isScrapped: boolean;
  onToggleScrap: () => void | Promise<void>;
  showScrapButton: boolean;
}) {
  const { t, tCategory, tCity } = useLanguage();

  return (
    <div className="relative">
      <Link
        className="block rounded-3xl border border-black/[0.06] bg-white p-6 transition hover:-translate-y-0.5 hover:border-[#2B4FA5]/30 hover:shadow-lg hover:shadow-[#2B4FA5]/5"
        href={`/community/${post.slug}`}
      >
        <div className="flex flex-wrap gap-2 pr-12">
          <span className="rounded-full bg-[#2B4FA5]/10 px-3 py-1 text-xs font-semibold text-[#2B4FA5]">
            {tCategory(post.category)}
          </span>
          <span className="rounded-full bg-[#0f172a]/[0.05] px-3 py-1 text-xs font-semibold text-[#52615b]">
            {tCity(post.city)}
          </span>
          <span className="rounded-full bg-[#13C3A8]/10 px-3 py-1 text-xs font-semibold text-[#0E9D86]">
            {t(`community.language.${post.language}` as const)}
          </span>
        </div>
        <h3 className="mt-4 text-2xl font-bold tracking-[-0.02em]">{post.title}</h3>
        <p className="mt-3 line-clamp-3 leading-7 text-[#52615b]">{post.body}</p>
        <p className="mt-4 text-sm font-semibold text-[#2B4FA5]">
          {t("community.byAuthor", { name: post.authorName })}
        </p>
      </Link>
      {showScrapButton ? (
        <div className="absolute right-5 top-5">
          <ScrapButton isScrapped={isScrapped} onToggle={onToggleScrap} />
        </div>
      ) : null}
    </div>
  );
}
