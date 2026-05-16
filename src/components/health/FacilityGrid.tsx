"use client";

import Link from "next/link";

import { useLanguage } from "@/components/language-provider";
import type { Facility, FacilitySport } from "@/lib/data";
import type { TranslationKey } from "@/lib/i18n";

const sportLabelKeys: Record<FacilitySport, TranslationKey> = {
  swimming: "health.sport.swimming",
  weights: "health.sport.weights",
  yoga: "health.sport.yoga",
  fitness: "health.sport.fitness",
  court: "health.sport.court",
};

function formatWon(amount: number) {
  return new Intl.NumberFormat("ko-KR", {
    currency: "KRW",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(amount);
}

function isOpenNow(facility: Facility, now = new Date()) {
  const [openHour, openMinute] = facility.hours.open.split(":").map(Number);
  const [closeHour, closeMinute] = facility.hours.close.split(":").map(Number);
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const openMinutes = openHour * 60 + openMinute;
  const closeMinutes = closeHour * 60 + closeMinute;

  return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
}

export function FacilityGrid({ facilities }: { facilities: Facility[] }) {
  const { t, tLocalized } = useLanguage();

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {facilities.map((facility) => {
        const openNow = isOpenNow(facility);
        const lowestPrice = Math.min(...facility.pricing.map((price) => price.monthly));

        return (
          <Link
            className="group rounded-3xl border border-black/[0.06] bg-white p-6 transition hover:-translate-y-0.5 hover:border-[#2B4FA5]/30 hover:shadow-lg hover:shadow-[#2B4FA5]/5"
            href={`/health/${facility.slug}`}
            key={facility.id}
          >
            <div className="flex items-center justify-between gap-3">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                  openNow
                    ? "bg-[#2B4FA5]/10 text-[#2B4FA5]"
                    : "bg-[#0f172a]/[0.05] text-[#52615b]"
                }`}
              >
                <span
                  className={`size-1.5 rounded-full ${
                    openNow ? "bg-[#2B4FA5]" : "bg-[#52615b]/50"
                  }`}
                />
                {openNow ? t("health.openNow") : t("health.closed")}
              </span>
              <span className="rounded-full bg-[#0f172a]/[0.05] px-3 py-1 text-xs font-semibold text-[#52615b]">
                {facility.district}
              </span>
            </div>
            <h2 className="mt-5 text-2xl font-bold tracking-[-0.02em]">
              {tLocalized(facility.name)}
            </h2>
            <p className="mt-2 text-sm font-medium leading-6 text-[#52615b]">{facility.address}</p>
            <div className="mt-5 rounded-2xl border border-black/[0.06] bg-[#f6f7fb] p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#2B4FA5]">
                {t("health.monthlyRate")}
              </p>
              <p className="mt-2 text-2xl font-bold tracking-[-0.02em]">
                {formatWon(lowestPrice)}
              </p>
              <p className="mt-1 text-xs font-medium text-[#52615b]">
                {t("health.residentDiscount")}
              </p>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {facility.sports.map((sport) => (
                <span
                  className="rounded-full bg-[#2B4FA5]/8 px-3 py-1 text-xs font-semibold text-[#2B4FA5]"
                  key={sport}
                >
                  {t(sportLabelKeys[sport])}
                </span>
              ))}
            </div>
          </Link>
        );
      })}
    </section>
  );
}
