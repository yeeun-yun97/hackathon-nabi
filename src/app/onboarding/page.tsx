"use client";

import Link from "next/link";

import { OnboardingForm } from "@/components/onboarding-form";
import { useLanguage } from "@/components/language-provider";

export default function OnboardingPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-[#fffaf0] px-6 py-10 text-[#17211f]">
      <div className="mx-auto max-w-5xl">
        <Link className="text-sm font-black text-[#0b8d79]" href="/">
          Nari
        </Link>
        <div className="mb-10 mt-12">
          <p className="font-black text-[#ed9805]">{t("onboarding.eyebrow")}</p>
          <h1 className="mt-3 max-w-3xl text-5xl font-black tracking-[-0.05em]">
            {t("onboarding.title")}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#52615b]">
            {t("onboarding.subtitle")}
          </p>
        </div>
        <OnboardingForm />
      </div>
    </main>
  );
}
