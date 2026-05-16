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
    <form className="rounded-[2rem] bg-white p-5 text-[#17211f]" onSubmit={handleSubmit}>
      <label className="text-sm font-black text-[#0b8d79]" htmlFor="ai-message">
        {t("chatPreview.label")}
      </label>
      <textarea
        className="mt-3 min-h-28 w-full resize-none rounded-3xl bg-[#fffaf0] p-5 text-lg font-bold outline-none ring-1 ring-black/5 focus:ring-2 focus:ring-[#10c4a9]"
        id="ai-message"
        onChange={(event) => setCustomMessage(event.target.value)}
        value={message}
      />
      <button
        className="mt-3 rounded-full bg-[#ed9805] px-5 py-3 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isLoading}
        type="submit"
      >
        {isLoading ? t("common.asking") : t("chatPreview.button")}
      </button>
      <div className="mt-5 rounded-3xl bg-[#fffaf0] p-5">
        <p className="text-sm font-black text-[#ed9805]">{t("common.answer")}</p>
        <p className="mt-3 whitespace-pre-wrap leading-7 text-[#52615b]">{reply}</p>
      </div>
    </form>
  );
}
