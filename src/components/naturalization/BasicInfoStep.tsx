"use client";

import { useLanguage } from "@/components/language-provider";
import type { VisaSubtype, YesNoUnsure } from "@/lib/data";

import type { NaturalizationAnswers } from "./types";

const VISA_OPTIONS: VisaSubtype[] = [
  "D-2",
  "D-10",
  "E-7",
  "F-2-7",
  "F-5",
  "other",
  "unsure",
];

const inputClass =
  "w-full rounded-2xl border border-black/[0.06] bg-[#f6f7fb] px-4 py-3 font-medium outline-none transition focus:border-[#2B4FA5] focus:ring-2 focus:ring-[#2B4FA5]/20";

type BasicInfoStepProps = {
  answers: NaturalizationAnswers;
  update: (patch: Partial<NaturalizationAnswers>) => void;
};

export function BasicInfoStep({ answers, update }: BasicInfoStepProps) {
  const { t, tOption } = useLanguage();

  const yesNoButton = (option: YesNoUnsure, label: string) => {
    const isActive = answers.continuousResidence === option;
    return (
      <button
        aria-pressed={isActive}
        className={`flex-1 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
          isActive
            ? "bg-[#2B4FA5] text-white shadow-sm"
            : "text-[#52615b] hover:text-[#2B4FA5]"
        }`}
        key={option}
        onClick={() => update({ continuousResidence: option })}
        type="button"
      >
        {label}
      </button>
    );
  };

  return (
    <section className="rounded-3xl border border-black/[0.06] bg-white p-6 md:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-[-0.02em]">
          {t("naturalization.step1.title")}
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#52615b]">
          {t("naturalization.step1.description")}
        </p>
      </div>

      <div className="grid gap-5">
        <label className="grid gap-2 text-sm font-semibold">
          {t("naturalization.step1.field.nationality")}
          <input
            className={inputClass}
            onChange={(event) => update({ nationality: event.target.value })}
            placeholder={t("naturalization.step1.field.nationalityPlaceholder")}
            type="text"
            value={answers.nationality}
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold">
          {t("naturalization.step1.field.age")}
          <input
            className={inputClass}
            inputMode="numeric"
            max={120}
            min={0}
            onChange={(event) => {
              const next = Number(event.target.value);
              update({ age: Number.isFinite(next) ? next : 0 });
            }}
            type="number"
            value={Number.isFinite(answers.age) ? answers.age : 0}
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold">
          {t("naturalization.step1.field.currentVisa")}
          <select
            className={inputClass}
            onChange={(event) =>
              update({ currentVisa: event.target.value as VisaSubtype })
            }
            value={answers.currentVisa}
          >
            {VISA_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {tOption("visaSubtype", option)}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm font-semibold">
          {t("naturalization.step1.field.entryDate")}
          <input
            className={inputClass}
            onChange={(event) => update({ entryDate: event.target.value })}
            type="date"
            value={answers.entryDate}
          />
          <span className="text-xs font-normal leading-5 text-[#52615b]">
            {t("naturalization.step1.field.entryDateHint")}
          </span>
        </label>

        <div className="grid gap-2 text-sm font-semibold">
          <span>{t("naturalization.step1.field.continuousResidence")}</span>
          <div className="inline-flex w-full max-w-md gap-1 rounded-full border border-black/[0.06] bg-[#f6f7fb] p-1">
            {yesNoButton("yes", t("naturalization.option.yes"))}
            {yesNoButton("no", t("naturalization.option.no"))}
          </div>
          <span className="text-xs font-normal leading-5 text-[#52615b]">
            {t("naturalization.step1.field.continuousResidenceHint")}
          </span>
        </div>
      </div>
    </section>
  );
}
