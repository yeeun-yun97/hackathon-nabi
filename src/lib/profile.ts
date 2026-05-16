import type { UserProfile } from "@/lib/data";

export const profileStorageKey = "nabi:user-profile";

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
  visaIssueDate: "",
  visaExpiryDate: "2026-11-12",
  degreeLevel: "master",
  topikLevel: "4",
  kiipStage: "5",
  currentVisaSubtype: "D-2",
  targetVisaSubtype: "F-2-7",
  district: "마포구",
  savedFacilities: [],
  volunteerHoursLogged: 0,
};

/** Full calendar days from today until the visa expiry date (0 if missing or invalid). */
export function daysUntilVisaExpiry(visaExpiryDate: string): number {
  if (!visaExpiryDate) {
    return 0;
  }

  const target = new Date(visaExpiryDate).getTime();

  if (Number.isNaN(target)) {
    return 0;
  }

  return Math.max(0, Math.ceil((target - Date.now()) / (1000 * 60 * 60 * 24)));
}

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
