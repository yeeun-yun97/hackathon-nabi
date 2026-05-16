"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { useLanguage } from "@/components/language-provider";
import {
  cities,
  matchesCity,
  recommendedCategoryIds,
  scoreCategoriesForProfile,
  serviceCategories,
  supportPrograms,
  type City,
  type ServiceCategory,
  type UserProfile,
} from "@/lib/data";
import { defaultProfile, readStoredProfile } from "@/lib/profile";

function toggleCategory(categories: ServiceCategory[], category: ServiceCategory) {
  return categories.includes(category)
    ? categories.filter((item) => item !== category)
    : [...categories, category];
}

const cardClass = "rounded-3xl border border-black/[0.06] bg-white p-6";

export function DiscoverClient() {
  const { t, tCity, tCategory, tCost, tLocalized } = useLanguage();
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [selectedCity, setSelectedCity] = useState<City>(defaultProfile.city);
  const [selectedCategories, setSelectedCategories] = useState<ServiceCategory[]>([]);

  useEffect(() => {
    queueMicrotask(() => {
      const storedProfile = readStoredProfile();
      setProfile(storedProfile);
      setSelectedCity(storedProfile.city);
    });
  }, []);

  const recommendedCategories = useMemo(() => recommendedCategoryIds(profile, 4), [profile]);
  const categoryScores = useMemo(() => scoreCategoriesForProfile(profile), [profile]);
  const categoryScoreMap = useMemo(() => {
    return Object.fromEntries(categoryScores.map((entry) => [entry.category, entry.score])) as Record<
      ServiceCategory,
      number
    >;
  }, [categoryScores]);

  const filteredPrograms = useMemo(() => {
    const programs = supportPrograms.filter((program) => {
      const cityMatches = matchesCity(program.cities, selectedCity);
      const categoryMatches =
        selectedCategories.length === 0 || selectedCategories.includes(program.category);

      return cityMatches && categoryMatches;
    });

    return [...programs].sort((a, b) => {
      const aScore = categoryScoreMap[a.category] ?? 0;
      const bScore = categoryScoreMap[b.category] ?? 0;

      return bScore - aScore;
    });
  }, [categoryScoreMap, selectedCategories, selectedCity]);

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <aside className={`${cardClass} h-fit`}>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2B4FA5]">
          {t("discover.filtersLabel")}
        </p>
        <label className="mt-5 grid gap-2 text-sm font-semibold">
          {t("discover.cityFieldLabel")}
          <select
            className="rounded-2xl border border-black/[0.06] bg-[#f6f7fb] px-4 py-3 font-medium outline-none transition focus:border-[#2B4FA5] focus:ring-2 focus:ring-[#2B4FA5]/20"
            onChange={(event) => setSelectedCity(event.target.value as City)}
            value={selectedCity}
          >
            {cities.map((city) => (
              <option key={city} value={city}>
                {tCity(city)}
              </option>
            ))}
          </select>
        </label>
        <div className="mt-6">
          <p className="text-sm font-semibold">{t("discover.categoriesFieldLabel")}</p>
          <p className="mt-1 text-xs leading-5 text-[#52615b]">
            {t("discover.categoriesFieldDescription")}
          </p>
          <div className="mt-3 grid gap-2">
            {serviceCategories.map((category) => {
              const isActive = selectedCategories.includes(category.id);
              const isRecommended = recommendedCategories.includes(category.id);

              return (
                <button
                  className={`flex items-center justify-between gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                    isActive
                      ? "bg-[#2B4FA5] text-white"
                      : "border border-black/[0.06] bg-[#f6f7fb] text-[#17211f] hover:border-[#2B4FA5]/40"
                  }`}
                  key={category.id}
                  onClick={() =>
                    setSelectedCategories((current) => toggleCategory(current, category.id))
                  }
                  type="button"
                >
                  <span>{tCategory(category.id)}</span>
                  {isRecommended ? (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-[#2B4FA5]/10 text-[#2B4FA5]"
                      }`}
                    >
                      {t("discover.recommendedBadge")}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      <section>
        <div className={`${cardClass} mb-6`}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2B4FA5]">
              {t("discover.recommendedTitle")}
            </p>
            <Link className="text-sm font-semibold text-[#2B4FA5] hover:underline" href="/onboarding">
              {t("discover.updateProfile")}
            </Link>
          </div>
          <p className="mt-2 text-sm leading-6 text-[#52615b]">
            {t("discover.recommendedDescription")}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {recommendedCategories.map((category) => (
              <span
                className="rounded-full bg-[#2B4FA5]/10 px-3 py-1 text-xs font-semibold text-[#2B4FA5]"
                key={category}
              >
                {tCategory(category)}
              </span>
            ))}
          </div>
          <details className="mt-4">
            <summary className="cursor-pointer text-xs font-semibold text-[#52615b]">
              {t("discover.whyTheseCategories")}
            </summary>
            <ul className="mt-3 grid gap-2 text-sm leading-6 text-[#52615b]">
              {categoryScores.slice(0, 4).map((entry) => (
                <li key={entry.category}>
                  <span className="font-semibold text-[#17211f]">{tCategory(entry.category)}</span>
                  <span className="ml-2">{entry.reasons.slice(-3).join(" · ")}</span>
                </li>
              ))}
            </ul>
          </details>
        </div>

        <div className="mb-5 flex items-center justify-between gap-4">
          <p className="text-sm font-semibold text-[#52615b]">
            {t("common.results", {
              count: filteredPrograms.length,
              city: tCity(selectedCity),
            })}
          </p>
        </div>
        <div className="grid gap-4">
          {filteredPrograms.map((program) => (
            <Link
              className="block rounded-3xl border border-black/[0.06] bg-white p-6 transition hover:-translate-y-0.5 hover:border-[#2B4FA5]/30 hover:shadow-lg hover:shadow-[#2B4FA5]/5"
              href={`/discover/${program.slug}`}
              key={program.id}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#2B4FA5]/10 px-3 py-1 text-xs font-semibold text-[#2B4FA5]">
                  {tCategory(program.category)}
                </span>
                {recommendedCategories.includes(program.category) ? (
                  <span className="rounded-full bg-[#2B4FA5] px-3 py-1 text-xs font-semibold text-white">
                    {t("discover.recommendedBadge")}
                  </span>
                ) : null}
                <span className="rounded-full bg-[#0f172a]/[0.05] px-3 py-1 text-xs font-semibold text-[#52615b]">
                  {tCost(program.cost)}
                </span>
                <span className="rounded-full bg-[#0f172a]/[0.05] px-3 py-1 text-xs font-semibold text-[#52615b]">
                  {tLocalized(program.location)}
                </span>
              </div>
              <h2 className="mt-4 text-2xl font-bold tracking-[-0.02em]">
                {tLocalized(program.title)}
              </h2>
              <p className="mt-3 leading-7 text-[#52615b]">{tLocalized(program.summary)}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {program.tags.map((tag) => (
                  <span className="text-xs font-medium text-[#6b756f]" key={tag}>
                    #{tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
          {filteredPrograms.length === 0 ? (
            <div className={`${cardClass} text-center`}>
              <p className="text-xl font-bold">{t("discover.noMatchingTitle")}</p>
              <p className="mt-3 text-[#52615b]">{t("discover.noMatchingHint")}</p>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
