"use client";

import Link from "next/link";

import { GoogleMapCard } from "@/components/google-map-card";
import { useLanguage } from "@/components/language-provider";
import type { Facility, FacilitySport } from "@/lib/data";

const sportLabels: Record<FacilitySport, string> = {
  swimming: "Lap swimming",
  weights: "General weight lifting",
  yoga: "Yoga",
  fitness: "Indoor fitness",
  court: "Court sports",
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
  const { tLocalized } = useLanguage();
  const openNow = isOpenNow(facility);

  return (
    <section className="rounded-[2.5rem] bg-white p-8 shadow-sm ring-1 ring-black/5">
      <Link className="text-sm font-black text-[#0b8d79]" href="/health">
        Back to Health & Recreation
      </Link>
      <div className="mt-8 flex flex-wrap gap-2">
        <span
          className={`rounded-full px-3 py-1 text-xs font-black ${
            openNow ? "bg-[#10c4a9]/15 text-[#0b8d79]" : "bg-[#17211f]/10 text-[#52615b]"
          }`}
        >
          {openNow ? "Open now" : "Closed now"}
        </span>
        <span className="rounded-full bg-[#ed9805]/15 px-3 py-1 text-xs font-black text-[#b66f00]">
          {facility.hours.open}-{facility.hours.close}
        </span>
        <span className="rounded-full bg-[#17211f]/10 px-3 py-1 text-xs font-black text-[#52615b]">
          {facility.district}
        </span>
      </div>
      <h1 className="mt-5 text-5xl font-black tracking-[-0.05em]">{tLocalized(facility.name)}</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-[#52615b]">
        Public sports center options for lap swimming, general weight lifting, and indoor fitness
        with resident pricing around ₩40,000-₩50,000 per month.
      </p>
      {facility.hours.note ? (
        <p className="mt-4 rounded-3xl bg-[#fffaf0] p-4 text-sm font-bold leading-6 text-[#52615b]">
          {tLocalized(facility.hours.note)}
        </p>
      ) : null}

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <section className="rounded-3xl bg-[#fffaf0] p-6">
          <h2 className="text-xl font-black">Sports available</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {facility.sports.map((sport) => (
              <span
                className="rounded-full bg-[#10c4a9]/10 px-3 py-1 text-xs font-black text-[#0b8d79]"
                key={sport}
              >
                {sportLabels[sport]}
              </span>
            ))}
          </div>
        </section>
        <section className="rounded-3xl bg-[#fffaf0] p-6">
          <h2 className="text-xl font-black">Monthly pricing</h2>
          <dl className="mt-4 grid gap-3 text-sm">
            {facility.pricing.map((price) => (
              <div className="flex items-start justify-between gap-4" key={price.tier.en}>
                <dt className="font-bold leading-6 text-[#52615b]">{tLocalized(price.tier)}</dt>
                <dd className="font-black text-[#17211f]">{formatWon(price.monthly)}</dd>
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
