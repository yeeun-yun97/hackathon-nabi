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
  const { tLocalized } = useLanguage();
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
    <section className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-black text-[#ed9805]">Closest to your district</p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.03em]">
            Sorted from {profileDistrict(profile)}
          </h2>
        </div>
        <Link className="text-sm font-black text-[#0b8d79]" href="/onboarding">
          Update district
        </Link>
      </div>
      <div className="mt-5 grid gap-3">
        {sortedFacilities.map(({ distance, facility }, index) => (
          <Link
            className="flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-[#fffaf0] p-4 transition hover:bg-[#10c4a9]/10"
            href={`/health/${facility.slug}`}
            key={facility.id}
          >
            <div>
              <p className="text-xs font-black text-[#ed9805]">#{index + 1}</p>
              <h3 className="mt-1 text-lg font-black">{tLocalized(facility.name)}</h3>
              <p className="mt-1 text-sm font-bold text-[#52615b]">
                {facility.district} · {facility.hours.open}-{facility.hours.close}
              </p>
            </div>
            <p className="rounded-full bg-white px-4 py-2 text-sm font-black text-[#17211f] ring-1 ring-black/5">
              {distance.toFixed(1)} km
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
