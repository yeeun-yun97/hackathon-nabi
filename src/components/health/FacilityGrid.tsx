"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

import { useLanguage } from "@/components/language-provider";
import type { Facility, FacilityScale, FacilitySport } from "@/lib/data";
import type { TranslationKey } from "@/lib/i18n";

const sportLabelKeys: Record<FacilitySport, TranslationKey> = {
  swimming: "health.sport.swimming",
  weights: "health.sport.weights",
  yoga: "health.sport.yoga",
  fitness: "health.sport.fitness",
  court: "health.sport.court",
};

const SCALE_SORT: Record<FacilityScale, number> = { municipal: 0, boutique: 1 };

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

  const sortedFacilities = useMemo(
    () =>
      [...facilities].sort((a, b) => {
        const byScale = SCALE_SORT[a.scale] - SCALE_SORT[b.scale];
        if (byScale !== 0) {
          return byScale;
        }
        return a.slug.localeCompare(b.slug);
      }),
    [facilities],
  );

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {sortedFacilities.map((facility) => {
        const openNow = isOpenNow(facility);
        const lowestPrice = Math.min(...facility.pricing.map((price) => price.monthly));

        return (
          <Link
            className="group flex flex-col overflow-hidden rounded-3xl border border-black/[0.06] bg-white transition hover:-translate-y-0.5 hover:border-[#2B4FA5]/30 hover:shadow-lg hover:shadow-[#2B4FA5]/5"
            href={`/health/${facility.slug}`}
            key={facility.id}
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#f6f7fb]">
              <Image
                alt={tLocalized(facility.name)}
                className="object-cover transition duration-500 ease-out group-hover:scale-105"
                fill
                sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                src={facility.image}
              />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
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
                <div className="flex flex-wrap justify-end gap-2">
                  <span className="rounded-full bg-[#13C3A8]/12 px-3 py-1 text-xs font-semibold text-[#0E9D86]">
                    {t(`health.facility.scale.${facility.scale}`)}
                  </span>
                  <span className="rounded-full bg-[#0f172a]/[0.05] px-3 py-1 text-xs font-semibold text-[#52615b]">
                    {facility.district}
                  </span>
                </div>
              </div>
              <h2 className="mt-5 text-2xl font-bold tracking-[-0.02em]">{tLocalized(facility.name)}</h2>
              <p className="mt-2 text-sm font-medium leading-6 text-[#52615b]">{facility.address}</p>
              <div className="mt-5 rounded-2xl border border-black/[0.06] bg-[#f6f7fb] p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#2B4FA5]">
                  {t("health.monthlyRate")}
                </p>
                <p className="mt-2 text-2xl font-bold tracking-[-0.02em]">{formatWon(lowestPrice)}</p>
                <p className="mt-1 text-xs font-medium text-[#52615b]">{t("health.residentDiscount")}</p>
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
            </div>
          </Link>
        );
      })}
    </section>
  );
}
