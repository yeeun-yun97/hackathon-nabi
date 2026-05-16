"use client";

import Link from "next/link";

import { useLanguage } from "@/components/language-provider";
import type { CommunityPost } from "@/lib/data";

export function CommunityDetail({ post }: { post: CommunityPost }) {
  const { t, tCategory, tCity, tLocalized } = useLanguage();

  return (
    <article className="mx-auto max-w-4xl px-6 pb-20 pt-10">
      <Link className="text-sm font-semibold text-[#2B4FA5] hover:underline" href="/community">
        {t("community.detail.back")}
      </Link>
      <div className="mt-8 rounded-3xl border border-black/[0.06] bg-white p-8">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-[#2B4FA5]/10 px-3 py-1 text-xs font-semibold text-[#2B4FA5]">
            {tCategory(post.category)}
          </span>
          <span className="rounded-full bg-[#0f172a]/[0.05] px-3 py-1 text-xs font-semibold text-[#52615b]">
            {tCity(post.city)}
          </span>
        </div>
        <h1 className="mt-5 text-5xl font-bold tracking-[-0.04em]">{tLocalized(post.title)}</h1>
        <p className="mt-3 text-sm font-semibold text-[#2B4FA5]">
          {t("community.detail.byAuthorUpdated", {
            name: post.author,
            date: post.updatedAt,
          })}
        </p>
        <p className="mt-8 text-lg leading-8 text-[#52615b]">{tLocalized(post.body)}</p>
        <div className="mt-8 rounded-2xl border border-black/[0.06] bg-[#f6f7fb] p-5">
          <p className="font-semibold">{t("community.detail.safetyNote")}</p>
          <p className="mt-2 leading-7 text-[#52615b]">
            {t("community.detail.safetyNoteDescription")}
          </p>
        </div>
      </div>
      <section className="mt-8 grid gap-4">
        <h2 className="text-2xl font-bold tracking-[-0.02em]">{t("community.detail.replies")}</h2>
        {post.replies.map((reply) => (
          <div
            className="rounded-3xl border border-black/[0.06] bg-white p-6"
            key={`${reply.author}-${reply.body.en}`}
          >
            <p className="font-semibold">{reply.author}</p>
            <p className="mt-3 leading-7 text-[#52615b]">{tLocalized(reply.body)}</p>
          </div>
        ))}
      </section>
    </article>
  );
}
