"use client";

import { useEffect, useState } from "react";

import type { UserProfile } from "@/lib/data";
import { defaultProfile, profileUpdatedEvent, readStoredProfile } from "@/lib/profile";

/**
 * Reads the user profile from localStorage on mount and auto-refreshes whenever
 * writeStoredProfile() runs anywhere in the same tab (e.g. after the user saves
 * from /visa/edit and the router takes them back to a cached previous page).
 */
export function useStoredProfile(): UserProfile {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);

  useEffect(() => {
    queueMicrotask(() => {
      setProfile(readStoredProfile());
    });

    function handleUpdate(event: Event) {
      const detail = (event as CustomEvent<UserProfile>).detail;
      if (detail) {
        setProfile(detail);
      } else {
        setProfile(readStoredProfile());
      }
    }

    function handleStorage(event: StorageEvent) {
      if (event.key === "nabi:user-profile") {
        setProfile(readStoredProfile());
      }
    }

    window.addEventListener(profileUpdatedEvent, handleUpdate);
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener(profileUpdatedEvent, handleUpdate);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  return profile;
}
