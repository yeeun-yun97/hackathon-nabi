"use client";

import { CommunityClient } from "@/components/community-client";
import { SiteHeader } from "@/components/site-header";
import { useLanguage } from "@/components/language-provider";

export default function CommunityPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-[#f6f7fb] text-[#17211f]">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-6 pb-20 pt-10">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2B4FA5]">
          {t("community.eyebrow")}
        </p>
        <h1 className="mt-3 max-w-3xl text-5xl font-bold tracking-[-0.04em]">
          {t("community.title")}
        </h1>
        <p className="mb-10 mt-5 max-w-2xl text-lg leading-8 text-[#52615b]">
          {t("community.subtitle")}
        </p>
        <CommunityClient />
      </div>
    </main>
  );
}
