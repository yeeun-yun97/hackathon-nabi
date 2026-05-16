"use client";

import { useLanguage } from "@/components/language-provider";

type KoreanTranslationShieldProps = {
  text: string;
  label?: string;
};

export function KoreanTranslationShield({ text, label }: KoreanTranslationShieldProps) {
  const { t } = useLanguage();
  const shownLabel = label ?? t("health.shield.label");

  async function copyText() {
    await navigator.clipboard.writeText(text);
  }

  return (
    <div className="rounded-2xl bg-[#0f172a] p-5 text-white">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
        {shownLabel}
      </p>
      <p className="mt-3 text-lg font-bold leading-8" lang="ko">
        {text}
      </p>
      <p className="mt-3 text-sm leading-6 text-white/65">{t("health.shield.note")}</p>
      <button
        className="mt-4 rounded-full bg-[#2B4FA5] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#23408a]"
        onClick={copyText}
        type="button"
      >
        {t("health.shield.copy")}
      </button>
    </div>
  );
}
