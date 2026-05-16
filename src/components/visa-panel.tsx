"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { useLanguage } from "@/components/language-provider";
import { HorizonProgressArc } from "@/components/visa/HorizonProgressArc";
import { RenewVisaChecklistCard } from "@/components/visa/RenewVisaChecklistCard";
import { StrategyOptions } from "@/components/visa/StrategyOptions";
import { VisaProfileSummaryCard } from "@/components/visa/visa-profile-summary-card";
import type { UserProfile } from "@/lib/data";
import { buildVisaHorizonFromProfile } from "@/lib/visa-horizon-from-profile";
import { defaultProfile, readStoredProfile } from "@/lib/profile";

export function VisaPanel() {
  const { t, locale, tOption } = useLanguage();
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);

  useEffect(() => {
    queueMicrotask(() => {
      setProfile(readStoredProfile());
    });
  }, []);

  const horizon = buildVisaHorizonFromProfile(profile);
  const currentVisaLabel = tOption("visaSubtype", profile.currentVisaSubtype);
  const targetVisaLabel = tOption("visaSubtype", horizon.targetVisa);
  const pointsGap = Math.max(0, horizon.targetPoints - horizon.currentPoints);
  const hasVisa = profile.hasVisa === "yes";
  const horizonAtCeiling = hasVisa && horizon.currentVisa === horizon.targetVisa;

  return (
    <div>
      <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#13C3A8]">
            {t("visa.eyebrow")}
          </p>
          <h1 className="mt-3 max-w-3xl text-5xl font-bold tracking-[-0.04em]">
            {t("visa.title")}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#52615b]">
            {t("visa.subtitle")}
          </p>
        </div>
        <Link
          className="w-fit rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm font-semibold text-[#17211f] transition hover:border-[#2B4FA5]/40 hover:text-[#2B4FA5]"
          href="/visa/notification"
        >
          {t("visa.replayNotification")}
        </Link>
      </div>

      <div className="grid gap-6">
        <VisaProfileSummaryCard profile={profile} />
        {profile.hasVisa === "yes" ? (
          <RenewVisaChecklistCard currentVisaLabel={currentVisaLabel} profile={profile} />
        ) : (
          <section className="rounded-3xl border border-[#13C3A8]/30 bg-[#13C3A8]/[0.06] p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0E9D86]">
              {t("visa.noVisa.eyebrow")}
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-[-0.02em]">
              {t("visa.noVisa.title")}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#52615b]">
              {t("visa.noVisa.description")}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                className="rounded-full bg-[#13C3A8] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0fa08a]"
                href="/visa/edit"
              >
                {t("visa.noVisa.editCta")}
              </Link>
              <Link
                className="rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm font-semibold text-[#17211f] transition hover:border-[#13C3A8]/40 hover:text-[#0E9D86]"
                href="/discover"
              >
                {t("visa.noVisa.discoverCta")}
              </Link>
            </div>
          </section>
        )}

        <section className="rounded-3xl border border-black/[0.06] bg-white p-6 md:p-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#13C3A8]">
                {t("visa.horizonTrack")}
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em]">
                {horizonAtCeiling
                  ? t("visa.horizonAtCeiling", { current: currentVisaLabel })
                  : hasVisa
                    ? t("visa.fromTo", { current: currentVisaLabel, target: targetVisaLabel })
                    : t("visa.horizonGoalOnly", { target: targetVisaLabel })}
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-[#52615b]">
                {horizonAtCeiling
                  ? t("visa.horizonAtCeilingDescription")
                  : t("visa.horizonDescription")}
              </p>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#52615b]">
                {t("visa.horizonDisclaimer")}
              </p>
            </div>
            <div className="rounded-full border border-[#13C3A8]/30 bg-[#13C3A8]/10 px-4 py-2 text-sm font-semibold text-[#0E9D86]">
              {t("visa.daysUntilCheckpoint", { days: horizon.expiresInDays })}
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[320px_1fr]">
            <HorizonProgressArc
              currentPoints={horizon.currentPoints}
              targetPoints={horizon.targetPoints}
              unlockEtaDays={horizon.unlockEtaDays}
            />
            <div>
              <div className="mb-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {horizon.earned.map((item) => (
                  <div
                    className="rounded-2xl border border-black/[0.06] bg-[#f6f7fb] p-4"
                    key={item.id}
                  >
                    <p className="text-2xl font-bold tracking-[-0.02em] text-[#2B4FA5]">
                      +{item.points}
                    </p>
                    <p className="mt-2 text-sm font-medium leading-5 text-[#52615b]">
                      {item.label[locale]}
                    </p>
                  </div>
                ))}
              </div>
              {pointsGap > 0 ? (
                <p className="mb-4 text-base font-bold leading-7 text-[#17211f]">
                  {t("visa.bridgeHeadline", {
                    points: pointsGap,
                    days: horizon.unlockEtaDays,
                  })}
                </p>
              ) : (
                <p className="mb-4 text-base font-bold leading-7 text-[#17211f]">
                  {t("visa.bridgeHeadline.complete")}
                </p>
              )}
              <StrategyOptions locale={locale} strategies={horizon.strategies} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
