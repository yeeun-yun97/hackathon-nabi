"use client";

import { useState } from "react";

import { KoreanTranslationShield } from "@/components/health/KoreanTranslationShield";
import { useLanguage } from "@/components/language-provider";
import type { Facility } from "@/lib/data";

export function FirstVisitOnboardingCard({ facility }: { facility: Facility }) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="rounded-3xl border border-black/[0.06] bg-white p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2B4FA5]">
        {t("health.firstVisit.eyebrow")}
      </p>
      <h2 className="mt-2 text-2xl font-bold tracking-[-0.02em]">{t("health.firstVisit.title")}</h2>
      <ol className="mt-5 grid gap-3 text-sm font-medium leading-6 text-[#52615b]">
        <li>{t("health.firstVisit.steps.0")}</li>
        <li>{t("health.firstVisit.steps.1")}</li>
        <li>{t("health.firstVisit.steps.2")}</li>
      </ol>
      <button
        className="mt-5 rounded-full bg-[#2B4FA5] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#23408a]"
        onClick={() => setIsOpen(true)}
        type="button"
      >
        {t("health.firstVisit.openModal")}
      </button>

      {isOpen ? (
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
                onClick={() => setIsOpen(false)}
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
