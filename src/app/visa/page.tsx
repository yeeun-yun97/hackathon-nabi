"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { SiteHeader } from "@/components/site-header";
import { useLanguage } from "@/components/language-provider";
import { HorizonProgressArc } from "@/components/visa/HorizonProgressArc";
import { RenewVisaChecklistCard } from "@/components/visa/RenewVisaChecklistCard";
import { StrategyOptions } from "@/components/visa/StrategyOptions";
import { mockF27Track, type UserProfile } from "@/lib/data";
import { defaultProfile, readStoredProfile } from "@/lib/profile";

export default function VisaPage() {
  const { t, locale, tOption } = useLanguage();
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);

  useEffect(() => {
    queueMicrotask(() => {
      setProfile(readStoredProfile());
    });
  }, []);

  const currentVisaLabel = tOption("visaSubtype", profile.currentVisaSubtype);
  const targetVisaLabel = tOption("visaSubtype", mockF27Track.targetVisa);

  return (
    <main className="min-h-screen bg-[#f6f7fb] text-[#17211f]">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-6 pb-20 pt-10">
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
          <RenewVisaChecklistCard currentVisaLabel={currentVisaLabel} profile={profile} />

          <section className="rounded-3xl border border-black/[0.06] bg-white p-6 md:p-8">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#13C3A8]">
                  {t("visa.horizonTrack")}
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em]">
                  {t("visa.fromTo", { current: currentVisaLabel, target: targetVisaLabel })}
                </h2>
                <p className="mt-3 max-w-2xl leading-7 text-[#52615b]">
                  {t("visa.horizonDescription")}
                </p>
              </div>
              <div className="rounded-full border border-[#13C3A8]/30 bg-[#13C3A8]/10 px-4 py-2 text-sm font-semibold text-[#0E9D86]">
                {t("visa.daysUntilCheckpoint", { days: mockF27Track.expiresInDays })}
              </div>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[320px_1fr]">
              <HorizonProgressArc
                currentPoints={mockF27Track.currentPoints}
                targetPoints={mockF27Track.targetPoints}
                unlockEtaDays={mockF27Track.unlockEtaDays}
              />
              <div>
                <div className="mb-4 grid gap-3 sm:grid-cols-3">
                  {mockF27Track.earned.map((item) => (
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
                <StrategyOptions locale={locale} strategies={mockF27Track.strategies} />
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
