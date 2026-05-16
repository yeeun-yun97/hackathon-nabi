"use client";

import { useEffect, useMemo, useState } from "react";

import { useLanguage } from "@/components/language-provider";
import type { AgeGroup, UserProfile } from "@/lib/data";
import { defaultProfile, readStoredProfile } from "@/lib/profile";

import { BasicInfoStep } from "./BasicInfoStep";
import { FamilyStep } from "./FamilyStep";
import { evaluateNaturalization } from "./logic";
import { ResultPanel } from "./ResultPanel";
import type { NaturalizationAnswers } from "./types";

const TOTAL_STEPS = 3;

const AGE_MIDPOINT: Record<AgeGroup, number> = {
  "under-18": 16,
  "18-24": 21,
  "25-34": 30,
  "35-49": 42,
  "50-plus": 55,
};

function answersFromProfile(profile: UserProfile): NaturalizationAnswers {
  return {
    nationality: profile.nationality,
    age: AGE_MIDPOINT[profile.ageGroup],
    currentVisa: profile.currentVisaSubtype,
    entryDate: "",
    continuousResidence: "yes",
    hasKoreanSpouse: "no",
    marriageYears: 0,
    hasKoreanParent: "no",
    whichParent: "father",
  };
}

export function NaturalizationWizard() {
  const { t } = useLanguage();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [answers, setAnswers] = useState<NaturalizationAnswers>(() =>
    answersFromProfile(defaultProfile),
  );

  useEffect(() => {
    queueMicrotask(() => {
      setAnswers(answersFromProfile(readStoredProfile()));
    });
  }, []);

  const result = useMemo(
    () => (step === 3 ? evaluateNaturalization(answers) : null),
    [step, answers],
  );

  const update = (patch: Partial<NaturalizationAnswers>) => {
    setAnswers((current) => ({ ...current, ...patch }));
  };

  const restart = () => {
    setAnswers(answersFromProfile(readStoredProfile()));
    setStep(1);
  };

  return (
    <section
      aria-label={t("naturalization.wizard.aria")}
      className="grid gap-6"
    >
      <div className="rounded-3xl border border-black/[0.06] bg-white p-5 md:p-6">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2B4FA5]">
            {t("naturalization.progress.label", {
              current: step,
              total: TOTAL_STEPS,
            })}
          </p>
          <p className="text-sm font-semibold text-[#52615b]">
            {step === 1
              ? t("naturalization.progress.step1")
              : step === 2
                ? t("naturalization.progress.step2")
                : t("naturalization.progress.step3")}
          </p>
        </div>
        <ol
          aria-hidden="true"
          className="mt-4 grid grid-cols-3 gap-2"
        >
          {[1, 2, 3].map((index) => {
            const reached = step >= index;
            return (
              <li
                className={`h-1.5 rounded-full transition-colors ${
                  reached ? "bg-[#2B4FA5]" : "bg-[#2B4FA5]/15"
                }`}
                key={index}
              />
            );
          })}
        </ol>
      </div>

      {step === 1 ? (
        <BasicInfoStep answers={answers} update={update} />
      ) : null}

      {step === 2 ? (
        <FamilyStep answers={answers} update={update} />
      ) : null}

      {step === 3 && result ? (
        <ResultPanel onRestart={restart} result={result} />
      ) : null}

      {step !== 3 ? (
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            className="w-fit rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm font-semibold text-[#17211f] transition hover:border-[#2B4FA5]/40 hover:text-[#2B4FA5] disabled:cursor-not-allowed disabled:opacity-40"
            disabled={step === 1}
            onClick={() => setStep((current) => (current > 1 ? ((current - 1) as 1 | 2 | 3) : current))}
            type="button"
          >
            {t("naturalization.actions.back")}
          </button>
          <button
            className="rounded-full bg-[#2B4FA5] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#23408a]"
            onClick={() => setStep((current) => ((current + 1) as 1 | 2 | 3))}
            type="button"
          >
            {step === 2
              ? t("naturalization.actions.seeResult")
              : t("naturalization.actions.next")}
          </button>
        </div>
      ) : null}
    </section>
  );
}
