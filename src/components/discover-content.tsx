"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { ChecklistsClient } from "@/components/checklists-client";
import { DiscoverClient } from "@/components/discover-client";
import { HealthPanel } from "@/components/health-panel";
import { useLanguage } from "@/components/language-provider";
import { NaturalizationPanel } from "@/components/naturalization-panel";
import { VisaPanel } from "@/components/visa-panel";
import type { TranslationKey } from "@/lib/i18n";

const TABS = ["support", "visa", "health", "checklists", "naturalization"] as const;
type TabId = (typeof TABS)[number];

function isTab(value: string | null): value is TabId {
  return value !== null && (TABS as readonly string[]).includes(value);
}

export function DiscoverContent() {
  const { t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabParam = searchParams.get("tab");
  const activeTab: TabId = isTab(tabParam) ? tabParam : "support";

  const setTab = (tab: TabId) => {
    const params = new URLSearchParams(searchParams.toString());
    if (tab === "support") {
      params.delete("tab");
    } else {
      params.set("tab", tab);
    }
    const qs = params.toString();
    router.push(qs ? `/discover?${qs}` : "/discover", { scroll: false });
  };

  return (
    <div>
      <nav
        aria-label={t("discover.tabs.aria")}
        className="mb-8 inline-flex max-w-full flex-wrap gap-1 rounded-full bg-white p-1.5 ring-1 ring-black/[0.06]"
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab;
          const labelKey = `discover.tabs.${tab}` satisfies TranslationKey;
          return (
            <button
              aria-pressed={isActive}
              className={
                isActive
                  ? "rounded-full bg-[#2B4FA5] px-5 py-2 text-sm font-semibold text-white"
                  : "rounded-full px-5 py-2 text-sm font-semibold text-[#52615b] transition hover:text-[#2B4FA5]"
              }
              key={tab}
              onClick={() => setTab(tab)}
              type="button"
            >
              {t(labelKey)}
            </button>
          );
        })}
      </nav>

      {activeTab === "support" ? (
        <div>
          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2B4FA5]">
              {t("discover.eyebrow")}
            </p>
            <h1 className="mt-3 max-w-3xl text-5xl font-bold tracking-[-0.04em]">
              {t("discover.title")}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#52615b]">
              {t("discover.subtitle")}
            </p>
          </div>
          <DiscoverClient />
        </div>
      ) : null}

      {activeTab === "visa" ? <VisaPanel /> : null}

      {activeTab === "health" ? <HealthPanel /> : null}

      {activeTab === "checklists" ? (
        <div>
          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2B4FA5]">
              {t("checklists.eyebrow")}
            </p>
            <h1 className="mt-3 max-w-3xl text-5xl font-bold tracking-[-0.04em]">
              {t("checklists.title")}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#52615b]">
              {t("checklists.subtitle")}
            </p>
          </div>
          <ChecklistsClient />
        </div>
      ) : null}

      {activeTab === "naturalization" ? <NaturalizationPanel /> : null}
    </div>
  );
}
