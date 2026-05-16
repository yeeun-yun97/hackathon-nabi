"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { useLanguage } from "@/components/language-provider";
import { VisaExpiryQuickEdit } from "@/components/visa/VisaExpiryQuickEdit";
import type { UserProfile } from "@/lib/data";
import { defaultProfile, readStoredProfile } from "@/lib/profile";

const DEFAULT_RETURN_PATH = "/discover?tab=visa";

/** Only accept return targets that look like in-app, same-origin paths. */
function sanitizeFrom(raw: string | null): string {
  if (!raw) {
    return DEFAULT_RETURN_PATH;
  }
  return raw.startsWith("/") && !raw.startsWith("//") ? raw : DEFAULT_RETURN_PATH;
}

export function VisaEditPageClient() {
  const { t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnPath = useMemo(
    () => sanitizeFrom(searchParams.get("from")),
    [searchParams],
  );

  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [profileReady, setProfileReady] = useState(false);

  useEffect(() => {
    const stored = readStoredProfile();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage only after mount; deferring form mount avoids resetting "No / Not sure" from stale defaultProfile.
    setProfile(stored);
    setProfileReady(true);
  }, []);

  function handleSaved(next: UserProfile) {
    setProfile(next);
    router.push(returnPath);
  }

  return (
    <div className="mx-auto max-w-2xl px-6 pb-20 pt-6">
      <Link
        className="inline-flex text-sm font-semibold text-[#2B4FA5] transition hover:underline"
        href={returnPath}
      >
        {t("common.back")}
      </Link>
      <div className="mt-8">
        {profileReady ? (
          <VisaExpiryQuickEdit onSaved={handleSaved} profile={profile} />
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
