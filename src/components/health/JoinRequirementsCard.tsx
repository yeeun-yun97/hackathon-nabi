"use client";

import { useLanguage } from "@/components/language-provider";
import type { Facility } from "@/lib/data";
import type { TranslationKey } from "@/lib/i18n";

const paymentLabelKeys: Record<Facility["paymentAccepted"][number], TranslationKey> = {
  cash: "health.payment.cash",
  "foreign-card": "health.payment.foreign",
  "local-card": "health.payment.local",
};

export function JoinRequirementsCard({ facility }: { facility: Facility }) {
  const { t } = useLanguage();
  const paymentList = facility.paymentAccepted
    .map((payment) => t(paymentLabelKeys[payment]))
    .join(", ");

  return (
    <section className="rounded-3xl border border-black/[0.06] bg-white p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2B4FA5]">
        {t("health.requirements.eyebrow")}
      </p>
      <h2 className="mt-2 text-2xl font-bold tracking-[-0.02em]">
        {t("health.requirements.title")}
      </h2>
      <ul className="mt-5 grid gap-3 text-sm font-medium leading-6 text-[#52615b]">
        <li>
          <span className="font-semibold text-[#17211f]">{t("health.requirements.arc")}</span>{" "}
          {t("health.requirements.arcDesc")}
        </li>
        <li>
          <span className="font-semibold text-[#17211f]">{t("health.requirements.payment")}</span>{" "}
          {paymentList}. {t("health.requirements.paymentSuffix")}
        </li>
        <li>
          <span className="font-semibold text-[#17211f]">
            {t("health.requirements.indoorShoes")}
          </span>{" "}
          {facility.indoorShoeRule
            ? t("health.requirements.indoorShoesYes")
            : t("health.requirements.indoorShoesNo")}
        </li>
      </ul>
    </section>
  );
}
