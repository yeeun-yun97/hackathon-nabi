"use client";

import { useLanguage } from "@/components/language-provider";
import type { VisaPointComponent } from "@/lib/data";
import type { Locale } from "@/lib/i18n";
import { pickLocalized } from "@/lib/i18n";

type StrategyOptionsProps = {
  strategies: VisaPointComponent[];
  locale: Locale;
};

const statusStyles: Record<VisaPointComponent["status"], string> = {
  available: "bg-[#2B4FA5]/10 text-[#2B4FA5]",
  earned: "bg-[#0f172a]/[0.05] text-[#52615b]",
  locked: "bg-[#0f172a]/[0.05] text-[#52615b]",
};

export function StrategyOptions({ strategies, locale }: StrategyOptionsProps) {
  const { t } = useLanguage();

  return (
    <div className="grid gap-3">
      {strategies.map((strategy) => (
        <article
          className="rounded-2xl border border-black/[0.06] bg-white p-5"
          key={strategy.id}
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[strategy.status]}`}
            >
              {t(`visa.strategy.status.${strategy.status}` as const)}
            </span>
            <span className="text-sm font-semibold text-[#2B4FA5]">
              {t("visa.strategy.points", { points: strategy.points })}
            </span>
          </div>
          <h3 className="mt-4 text-xl font-bold tracking-[-0.02em]">
            {pickLocalized(strategy.label, locale)}
          </h3>
          <p className="mt-3 text-sm leading-6 text-[#52615b]">
            {pickLocalized(strategy.action, locale)}
          </p>
          {strategy.locality ? (
            <div className="mt-4 rounded-xl border border-black/[0.06] bg-[#f6f7fb] p-4 text-sm leading-6 text-[#52615b]">
              <p className="font-semibold text-[#17211f]">
                {pickLocalized(strategy.locality.label, locale)}
              </p>
              {strategy.locality.nextIntake ? (
                <p className="mt-2 text-xs font-semibold text-[#2B4FA5]">
                  {t("visa.strategy.nextIntake", { date: strategy.locality.nextIntake })}
                </p>
              ) : null}
              {strategy.locality.url ? (
                <a
                  className="mt-2 inline-flex text-xs font-semibold text-[#2B4FA5] hover:underline"
                  href={strategy.locality.url}
                  rel="noreferrer"
                  target="_blank"
                >
                  {t("visa.strategy.openResource")} →
                </a>
              ) : null}
            </div>
          ) : null}
        </article>
      ))}
    </div>
  );
}
