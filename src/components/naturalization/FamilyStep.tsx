"use client";

import { useLanguage } from "@/components/language-provider";
import type { YesNoUnsure } from "@/lib/data";

import type { NaturalizationAnswers, NaturalizationParent } from "./types";

const YES_NO_UNSURE: YesNoUnsure[] = ["yes", "no", "unsure"];
const PARENT_OPTIONS: NaturalizationParent[] = ["father", "mother", "both"];

const inputClass =
  "w-full rounded-2xl border border-black/[0.06] bg-[#f6f7fb] px-4 py-3 font-medium outline-none transition focus:border-[#2B4FA5] focus:ring-2 focus:ring-[#2B4FA5]/20";

type FamilyStepProps = {
  answers: NaturalizationAnswers;
  update: (patch: Partial<NaturalizationAnswers>) => void;
};

function YesNoUnsureGroup({
  value,
  onChange,
  optionLabel,
}: {
  value: YesNoUnsure;
  onChange: (next: YesNoUnsure) => void;
  optionLabel: (option: YesNoUnsure) => string;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-3">
      {YES_NO_UNSURE.map((option) => {
        const isActive = value === option;
        return (
          <button
            aria-pressed={isActive}
            className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
              isActive
                ? "bg-[#2B4FA5] text-white"
                : "border border-black/[0.06] bg-[#f6f7fb] text-[#17211f] hover:border-[#2B4FA5]/40"
            }`}
            key={option}
            onClick={() => onChange(option)}
            type="button"
          >
            {optionLabel(option)}
          </button>
        );
      })}
    </div>
  );
}

export function FamilyStep({ answers, update }: FamilyStepProps) {
  const { t } = useLanguage();

  const yesNoLabel = (option: YesNoUnsure) =>
    t(
      option === "yes"
        ? "naturalization.option.yes"
        : option === "no"
          ? "naturalization.option.no"
          : "naturalization.option.unsure",
    );

  const parentLabel = (parent: NaturalizationParent) =>
    t(
      parent === "father"
        ? "naturalization.step2.q2.father"
        : parent === "mother"
          ? "naturalization.step2.q2.mother"
          : "naturalization.step2.q2.both",
    );

  const handleSpouseChange = (next: YesNoUnsure) => {
    if (next === "yes") {
      update({ hasKoreanSpouse: next });
    } else {
      update({ hasKoreanSpouse: next, marriageYears: 0 });
    }
  };

  const handleParentChange = (next: YesNoUnsure) => {
    if (next === "yes") {
      update({ hasKoreanParent: next });
    } else {
      update({ hasKoreanParent: next, whichParent: "father" });
    }
  };

  return (
    <section className="rounded-3xl border border-black/[0.06] bg-white p-6 md:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-[-0.02em]">
          {t("naturalization.step2.title")}
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#52615b]">
          {t("naturalization.step2.description")}
        </p>
      </div>

      <div className="grid gap-8">
        <div className="grid gap-3">
          <p className="text-sm font-semibold">
            {t("naturalization.step2.q1.title")}
          </p>
          <YesNoUnsureGroup
            onChange={handleSpouseChange}
            optionLabel={yesNoLabel}
            value={answers.hasKoreanSpouse}
          />
          <div
            aria-hidden={answers.hasKoreanSpouse !== "yes"}
            className={`grid overflow-hidden transition-all duration-300 ease-out ${
              answers.hasKoreanSpouse === "yes"
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="min-h-0">
              <label className="mt-2 grid gap-2 text-sm font-semibold">
                {t("naturalization.step2.q1.marriageYears")}
                <input
                  className={inputClass}
                  inputMode="decimal"
                  min={0}
                  onChange={(event) => {
                    const next = Number(event.target.value);
                    update({
                      marriageYears: Number.isFinite(next)
                        ? Math.max(0, next)
                        : 0,
                    });
                  }}
                  step="0.5"
                  type="number"
                  value={
                    Number.isFinite(answers.marriageYears)
                      ? answers.marriageYears
                      : 0
                  }
                />
                <span className="text-xs font-normal leading-5 text-[#52615b]">
                  {t("naturalization.step2.q1.marriageYearsHint")}
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="grid gap-3">
          <p className="text-sm font-semibold">
            {t("naturalization.step2.q2.title")}
          </p>
          <YesNoUnsureGroup
            onChange={handleParentChange}
            optionLabel={yesNoLabel}
            value={answers.hasKoreanParent}
          />
          <div
            aria-hidden={answers.hasKoreanParent !== "yes"}
            className={`grid overflow-hidden transition-all duration-300 ease-out ${
              answers.hasKoreanParent === "yes"
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="min-h-0">
              <fieldset className="mt-2 grid gap-2 text-sm font-semibold">
                <legend className="mb-2">
                  {t("naturalization.step2.q2.whichParent")}
                </legend>
                <div className="grid gap-2 sm:grid-cols-3">
                  {PARENT_OPTIONS.map((parent) => {
                    const isActive = answers.whichParent === parent;
                    return (
                      <label
                        className={`flex cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                          isActive
                            ? "border border-[#2B4FA5] bg-[#2B4FA5]/5 text-[#2B4FA5]"
                            : "border border-black/[0.06] bg-[#f6f7fb] text-[#17211f] hover:border-[#2B4FA5]/40"
                        }`}
                        key={parent}
                      >
                        <input
                          checked={isActive}
                          className="size-4 accent-[#2B4FA5]"
                          name="naturalization-which-parent"
                          onChange={() => update({ whichParent: parent })}
                          type="radio"
                          value={parent}
                        />
                        {parentLabel(parent)}
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
