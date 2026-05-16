"use client";

import { useLanguage } from "@/components/language-provider";
import { VisaNotificationCard } from "@/components/visa/VisaNotificationCard";

export default function VisaNotificationPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#1c2a4a_0%,#0f172a_45%,#05080f_100%)] px-6 py-10 text-white">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-sm flex-col">
        <div className="flex items-center justify-between text-xs font-semibold text-white/75">
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-4 rounded-sm border border-white/70" />
            <span className="size-2 rounded-full bg-white/80" />
          </span>
        </div>

        <div className="flex flex-1 flex-col justify-between pb-10 pt-20">
          <div className="text-center">
            <p className="text-7xl font-bold tracking-[-0.06em]">9:41</p>
            <p className="mt-3 text-lg font-medium text-white/75">
              {t("visa.notification.dateLabel")}
            </p>
          </div>

          <div>
            <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/45">
              {t("visa.notification.label")}
            </p>
            <VisaNotificationCard />
            <p className="mt-6 text-center text-xs font-medium text-white/45">
              {t("visa.notification.tapHint")}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
