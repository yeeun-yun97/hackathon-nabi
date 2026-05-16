"use client";

import { DiscoverClient } from "@/components/discover-client";
import { SiteHeader } from "@/components/site-header";
import { useLanguage } from "@/components/language-provider";

export default function DiscoverPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-[#fffaf0] text-[#17211f]">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-6 pb-20 pt-10">
        <div className="mb-10">
          <p className="font-black text-[#ed9805]">{t("discover.eyebrow")}</p>
          <h1 className="mt-3 max-w-3xl text-5xl font-black tracking-[-0.05em]">
            {t("discover.title")}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#52615b]">
            {t("discover.subtitle")}
          </p>
        </div>
        <DiscoverClient />
      </div>
    </main>
  );
}
