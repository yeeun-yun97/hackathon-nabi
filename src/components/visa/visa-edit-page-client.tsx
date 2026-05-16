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

  useEffect(() => {
    queueMicrotask(() => {
      setProfile(readStoredProfile());
    });
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
        <VisaExpiryQuickEdit onSaved={setProfile} profile={profile} />
      </div>
    </div>
  );
}
