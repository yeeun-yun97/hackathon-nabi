"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

import { useAuth } from "@/components/auth-provider";
import { useLanguage } from "@/components/language-provider";
import {
  cities,
  serviceCategories,
  type City,
  type ServiceCategory,
} from "@/lib/data";
import { createRemotePost } from "@/lib/community-db";
import { defaultProfile, readStoredProfile } from "@/lib/profile";

const cardClass = "rounded-3xl border border-black/[0.06] bg-white p-8";
const inputClass =
  "mt-2 w-full rounded-2xl border border-black/[0.08] bg-[#f6f7fb] px-4 py-3 text-base outline-none transition focus:border-[#2B4FA5] focus:ring-2 focus:ring-[#2B4FA5]/20";

export function CommunityNewPost() {
  const { t, tCity, tCategory } = useLanguage();
  const { user, profile, isLoading } = useAuth();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [city, setCity] = useState<City>(defaultProfile.city);
  const [category, setCategory] = useState<ServiceCategory>(serviceCategories[0].id);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.replace("/login?redirectTo=/community/new");
      return;
    }
    queueMicrotask(() => {
      const stored = readStoredProfile();
      setCity(stored.city);
    });
  }, [isLoading, user, router]);

  useEffect(() => {
    const fallback = profile?.displayName ?? user?.email?.split("@")[0];
    if (!fallback) return;
    queueMicrotask(() => {
      setAuthorName((current) => (current.length === 0 ? fallback : current));
    });
  }, [profile, user]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const trimmedTitle = title.trim();
    const trimmedBody = body.trim();
    const trimmedAuthor = authorName.trim();

    if (trimmedTitle.length < 3 || trimmedBody.length < 10 || trimmedAuthor.length < 2) {
      setError(t("community.fields.titlePlaceholder"));
      return;
    }

    setSubmitting(true);
    try {
      const result = await createRemotePost({
        title: trimmedTitle,
        body: trimmedBody,
        category,
        city,
        authorName: trimmedAuthor,
      });

      if (result.error || !result.post) {
        setError(result.error ?? "Unable to publish.");
        return;
      }

      router.push(`/community/${result.post.slug}`);
    } finally {
      setSubmitting(false);
    }
  }

  if (isLoading || !user) {
    return null;
  }

  return (
    <div className="mx-auto max-w-3xl px-6 pb-20 pt-10">
      <Link className="text-sm font-semibold text-[#2B4FA5] hover:underline" href="/community">
        {t("community.writeBack")}
      </Link>
      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2B4FA5]">
          {t("header.nav.community")}
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-[-0.03em]">
          {t("community.writeTitle")}
        </h1>
        <p className="mt-3 leading-7 text-[#52615b]">{t("community.writeSubtitle")}</p>
      </div>
      <form className={`${cardClass} mt-8 grid gap-5`} onSubmit={handleSubmit}>
        <label className="block">
          <span className="text-sm font-semibold">{t("community.fields.title")}</span>
          <input
            className={inputClass}
            maxLength={140}
            onChange={(event) => setTitle(event.target.value)}
            placeholder={t("community.fields.titlePlaceholder")}
            required
            type="text"
            value={title}
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold">{t("community.fields.author")}</span>
          <input
            className={inputClass}
            maxLength={60}
            onChange={(event) => setAuthorName(event.target.value)}
            placeholder={t("community.fields.authorPlaceholder")}
            required
            type="text"
            value={authorName}
          />
        </label>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold">{t("community.fields.category")}</span>
            <select
              className={inputClass}
              onChange={(event) => setCategory(event.target.value as ServiceCategory)}
              value={category}
            >
              {serviceCategories.map((c) => (
                <option key={c.id} value={c.id}>
                  {tCategory(c.id)}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-semibold">{t("community.fields.city")}</span>
            <select
              className={inputClass}
              onChange={(event) => setCity(event.target.value as City)}
              value={city}
            >
              {cities.map((c) => (
                <option key={c} value={c}>
                  {tCity(c)}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label className="block">
          <span className="text-sm font-semibold">{t("community.fields.body")}</span>
          <textarea
            className={`${inputClass} min-h-48 resize-y`}
            maxLength={4000}
            onChange={(event) => setBody(event.target.value)}
            placeholder={t("community.fields.bodyPlaceholder")}
            required
            value={body}
          />
        </label>
        {error ? (
          <p className="rounded-2xl bg-[#ffe1e1] px-4 py-3 text-sm font-medium text-[#a40000]">
            {error}
          </p>
        ) : null}
        <button
          className="w-fit rounded-full bg-[#2B4FA5] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#23408a] disabled:cursor-not-allowed disabled:opacity-60"
          disabled={submitting}
          type="submit"
        >
          {submitting ? t("community.publishing") : t("community.publish")}
        </button>
      </form>
    </div>
  );
}
