"use client";

import Link from "next/link";

import { useLanguage } from "@/components/language-provider";

type VisaNotificationCardProps = {
  href?: string;
};

export function VisaNotificationCard({ href = "/visa/biometric" }: VisaNotificationCardProps) {
  const { t } = useLanguage();
  const title = t("visa.notification.title");
  const body = t("visa.notification.body");

  return (
    <Link
      aria-label={`${title}. ${body}`}
      className="block rounded-3xl bg-white/95 p-5 text-[#17211f] shadow-2xl shadow-black/30 ring-1 ring-white/40 backdrop-blur transition hover:-translate-y-1 hover:bg-white"
      href={href}
    >
      <div className="flex items-start gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#13C3A8] font-bold text-white">
          nb
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold">{t("visa.notification.brand")}</p>
            <p className="shrink-0 text-xs font-medium text-[#52615b]">
              {t("visa.notification.timestamp")}
            </p>
          </div>
          <h2 className="mt-1 text-xl font-bold tracking-[-0.02em]">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-[#52615b]">{body}</p>
        </div>
      </div>
    </Link>
  );
}
