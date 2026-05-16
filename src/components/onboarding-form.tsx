"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import {
  cities,
  type AgeGroup,
  type City,
  type EmploymentStatus,
  type FamilyStatus,
  type Gender,
  type HousingStatus,
  type MaritalStatus,
  type ResidencyStatus,
  type UserProfile,
  type YesNoUnsure,
} from "@/lib/data";
import { defaultProfile, writeStoredProfile } from "@/lib/profile";

const languages = ["English", "Korean", "Chinese", "Vietnamese", "Japanese", "Thai"];

const ageGroups: Array<{ id: AgeGroup; label: string }> = [
  { id: "under-18", label: "Under 18" },
  { id: "18-24", label: "18-24" },
  { id: "25-34", label: "25-34" },
  { id: "35-49", label: "35-49" },
  { id: "50-plus", label: "50+" },
];

const genders: Array<{ id: Gender; label: string }> = [
  { id: "female", label: "Female" },
  { id: "male", label: "Male" },
  { id: "non-binary", label: "Non-binary" },
  { id: "prefer-not-to-say", label: "Prefer not to say" },
];

const residencyStatuses: Array<{ id: ResidencyStatus; label: string }> = [
  { id: "new-arrival", label: "New arrival" },
  { id: "short-term", label: "Short-term" },
  { id: "long-term", label: "Long-term" },
  { id: "permanent", label: "Permanent resident" },
  { id: "considering-immigration", label: "Considering immigration" },
];

const housingStatuses: Array<{ id: HousingStatus; label: string }> = [
  { id: "renting", label: "Renting" },
  { id: "owning", label: "Owning" },
  { id: "dormitory", label: "Dormitory" },
  { id: "with-family", label: "With family" },
  { id: "looking", label: "Looking for housing" },
];

const maritalStatuses: Array<{ id: MaritalStatus; label: string }> = [
  { id: "single", label: "Single" },
  { id: "partnered", label: "Partnered" },
  { id: "married", label: "Married" },
  { id: "divorced", label: "Divorced" },
  { id: "widowed", label: "Widowed" },
];

const employmentStatuses: Array<{ id: EmploymentStatus; label: string }> = [
  { id: "student", label: "Student" },
  { id: "employed-full-time", label: "Full-time employed" },
  { id: "employed-part-time", label: "Part-time employed" },
  { id: "self-employed", label: "Self-employed" },
  { id: "job-seeking", label: "Job-seeking" },
  { id: "homemaker", label: "Homemaker" },
  { id: "retired", label: "Retired" },
];

const familyStatuses: Array<{ id: FamilyStatus; label: string }> = [
  { id: "single-household", label: "Single household" },
  { id: "couple", label: "Couple" },
  { id: "with-children", label: "With children" },
  { id: "multicultural-family", label: "Multicultural family" },
  { id: "extended-family", label: "Extended family" },
];

const yesNoUnsureOptions: Array<{ id: YesNoUnsure; label: string }> = [
  { id: "yes", label: "Yes" },
  { id: "no", label: "No" },
  { id: "unsure", label: "Not sure" },
];

const cityCoordinates: Record<City, { latitude: number; longitude: number }> = {
  서울시: { latitude: 37.5665, longitude: 126.978 },
  천안시: { latitude: 36.8151, longitude: 127.1139 },
  부산시: { latitude: 35.1796, longitude: 129.0756 },
  인천시: { latitude: 37.4563, longitude: 126.7052 },
  수원시: { latitude: 37.2636, longitude: 127.0286 },
  대전시: { latitude: 36.3504, longitude: 127.3845 },
};

type SelectFieldProps<TValue extends string> = {
  label: string;
  value: TValue;
  options: Array<{ id: TValue; label: string }>;
  onChange: (value: TValue) => void;
};

function SelectField<TValue extends string>({ label, value, options, onChange }: SelectFieldProps<TValue>) {
  return (
    <label className="grid gap-2 text-sm font-black">
      {label}
      <select
        className="rounded-2xl bg-[#fffaf0] px-4 py-3 font-bold outline-none ring-1 ring-black/5 focus:ring-2 focus:ring-[#10c4a9]"
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

export function OnboardingForm() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [locationStatus, setLocationStatus] = useState(
    "Choose your city manually, or use your current location to estimate it.",
  );

  function updateProfile(nextProfile: Partial<UserProfile>) {
    setProfile((current) => ({ ...current, ...nextProfile }));
  }

  function updateCity(city: City) {
    updateProfile({ city });
    setLocationStatus(`${city} 기준으로 정보를 추천합니다.`);
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
      setLocationStatus("이 브라우저에서는 현재 위치를 사용할 수 없어요.");
      return;
    }

    setLocationStatus("현재 위치를 확인하는 중입니다...");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const nearestCity = inferNearestCity(
          position.coords.latitude,
          position.coords.longitude,
        );
        updateProfile({ city: nearestCity });
        setLocationStatus(
          `현재 위치를 참고해 ${nearestCity}로 추정했습니다. 필요하면 직접 다른 도시를 선택할 수 있어요.`,
        );
      },
      () => {
        setLocationStatus("위치 권한을 받을 수 없어요. 도시를 직접 선택해주세요.");
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    writeStoredProfile(profile);
    router.push("/discover");
  }

  return (
    <form className="grid gap-8" onSubmit={handleSubmit}>
      <section className="grid gap-6 rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5 lg:grid-cols-[1fr_0.8fr]">
        <div>
          <h2 className="text-2xl font-black tracking-[-0.03em]">Which city are you in?</h2>
          <p className="mt-2 text-sm leading-6 text-[#52615b]">
            도시를 기준으로 가까운 공공기관, 의료서비스, 교육 프로그램, 커뮤니티
            정보를 먼저 보여드립니다.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {cities.map((city) => (
              <button
                className={`rounded-2xl px-4 py-3 text-left text-sm font-black transition ${
                  profile.city === city
                    ? "bg-[#10c4a9] text-white"
                    : "bg-[#fffaf0] text-[#17211f] ring-1 ring-black/5"
                }`}
                key={city}
                onClick={() => updateCity(city)}
                type="button"
              >
                {city}
              </button>
            ))}
          </div>
          <button
            className="mt-4 rounded-full bg-[#17211f] px-5 py-3 text-sm font-black text-white"
            onClick={detectLocation}
            type="button"
          >
            Use my current location
          </button>
          <p className="mt-3 text-sm leading-6 text-[#52615b]">{locationStatus}</p>
        </div>

        <div className="rounded-3xl bg-[#fffaf0] p-6 ring-1 ring-black/5">
          <p className="text-sm font-black text-[#ed9805]">Selected city</p>
          <h3 className="mt-2 text-4xl font-black tracking-[-0.05em]">{profile.city}</h3>
          <p className="mt-4 text-sm leading-6 text-[#52615b]">
            위치 권한은 도시 추정에만 사용됩니다. 정확한 좌표는 저장하지 않고,
            선택된 도시를 기준으로 공공기관과 생활 정보를 필터링합니다.
          </p>
        </div>
      </section>

      <section className="grid gap-5 rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
        <h2 className="text-2xl font-black tracking-[-0.03em]">About you</h2>
        <p className="text-sm leading-6 text-[#52615b]">
          이 정보는 어떤 카테고리(이민, 의료, 노동, 교육 등)가 더 중요한지를
          판단해 추천 우선순위를 정하는 데에만 사용됩니다.
        </p>
        <div className="grid gap-5 md:grid-cols-2">
          <SelectField
            label="Preferred language"
            onChange={(value) => updateProfile({ preferredLanguage: value })}
            options={languages.map((language) => ({ id: language, label: language }))}
            value={profile.preferredLanguage}
          />
          <label className="grid gap-2 text-sm font-black">
            Nationality
            <input
              className="rounded-2xl bg-[#fffaf0] px-4 py-3 font-bold outline-none ring-1 ring-black/5 focus:ring-2 focus:ring-[#10c4a9]"
              onChange={(event) => updateProfile({ nationality: event.target.value })}
              placeholder="e.g. Vietnam, USA"
              value={profile.nationality}
            />
          </label>
          <SelectField
            label="Age group"
            onChange={(value) => updateProfile({ ageGroup: value })}
            options={ageGroups}
            value={profile.ageGroup}
          />
          <SelectField
            label="Gender"
            onChange={(value) => updateProfile({ gender: value })}
            options={genders}
            value={profile.gender}
          />
          <SelectField
            label="Residency status"
            onChange={(value) => updateProfile({ residencyStatus: value })}
            options={residencyStatuses}
            value={profile.residencyStatus}
          />
          <SelectField
            label="Housing"
            onChange={(value) => updateProfile({ housingStatus: value })}
            options={housingStatuses}
            value={profile.housingStatus}
          />
          <SelectField
            label="Marital status"
            onChange={(value) => updateProfile({ maritalStatus: value })}
            options={maritalStatuses}
            value={profile.maritalStatus}
          />
          <SelectField
            label="Employment"
            onChange={(value) => updateProfile({ employmentStatus: value })}
            options={employmentStatuses}
            value={profile.employmentStatus}
          />
          <SelectField
            label="Family"
            onChange={(value) => updateProfile({ familyStatus: value })}
            options={familyStatuses}
            value={profile.familyStatus}
          />
        </div>
      </section>

      <section className="grid gap-5 rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5 md:grid-cols-3">
        <div>
          <p className="text-sm font-black">Do you currently have a visa?</p>
          <div className="mt-3 grid gap-2">
            {yesNoUnsureOptions.map((option) => (
              <button
                className={`rounded-2xl px-4 py-3 text-left text-sm font-black ${
                  profile.hasVisa === option.id
                    ? "bg-[#17211f] text-white"
                    : "bg-[#fffaf0] text-[#17211f] ring-1 ring-black/5"
                }`}
                key={option.id}
                onClick={() => updateProfile({ hasVisa: option.id })}
                type="button"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-black">Multicultural family?</p>
          <div className="mt-3 grid gap-2">
            {yesNoUnsureOptions.map((option) => (
              <button
                className={`rounded-2xl px-4 py-3 text-left text-sm font-black ${
                  profile.multiculturalFamily === option.id
                    ? "bg-[#17211f] text-white"
                    : "bg-[#fffaf0] text-[#17211f] ring-1 ring-black/5"
                }`}
                key={option.id}
                onClick={() => updateProfile({ multiculturalFamily: option.id })}
                type="button"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <label className="grid h-fit gap-2 text-sm font-black">
          Visa expiry date
          <input
            className="rounded-2xl bg-[#fffaf0] px-4 py-3 font-bold outline-none ring-1 ring-black/5 focus:ring-2 focus:ring-[#10c4a9]"
            onChange={(event) => updateProfile({ visaExpiryDate: event.target.value })}
            type="date"
            value={profile.visaExpiryDate}
          />
          <span className="text-xs font-medium leading-5 text-[#52615b]">
            비자가 없거나 확실하지 않으면 비워두어도 됩니다.
          </span>
        </label>
      </section>

      <button
        className="rounded-full bg-[#ed9805] px-7 py-4 text-base font-black text-white shadow-xl shadow-orange-200 transition hover:-translate-y-0.5"
        type="submit"
      >
        Save and find recommendations
      </button>
    </form>
  );
}
