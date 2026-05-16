"use client";

import { useState, type MouseEvent } from "react";

import { useLanguage } from "@/components/language-provider";

type Props = {
  isScrapped: boolean;
  onToggle: () => void | Promise<void>;
  size?: "sm" | "md";
};

export function ScrapButton({ isScrapped, onToggle, size = "md" }: Props) {
  const { t } = useLanguage();
  const [busy, setBusy] = useState(false);

  const label = isScrapped ? t("community.scrap.remove") : t("community.scrap.add");

  async function handleClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    if (busy) return;
    setBusy(true);
    try {
      await onToggle();
    } finally {
      setBusy(false);
    }
  }

  const sizeClass = size === "sm" ? "size-9" : "size-10";
  const iconSize = size === "sm" ? "size-4" : "size-5";

  return (
    <button
      aria-label={label}
      aria-pressed={isScrapped}
      className={`flex ${sizeClass} items-center justify-center rounded-full border transition disabled:cursor-not-allowed disabled:opacity-50 ${
        isScrapped
          ? "border-[#2B4FA5] bg-[#2B4FA5] text-white hover:bg-[#23408a]"
          : "border-black/[0.08] bg-white text-[#52615b] hover:border-[#2B4FA5]/40 hover:text-[#2B4FA5]"
      }`}
      disabled={busy}
      onClick={handleClick}
      title={label}
      type="button"
    >
      <span className="sr-only">{label}</span>
      <svg
        aria-hidden="true"
        className={iconSize}
        fill={isScrapped ? "currentColor" : "none"}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M6 4.75A1.75 1.75 0 0 1 7.75 3h8.5A1.75 1.75 0 0 1 18 4.75v15.5l-6-3.5-6 3.5V4.75Z" />
      </svg>
    </button>
  );
}
