"use client";

import { useLanguage } from "@/components/language-provider";

type HorizonProgressArcProps = {
  currentPoints: number;
  targetPoints: number;
  unlockEtaDays: number;
};

export function HorizonProgressArc({
  currentPoints,
  targetPoints,
  unlockEtaDays,
}: HorizonProgressArcProps) {
  const { t } = useLanguage();
  const progress = Math.min(currentPoints / targetPoints, 1);
  const radius = 78;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);

  return (
    <div className="rounded-3xl border border-black/[0.06] bg-[#f6f7fb] p-6">
      <div className="relative mx-auto size-56">
        <svg className="size-56 -rotate-90" viewBox="0 0 192 192">
          <circle
            className="text-[#0f172a]/[0.08]"
            cx="96"
            cy="96"
            fill="none"
            r={radius}
            stroke="currentColor"
            strokeWidth="14"
          />
          <circle
            className="text-[#13C3A8]"
            cx="96"
            cy="96"
            fill="none"
            r={radius}
            stroke="currentColor"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            strokeWidth="14"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="text-5xl font-bold tracking-[-0.05em]">{currentPoints}</p>
          <p className="mt-1 text-sm font-semibold text-[#52615b]">
            {t("visa.ofPoints", { target: targetPoints })}
          </p>
        </div>
      </div>
      <div className="mt-5 rounded-2xl border border-black/[0.06] bg-white p-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2B4FA5]">
          {t("visa.estimatedUnlock")}
        </p>
        <p className="mt-1 text-2xl font-bold tracking-[-0.02em]">
          {t("visa.daysShort", { days: unlockEtaDays })}
        </p>
      </div>
    </div>
  );
}
