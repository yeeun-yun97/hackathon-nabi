"use client";

import { useCallback, useMemo, useState } from "react";

import { useLanguage } from "@/components/language-provider";
import { FacilityMapGoogleJs } from "@/components/health/FacilityMapGoogleJs";
import type { Facility } from "@/lib/data";

function facilitiesBoundingBox(facilities: Facility[]) {
  const lats = facilities.map((f) => f.coords.lat);
  const lngs = facilities.map((f) => f.coords.lng);
  const pad = 0.035;
  return {
    minLat: Math.min(...lats) - pad,
    maxLat: Math.max(...lats) + pad,
    minLng: Math.min(...lngs) - pad,
    maxLng: Math.max(...lngs) + pad,
  };
}

function buildGoogleStaticMapUrl(facilities: Facility[], apiKey: string) {
  const params = facilities
    .map((f) => `markers=color:0x2B4FA5%7C${f.coords.lat}%2C${f.coords.lng}`)
    .join("&");
  return `https://maps.googleapis.com/maps/api/staticmap?size=640x360&scale=2&maptype=roadmap&${params}&key=${encodeURIComponent(apiKey)}`;
}

/** 0 = Maps JavaScript API, 1 = Static Map image, 2 = OpenStreetMap iframe */
type MapTier = 0 | 1 | 2;

export function FacilityMap({ facilities }: { facilities: Facility[] }) {
  const { t, tLocalized } = useLanguage();
  const trimmedKey = (process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "").trim();
  const [mapTier, setMapTier] = useState<MapTier>(() => (trimmedKey ? 0 : 2));
  const [staticImageFailed, setStaticImageFailed] = useState(false);

  const { embedUrl, staticMapUrl } = useMemo(() => {
    const bbox = facilitiesBoundingBox(facilities);
    const osm = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox.minLng}%2C${bbox.minLat}%2C${bbox.maxLng}%2C${bbox.maxLat}&layer=mapnik`;
    return {
      embedUrl: osm,
      staticMapUrl: trimmedKey ? buildGoogleStaticMapUrl(facilities, trimmedKey) : null,
    };
  }, [facilities, trimmedKey]);

  const onJsLoadFailed = useCallback(() => {
    setMapTier(1);
  }, []);

  const onStaticImageError = useCallback(() => {
    setStaticImageFailed(true);
    setMapTier(2);
  }, []);

  const showStaticImage = mapTier === 1 && Boolean(staticMapUrl) && !staticImageFailed;

  return (
    <section aria-label={t("health.map.aria")} className="rounded-3xl border border-black/[0.06] bg-white p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2B4FA5]">{t("health.map.eyebrow")}</p>
      <h2 className="mt-2 text-2xl font-bold tracking-[-0.02em]">{t("health.map.title")}</h2>
      <p className="mt-2 text-sm leading-6 text-[#52615b]">{t("health.map.subtitle")}</p>

      {mapTier === 1 ? (
        <p className="mt-3 rounded-2xl border border-amber-200/90 bg-amber-50/95 p-4 text-sm leading-6 text-amber-950">
          {t("health.map.jsFallbackNote")}
        </p>
      ) : null}
      {staticImageFailed && mapTier === 2 ? (
        <p className="mt-3 rounded-2xl border border-amber-200/90 bg-amber-50/95 p-4 text-sm leading-6 text-amber-950">
          {t("health.map.staticMapFallbackNote")}
        </p>
      ) : null}

      <div className="mt-5 overflow-hidden rounded-2xl border border-black/[0.06] bg-[#f6f7fb]">
        {mapTier === 0 && trimmedKey ? (
          <FacilityMapGoogleJs facilities={facilities} onLoadFailed={onJsLoadFailed} />
        ) : showStaticImage ? (
          // eslint-disable-next-line @next/next/no-img-element -- Static Maps returns binary; onError needed for API/key failures
          <img
            alt={t("health.map.alt")}
            className="h-auto w-full object-cover"
            height={360}
            src={staticMapUrl!}
            width={640}
            onError={onStaticImageError}
          />
        ) : (
          <iframe
            className="aspect-[16/9] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={embedUrl}
            title={t("health.map.iframeTitle")}
          />
        )}
      </div>

      <ul className="mt-4 flex flex-wrap gap-2">
        {facilities.map((facility, index) => (
          <li key={facility.id}>
            <a
              className="inline-flex rounded-full border border-black/[0.08] bg-[#f6f7fb] px-3 py-1 text-xs font-semibold text-[#2B4FA5] hover:border-[#2B4FA5]/40"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(facility.mapQuery || facility.address)}`}
              rel="noreferrer"
              target="_blank"
            >
              #{index + 1} · {tLocalized(facility.name)}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
