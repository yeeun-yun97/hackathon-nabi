"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { useAuth } from "@/components/auth-provider";
import { useLanguage } from "@/components/language-provider";
import { type UserProfile } from "@/lib/data";
import { defaultProfile, readStoredProfile } from "@/lib/profile";

const cardClass = "rounded-3xl border border-black/[0.06] bg-white p-6 md:p-8";

export function MeClient() {
  const { t, tCity, tOption } = useLanguage();
  const { user, profile: authProfile, signOut, isLoading } = useAuth();
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);

  useEffect(() => {
    queueMicrotask(() => {
      setProfile(readStoredProfile());
    });
  }, []);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl px-6 pb-20 pt-10">
        <div className={`${cardClass} text-center text-[#52615b]`}>...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-3xl px-6 pb-20 pt-10">
        <div className={`${cardClass} text-center`}>
          <p className="text-2xl font-bold tracking-[-0.02em]">{t("me.notSignedIn.title")}</p>
          <p className="mt-3 text-[#52615b]">{t("me.notSignedIn.subtitle")}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              className="rounded-full bg-[#2B4FA5] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#23408a]"
              href="/login"
            >
              {t("me.notSignedIn.signIn")}
            </Link>
            <Link
              className="rounded-full border border-black/[0.08] bg-white px-5 py-2.5 text-sm font-semibold text-[#52615b] transition hover:border-[#2B4FA5]/40 hover:text-[#2B4FA5]"
              href="/signup"
            >
              {t("me.notSignedIn.signUp")}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const displayName = authProfile?.displayName ?? user.email?.split("@")[0] ?? "";

  return (
    <div className="mx-auto max-w-3xl px-6 pb-20 pt-10">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2B4FA5]">
        {t("me.eyebrow")}
      </p>
      <h1 className="mt-3 text-5xl font-bold tracking-[-0.04em]">
        {t("me.title", { name: displayName })}
      </h1>
      <p className="mt-5 text-lg leading-8 text-[#52615b]">{t("me.subtitle")}</p>

      <section className={`${cardClass} mt-10`}>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2B4FA5]">
          {t("me.profile.title")}
        </p>
        <p className="mt-2 text-sm leading-6 text-[#52615b]">{t("me.profile.description")}</p>

        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          <ProfileRow label={t("me.profile.city")} value={tCity(profile.city)} />
          <ProfileRow
            label={t("me.profile.visa")}
            value={tOption("visaSubtype", profile.currentVisaSubtype)}
          />
          <ProfileRow
            label={t("me.profile.residency")}
            value={tOption("residency", profile.residencyStatus)}
          />
          <ProfileRow
            label={t("me.profile.family")}
            value={tOption("family", profile.familyStatus)}
          />
        </dl>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            className="rounded-full bg-[#2B4FA5] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#23408a]"
            href="/onboarding"
          >
            {t("me.actions.editProfile")}
          </Link>
          <button
            className="rounded-full border border-black/[0.08] bg-white px-5 py-2.5 text-sm font-semibold text-[#52615b] transition hover:border-[#2B4FA5]/40 hover:text-[#2B4FA5]"
            onClick={() => {
              void signOut();
            }}
            type="button"
          >
            {t("me.actions.signOut")}
          </button>
        </div>
      </section>
    </div>
  );
}

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-black/[0.06] bg-[#f6f7fb] p-4">
      <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[#52615b]">{label}</dt>
      <dd className="mt-2 text-base font-semibold text-[#17211f]">{value}</dd>
    </div>
  );
}
