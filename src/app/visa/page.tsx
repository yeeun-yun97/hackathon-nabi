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
  const { locale, tOption } = useLanguage();
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);

  useEffect(() => {
    queueMicrotask(() => {
      setProfile(readStoredProfile());
    });
  }, []);

  const currentVisaLabel = tOption("visaSubtype", profile.currentVisaSubtype);
  const targetVisaLabel = tOption("visaSubtype", mockF27Track.targetVisa);

  return (
    <main className="min-h-screen bg-[#fffaf0] text-[#17211f]">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-6 pb-20 pt-10">
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="font-black text-[#ed9805]">Visa Horizon</p>
            <h1 className="mt-3 max-w-3xl text-5xl font-black tracking-[-0.05em]">
              Renew today, plan your next status.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#52615b]">
              A dual-track view for immediate renewal prep and long-term F-2-7 readiness.
            </p>
          </div>
          <Link className="w-fit rounded-full bg-[#17211f] px-5 py-3 text-sm font-black text-white" href="/visa/notification">
            Replay notification
          </Link>
        </div>

        <div className="grid gap-8">
          <RenewVisaChecklistCard currentVisaLabel={currentVisaLabel} profile={profile} />

          <section className="rounded-[2.5rem] bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-8">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="font-black text-[#10c4a9]">Horizon track</p>
                <h2 className="mt-3 text-3xl font-black tracking-[-0.04em]">
                  {currentVisaLabel} to {targetVisaLabel}
                </h2>
                <p className="mt-3 max-w-2xl leading-7 text-[#52615b]">
                  Your mock F-2-7 score is close. These options show practical ways to close the
                  remaining point gap.
                </p>
              </div>
              <div className="rounded-2xl bg-[#ed9805]/15 px-4 py-3 text-sm font-black text-[#b66f00]">
                {mockF27Track.expiresInDays} days until renewal checkpoint
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
                    <div className="rounded-2xl bg-[#fffaf0] p-4 ring-1 ring-black/5" key={item.id}>
                      <p className="text-2xl font-black text-[#10c4a9]">+{item.points}</p>
                      <p className="mt-2 text-sm font-bold leading-5 text-[#52615b]">
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
