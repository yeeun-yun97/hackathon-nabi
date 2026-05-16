"use client";

import Link from "next/link";

import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/components/language-provider";
import type { TranslationKey } from "@/lib/i18n";

const navItems: Array<{ href: string; key: TranslationKey }> = [
  { href: "/discover", key: "header.nav.discover" },
  { href: "/visa", key: "header.nav.visa" },
  { href: "/health", key: "header.nav.health" },
  { href: "/checklists", key: "header.nav.checklists" },
  { href: "/faq", key: "header.nav.faq" },
  { href: "/community", key: "header.nav.community" },
  { href: "/chat", key: "header.nav.chat" },
];

export function SiteHeader() {
  const { t } = useLanguage();

  return (
    <header className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-6">
      <Link className="flex items-center gap-3" href="/">
        <div className="flex size-11 items-center justify-center rounded-2xl bg-[#10c4a9] font-black text-white shadow-lg shadow-teal-200">
          N
        </div>
        <div>
          <p className="text-lg font-black">Nari</p>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6b756f]">
            {t("header.brand.subtitle")}
          </p>
        </div>
      </Link>
      <nav className="hidden items-center gap-7 text-sm font-bold text-[#4e5a55] lg:flex">
        {navItems.map((item) => (
          <Link className="transition hover:text-[#0b8d79]" href={item.href} key={item.href}>
            {t(item.key)}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-3">
        <LanguageSwitcher />
        <Link
          className="rounded-full bg-[#17211f] px-5 py-3 text-sm font-black text-white"
          href="/onboarding"
        >
          {t("header.cta.setProfile")}
        </Link>
      </div>
    </header>
  );
}
