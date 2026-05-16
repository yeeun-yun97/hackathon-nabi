"use client";

import Link from "next/link";

import { useLanguage } from "@/components/language-provider";
import type { UserProfile } from "@/lib/data";

type VisaProfileSummaryCardProps = {
  profile: UserProfile;
};

export function VisaProfileSummaryCard({ profile }: VisaProfileSummaryCardProps) {
  const { t, tOption } = useLanguage();
  const visaDeclared = profile.hasVisa === "yes";

  return (
    <section className="rounded-3xl border border-black/[0.06] bg-white p-6 md:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#13C3A8]">
        {t("visa.quickEdit.eyebrow")}
      </p>
      <h2 className="mt-2 text-2xl font-bold tracking-[-0.02em]">{t("visa.profileSummary.title")}</h2>
      <p className="mt-2 text-sm leading-6 text-[#52615b]">{t("visa.profileSummary.description")}</p>

      <dl className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-[#52615b]">
            {t("onboarding.field.currentVisaSubtype")}
          </dt>
          <dd className="mt-1 text-base font-semibold text-[#17211f]">
            {visaDeclared ? tOption("visaSubtype", profile.currentVisaSubtype) : t("visa.profileSummary.visaNotDeclared")}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-[#52615b]">
            {t("visa.profileSummary.issueLabel")}
          </dt>
          <dd className="mt-1 text-base font-semibold text-[#17211f]">
            {visaDeclared
              ? profile.visaIssueDate || t("common.notProvided")
              : t("visa.profileSummary.visaNotDeclared")}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-[#52615b]">
            {t("onboarding.field.visaExpiry")}
          </dt>
          <dd className="mt-1 text-base font-semibold text-[#17211f]">
            {visaDeclared
              ? profile.visaExpiryDate || t("common.notProvided")
              : t("visa.profileSummary.visaNotDeclared")}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-[#52615b]">
            {t("visa.profileSummary.targetLabel")}
          </dt>
          <dd className="mt-1 text-base font-semibold text-[#17211f]">
            {tOption("visaSubtype", profile.targetVisaSubtype)}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-[#52615b]">
            {t("onboarding.field.topikLevel")}
          </dt>
          <dd className="mt-1 text-base font-semibold text-[#17211f]">
            {tOption("topik", profile.topikLevel)}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-[#52615b]">
            {t("onboarding.field.kiipStage")}
          </dt>
          <dd className="mt-1 text-base font-semibold text-[#17211f]">
            {tOption("kiip", profile.kiipStage)}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-[#52615b]">
            {t("onboarding.field.degreeLevel")}
          </dt>
          <dd className="mt-1 text-base font-semibold text-[#17211f]">
            {tOption("degree", profile.degreeLevel)}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-[#52615b]">
            {t("onboarding.field.volunteerHoursLogged")}
          </dt>
          <dd className="mt-1 text-base font-semibold text-[#17211f]">
            {t("visa.profileSummary.volunteerLine", { hours: profile.volunteerHoursLogged ?? 0 })}
          </dd>
        </div>
      </dl>

      <Link
        className="mt-6 inline-flex rounded-full bg-[#13C3A8] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0fa08a]"
        href="/visa/edit"
      >
        {t("visa.edit.open")}
      </Link>
    </section>
  );
}
