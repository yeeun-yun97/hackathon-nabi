"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { useLanguage } from "@/components/language-provider";
import {
  communityPosts,
  serviceCategories,
  type City,
  type ServiceCategory,
} from "@/lib/data";
import { defaultProfile, readStoredProfile } from "@/lib/profile";

function toggleCategory(categories: ServiceCategory[], category: ServiceCategory) {
  return categories.includes(category)
    ? categories.filter((item) => item !== category)
    : [...categories, category];
}

const cardClass = "rounded-3xl border border-black/[0.06] bg-white p-6";

export function CommunityClient() {
  const { t, tCity, tCategory, tLocalized } = useLanguage();
  const [city, setCity] = useState<City>(defaultProfile.city);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);

  useEffect(() => {
    queueMicrotask(() => {
      const profile = readStoredProfile();
      setCity(profile.city);
    });
  }, []);

  const filteredPosts = useMemo(
    () =>
      communityPosts.filter(
        (post) =>
          post.city === city &&
          (categories.length === 0 || categories.includes(post.category)),
      ),
    [categories, city],
  );

  const visiblePosts = filteredPosts.length > 0 ? filteredPosts : communityPosts;

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
      </aside>
      <section className="grid gap-4">
        {filteredPosts.length === 0 ? (
          <div className={cardClass}>
            <p className="font-semibold">{t("community.noLocalMatch")}</p>
            <p className="mt-2 text-[#52615b]">{t("community.noLocalMatchHint")}</p>
          </div>
        ) : null}
        {visiblePosts.map((post) => (
          <Link
            className="rounded-3xl border border-black/[0.06] bg-white p-6 transition hover:-translate-y-0.5 hover:border-[#2B4FA5]/30 hover:shadow-lg hover:shadow-[#2B4FA5]/5"
            href={`/community/${post.slug}`}
            key={post.id}
          >
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-[#2B4FA5]/10 px-3 py-1 text-xs font-semibold text-[#2B4FA5]">
                {tCategory(post.category)}
              </span>
              <span className="rounded-full bg-[#0f172a]/[0.05] px-3 py-1 text-xs font-semibold text-[#52615b]">
                {tCity(post.city)}
              </span>
            </div>
            <h2 className="mt-4 text-2xl font-bold tracking-[-0.02em]">{tLocalized(post.title)}</h2>
            <p className="mt-3 leading-7 text-[#52615b]">{tLocalized(post.excerpt)}</p>
            <p className="mt-4 text-sm font-semibold text-[#2B4FA5]">
              {t("community.byAuthor", { name: post.author })}
            </p>
          </Link>
        ))}
      </section>
    </div>
  );
}
