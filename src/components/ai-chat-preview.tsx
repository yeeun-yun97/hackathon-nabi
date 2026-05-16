"use client";

import { FormEvent, useState } from "react";

export function AiChatPreview() {
  const [message, setMessage] = useState(
    "I live in Seoul and need help with healthcare and visa renewal.",
  );
  const [reply, setReply] = useState(
    "I can help you prepare a visit checklist, find nearby public offices, compare free support programs, and explain what to verify with official institutions.",
  );
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = (await response.json()) as { reply?: string; error?: string };

      setReply(data.reply ?? data.error ?? "답변을 가져오지 못했어요.");
    } catch {
      setReply("네트워크 오류가 발생했어요. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className="rounded-[2rem] bg-white p-5 text-[#17211f]" onSubmit={handleSubmit}>
      <label className="text-sm font-black text-[#0b8d79]" htmlFor="ai-message">
        Nari AI
      </label>
      <textarea
        className="mt-3 min-h-28 w-full resize-none rounded-3xl bg-[#fffaf0] p-5 text-lg font-bold outline-none ring-1 ring-black/5 focus:ring-2 focus:ring-[#10c4a9]"
        id="ai-message"
        onChange={(event) => setMessage(event.target.value)}
        value={message}
      />
      <button
        className="mt-3 rounded-full bg-[#ed9805] px-5 py-3 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isLoading}
        type="submit"
      >
        {isLoading ? "Asking..." : "Ask Nari"}
      </button>
      <div className="mt-5 rounded-3xl bg-[#fffaf0] p-5">
        <p className="text-sm font-black text-[#ed9805]">Answer</p>
        <p className="mt-3 whitespace-pre-wrap leading-7 text-[#52615b]">{reply}</p>
      </div>
    </form>
  );
}
