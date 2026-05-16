"use client";

import { FormEvent, useState } from "react";

import { useLanguage } from "@/components/language-provider";

export function AiChatPreview() {
  const { t, locale } = useLanguage();
  const [customMessage, setCustomMessage] = useState<string | null>(null);
  const [customReply, setCustomReply] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const message = customMessage ?? t("chatPreview.defaultMessage");
  const reply = customReply ?? t("chatPreview.defaultReply");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, locale }),
      });
      const data = (await response.json()) as { reply?: string; error?: string };

      setCustomReply(data.reply ?? data.error ?? t("chat.unanswered"));
    } catch {
      setCustomReply(t("chat.networkError"));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className="rounded-3xl bg-white p-6 text-[#17211f]" onSubmit={handleSubmit}>
      <label
        className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2B4FA5]"
        htmlFor="ai-message"
      >
        {t("chatPreview.label")}
      </label>
      <textarea
        className="mt-3 min-h-28 w-full resize-none rounded-2xl border border-black/[0.06] bg-[#f6f7fb] p-4 text-base font-medium outline-none transition focus:border-[#2B4FA5] focus:ring-2 focus:ring-[#2B4FA5]/20"
        id="ai-message"
        onChange={(event) => setCustomMessage(event.target.value)}
        value={message}
      />
      <button
        className="mt-3 rounded-full bg-[#2B4FA5] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#23408a] disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isLoading}
        type="submit"
      >
        {isLoading ? t("common.asking") : t("chatPreview.button")}
      </button>
      <div className="mt-5 rounded-2xl border border-black/[0.06] bg-[#f6f7fb] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2B4FA5]">
          {t("common.answer")}
        </p>
        <p className="mt-3 whitespace-pre-wrap leading-7 text-[#52615b]">{reply}</p>
      </div>
    </form>
  );
}
