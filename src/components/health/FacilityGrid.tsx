"use client";

import Link from "next/link";

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
  const openMinutes = openHour * 60 + openMinute;
  const closeMinutes = closeHour * 60 + closeMinute;

  return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
}

export function FacilityGrid({ facilities }: { facilities: Facility[] }) {
  const { tLocalized } = useLanguage();

  return (
    <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {facilities.map((facility) => {
        const openNow = isOpenNow(facility);
        const lowestPrice = Math.min(...facility.pricing.map((price) => price.monthly));

        return (
          <Link
            className="group rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-100"
            href={`/health/${facility.slug}`}
            key={facility.id}
          >
            <div className="flex items-center justify-between gap-3">
              <span
                className={`rounded-full px-3 py-1 text-xs font-black ${
                  openNow ? "bg-[#10c4a9]/15 text-[#0b8d79]" : "bg-[#17211f]/10 text-[#52615b]"
                }`}
              >
                {openNow ? "Open now" : "Closed now"}
              </span>
              <span className="rounded-full bg-[#ed9805]/15 px-3 py-1 text-xs font-black text-[#b66f00]">
                {facility.district}
              </span>
            </div>
            <h2 className="mt-5 text-2xl font-black tracking-[-0.03em]">
              {tLocalized(facility.name)}
            </h2>
            <p className="mt-2 text-sm font-bold leading-6 text-[#52615b]">{facility.address}</p>
            <div className="mt-5 rounded-3xl bg-[#fffaf0] p-4">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ed9805]">
                Monthly public rate
              </p>
              <p className="mt-2 text-2xl font-black">{formatWon(lowestPrice)}</p>
              <p className="mt-1 text-xs font-bold text-[#52615b]">
                Resident discount: ARC required
              </p>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {facility.sports.map((sport) => (
                <span
                  className="rounded-full bg-[#10c4a9]/10 px-3 py-1 text-xs font-black text-[#0b8d79]"
                  key={sport}
                >
                  {sportLabels[sport]}
                </span>
              ))}
            </div>
          </Link>
        );
      })}
    </section>
  );
}
