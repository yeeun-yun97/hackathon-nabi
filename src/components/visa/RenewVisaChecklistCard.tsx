"use client";

import { useLanguage } from "@/components/language-provider";
import type { UserProfile } from "@/lib/data";

type RenewVisaChecklistCardProps = {
  profile: UserProfile;
  currentVisaLabel: string;
};

export function RenewVisaChecklistCard({
  profile,
  currentVisaLabel,
}: RenewVisaChecklistCardProps) {
  const { t } = useLanguage();

  const renewalSteps = [
    t("visa.renewal.steps.0"),
    t("visa.renewal.steps.1"),
    t("visa.renewal.steps.2"),
  ];

  function formatDaysUntilExpiry(dateString: string) {
    if (!dateString) {
      return t("visa.clock.expiryNotSet");
    }

    const target = new Date(dateString).getTime();

    if (Number.isNaN(target)) {
      return t("visa.clock.checkExpiry");
    }

    const days = Math.max(0, Math.ceil((target - Date.now()) / (1000 * 60 * 60 * 24)));

    return t("visa.clock.daysLeft", { days });
  }

  return (
    <section className="overflow-hidden rounded-3xl bg-[#0f172a] text-white">
      <div className="grid gap-8 p-6 md:grid-cols-[1fr_280px] md:p-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#13C3A8]">
            {t("visa.renewal.eyebrow")}
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl font-bold tracking-[-0.03em] md:text-5xl">
            {t("visa.renewal.title", { current: currentVisaLabel })}
          </h1>
          <p className="mt-5 max-w-2xl leading-7 text-white/70">
            {t("visa.renewal.description")}
          </p>
          <ol className="mt-7 grid gap-3">
            {renewalSteps.map((step, index) => (
              <li
                className="flex gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4 text-sm font-medium"
                key={step}
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#2B4FA5] text-xs font-semibold text-white">
                  {index + 1}
                </span>
                <span className="leading-6 text-white/85">{step}</span>
              </li>
            ))}
          </ol>
        </div>
        <aside className="rounded-2xl bg-white p-6 text-[#17211f]">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#13C3A8]">
            {t("visa.clock.label")}
          </p>
          <p className="mt-3 text-4xl font-bold tracking-[-0.04em]">
            {formatDaysUntilExpiry(profile.visaExpiryDate)}
          </p>
          <dl className="mt-6 grid gap-4 text-sm">
            <div>
              <dt className="font-semibold">{t("visa.clock.expiry")}</dt>
              <dd className="mt-1 text-[#52615b]">
                {profile.visaExpiryDate || t("visa.clock.notProvided")}
              </dd>
            </div>
            <div>
              <dt className="font-semibold">{t("visa.clock.district")}</dt>
              <dd className="mt-1 text-[#52615b]">
                {profile.district || t("visa.clock.notSelected")}
              </dd>
            </div>
            <div>
              <dt className="font-semibold">{t("visa.clock.profileBasis")}</dt>
              <dd className="mt-1 text-[#52615b]">
                TOPIK {profile.topikLevel}, KIIP {profile.kiipStage}, {profile.degreeLevel}
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}
