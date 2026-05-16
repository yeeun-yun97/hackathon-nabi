"use client";

import { importLibrary, setOptions } from "@googlemaps/js-api-loader";
import { useEffect, useRef } from "react";

import { useLanguage } from "@/components/language-provider";
import type { Facility } from "@/lib/data";
import { pickLocalized } from "@/lib/i18n";

type FacilityMapGoogleJsProps = {
  facilities: Facility[];
  /** Called when the Maps JavaScript API fails to load or initialize. */
  onLoadFailed: () => void;
};

export function FacilityMapGoogleJs({ facilities, onLoadFailed }: FacilityMapGoogleJsProps) {
  const { locale } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim();
    if (!apiKey || !containerRef.current || facilities.length === 0) {
      onLoadFailed();
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        setOptions({ key: apiKey, v: "weekly" });
        const { Map } = await importLibrary("maps");
        if (cancelled || !containerRef.current) {
          return;
        }

        const center = facilities[0];
        const map = new Map(containerRef.current, {
          center: { lat: center.coords.lat, lng: center.coords.lng },
          zoom: 11,
          mapTypeControl: true,
          streetViewControl: false,
          fullscreenControl: true,
        });

        const bounds = new google.maps.LatLngBounds();
        facilities.forEach((facility) => {
          bounds.extend({ lat: facility.coords.lat, lng: facility.coords.lng });
          const marker = new google.maps.Marker({
            position: { lat: facility.coords.lat, lng: facility.coords.lng },
            map,
            title: pickLocalized(facility.name, locale),
          });
          marker.addListener("click", () => {
            const q = facility.mapQuery || facility.address;
            window.open(
              `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`,
              "_blank",
              "noopener,noreferrer",
            );
          });
        });

        map.fitBounds(bounds, 48);
      } catch {
        if (!cancelled) {
          onLoadFailed();
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [facilities, locale, onLoadFailed]);

  return (
    <div
      className="aspect-[16/9] min-h-[280px] w-full overflow-hidden rounded-2xl border border-black/[0.06] bg-[#e8eef6]"
      ref={containerRef}
    />
  );
}
