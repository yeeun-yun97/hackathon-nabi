import type { UserProfile } from "@/lib/data";

export const profileStorageKey = "nari:user-profile";

export const defaultProfile: UserProfile = {
  city: "서울시",
  preferredLanguage: "English",
  nationality: "Prefer not to say",
  gender: "prefer-not-to-say",
  ageGroup: "25-34",
  residencyStatus: "new-arrival",
  housingStatus: "renting",
  maritalStatus: "single",
  employmentStatus: "job-seeking",
  familyStatus: "single-household",
  hasVisa: "yes",
  multiculturalFamily: "unsure",
  visaExpiryDate: "2026-11-12",
  degreeLevel: "master",
  topikLevel: "4",
  kiipStage: "5",
  currentVisaSubtype: "D-2",
  district: "마포구",
};

export function readStoredProfile(): UserProfile {
  if (typeof window === "undefined") {
    return defaultProfile;
  }

  const storedProfile = window.localStorage.getItem(profileStorageKey);

  if (!storedProfile) {
    return defaultProfile;
  }

  try {
    return { ...defaultProfile, ...JSON.parse(storedProfile) } as UserProfile;
  } catch {
    return defaultProfile;
  }
}

export function writeStoredProfile(profile: UserProfile) {
  window.localStorage.setItem(profileStorageKey, JSON.stringify(profile));
}
