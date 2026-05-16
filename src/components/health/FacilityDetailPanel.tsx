"use client";

import Link from "next/link";

import { GoogleMapCard } from "@/components/google-map-card";
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

  return currentMinutes >= openHour * 60 + openMinute && currentMinutes < closeHour * 60 + closeMinute;
}

export function FacilityDetailPanel({ facility }: { facility: Facility }) {
  const { t, tLocalized } = useLanguage();
  const openNow = isOpenNow(facility);

  return (
    <section className="rounded-3xl border border-black/[0.06] bg-white p-8">
      <Link className="text-sm font-semibold text-[#2B4FA5] hover:underline" href="/health">
        {t("health.detail.back")}
      </Link>
      <div className="mt-8 flex flex-wrap gap-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
            openNow
              ? "bg-[#2B4FA5]/10 text-[#2B4FA5]"
              : "bg-[#0f172a]/[0.05] text-[#52615b]"
          }`}
        >
          <span
            className={`size-1.5 rounded-full ${openNow ? "bg-[#2B4FA5]" : "bg-[#52615b]/50"}`}
          />
          {openNow ? t("health.openNow") : t("health.closedNow")}
        </span>
        <span className="rounded-full bg-[#0f172a]/[0.05] px-3 py-1 text-xs font-semibold text-[#52615b]">
          {facility.hours.open}-{facility.hours.close}
        </span>
        <span className="rounded-full bg-[#0f172a]/[0.05] px-3 py-1 text-xs font-semibold text-[#52615b]">
          {facility.district}
        </span>
      </div>
      <h1 className="mt-5 text-5xl font-bold tracking-[-0.04em]">{tLocalized(facility.name)}</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-[#52615b]">{t("health.detail.intro")}</p>
      {facility.hours.note ? (
        <p className="mt-4 rounded-2xl border border-black/[0.06] bg-[#f6f7fb] p-4 text-sm font-medium leading-6 text-[#52615b]">
          {tLocalized(facility.hours.note)}
        </p>
      ) : null}

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <section className="rounded-2xl border border-black/[0.06] bg-[#f6f7fb] p-6">
          <h2 className="text-xl font-bold tracking-[-0.02em]">{t("health.detail.sports")}</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {facility.sports.map((sport) => (
              <span
                className="rounded-full bg-[#2B4FA5]/10 px-3 py-1 text-xs font-semibold text-[#2B4FA5]"
                key={sport}
              >
                {t(sportLabelKeys[sport])}
              </span>
            ))}
          </div>
        </section>
        <section className="rounded-2xl border border-black/[0.06] bg-[#f6f7fb] p-6">
          <h2 className="text-xl font-bold tracking-[-0.02em]">{t("health.detail.pricing")}</h2>
          <dl className="mt-4 grid gap-3 text-sm">
            {facility.pricing.map((price) => (
              <div className="flex items-start justify-between gap-4" key={price.tier.en}>
                <dt className="font-medium leading-6 text-[#52615b]">{tLocalized(price.tier)}</dt>
                <dd className="font-semibold text-[#17211f]">{formatWon(price.monthly)}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      <GoogleMapCard
        address={facility.address}
        mapQuery={facility.mapQuery}
        title={tLocalized(facility.name)}
      />
    </section>
  );
}
