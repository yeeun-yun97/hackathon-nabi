"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { useLanguage } from "@/components/language-provider";
import {
  districtCoordinates,
  mockFacilities,
  type SeoulDistrict,
  type UserProfile,
} from "@/lib/data";
import { defaultProfile, readStoredProfile } from "@/lib/profile";

function distanceKm(from: { lat: number; lng: number }, to: { lat: number; lng: number }) {
  const earthRadiusKm = 6371;
  const latDelta = ((to.lat - from.lat) * Math.PI) / 180;
  const lngDelta = ((to.lng - from.lng) * Math.PI) / 180;
  const fromLat = (from.lat * Math.PI) / 180;
  const toLat = (to.lat * Math.PI) / 180;

  const haversine =
    Math.sin(latDelta / 2) ** 2 +
    Math.cos(fromLat) * Math.cos(toLat) * Math.sin(lngDelta / 2) ** 2;

  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
}

function profileDistrict(profile: UserProfile): SeoulDistrict {
  return profile.district || "기타";
}

export function FacilityListByDistance() {
  const { t, tLocalized } = useLanguage();
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);

  useEffect(() => {
    queueMicrotask(() => {
      setProfile(readStoredProfile());
    });
  }, []);

  const sortedFacilities = useMemo(() => {
    const origin = districtCoordinates[profileDistrict(profile)];

    return mockFacilities
      .map((facility) => ({
        distance: distanceKm(origin, facility.coords),
        facility,
      }))
      .sort((a, b) => a.distance - b.distance);
  }, [profile]);

  return (
    <section className="rounded-3xl border border-black/[0.06] bg-white p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2B4FA5]">
            {t("health.list.eyebrow")}
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-[-0.02em]">
            {t("health.list.sortedFrom", { district: profileDistrict(profile) })}
          </h2>
        </div>
        <Link
          className="text-sm font-semibold text-[#2B4FA5] hover:underline"
          href="/onboarding"
        >
          {t("health.list.updateDistrict")}
        </Link>
      </div>
      <div className="mt-5 grid gap-2.5">
        {sortedFacilities.map(({ distance, facility }, index) => (
          <Link
            className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-black/[0.06] bg-[#f6f7fb] p-4 transition hover:border-[#2B4FA5]/30"
            href={`/health/${facility.slug}`}
            key={facility.id}
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2B4FA5]">
                #{index + 1}
              </p>
              <h3 className="mt-1 text-base font-bold tracking-[-0.01em]">
                {tLocalized(facility.name)}
              </h3>
              <p className="mt-1 text-sm font-medium text-[#52615b]">
                {facility.district} · {facility.hours.open}-{facility.hours.close}
              </p>
            </div>
            <p className="rounded-full border border-black/[0.06] bg-white px-3.5 py-1.5 text-sm font-semibold text-[#17211f]">
              {t("health.list.distance", { km: distance.toFixed(1) })}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
