"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { GoogleMapCard } from "@/components/google-map-card";
import { KoreanTranslationShield } from "@/components/health/KoreanTranslationShield";
import { useLanguage } from "@/components/language-provider";
import type { Facility, FacilitySport } from "@/lib/data";
import type { TranslationKey } from "@/lib/i18n";
import { readStoredProfile, writeStoredProfile } from "@/lib/profile";

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
  const [shieldOpen, setShieldOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      const p = readStoredProfile();
      setIsSaved(p.savedFacilities.includes(facility.slug));
    });
  }, [facility.slug]);

  function toggleSave() {
    const p = readStoredProfile();
    const has = p.savedFacilities.includes(facility.slug);
    const savedFacilities = has
      ? p.savedFacilities.filter((s) => s !== facility.slug)
      : [...p.savedFacilities, facility.slug];
    writeStoredProfile({ ...p, savedFacilities });
    setIsSaved(!has);
  }

  return (
    <section className="rounded-3xl border border-black/[0.06] bg-white p-8">
      <Link className="text-sm font-semibold text-[#2B4FA5] hover:underline" href="/discover?tab=health">
        {t("health.detail.back")}
      </Link>

      <div className="relative mt-8 aspect-[21/9] w-full overflow-hidden rounded-2xl border border-black/[0.06] bg-[#f6f7fb]">
        <Image
          alt={tLocalized(facility.name)}
          className="object-cover"
          fill
          priority
          sizes="(min-width: 1024px) 896px, 100vw"
          src={facility.image}
        />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          className="rounded-full bg-[#2B4FA5] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#23408a]"
          onClick={() => setShieldOpen(true)}
          type="button"
        >
          {t("health.detail.showKoreanReception")}
        </button>
        <button
          className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
            isSaved
              ? "border-[#13C3A8]/40 bg-[#13C3A8]/10 text-[#0E9D86]"
              : "border-black/10 bg-white text-[#17211f] hover:border-[#2B4FA5]/40"
          }`}
          onClick={toggleSave}
          type="button"
        >
          {isSaved ? t("health.detail.savedFacility") : t("health.detail.saveFacility")}
        </button>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
            openNow ? "bg-[#2B4FA5]/10 text-[#2B4FA5]" : "bg-[#0f172a]/[0.05] text-[#52615b]"
          }`}
        >
          <span
            className={`size-1.5 rounded-full ${openNow ? "bg-[#2B4FA5]" : "bg-[#52615b]/50"}`}
          />
          {openNow ? t("health.openNow") : t("health.closedNow")}
        </span>
        <span className="rounded-full bg-[#13C3A8]/12 px-3 py-1 text-xs font-semibold text-[#0E9D86]">
          {t(`health.facility.scale.${facility.scale}`)}
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

      {facility.indoorShoeRule ? (
        <div className="mt-6 flex gap-4 rounded-2xl border border-amber-200/80 bg-amber-50/90 p-5">
          <span aria-hidden className="text-2xl leading-none">
            👟
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-900/80">
              {t("health.indoorShoe.eyebrow")}
            </p>
            <p className="mt-2 text-sm font-semibold leading-6 text-amber-950">{t("health.indoorShoe.title")}</p>
            <p className="mt-2 text-sm leading-6 text-amber-950/85">{t("health.indoorShoe.body")}</p>
          </div>
        </div>
      ) : null}

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

      {shieldOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f172a]/60 p-6 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl shadow-black/20">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2B4FA5]">
                  {t("health.firstVisit.modalEyebrow")}
                </p>
                <h3 className="mt-2 text-2xl font-bold tracking-[-0.02em]">
                  {t("health.firstVisit.modalTitle")}
                </h3>
              </div>
              <button
                className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-[#17211f] transition hover:border-[#2B4FA5]/40"
                onClick={() => setShieldOpen(false)}
                type="button"
              >
                {t("health.firstVisit.close")}
              </button>
            </div>
            <div className="mt-5">
              <KoreanTranslationShield text={facility.koreanReceptionPrompt} />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
