"use client";

import { FaqClient } from "@/components/faq-client";
import { SiteHeader } from "@/components/site-header";
import { useLanguage } from "@/components/language-provider";

export default function FaqPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-[#fffaf0] text-[#17211f]">
      <SiteHeader />
      <div className="mx-auto max-w-5xl px-6 pb-20 pt-10">
        <p className="font-black text-[#ed9805]">{t("faq.eyebrow")}</p>
        <h1 className="mt-3 max-w-3xl text-5xl font-black tracking-[-0.05em]">
          {t("faq.title")}
        </h1>
        <p className="mb-10 mt-5 max-w-2xl text-lg leading-8 text-[#52615b]">
          {t("faq.subtitle")}
        </p>
        <FaqClient />
      </div>
    </main>
  );
}
