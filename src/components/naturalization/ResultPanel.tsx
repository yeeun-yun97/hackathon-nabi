"use client";

import { useLanguage } from "@/components/language-provider";
import type { TranslationKey } from "@/lib/i18n";

import { Timeline, type TimelineItem } from "./Timeline";
import { TypeBadge } from "./TypeBadge";
import type {
  NaturalizationChecklistStatus,
  NaturalizationResult,
  NaturalizationTypeAssessment,
} from "./types";

const cardClass =
  "rounded-3xl border border-black/[0.06] bg-white p-6 md:p-8";

const STATUS_ICON_STYLES: Record<NaturalizationChecklistStatus, string> = {
  met: "bg-[#13C3A8]/15 text-[#0E9D86]",
  partial: "bg-[#FEF3C7] text-[#B45309]",
  notMet: "bg-[#FEE2E2] text-[#B91C1C]",
};

const TYPE_TITLE_KEYS: Record<
  NaturalizationTypeAssessment["id"],
  { title: TranslationKey; description: TranslationKey }
> = {
  general: {
    title: "naturalization.result.types.general.title",
    description: "naturalization.result.types.general.description",
  },
  simplified: {
    title: "naturalization.result.types.simplified.title",
    description: "naturalization.result.types.simplified.description",
  },
  special: {
    title: "naturalization.result.types.special.title",
    description: "naturalization.result.types.special.description",
  },
};

function StatusIcon({ status }: { status: NaturalizationChecklistStatus }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex size-7 shrink-0 items-center justify-center rounded-full text-sm font-bold ${STATUS_ICON_STYLES[status]}`}
    >
      {status === "met" ? (
        <svg
          fill="none"
          height="14"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
          width="14"
        >
          <path d="M5 12l5 5L20 7" />
        </svg>
      ) : status === "partial" ? (
        <svg
          fill="none"
          height="14"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
          width="14"
        >
          <path d="M12 8v5" />
          <path d="M12 17h.01" />
        </svg>
      ) : (
        <svg
          fill="none"
          height="14"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
          width="14"
        >
          <path d="M6 6l12 12" />
          <path d="M6 18L18 6" />
        </svg>
      )}
    </span>
  );
}

function WarningIcon() {
  return (
    <span
      aria-hidden="true"
      className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-[#FEF3C7] text-[#B45309]"
    >
      <svg
        fill="none"
        height="18"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="18"
      >
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
      </svg>
    </span>
  );
}

type ResultPanelProps = {
  result: NaturalizationResult;
  onRestart: () => void;
};

export function ResultPanel({ result, onRestart }: ResultPanelProps) {
  const { t } = useLanguage();

  const actionItems: TimelineItem[] = result.actions.map((action) => ({
    id: action.id,
    title: t(action.titleKey),
    description: t(action.descriptionKey),
  }));

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#13C3A8]">
            {t("naturalization.result.summaryEyebrow")}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em]">
            {t("naturalization.result.summaryTitle")}
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[#52615b]">
            {t("naturalization.result.summarySubtitle")}
          </p>
        </div>
        <button
          className="w-fit rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm font-semibold text-[#17211f] transition hover:border-[#2B4FA5]/40 hover:text-[#2B4FA5]"
          onClick={onRestart}
          type="button"
        >
          {t("naturalization.actions.restart")}
        </button>
      </div>

      {!result.entryDateValid ? (
        <div className="rounded-2xl border border-[#F59E0B]/40 bg-[#FEF3C7] p-4 text-sm font-medium text-[#92400E]">
          {t("naturalization.result.entryDateMissing")}
        </div>
      ) : null}

      <section className={cardClass}>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2B4FA5]">
          {t("naturalization.result.types.eyebrow")}
        </p>
        <h3 className="mt-3 text-2xl font-bold tracking-[-0.02em]">
          {t("naturalization.result.types.title")}
        </h3>
        <ul className="mt-6 grid gap-4">
          {result.types.map((type) => (
            <li
              className="flex flex-col gap-3 rounded-2xl border border-black/[0.06] bg-[#f6f7fb] p-5 sm:flex-row sm:items-start sm:justify-between"
              key={type.id}
            >
              <div className="flex-1">
                <p className="text-base font-bold tracking-[-0.01em] text-[#17211f]">
                  {t(TYPE_TITLE_KEYS[type.id].title)}
                </p>
                <p className="mt-2 text-sm leading-6 text-[#52615b]">
                  {t(TYPE_TITLE_KEYS[type.id].description)}
                </p>
              </div>
              <div className="sm:pt-1">
                <TypeBadge likelihood={type.likelihood} />
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className={cardClass}>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2B4FA5]">
          {t("naturalization.result.checklist.eyebrow")}
        </p>
        <h3 className="mt-3 text-2xl font-bold tracking-[-0.02em]">
          {t("naturalization.result.checklist.title")}
        </h3>
        <ul className="mt-6 grid gap-3">
          {result.checklist.map((item) => (
            <li
              className="flex items-start gap-3 rounded-2xl border border-black/[0.04] bg-[#f6f7fb] p-4"
              key={item.id}
            >
              <StatusIcon status={item.status} />
              <div className="flex-1">
                <p className="text-sm font-semibold text-[#17211f]">
                  {t(item.labelKey)}
                </p>
                <p className="mt-1 text-xs font-medium text-[#52615b]">
                  {t(`naturalization.result.checklist.status.${item.status}` as const)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className={cardClass}>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2B4FA5]">
          {t("naturalization.result.actions.eyebrow")}
        </p>
        <h3 className="mt-3 text-2xl font-bold tracking-[-0.02em]">
          {t("naturalization.result.actions.title")}
        </h3>
        <div className="mt-6">
          <Timeline items={actionItems} />
        </div>
      </section>

      <section className={cardClass}>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#B45309]">
          {t("naturalization.result.risks.eyebrow")}
        </p>
        <h3 className="mt-3 text-2xl font-bold tracking-[-0.02em]">
          {t("naturalization.result.risks.title")}
        </h3>
        <ul className="mt-6 grid gap-3 md:grid-cols-2">
          {result.risks.map((risk) => (
            <li
              className="flex gap-3 rounded-2xl border border-[#F59E0B]/30 bg-[#FFFBEB] p-4"
              key={risk.id}
            >
              <WarningIcon />
              <div className="flex-1">
                <p className="text-sm font-bold text-[#92400E]">
                  {t(risk.titleKey)}
                </p>
                <p className="mt-2 text-sm leading-6 text-[#7C2D12]">
                  {t(risk.descriptionKey)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <p className="text-xs leading-5 text-[#52615b]">
        {t("naturalization.result.disclaimer")}
      </p>
    </div>
  );
}
