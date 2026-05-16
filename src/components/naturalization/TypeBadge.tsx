"use client";

import { useLanguage } from "@/components/language-provider";

import type { NaturalizationLikelihood } from "./types";

type TypeBadgeProps = {
  likelihood: NaturalizationLikelihood;
};

const styles: Record<NaturalizationLikelihood, string> = {
  green: "bg-[#13C3A8]/10 text-[#0E9D86]",
  yellow: "bg-[#FEF3C7] text-[#B45309]",
  red: "bg-[#FEE2E2] text-[#B91C1C]",
};

const dotStyles: Record<NaturalizationLikelihood, string> = {
  green: "bg-[#13C3A8]",
  yellow: "bg-[#F59E0B]",
  red: "bg-[#EF4444]",
};

export function TypeBadge({ likelihood }: TypeBadgeProps) {
  const { t } = useLanguage();

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${styles[likelihood]}`}
    >
      <span
        aria-hidden="true"
        className={`size-2 rounded-full ${dotStyles[likelihood]}`}
      />
      {t(`naturalization.badge.${likelihood}` as const)}
    </span>
  );
}
