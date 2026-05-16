"use client";

import Image from "next/image";
import Link from "next/link";

import { OnboardingForm } from "@/components/onboarding-form";
import { useLanguage } from "@/components/language-provider";

export default function OnboardingPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-[#f6f7fb] px-6 py-10 text-[#17211f]">
      <div className="mx-auto max-w-5xl">
        <Link className="inline-flex" href="/">
          <Image
            alt="nabi"
            className="h-auto w-24"
            height={1362}
            priority
            src="/nabi-logo.png"
            width={3790}
          />
        </Link>
        <div className="mb-10 mt-12">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2B4FA5]">
            {t("onboarding.eyebrow")}
          </p>
          <h1 className="mt-3 max-w-3xl text-5xl font-bold tracking-[-0.04em]">
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
