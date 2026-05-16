"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { useLanguage } from "@/components/language-provider";
import type { UserProfile, VisaSubtype } from "@/lib/data";
import { readStoredProfile, writeStoredProfile } from "@/lib/profile";

const visaSubtypes: VisaSubtype[] = ["D-2", "D-10", "E-7", "F-2-7", "F-5", "other", "unsure"];

const inputClass =
  "rounded-2xl border border-black/[0.06] bg-[#f6f7fb] px-4 py-3 font-medium outline-none transition focus:border-[#13C3A8] focus:ring-2 focus:ring-[#13C3A8]/20";

type VisaExpiryQuickEditProps = {
  profile: UserProfile;
  onSaved: (next: UserProfile) => void;
};

export function VisaExpiryQuickEdit({ profile, onSaved }: VisaExpiryQuickEditProps) {
  const { t, tOption } = useLanguage();
  const [value, setValue] = useState(profile.visaExpiryDate);
  const [visaSubtype, setVisaSubtype] = useState(profile.currentVisaSubtype);
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setValue(profile.visaExpiryDate);
      setVisaSubtype(profile.currentVisaSubtype);
    });
  }, [profile.visaExpiryDate, profile.currentVisaSubtype]);

  function handleSave() {
    const existing = readStoredProfile();
    const next: UserProfile = {
      ...existing,
      visaExpiryDate: value,
      currentVisaSubtype: visaSubtype,
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
      <h2 className="mt-2 text-2xl font-bold tracking-[-0.02em]">{t("visa.quickEdit.title")}</h2>
      <p className="mt-2 text-sm leading-6 text-[#52615b]">{t("visa.quickEdit.description")}</p>
      <div className="mt-5 flex flex-col gap-4">
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
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <label className="grid flex-1 gap-2 text-sm font-semibold text-[#17211f]">
            {t("onboarding.field.visaExpiry")}
            <input
              className={inputClass}
              onChange={(event) => setValue(event.target.value)}
              type="date"
              value={value}
            />
            <span className="text-xs font-normal leading-5 text-[#52615b]">
              {t("onboarding.field.visaExpiryNote")}
            </span>
          </label>
          <button
            className="rounded-full bg-[#13C3A8] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0fa08a]"
            onClick={handleSave}
            type="button"
          >
            {t("visa.quickEdit.save")}
          </button>
        </div>
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
