"use client";

import { useMemo, useState } from "react";

const programs = [
  {
    title: "Seoul Global Center",
    category: "Government help",
    location: "Seoul",
    tags: ["Visa", "English", "Free"],
    description:
      "외국인 생활 상담, 비자 기본 안내, 행정 절차, 통역 연계 정보를 제공합니다.",
  },
  {
    title: "Public Health Center",
    category: "Health & wellness",
    location: "Seoul",
    tags: ["Healthcare", "Free"],
    description:
      "예방접종, 건강검진, 보건 상담 등 지역 보건소에서 받을 수 있는 서비스를 안내합니다.",
  },
  {
    title: "Housing Contract Checklist",
    category: "Housing & documents",
    location: "Seoul",
    tags: ["Housing", "English"],
    description:
      "월세 계약 전 확인할 내용, 전입 신고, 확정일자, 보증금 보호 절차를 정리합니다.",
  },
  {
    title: "Korean Language Class Finder",
    category: "Language & culture",
    location: "Seoul",
    tags: ["Education", "Free", "English"],
    description:
      "다문화센터와 구청에서 운영하는 무료 또는 저렴한 한국어 수업을 찾습니다.",
  },
];

const filters = ["Visa", "Healthcare", "Housing", "Education", "Free", "English"];

export function InfoExplorer() {
  const [activeFilters, setActiveFilters] = useState<string[]>(["Free"]);

  const filteredPrograms = useMemo(() => {
    if (activeFilters.length === 0) {
      return programs;
    }

    return programs.filter((program) =>
      activeFilters.every((filter) => program.tags.includes(filter)),
    );
  }, [activeFilters]);

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
          <p className="font-black">Personalized search</p>
          <span className="rounded-full bg-[#10c4a9]/15 px-3 py-1 text-xs font-black text-[#0b8d79]">
            Seoul
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
            <article className="rounded-3xl bg-white p-5 ring-1 ring-black/5" key={program.title}>
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-black text-[#0b8d79]">{program.category}</p>
                <p className="text-xs font-bold text-[#6b756f]">{program.location}</p>
              </div>
              <h3 className="mt-2 text-xl font-black">{program.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#52615b]">{program.description}</p>
            </article>
          ))}
          {filteredPrograms.length === 0 ? (
            <div className="rounded-3xl bg-white p-5 text-sm font-bold text-[#52615b] ring-1 ring-black/5">
              조건에 맞는 예시가 없어요. 필터를 줄이거나 Supabase 데이터가 추가되면
              더 많은 결과를 볼 수 있습니다.
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
