"use client";

import { useEffect, useMemo, useState } from "react";

import { useLanguage } from "@/components/language-provider";
import {
  faqItems,
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

export function FaqClient() {
  const { t, tCategory, tLocalized, locale } = useLanguage();
  const [city, setCity] = useState<City>(defaultProfile.city);
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState<ServiceCategory[]>([]);

  useEffect(() => {
    queueMicrotask(() => {
      const profile = readStoredProfile();
      setCity(profile.city);
    });
  }, []);

  const filteredFaqs = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return faqItems.filter((faq) => {
      const cityMatches = matchesCity(faq.cities, city);
      const categoryMatches = categories.length === 0 || categories.includes(faq.category);
      const localizedQuestion = (faq.question[locale] ?? faq.question.en).toLowerCase();
      const localizedAnswer = (faq.answer[locale] ?? faq.answer.en).toLowerCase();
      const queryMatches =
        normalizedQuery.length === 0 ||
        localizedQuestion.includes(normalizedQuery) ||
        localizedAnswer.includes(normalizedQuery);

      return cityMatches && categoryMatches && queryMatches;
    });
  }, [categories, city, locale, query]);

  return (
    <div className="grid gap-6">
      <input
        className="rounded-full border border-black/[0.06] bg-white px-6 py-3.5 font-medium outline-none transition focus:border-[#2B4FA5] focus:ring-2 focus:ring-[#2B4FA5]/20"
        onChange={(event) => setQuery(event.target.value)}
        placeholder={t("faq.searchPlaceholder")}
        value={query}
      />
      <div className="flex flex-wrap gap-2">
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
      <div className="grid gap-3">
        {filteredFaqs.map((faq) => (
          <details
            className="rounded-2xl border border-black/[0.06] bg-white p-6 open:border-[#2B4FA5]/20"
            key={faq.id}
          >
            <summary className="cursor-pointer text-lg font-semibold">
              {tLocalized(faq.question)}
            </summary>
            <p className="mt-4 leading-7 text-[#52615b]">{tLocalized(faq.answer)}</p>
            <p className="mt-4 text-xs font-semibold text-[#2B4FA5]">{tCategory(faq.category)}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
