"use client";

import { useLanguage } from "@/components/language-provider";
import { NaturalizationWizard } from "@/components/naturalization/NaturalizationWizard";

export function NaturalizationPanel() {
  const { t } = useLanguage();

  return (
    <div>
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2B4FA5]">
          {t("naturalization.eyebrow")}
        </p>
        <h1 className="mt-3 max-w-3xl text-5xl font-bold tracking-[-0.04em]">
          {t("naturalization.title")}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-[#52615b]">
          {t("naturalization.subtitle")}
        </p>
      </div>

      <NaturalizationWizard />
    </div>
  );
}
