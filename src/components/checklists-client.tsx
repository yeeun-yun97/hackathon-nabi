"use client";

import { useEffect, useMemo, useState } from "react";

import { useLanguage } from "@/components/language-provider";
import {
  checklists,
  matchesCity,
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

export function ChecklistsClient() {
  const { t, tCategory, tLocalized } = useLanguage();
  const [city, setCity] = useState<City>(defaultProfile.city);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);

  useEffect(() => {
    queueMicrotask(() => {
      const profile = readStoredProfile();
      setCity(profile.city);
    });
  }, []);

  const filteredChecklists = useMemo(
    () =>
      checklists.filter(
        (checklist) =>
          matchesCity(checklist.cities, city) &&
          (categories.length === 0 || categories.includes(checklist.category)),
      ),
    [categories, city],
  );

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {serviceCategories.map((category) => {
          const isActive = categories.includes(category.id);

          return (
            <button
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                isActive
                  ? "bg-[#2B4FA5] text-white"
                  : "border border-black/[0.06] bg-white text-[#52615b] hover:border-[#2B4FA5]/40 hover:text-[#2B4FA5]"
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
      <div className="grid gap-4 md:grid-cols-2">
        {filteredChecklists.map((checklist) => (
          <article
            className="rounded-3xl border border-black/[0.06] bg-white p-6"
            key={checklist.id}
          >
            <span className="rounded-full bg-[#2B4FA5]/10 px-3 py-1 text-xs font-semibold text-[#2B4FA5]">
              {tCategory(checklist.category)}
            </span>
            <h2 className="mt-4 text-2xl font-bold tracking-[-0.02em]">
              {tLocalized(checklist.title)}
            </h2>
            <p className="mt-3 leading-7 text-[#52615b]">{tLocalized(checklist.description)}</p>
            <ol className="mt-5 grid gap-3">
              {checklist.steps.map((step, index) => (
                <li
                  className="flex gap-3 text-sm font-medium leading-6 text-[#52615b]"
                  key={step.en}
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#2B4FA5]/10 text-xs font-semibold text-[#2B4FA5]">
                    {index + 1}
                  </span>
                  {tLocalized(step)}
                </li>
              ))}
            </ol>
          </article>
        ))}
      </div>
      {filteredChecklists.length === 0 ? (
        <div className="rounded-3xl border border-black/[0.06] bg-white p-8 text-center">
          <p className="font-semibold">{t("checklists.empty")}</p>
        </div>
      ) : null}
    </div>
  );
}
