"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

import { useLanguage } from "@/components/language-provider";
import { recommendedCategoryIds, type UserProfile } from "@/lib/data";
import { defaultProfile, readStoredProfile } from "@/lib/profile";

export function ChatClient() {
  const { t, tCategory, tCity, tOption, locale } = useLanguage();
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [customMessage, setCustomMessage] = useState<string | null>(null);
  const [customReply, setCustomReply] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const message = customMessage ?? t("chat.defaultMessage");
  const reply = customReply ?? t("chat.defaultReply");

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
        body: JSON.stringify({ message, profile, locale }),
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
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <aside className="h-fit rounded-[2rem] bg-white p-6 ring-1 ring-black/5">
        <p className="text-sm font-black text-[#ed9805]">{t("chat.profileContext")}</p>
        <dl className="mt-5 grid gap-4 text-sm">
          <div>
            <dt className="font-black">{t("chat.field.city")}</dt>
            <dd className="mt-1 text-[#52615b]">{tCity(profile.city)}</dd>
          </div>
          <div>
            <dt className="font-black">{t("chat.field.language")}</dt>
            <dd className="mt-1 text-[#52615b]">{profile.preferredLanguage}</dd>
          </div>
          <div>
            <dt className="font-black">{t("chat.field.nationality")}</dt>
            <dd className="mt-1 text-[#52615b]">{profile.nationality || t("common.notProvided")}</dd>
          </div>
          <div>
            <dt className="font-black">{t("chat.field.ageGroup")}</dt>
            <dd className="mt-1 text-[#52615b]">{tOption("age", profile.ageGroup)}</dd>
          </div>
          <div>
            <dt className="font-black">{t("chat.field.residency")}</dt>
            <dd className="mt-1 text-[#52615b]">
              {tOption("residency", profile.residencyStatus)}
            </dd>
          </div>
          <div>
            <dt className="font-black">{t("chat.field.housing")}</dt>
            <dd className="mt-1 text-[#52615b]">{tOption("housing", profile.housingStatus)}</dd>
          </div>
          <div>
            <dt className="font-black">{t("chat.field.employment")}</dt>
            <dd className="mt-1 text-[#52615b]">
              {tOption("employment", profile.employmentStatus)}
            </dd>
          </div>
          <div>
            <dt className="font-black">{t("chat.field.family")}</dt>
            <dd className="mt-1 text-[#52615b]">{tOption("family", profile.familyStatus)}</dd>
          </div>
          <div>
            <dt className="font-black">{t("chat.field.visa")}</dt>
            <dd className="mt-1 text-[#52615b]">{tOption("yesNo", profile.hasVisa)}</dd>
          </div>
          <div>
            <dt className="font-black">{t("chat.field.visaExpiry")}</dt>
            <dd className="mt-1 text-[#52615b]">
              {profile.visaExpiryDate || t("common.notProvided")}
            </dd>
          </div>
        </dl>
        <div className="mt-5">
          <p className="text-sm font-black">{t("chat.recommendedCategories")}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {recommendedCategories.map((category) => (
              <span
                className="rounded-full bg-[#10c4a9]/15 px-3 py-1 text-xs font-black text-[#0b8d79]"
                key={category}
              >
                {tCategory(category)}
              </span>
            ))}
          </div>
        </div>
      </aside>
      <form className="rounded-[2rem] bg-white p-6 ring-1 ring-black/5" onSubmit={handleSubmit}>
        <label className="text-sm font-black text-[#0b8d79]" htmlFor="chat-message">
          {t("chat.askLabel")}
        </label>
        <textarea
          className="mt-3 min-h-40 w-full resize-none rounded-3xl bg-[#fffaf0] p-5 text-lg font-bold outline-none ring-1 ring-black/5 focus:ring-2 focus:ring-[#10c4a9]"
          id="chat-message"
          onChange={(event) => setCustomMessage(event.target.value)}
          value={message}
        />
        <button
          className="mt-4 rounded-full bg-[#ed9805] px-6 py-3 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? t("common.asking") : t("chat.button")}
        </button>
        <div className="mt-6 rounded-3xl bg-[#fffaf0] p-6">
          <p className="font-black text-[#ed9805]">{t("common.answer")}</p>
          <p className="mt-4 whitespace-pre-wrap leading-7 text-[#52615b]">{reply}</p>
        </div>
      </form>
    </div>
  );
}
