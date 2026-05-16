"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

import { getCategoryLabel, recommendedCategoryIds, type UserProfile } from "@/lib/data";
import { defaultProfile, readStoredProfile } from "@/lib/profile";

export function ChatClient() {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [message, setMessage] = useState("I need help finding support near me.");
  const [reply, setReply] = useState(
    "Ask Nari about your city, visa timeline, healthcare, housing, employment, or family support.",
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setProfile(readStoredProfile());
    });
  }, []);

  const recommendedCategories = useMemo(() => recommendedCategoryIds(profile, 4), [profile]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, profile }),
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
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <aside className="h-fit rounded-[2rem] bg-white p-6 ring-1 ring-black/5">
        <p className="text-sm font-black text-[#ed9805]">Profile context</p>
        <dl className="mt-5 grid gap-4 text-sm">
          <div>
            <dt className="font-black">City</dt>
            <dd className="mt-1 text-[#52615b]">{profile.city}</dd>
          </div>
          <div>
            <dt className="font-black">Language</dt>
            <dd className="mt-1 text-[#52615b]">{profile.preferredLanguage}</dd>
          </div>
          <div>
            <dt className="font-black">Nationality</dt>
            <dd className="mt-1 text-[#52615b]">{profile.nationality || "Not provided"}</dd>
          </div>
          <div>
            <dt className="font-black">Age group</dt>
            <dd className="mt-1 text-[#52615b]">{profile.ageGroup}</dd>
          </div>
          <div>
            <dt className="font-black">Residency</dt>
            <dd className="mt-1 text-[#52615b]">{profile.residencyStatus}</dd>
          </div>
          <div>
            <dt className="font-black">Housing</dt>
            <dd className="mt-1 text-[#52615b]">{profile.housingStatus}</dd>
          </div>
          <div>
            <dt className="font-black">Employment</dt>
            <dd className="mt-1 text-[#52615b]">{profile.employmentStatus}</dd>
          </div>
          <div>
            <dt className="font-black">Family</dt>
            <dd className="mt-1 text-[#52615b]">{profile.familyStatus}</dd>
          </div>
          <div>
            <dt className="font-black">Visa</dt>
            <dd className="mt-1 text-[#52615b]">{profile.hasVisa}</dd>
          </div>
          <div>
            <dt className="font-black">Visa expiry</dt>
            <dd className="mt-1 text-[#52615b]">{profile.visaExpiryDate || "Not provided"}</dd>
          </div>
        </dl>
        <div className="mt-5">
          <p className="text-sm font-black">Recommended categories</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {recommendedCategories.map((category) => (
              <span
                className="rounded-full bg-[#10c4a9]/15 px-3 py-1 text-xs font-black text-[#0b8d79]"
                key={category}
              >
                {getCategoryLabel(category)}
              </span>
            ))}
          </div>
        </div>
      </aside>
      <form className="rounded-[2rem] bg-white p-6 ring-1 ring-black/5" onSubmit={handleSubmit}>
        <label className="text-sm font-black text-[#0b8d79]" htmlFor="chat-message">
          Ask Nari
        </label>
        <textarea
          className="mt-3 min-h-40 w-full resize-none rounded-3xl bg-[#fffaf0] p-5 text-lg font-bold outline-none ring-1 ring-black/5 focus:ring-2 focus:ring-[#10c4a9]"
          id="chat-message"
          onChange={(event) => setMessage(event.target.value)}
          value={message}
        />
        <button
          className="mt-4 rounded-full bg-[#ed9805] px-6 py-3 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? "Asking..." : "Ask with my profile"}
        </button>
        <div className="mt-6 rounded-3xl bg-[#fffaf0] p-6">
          <p className="font-black text-[#ed9805]">Answer</p>
          <p className="mt-4 whitespace-pre-wrap leading-7 text-[#52615b]">{reply}</p>
        </div>
      </form>
    </div>
  );
}
