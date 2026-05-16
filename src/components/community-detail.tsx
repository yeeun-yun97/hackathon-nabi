"use client";

import Link from "next/link";

import { useLanguage } from "@/components/language-provider";
import type { CommunityPost } from "@/lib/data";

export function CommunityDetail({ post }: { post: CommunityPost }) {
  const { t, tCategory, tCity } = useLanguage();

  return (
    <article className="mx-auto max-w-4xl px-6 pb-20 pt-10">
      <Link className="text-sm font-black text-[#0b8d79]" href="/community">
        {t("community.detail.back")}
      </Link>
      <div className="mt-8 rounded-[2.5rem] bg-white p-8 ring-1 ring-black/5">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-[#10c4a9]/15 px-3 py-1 text-xs font-black text-[#0b8d79]">
            {tCategory(post.category)}
          </span>
          <span className="rounded-full bg-[#17211f]/10 px-3 py-1 text-xs font-black text-[#52615b]">
            {tCity(post.city)}
          </span>
        </div>
        <h1 className="mt-5 text-5xl font-black tracking-[-0.05em]">{post.title}</h1>
        <p className="mt-3 text-sm font-black text-[#ed9805]">
          {t("community.detail.byAuthorUpdated", {
            name: post.author,
            date: post.updatedAt,
          })}
        </p>
        <p className="mt-8 text-lg leading-8 text-[#52615b]">{post.body}</p>
        <div className="mt-8 rounded-3xl bg-[#fffaf0] p-5">
          <p className="font-black">{t("community.detail.safetyNote")}</p>
          <p className="mt-2 leading-7 text-[#52615b]">
            {t("community.detail.safetyNoteDescription")}
          </p>
        </div>
      </div>
      <section className="mt-8 grid gap-4">
        <h2 className="text-2xl font-black">{t("community.detail.replies")}</h2>
        {post.replies.map((reply) => (
          <div
            className="rounded-3xl bg-white p-6 ring-1 ring-black/5"
            key={`${reply.author}-${reply.body}`}
          >
            <p className="font-black">{reply.author}</p>
            <p className="mt-3 leading-7 text-[#52615b]">{reply.body}</p>
          </div>
        ))}
      </section>
    </article>
  );
}
