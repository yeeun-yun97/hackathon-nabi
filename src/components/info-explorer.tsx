"use client";

import { useMemo, useState } from "react";

import { useLanguage } from "@/components/language-provider";

const programIndices = [0, 1, 2, 3] as const;

const programTagsByIndex: Record<number, string[]> = {
  0: ["Visa", "English", "Free"],
  1: ["Healthcare", "Free"],
  2: ["Housing", "English"],
  3: ["Education", "Free", "English"],
};

const filters = ["Visa", "Healthcare", "Housing", "Education", "Free", "English"];

export function InfoExplorer() {
  const { t } = useLanguage();
  const [activeFilters, setActiveFilters] = useState<string[]>(["Free"]);

  const programs = useMemo(
    () =>
      programIndices.map((index) => ({
        index,
        title: t(`explorer.programs.${index}.title`),
        category: t(`explorer.programs.${index}.category`),
        description: t(`explorer.programs.${index}.desc`),
        tags: programTagsByIndex[index],
      })),
    [t],
  );

  const filteredPrograms = useMemo(() => {
    if (activeFilters.length === 0) {
      return programs;
    }

    return programs.filter((program) =>
      activeFilters.every((filter) => program.tags.includes(filter)),
    );
  }, [activeFilters, programs]);

  function toggleFilter(filter: string) {
    setActiveFilters((current) =>
      current.includes(filter)
        ? current.filter((item) => item !== filter)
        : [...current, filter],
    );
  }

  return (
    <div className="rounded-[2.5rem] bg-white p-5 shadow-2xl shadow-orange-100 ring-1 ring-black/5">
      <div className="rounded-[2rem] bg-[#f7fbf8] p-6">
        <div className="flex items-center justify-between">
          <p className="font-black">{t("explorer.title")}</p>
          <span className="rounded-full bg-[#10c4a9]/15 px-3 py-1 text-xs font-black text-[#0b8d79]">
            {t("explorer.cityChip")}
          </span>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {filters.map((filter) => {
            const isActive = activeFilters.includes(filter);

            return (
              <button
                className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                  isActive
                    ? "bg-[#10c4a9] text-white"
                    : "bg-white text-[#4e5a55] ring-1 ring-black/5"
                }`}
                key={filter}
                onClick={() => toggleFilter(filter)}
                type="button"
              >
                {filter}
              </button>
            );
          })}
        </div>
        <div className="mt-6 grid gap-3">
          {filteredPrograms.map((program) => (
            <article className="rounded-3xl bg-white p-5 ring-1 ring-black/5" key={program.index}>
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-black text-[#0b8d79]">{program.category}</p>
                <p className="text-xs font-bold text-[#6b756f]">{t("explorer.cityChip")}</p>
              </div>
              <h3 className="mt-2 text-xl font-black">{program.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#52615b]">{program.description}</p>
            </article>
          ))}
          {filteredPrograms.length === 0 ? (
            <div className="rounded-3xl bg-white p-5 text-sm font-bold text-[#52615b] ring-1 ring-black/5">
              {t("explorer.empty")}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
