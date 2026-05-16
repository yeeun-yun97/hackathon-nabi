"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import {
  cities,
  getCategoryLabel,
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

export function DiscoverClient() {
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
    <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
      <aside className="h-fit rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
        <p className="text-sm font-black text-[#ed9805]">Filters</p>
        <label className="mt-5 grid gap-2 text-sm font-black">
          City
          <select
            className="rounded-2xl bg-[#fffaf0] px-4 py-3 font-bold outline-none ring-1 ring-black/5 focus:ring-2 focus:ring-[#10c4a9]"
            onChange={(event) => setSelectedCity(event.target.value as City)}
            value={selectedCity}
          >
            {cities.map((city) => (
              <option key={city}>{city}</option>
            ))}
          </select>
        </label>
        <div className="mt-6">
          <p className="text-sm font-black">Categories</p>
          <p className="mt-1 text-xs leading-5 text-[#52615b]">
            추천 카테고리는 별표로 표시됩니다.
          </p>
          <div className="mt-3 grid gap-2">
            {serviceCategories.map((category) => {
              const isActive = selectedCategories.includes(category.id);
              const isRecommended = recommendedCategories.includes(category.id);

              return (
                <button
                  className={`flex items-center justify-between gap-3 rounded-2xl px-4 py-3 text-left text-sm font-black transition ${
                    isActive
                      ? "bg-[#10c4a9] text-white"
                      : "bg-[#fffaf0] text-[#17211f] ring-1 ring-black/5"
                  }`}
                  key={category.id}
                  onClick={() =>
                    setSelectedCategories((current) => toggleCategory(current, category.id))
                  }
                  type="button"
                >
                  <span>{category.label}</span>
                  {isRecommended ? (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-black ${
                        isActive ? "bg-white text-[#0b8d79]" : "bg-[#10c4a9]/15 text-[#0b8d79]"
                      }`}
                    >
                      For you
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      <section>
        <div className="mb-6 rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-black text-[#ed9805]">Recommended for your profile</p>
            <Link className="text-sm font-black text-[#0b8d79]" href="/onboarding">
              Update profile
            </Link>
          </div>
          <p className="mt-2 text-sm leading-6 text-[#52615b]">
            아래 카테고리는 비자, 가족, 거주, 고용, 연령 같은 프로필 정보를 기반으로
            추천됩니다.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {recommendedCategories.map((category) => (
              <span
                className="rounded-full bg-[#10c4a9]/15 px-3 py-1 text-xs font-black text-[#0b8d79]"
                key={category}
              >
                {getCategoryLabel(category)}
              </span>
            ))}
          </div>
          <details className="mt-4">
            <summary className="cursor-pointer text-xs font-black text-[#52615b]">
              Why these categories?
            </summary>
            <ul className="mt-3 grid gap-2 text-sm leading-6 text-[#52615b]">
              {categoryScores.slice(0, 4).map((entry) => (
                <li key={entry.category}>
                  <span className="font-black text-[#17211f]">{getCategoryLabel(entry.category)}</span>
                  <span className="ml-2">{entry.reasons.slice(-3).join(" · ")}</span>
                </li>
              ))}
            </ul>
          </details>
        </div>

        <div className="mb-5 flex items-center justify-between gap-4">
          <p className="text-sm font-black text-[#52615b]">
            {filteredPrograms.length} results for {selectedCity}
          </p>
        </div>
        <div className="grid gap-5">
          {filteredPrograms.map((program) => (
            <Link
              className="block rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-100"
              href={`/discover/${program.slug}`}
              key={program.id}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#10c4a9]/15 px-3 py-1 text-xs font-black text-[#0b8d79]">
                  {getCategoryLabel(program.category)}
                </span>
                {recommendedCategories.includes(program.category) ? (
                  <span className="rounded-full bg-[#ed9805]/15 px-3 py-1 text-xs font-black text-[#b66f00]">
                    For you
                  </span>
                ) : null}
                <span className="rounded-full bg-[#ed9805]/15 px-3 py-1 text-xs font-black text-[#b66f00]">
                  {program.cost}
                </span>
                <span className="rounded-full bg-[#17211f]/10 px-3 py-1 text-xs font-black text-[#52615b]">
                  {program.location}
                </span>
              </div>
              <h2 className="mt-4 text-2xl font-black tracking-[-0.03em]">{program.title}</h2>
              <p className="mt-3 leading-7 text-[#52615b]">{program.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {program.tags.map((tag) => (
                  <span className="text-xs font-bold text-[#52615b]" key={tag}>
                    #{tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
          {filteredPrograms.length === 0 ? (
            <div className="rounded-[2rem] bg-white p-8 text-center ring-1 ring-black/5">
              <p className="text-xl font-black">No matching programs yet</p>
              <p className="mt-3 text-[#52615b]">
                Try fewer categories or update your city profile. Supabase data can add more local
                services later.
              </p>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
