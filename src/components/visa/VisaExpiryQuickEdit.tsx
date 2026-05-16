"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { useLanguage } from "@/components/language-provider";
import type {
  DegreeLevel,
  KiipStage,
  TopikLevel,
  UserProfile,
  VisaSubtype,
  YesNoUnsure,
} from "@/lib/data";
import { readStoredProfile, writeStoredProfile } from "@/lib/profile";

const visaSubtypes: VisaSubtype[] = ["D-2", "D-10", "E-7", "F-2-7", "F-5", "other", "unsure"];
const targetVisaSubtypes: VisaSubtype[] = ["D-2", "D-10", "E-7", "F-2-7", "F-5", "other"];
const degreeLevels: DegreeLevel[] = ["none", "high-school", "bachelor", "master", "phd"];
const topikLevels: TopikLevel[] = ["none", "1", "2", "3", "4", "5", "6"];
const kiipStages: KiipStage[] = ["none", "0", "1", "2", "3", "4", "5"];

/** Two-button UI: "yes" vs merged "no / not sure" — stored as yes / unsure (see handleSave). */
type VisaPossessionAnswer = "yes" | "notYes";

function possessionFromStored(hasVisa: YesNoUnsure): VisaPossessionAnswer {
  return hasVisa === "yes" ? "yes" : "notYes";
}

function storedFromPossession(answer: VisaPossessionAnswer): YesNoUnsure {
  return answer === "yes" ? "yes" : "unsure";
}

const inputClass =
  "rounded-2xl border border-black/[0.06] bg-[#f6f7fb] px-4 py-3 font-medium outline-none transition focus:border-[#13C3A8] focus:ring-2 focus:ring-[#13C3A8]/20";

const sectionDividerClass = "border-t border-black/[0.08] pt-8";

type SelectFieldProps<TValue extends string> = {
  label: string;
  value: TValue;
  options: Array<{ id: TValue; label: string }>;
  onChange: (value: TValue) => void;
};

function SelectField<TValue extends string>({
  label,
  value,
  options,
  onChange,
}: SelectFieldProps<TValue>) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-[#17211f]">
      {label}
      <select
        className={inputClass}
        onChange={(event) => onChange(event.target.value as TValue)}
        value={value}
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

type VisaExpiryQuickEditProps = {
  profile: UserProfile;
  onSaved: (next: UserProfile) => void;
};

export function VisaExpiryQuickEdit({ profile, onSaved }: VisaExpiryQuickEditProps) {
  const { t, tOption } = useLanguage();
  const [possession, setPossession] = useState<VisaPossessionAnswer>(() =>
    possessionFromStored(profile.hasVisa),
  );
  const [issueDate, setIssueDate] = useState(profile.visaIssueDate);
  const [expiryDate, setExpiryDate] = useState(profile.visaExpiryDate);
  const [visaSubtype, setVisaSubtype] = useState(profile.currentVisaSubtype);
  const [targetVisa, setTargetVisa] = useState<VisaSubtype>(profile.targetVisaSubtype);
  const [degreeLevel, setDegreeLevel] = useState(profile.degreeLevel);
  const [topikLevel, setTopikLevel] = useState(profile.topikLevel);
  const [kiipStage, setKiipStage] = useState(profile.kiipStage);
  const [volunteerHours, setVolunteerHours] = useState(() =>
    String(profile.volunteerHoursLogged ?? 0),
  );
  const [justSaved, setJustSaved] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    queueMicrotask(() => {
      setPossession(possessionFromStored(profile.hasVisa));
      setIssueDate(profile.visaIssueDate);
      setExpiryDate(profile.visaExpiryDate);
      setVisaSubtype(profile.currentVisaSubtype);
      setTargetVisa(profile.targetVisaSubtype);
      setDegreeLevel(profile.degreeLevel);
      setTopikLevel(profile.topikLevel);
      setKiipStage(profile.kiipStage);
      setVolunteerHours(String(profile.volunteerHoursLogged ?? 0));
    });
  }, [
    profile.hasVisa,
    profile.visaIssueDate,
    profile.visaExpiryDate,
    profile.currentVisaSubtype,
    profile.targetVisaSubtype,
    profile.degreeLevel,
    profile.topikLevel,
    profile.kiipStage,
    profile.volunteerHoursLogged,
  ]);

  function handleSave() {
    const visaHold = possession === "yes";
    if (visaHold) {
      if (!issueDate) {
        setValidationError(t("visa.edit.error.issueDateRequired"));
        return;
      }
      if (!expiryDate) {
        setValidationError(t("visa.edit.error.expiryDateRequired"));
        return;
      }
      if (new Date(issueDate).getTime() > new Date(expiryDate).getTime()) {
        setValidationError(t("visa.edit.error.issueAfterExpiry"));
        return;
      }
    }
    setValidationError(null);
    const parsed = Number.parseInt(volunteerHours, 10);
    const volunteerHoursLogged = Number.isFinite(parsed)
      ? Math.min(500, Math.max(0, parsed))
      : 0;
    const existing = readStoredProfile();
    const hasVisaStored = storedFromPossession(possession);
    const next: UserProfile = {
      ...existing,
      hasVisa: hasVisaStored,
      visaIssueDate: visaHold ? issueDate : "",
      visaExpiryDate: visaHold ? expiryDate : "",
      currentVisaSubtype: visaHold ? visaSubtype : "unsure",
      targetVisaSubtype: targetVisa,
      degreeLevel,
      topikLevel,
      kiipStage,
      volunteerHoursLogged,
    };
    writeStoredProfile(next);
    onSaved(next);
    setJustSaved(true);
    queueMicrotask(() => {
      window.setTimeout(() => setJustSaved(false), 2500);
    });
  }

  return (
    <section className="rounded-3xl border border-black/[0.06] bg-white p-6 md:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#13C3A8]">
        {t("visa.quickEdit.eyebrow")}
      </p>
      <h2 className="mt-2 text-2xl font-bold tracking-[-0.02em]">{t("visa.edit.pageHeading")}</h2>
      <p className="mt-2 text-sm leading-6 text-[#52615b]">{t("visa.edit.pageIntro")}</p>

      <div className="mt-8 space-y-8">
        <div>
          <h3 className="text-lg font-bold tracking-[-0.02em] text-[#17211f]">
            {t("visa.edit.section.visaTitle")}
          </h3>
          <p className="mt-2 text-sm leading-6 text-[#52615b]">{t("visa.edit.section.visaDescription")}</p>

          <div className="mt-4">
            <p className="text-sm font-semibold text-[#17211f]">{t("onboarding.field.hasVisa")}</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <button
                className={`rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                  possession === "yes"
                    ? "bg-[#13C3A8] text-white"
                    : "border border-black/[0.06] bg-[#f6f7fb] text-[#17211f] hover:border-[#13C3A8]/40"
                }`}
                onClick={() => setPossession("yes")}
                type="button"
              >
                {t("visa.edit.hasVisaYes")}
              </button>
              <button
                className={`rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                  possession === "notYes"
                    ? "bg-[#13C3A8] text-white"
                    : "border border-black/[0.06] bg-[#f6f7fb] text-[#17211f] hover:border-[#13C3A8]/40"
                }`}
                onClick={() => setPossession("notYes")}
                type="button"
              >
                {t("visa.edit.hasVisaNoOrUnsure")}
              </button>
            </div>
          </div>

          {possession === "notYes" ? (
            <p className="mt-5 rounded-2xl border border-black/[0.06] bg-[#f6f7fb] px-4 py-3 text-sm font-medium text-[#52615b]">
              {t("visa.edit.noVisaState")}
            </p>
          ) : (
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold text-[#17211f]">
                {t("onboarding.field.currentVisaSubtype")}
                <select
                  className={inputClass}
                  onChange={(event) => setVisaSubtype(event.target.value as VisaSubtype)}
                  value={visaSubtype}
                >
                  {visaSubtypes.map((id) => (
                    <option key={id} value={id}>
                      {tOption("visaSubtype", id)}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-sm font-semibold text-[#17211f]">
                {t("onboarding.field.visaIssue")} <span className="text-[#E0445B]">*</span>
                <input
                  className={inputClass}
                  onChange={(event) => setIssueDate(event.target.value)}
                  required
                  type="date"
                  value={issueDate}
                />
                <span className="text-xs font-normal leading-5 text-[#52615b]">
                  {t("onboarding.field.visaIssueNote")}
                </span>
              </label>
              <label className="grid gap-2 text-sm font-semibold text-[#17211f] md:col-span-2">
                {t("onboarding.field.visaExpiry")} <span className="text-[#E0445B]">*</span>
                <input
                  className={inputClass}
                  onChange={(event) => setExpiryDate(event.target.value)}
                  required
                  type="date"
                  value={expiryDate}
                />
                <span className="text-xs font-normal leading-5 text-[#52615b]">
                  {t("onboarding.field.visaExpiryNote")}
                </span>
              </label>
            </div>
          )}
        </div>

        <div className={sectionDividerClass}>
          <h3 className="text-lg font-bold tracking-[-0.02em] text-[#17211f]">
            {t("visa.edit.section.targetTitle")}
          </h3>
          <p className="mt-2 text-sm leading-6 text-[#52615b]">{t("visa.edit.section.targetDescription")}</p>

          <div className="mt-5">
            <SelectField
              label={t("onboarding.field.targetVisaSubtype")}
              onChange={setTargetVisa}
              options={targetVisaSubtypes.map((id) => ({ id, label: tOption("visaSubtype", id) }))}
              value={targetVisa}
            />
          </div>
        </div>

        <div className={sectionDividerClass}>
          <h3 className="text-lg font-bold tracking-[-0.02em] text-[#17211f]">
            {t("visa.edit.section.extraTitle")}
          </h3>
          <p className="mt-2 text-sm leading-6 text-[#52615b]">{t("visa.edit.section.extraDescription")}</p>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <SelectField
              label={t("onboarding.field.degreeLevel")}
              onChange={setDegreeLevel}
              options={degreeLevels.map((id) => ({ id, label: tOption("degree", id) }))}
              value={degreeLevel}
            />
            <SelectField
              label={t("onboarding.field.topikLevel")}
              onChange={setTopikLevel}
              options={topikLevels.map((id) => ({ id, label: tOption("topik", id) }))}
              value={topikLevel}
            />
            <SelectField
              label={t("onboarding.field.kiipStage")}
              onChange={setKiipStage}
              options={kiipStages.map((id) => ({ id, label: tOption("kiip", id) }))}
              value={kiipStage}
            />
            <label className="grid gap-2 text-sm font-semibold text-[#17211f] md:col-span-2">
              {t("onboarding.field.volunteerHoursLogged")}
              <input
                className={inputClass}
                inputMode="numeric"
                max={500}
                min={0}
                onChange={(event) => setVolunteerHours(event.target.value)}
                type="number"
                value={volunteerHours}
              />
              <span className="text-xs font-normal leading-5 text-[#52615b]">
                {t("onboarding.field.volunteerHoursLoggedNote")}
              </span>
            </label>
          </div>
        </div>
      </div>

      <div className={`mt-8 ${sectionDividerClass}`}>
        <button
          className="rounded-full bg-[#13C3A8] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0fa08a]"
          onClick={handleSave}
          type="button"
        >
          {t("visa.quickEdit.save")}
        </button>
        {validationError ? (
          <p className="mt-3 text-sm font-semibold text-[#E0445B]" role="alert">
            {validationError}
          </p>
        ) : null}
      </div>

      {justSaved ? (
        <p className="mt-4 text-sm font-semibold text-[#0E9D86]" role="status">
          {t("visa.quickEdit.saved")}
        </p>
      ) : null}
      <Link
        className="mt-5 inline-flex text-sm font-semibold text-[#2B4FA5] hover:underline"
        href="/onboarding"
      >
        {t("visa.quickEdit.fullProfile")}
      </Link>
    </section>
  );
}
