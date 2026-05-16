"use client";

import Image from "next/image";
import Link from "next/link";

import { useAuth } from "@/components/auth-provider";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/components/language-provider";
import type { TranslationKey } from "@/lib/i18n";

const navItems: Array<{ href: string; key: TranslationKey }> = [
  { href: "/discover", key: "header.nav.discover" },
  { href: "/faq", key: "header.nav.faq" },
  { href: "/community", key: "header.nav.community" },
  { href: "/chat", key: "header.nav.chat" },
];

export function SiteHeader() {
  const { t } = useLanguage();
  const { user, isLoading } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/[0.06] bg-[#f6f7fb]/85 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link className="flex items-center gap-3" href="/">
          <Image
            alt="nabi"
            className="h-auto w-32"
            height={1362}
            priority
            src="/nabi-logo.png"
            width={3790}
          />
          <p className="sr-only">{t("header.brand.subtitle")}</p>
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-semibold text-[#52615b] lg:flex">
          {navItems.map((item) => (
            <Link
              className="transition-colors hover:text-[#2B4FA5]"
              href={item.href}
              key={item.href}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>
        <div className="flex flex-wrap items-center gap-3">
          <LanguageSwitcher />
          {!isLoading && user ? (
            <Link
              aria-label={t("header.cta.myPage")}
              className="flex size-10 items-center justify-center rounded-full border border-black/[0.08] bg-white text-[#52615b] transition hover:border-[#2B4FA5]/40 hover:text-[#2B4FA5]"
              href="/me"
              title={t("header.cta.myPage")}
            >
              <span className="sr-only">{t("header.cta.myPage")}</span>
              <svg
                aria-hidden="true"
                className="size-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.7}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          ) : null}
          {!isLoading && !user ? (
            <Link
              className="rounded-full bg-[#2B4FA5] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#23408a]"
              href="/login"
            >
              {t("auth.signIn")}
            </Link>
          ) : null}
        </div>
      </div>
    </header>
  );
}
