"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { useLanguage } from "@/components/language-provider";
import { VisaExpiryQuickEdit } from "@/components/visa/VisaExpiryQuickEdit";
import type { UserProfile } from "@/lib/data";
import { defaultProfile, readStoredProfile } from "@/lib/profile";

export function VisaEditPageClient() {
  const { t } = useLanguage();
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [profileReady, setProfileReady] = useState(false);

  useEffect(() => {
    const stored = readStoredProfile();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage only after mount; deferring form mount avoids resetting "No / Not sure" from stale defaultProfile.
    setProfile(stored);
    setProfileReady(true);
  }, []);

  return (
    <div className="mx-auto max-w-2xl px-6 pb-20 pt-6">
      <Link
        className="inline-flex text-sm font-semibold text-[#2B4FA5] transition hover:underline"
        href="/discover?tab=visa"
      >
        {t("visa.edit.back")}
      </Link>
      <div className="mt-8">
        {profileReady ? (
          <VisaExpiryQuickEdit onSaved={setProfile} profile={profile} />
        ) : (
          <div
            aria-busy="true"
            className="rounded-3xl border border-black/[0.06] bg-white p-10 text-center text-sm text-[#52615b]"
          >
            {t("common.loading")}
          </div>
        )}
      </div>
    </div>
  );
}
