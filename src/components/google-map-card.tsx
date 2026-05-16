"use client";

import { useLanguage } from "@/components/language-provider";

type GoogleMapCardProps = {
  title: string;
  address: string;
  mapQuery: string;
};

export function GoogleMapCard({ title, address, mapQuery }: GoogleMapCardProps) {
  const { t } = useLanguage();
  const encodedQuery = encodeURIComponent(mapQuery || address);
  const searchUrl = `https://www.google.com/maps/search/?api=1&query=${encodedQuery}`;

  return (
    <section className="mt-8 rounded-2xl border border-black/[0.06] bg-[#f6f7fb] p-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2B4FA5]">
          {t("googleMap.locationLabel")}
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-[-0.02em]">{title}</h2>
        <p className="mt-2 text-sm font-medium leading-6 text-[#52615b]">{address}</p>
      </div>
      <div className="mt-5 rounded-2xl border border-black/[0.06] bg-white p-5">
        <p className="text-sm leading-6 text-[#52615b]">{t("googleMap.note")}</p>
        <a
          className="mt-4 inline-flex rounded-full bg-[#2B4FA5] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#23408a]"
          href={searchUrl}
          rel="noreferrer"
          target="_blank"
        >
          {t("googleMap.openMaps")}
        </a>
      </div>
    </section>
  );
}
