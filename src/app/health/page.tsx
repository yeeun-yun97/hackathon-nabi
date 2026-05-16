"use client";

import { FacilityGrid } from "@/components/health/FacilityGrid";
import { FacilityListByDistance } from "@/components/health/FacilityListByDistance";
import { SiteHeader } from "@/components/site-header";
import { useLanguage } from "@/components/language-provider";
import { mockFacilities } from "@/lib/data";

export default function HealthPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-[#f6f7fb] text-[#17211f]">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-6 pb-20 pt-10">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2B4FA5]">
            {t("health.eyebrow")}
          </p>
          <h1 className="mt-3 max-w-3xl text-5xl font-bold tracking-[-0.04em]">
            {t("health.title")}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#52615b]">
            {t("health.subtitle")}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div>
            <FacilityGrid facilities={mockFacilities} />
          </div>
          <aside className="lg:sticky lg:top-6 lg:h-fit">
            <FacilityListByDistance />
          </aside>
        </div>
      </div>
    </main>
  );
}
