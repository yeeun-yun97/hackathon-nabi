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
  const { t, tCategory } = useLanguage();
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
              className={`rounded-full px-4 py-2 text-sm font-black ${
                isActive ? "bg-[#10c4a9] text-white" : "bg-white text-[#52615b] ring-1 ring-black/5"
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
      <div className="grid gap-5 md:grid-cols-2">
        {filteredChecklists.map((checklist) => (
          <article className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5" key={checklist.id}>
            <span className="rounded-full bg-[#10c4a9]/15 px-3 py-1 text-xs font-black text-[#0b8d79]">
              {tCategory(checklist.category)}
            </span>
            <h2 className="mt-4 text-2xl font-black tracking-[-0.03em]">{checklist.title}</h2>
            <p className="mt-3 leading-7 text-[#52615b]">{checklist.description}</p>
            <ol className="mt-5 grid gap-3">
              {checklist.steps.map((step, index) => (
                <li className="flex gap-3 text-sm font-bold leading-6 text-[#52615b]" key={step}>
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#ed9805] text-xs text-white">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </article>
        ))}
      </div>
      {filteredChecklists.length === 0 ? (
        <div className="rounded-[2rem] bg-white p-8 text-center ring-1 ring-black/5">
          <p className="font-black">{t("checklists.empty")}</p>
        </div>
      ) : null}
    </div>
  );
}
