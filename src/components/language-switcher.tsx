"use client";

import { useId } from "react";

import { useLanguage } from "@/components/language-provider";
import { localeLabels, supportedLocales, type Locale } from "@/lib/i18n";

type LanguageSwitcherProps = {
  variant?: "header" | "inline";
};

export function LanguageSwitcher({ variant = "header" }: LanguageSwitcherProps) {
  const id = useId();
  const { locale, setLocale, t } = useLanguage();

  const labelClass =
    variant === "header"
      ? "sr-only"
      : "text-xs font-black uppercase tracking-[0.18em] text-[#6b756f]";

  const selectClass =
    variant === "header"
      ? "rounded-full bg-white px-4 py-2 text-sm font-black text-[#17211f] shadow-sm ring-1 ring-black/10 outline-none transition focus:ring-2 focus:ring-[#10c4a9]"
      : "rounded-2xl bg-[#fffaf0] px-4 py-3 text-sm font-bold outline-none ring-1 ring-black/5 focus:ring-2 focus:ring-[#10c4a9]";

  return (
    <div className="flex items-center gap-2">
      <label className={labelClass} htmlFor={id}>
        {t("header.language.label")}
      </label>
      <select
        aria-label={t("header.language.label")}
        className={selectClass}
        id={id}
        onChange={(event) => setLocale(event.target.value as Locale)}
        value={locale}
      >
        {supportedLocales.map((option) => (
          <option key={option} value={option}>
            {localeLabels[option]}
          </option>
        ))}
      </select>
    </div>
  );
}
