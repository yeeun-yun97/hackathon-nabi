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
    <section className="mt-8 rounded-3xl bg-[#fffaf0] p-6 ring-1 ring-black/5">
      <div className="p-6">
        <p className="text-sm font-black text-[#ed9805]">{t("googleMap.locationLabel")}</p>
        <h2 className="mt-2 text-2xl font-black tracking-[-0.03em]">{title}</h2>
        <p className="mt-2 text-sm font-bold leading-6 text-[#52615b]">{address}</p>
      </div>
      <div className="rounded-3xl bg-white p-5 ring-1 ring-black/5">
        <p className="text-sm leading-6 text-[#52615b]">{t("googleMap.note")}</p>
        <a
          className="mt-4 inline-flex rounded-full bg-[#10c4a9] px-5 py-3 text-sm font-black text-white"
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
