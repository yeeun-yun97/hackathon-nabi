"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

import { useLanguage } from "@/components/language-provider";
import {
  cities,
  type AgeGroup,
  type City,
  type DegreeLevel,
  type EmploymentStatus,
  type FamilyStatus,
  type Gender,
  type HousingStatus,
  type KiipStage,
  type MaritalStatus,
  type ResidencyStatus,
  type SeoulDistrict,
  type TopikLevel,
  type UserProfile,
  type VisaSubtype,
  type YesNoUnsure,
} from "@/lib/data";
import type { TranslationKey } from "@/lib/i18n";
import { defaultProfile, readStoredProfile, writeStoredProfile } from "@/lib/profile";

const languages = ["English", "Korean", "Chinese", "Vietnamese", "Japanese", "Thai"];

const ageGroups: AgeGroup[] = ["under-18", "18-24", "25-34", "35-49", "50-plus"];
const genders: Gender[] = ["female", "male", "non-binary", "prefer-not-to-say"];
const residencyStatuses: ResidencyStatus[] = [
  "new-arrival",
  "short-term",
  "long-term",
  "permanent",
  "considering-immigration",
];
const housingStatuses: HousingStatus[] = [
  "renting",
  "owning",
  "dormitory",
  "with-family",
  "looking",
];
const maritalStatuses: MaritalStatus[] = [
  "single",
  "partnered",
  "married",
  "divorced",
  "widowed",
];
const employmentStatuses: EmploymentStatus[] = [
  "student",
  "employed-full-time",
  "employed-part-time",
  "self-employed",
  "job-seeking",
  "homemaker",
  "retired",
];
const familyStatuses: FamilyStatus[] = [
  "single-household",
  "couple",
  "with-children",
  "multicultural-family",
  "extended-family",
];
const yesNoUnsureOptions: YesNoUnsure[] = ["yes", "no", "unsure"];
const degreeLevels: DegreeLevel[] = ["none", "high-school", "bachelor", "master", "phd"];
const topikLevels: TopikLevel[] = ["none", "1", "2", "3", "4", "5", "6"];
const kiipStages: KiipStage[] = ["none", "0", "1", "2", "3", "4", "5"];
const visaSubtypes: VisaSubtype[] = ["D-2", "D-10", "E-7", "F-2-7", "F-5", "other", "unsure"];
const seoulDistricts: Array<SeoulDistrict | ""> = [
  "",
  "마포구",
  "성동구",
  "강남구",
  "종로구",
  "용산구",
  "기타",
];

const cityCoordinates: Record<City, { latitude: number; longitude: number }> = {
  서울시: { latitude: 37.5665, longitude: 126.978 },
  천안시: { latitude: 36.8151, longitude: 127.1139 },
  부산시: { latitude: 35.1796, longitude: 129.0756 },
  인천시: { latitude: 37.4563, longitude: 126.7052 },
  수원시: { latitude: 37.2636, longitude: 127.0286 },
  대전시: { latitude: 36.3504, longitude: 127.3845 },
};

const cardClass = "rounded-3xl border border-black/[0.06] bg-white p-6";
const inputClass =
  "rounded-2xl border border-black/[0.06] bg-[#f6f7fb] px-4 py-3 font-medium outline-none transition focus:border-[#2B4FA5] focus:ring-2 focus:ring-[#2B4FA5]/20";

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
    <label className="grid gap-2 text-sm font-semibold">
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

export type OnboardingFormProps = {
  redirectAfterSave?: string | null;
  onAfterSave?: () => void;
  submitLabelKey?: TranslationKey;
  onCancel?: () => void;
};

export function OnboardingForm({
  redirectAfterSave = "/discover",
  onAfterSave,
  submitLabelKey = "onboarding.submit",
  onCancel,
}: OnboardingFormProps = {}) {
  const router = useRouter();
  const { t, tCity, tLanguage, tOption } = useLanguage();
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [locationStatus, setLocationStatus] = useState(
    t("onboarding.locationStatus.initial"),
  );

  useEffect(() => {
    queueMicrotask(() => {
      setProfile(readStoredProfile());
    });
  }, []);

  function updateProfile(nextProfile: Partial<UserProfile>) {
    setProfile((current) => ({ ...current, ...nextProfile }));
  }

  function updateCity(city: City) {
    updateProfile({ city });
    setLocationStatus(
      t("onboarding.locationStatus.updated", { city: tCity(city) }),
    );
  }

  function distanceFromCity(latitude: number, longitude: number, city: City) {
    const cityCoordinate = cityCoordinates[city];
    const latitudeDiff = latitude - cityCoordinate.latitude;
    const longitudeDiff = longitude - cityCoordinate.longitude;

    return latitudeDiff * latitudeDiff + longitudeDiff * longitudeDiff;
  }

  function inferNearestCity(latitude: number, longitude: number) {
    return cities.reduce((nearestCity, city) => {
      const nearestDistance = distanceFromCity(latitude, longitude, nearestCity);
      const cityDistance = distanceFromCity(latitude, longitude, city);

      return cityDistance < nearestDistance ? city : nearestCity;
    }, cities[0]);
  }

  function detectLocation() {
    if (!navigator.geolocation) {
      setLocationStatus(t("onboarding.locationStatus.unsupported"));
      return;
    }

    setLocationStatus(t("onboarding.locationStatus.checking"));
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const nearestCity = inferNearestCity(
          position.coords.latitude,
          position.coords.longitude,
        );
        updateProfile({ city: nearestCity });
        setLocationStatus(
          t("onboarding.locationStatus.inferred", { city: tCity(nearestCity) }),
        );
      },
      () => {
        setLocationStatus(t("onboarding.locationStatus.denied"));
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const existing = readStoredProfile();
    writeStoredProfile({ ...profile, savedFacilities: existing.savedFacilities });
    onAfterSave?.();
    if (redirectAfterSave !== null) {
      router.push(redirectAfterSave);
    }
  }

  return (
    <form className="grid gap-6" onSubmit={handleSubmit}>
      <section className={`${cardClass} grid gap-6 lg:grid-cols-[1fr_0.8fr]`}>
        <div>
          <h2 className="text-2xl font-bold tracking-[-0.02em]">{t("onboarding.cityTitle")}</h2>
          <p className="mt-2 text-sm leading-6 text-[#52615b]">
            {t("onboarding.cityDescription")}
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {cities.map((city) => (
              <button
                className={`rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                  profile.city === city
                    ? "bg-[#2B4FA5] text-white"
                    : "border border-black/[0.06] bg-[#f6f7fb] text-[#17211f] hover:border-[#2B4FA5]/40"
                }`}
                key={city}
                onClick={() => updateCity(city)}
                type="button"
              >
                {tCity(city)}
              </button>
            ))}
          </div>
          <button
            className="mt-4 rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm font-semibold text-[#17211f] transition hover:border-[#2B4FA5]/40 hover:text-[#2B4FA5]"
            onClick={detectLocation}
            type="button"
          >
            {t("onboarding.cityUseLocation")}
          </button>
          <p className="mt-3 text-sm leading-6 text-[#52615b]">{locationStatus}</p>
        </div>

        <div className="rounded-2xl border border-black/[0.06] bg-[#f6f7fb] p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2B4FA5]">
            {t("onboarding.selectedCityLabel")}
          </p>
          <h3 className="mt-2 text-4xl font-bold tracking-[-0.04em]">{tCity(profile.city)}</h3>
          <p className="mt-4 text-sm leading-6 text-[#52615b]">
            {t("onboarding.selectedCityNote")}
          </p>
        </div>
      </section>

      <section className={`${cardClass} grid gap-5`}>
        <h2 className="text-2xl font-bold tracking-[-0.02em]">{t("onboarding.aboutTitle")}</h2>
        <p className="text-sm leading-6 text-[#52615b]">{t("onboarding.aboutDescription")}</p>
        <div className="grid gap-5 md:grid-cols-2">
          <SelectField
            label={t("onboarding.field.preferredLanguage")}
            onChange={(value) => updateProfile({ preferredLanguage: value })}
            options={languages.map((language) => ({ id: language, label: tLanguage(language) }))}
            value={profile.preferredLanguage}
          />
          <label className="grid gap-2 text-sm font-semibold">
            {t("onboarding.field.nationality")}
            <input
              className={inputClass}
              onChange={(event) => updateProfile({ nationality: event.target.value })}
              placeholder={t("onboarding.field.nationalityPlaceholder")}
              value={profile.nationality}
            />
          </label>
          <SelectField
            label={t("onboarding.field.ageGroup")}
            onChange={(value) => updateProfile({ ageGroup: value })}
            options={ageGroups.map((id) => ({ id, label: tOption("age", id) }))}
            value={profile.ageGroup}
          />
          <SelectField
            label={t("onboarding.field.gender")}
            onChange={(value) => updateProfile({ gender: value })}
            options={genders.map((id) => ({ id, label: tOption("gender", id) }))}
            value={profile.gender}
          />
          <SelectField
            label={t("onboarding.field.residency")}
            onChange={(value) => updateProfile({ residencyStatus: value })}
            options={residencyStatuses.map((id) => ({ id, label: tOption("residency", id) }))}
            value={profile.residencyStatus}
          />
          <SelectField
            label={t("onboarding.field.housing")}
            onChange={(value) => updateProfile({ housingStatus: value })}
            options={housingStatuses.map((id) => ({ id, label: tOption("housing", id) }))}
            value={profile.housingStatus}
          />
          <SelectField
            label={t("onboarding.field.maritalStatus")}
            onChange={(value) => updateProfile({ maritalStatus: value })}
            options={maritalStatuses.map((id) => ({ id, label: tOption("marital", id) }))}
            value={profile.maritalStatus}
          />
          <SelectField
            label={t("onboarding.field.employment")}
            onChange={(value) => updateProfile({ employmentStatus: value })}
            options={employmentStatuses.map((id) => ({
              id,
              label: tOption("employment", id),
            }))}
            value={profile.employmentStatus}
          />
          <SelectField
            label={t("onboarding.field.family")}
            onChange={(value) => updateProfile({ familyStatus: value })}
            options={familyStatuses.map((id) => ({ id, label: tOption("family", id) }))}
            value={profile.familyStatus}
          />
        </div>
      </section>

      <section className={`${cardClass} grid gap-5 md:grid-cols-3`}>
        <div>
          <p className="text-sm font-semibold">{t("onboarding.field.hasVisa")}</p>
          <div className="mt-3 grid gap-2">
            {yesNoUnsureOptions.map((option) => (
              <button
                className={`rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                  profile.hasVisa === option
                    ? "bg-[#2B4FA5] text-white"
                    : "border border-black/[0.06] bg-[#f6f7fb] text-[#17211f] hover:border-[#2B4FA5]/40"
                }`}
                key={option}
                onClick={() => updateProfile({ hasVisa: option })}
                type="button"
              >
                {tOption("yesNo", option)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold">{t("onboarding.field.multicultural")}</p>
          <div className="mt-3 grid gap-2">
            {yesNoUnsureOptions.map((option) => (
              <button
                className={`rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                  profile.multiculturalFamily === option
                    ? "bg-[#2B4FA5] text-white"
                    : "border border-black/[0.06] bg-[#f6f7fb] text-[#17211f] hover:border-[#2B4FA5]/40"
                }`}
                key={option}
                onClick={() => updateProfile({ multiculturalFamily: option })}
                type="button"
              >
                {tOption("yesNo", option)}
              </button>
            ))}
          </div>
        </div>

        <label className="grid h-fit gap-2 text-sm font-semibold">
          {t("onboarding.field.visaExpiry")}
          <input
            className={inputClass}
            onChange={(event) => updateProfile({ visaExpiryDate: event.target.value })}
            type="date"
            value={profile.visaExpiryDate}
          />
          <span className="text-xs font-normal leading-5 text-[#52615b]">
            {t("onboarding.field.visaExpiryNote")}
          </span>
        </label>
      </section>

      <section className={`${cardClass} grid gap-5`}>
        <div>
          <h2 className="text-2xl font-bold tracking-[-0.02em]">
            {t("onboarding.educationTitle")}
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#52615b]">
            {t("onboarding.educationDescription")}
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <SelectField
            label={t("onboarding.field.degreeLevel")}
            onChange={(value) => updateProfile({ degreeLevel: value })}
            options={degreeLevels.map((id) => ({ id, label: tOption("degree", id) }))}
            value={profile.degreeLevel}
          />
          <SelectField
            label={t("onboarding.field.topikLevel")}
            onChange={(value) => updateProfile({ topikLevel: value })}
            options={topikLevels.map((id) => ({ id, label: tOption("topik", id) }))}
            value={profile.topikLevel}
          />
          <SelectField
            label={t("onboarding.field.kiipStage")}
            onChange={(value) => updateProfile({ kiipStage: value })}
            options={kiipStages.map((id) => ({ id, label: tOption("kiip", id) }))}
            value={profile.kiipStage}
          />
          <label className="grid gap-2 text-sm font-semibold md:col-span-2">
            {t("onboarding.field.volunteerHoursLogged")}
            <input
              className={inputClass}
              max={500}
              min={0}
              onChange={(event) => {
                const raw = event.target.value;
                if (raw === "") {
                  updateProfile({ volunteerHoursLogged: 0 });
                  return;
                }
                const v = Number.parseInt(raw, 10);
                if (Number.isFinite(v)) {
                  updateProfile({ volunteerHoursLogged: Math.min(500, Math.max(0, v)) });
                }
              }}
              type="number"
              value={profile.volunteerHoursLogged}
            />
            <span className="text-xs font-normal leading-5 text-[#52615b]">
              {t("onboarding.field.volunteerHoursLoggedNote")}
            </span>
          </label>
          <SelectField
            label={t("onboarding.field.currentVisaSubtype")}
            onChange={(value) => updateProfile({ currentVisaSubtype: value })}
            options={visaSubtypes.map((id) => ({
              id,
              label: tOption("visaSubtype", id),
            }))}
            value={profile.currentVisaSubtype}
          />
          <SelectField
            label={t("onboarding.field.district")}
            onChange={(value) => updateProfile({ district: value })}
            options={seoulDistricts.map((id) => ({
              id,
              label: tOption("district", id),
            }))}
            value={profile.district}
          />
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        {onCancel ? (
          <button
            className="rounded-full border border-black/10 bg-white px-7 py-3.5 text-base font-semibold text-[#52615b] transition hover:border-[#2B4FA5]/40 hover:text-[#2B4FA5]"
            onClick={onCancel}
            type="button"
          >
            {t("me.profileEditor.cancel")}
          </button>
        ) : null}
        <button
          className="rounded-full bg-[#2B4FA5] px-7 py-3.5 text-base font-semibold text-white transition hover:bg-[#23408a]"
          type="submit"
        >
          {t(submitLabelKey)}
        </button>
      </div>
    </form>
  );
}
