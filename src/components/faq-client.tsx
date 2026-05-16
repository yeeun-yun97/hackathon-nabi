"use client";

import { useEffect, useMemo, useState } from "react";

import {
  faqItems,
  getCategoryLabel,
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
      const queryMatches =
        normalizedQuery.length === 0 ||
        faq.question.toLowerCase().includes(normalizedQuery) ||
        faq.answer.toLowerCase().includes(normalizedQuery);

      return cityMatches && categoryMatches && queryMatches;
    });
  }, [categories, city, query]);

  return (
    <div className="grid gap-6">
      <input
        className="rounded-full bg-white px-6 py-4 font-bold outline-none ring-1 ring-black/5 focus:ring-2 focus:ring-[#10c4a9]"
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search FAQ..."
        value={query}
      />
      <div className="flex flex-wrap gap-2">
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
              {category.label}
            </button>
          );
        })}
      </div>
      <div className="grid gap-3">
        {filteredFaqs.map((faq) => (
          <details className="rounded-[1.5rem] bg-white p-6 ring-1 ring-black/5" key={faq.id}>
            <summary className="cursor-pointer text-lg font-black">{faq.question}</summary>
            <p className="mt-4 leading-7 text-[#52615b]">{faq.answer}</p>
            <p className="mt-4 text-xs font-black text-[#0b8d79]">{getCategoryLabel(faq.category)}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
