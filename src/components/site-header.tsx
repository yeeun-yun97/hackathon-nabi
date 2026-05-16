"use client";

import Image from "next/image";
import Link from "next/link";

import { useAuth } from "@/components/auth-provider";
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
  const { user, profile, signOut, isLoading } = useAuth();

  const displayName = profile?.displayName ?? user?.email?.split("@")[0] ?? "";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/[0.06] bg-[#f6f7fb]/85 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link className="flex items-center gap-3" href="/">
          <Image
            alt="nabi"
            className="h-auto w-32"
            height={390}
            priority
            src="/logo.png"
            width={1294}
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
            <>
              <span className="hidden text-sm font-semibold text-[#52615b] sm:inline">
                {t("auth.greeting", { name: displayName })}
              </span>
              <button
                className="rounded-full border border-black/[0.08] bg-white px-4 py-2 text-sm font-semibold text-[#52615b] transition hover:border-[#2B4FA5]/40 hover:text-[#2B4FA5]"
                onClick={() => {
                  void signOut();
                }}
                type="button"
              >
                {t("auth.signOut")}
              </button>
            </>
          ) : null}
          {!isLoading && !user ? (
            <>
              <Link
                className="rounded-full border border-black/[0.08] bg-white px-4 py-2 text-sm font-semibold text-[#52615b] transition hover:border-[#2B4FA5]/40 hover:text-[#2B4FA5]"
                href="/login"
              >
                {t("auth.signIn")}
              </Link>
              <Link
                className="rounded-full bg-[#2B4FA5] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#23408a]"
                href="/signup"
              >
                {t("auth.signUp")}
              </Link>
            </>
          ) : null}
          <Link
            className="rounded-full border border-black/[0.08] bg-white px-4 py-2 text-sm font-semibold text-[#52615b] transition hover:border-[#2B4FA5]/40 hover:text-[#2B4FA5]"
            href="/onboarding"
          >
            {t("header.cta.setProfile")}
          </Link>
        </div>
      </div>
    </header>
  );
}
