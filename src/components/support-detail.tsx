"use client";

import Link from "next/link";

import { GoogleMapCard } from "@/components/google-map-card";
import { useLanguage } from "@/components/language-provider";
import type { SupportProgram } from "@/lib/data";

export function SupportDetail({ program }: { program: SupportProgram }) {
  const { t, tCategory, tCost, tLanguage, tLocalized } = useLanguage();

  return (
    <article className="mx-auto max-w-5xl px-6 pb-20 pt-10">
      <Link className="text-sm font-semibold text-[#2B4FA5] hover:underline" href="/discover">
        {t("discover.detail.back")}
      </Link>
      <div className="mt-8 rounded-3xl border border-black/[0.06] bg-white p-8">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-[#2B4FA5]/10 px-3 py-1 text-xs font-semibold text-[#2B4FA5]">
            {tCategory(program.category)}
          </span>
          <span className="rounded-full bg-[#0f172a]/[0.05] px-3 py-1 text-xs font-semibold text-[#52615b]">
            {tCost(program.cost)}
          </span>
          <span className="rounded-full bg-[#0f172a]/[0.05] px-3 py-1 text-xs font-semibold text-[#52615b]">
            {tLocalized(program.location)}
          </span>
        </div>
        <h1 className="mt-5 text-5xl font-bold tracking-[-0.04em]">{tLocalized(program.title)}</h1>
        <p className="mt-5 text-lg leading-8 text-[#52615b]">{tLocalized(program.description)}</p>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <section className="rounded-2xl border border-black/[0.06] bg-[#f6f7fb] p-6">
            <h2 className="text-xl font-bold tracking-[-0.02em]">
              {t("discover.detail.whatToBring")}
            </h2>
            <ul className="mt-4 grid gap-3 text-sm font-medium text-[#52615b]">
              {program.requiredDocuments.map((document) => (
                <li key={document.en}>{tLocalized(document)}</li>
              ))}
            </ul>
          </section>
          <section className="rounded-2xl border border-black/[0.06] bg-[#f6f7fb] p-6">
            <h2 className="text-xl font-bold tracking-[-0.02em]">{t("discover.detail.details")}</h2>
            <dl className="mt-4 grid gap-3 text-sm">
              <div>
                <dt className="font-semibold">{t("discover.detail.languages")}</dt>
                <dd className="mt-1 text-[#52615b]">
                  {program.languages.map((lang) => tLanguage(lang)).join(", ")}
                </dd>
              </div>
              <div>
                <dt className="font-semibold">{t("discover.detail.contact")}</dt>
                <dd className="mt-1 text-[#52615b]">{program.contact}</dd>
              </div>
              <div>
                <dt className="font-semibold">{t("discover.detail.updated")}</dt>
                <dd className="mt-1 text-[#52615b]">{program.updatedAt}</dd>
              </div>
            </dl>
          </section>
        </div>

        <GoogleMapCard
          address={program.address}
          mapQuery={program.mapQuery}
          title={tLocalized(program.title)}
        />

        <div className="mt-8 rounded-2xl bg-[#0f172a] p-6 text-white">
          <h2 className="text-xl font-bold tracking-[-0.02em]">
            {t("discover.detail.beforeYouGo")}
          </h2>
          <p className="mt-3 leading-7 text-white/70">
            {t("discover.detail.beforeYouGoDescription")}
          </p>
          <a
            className="mt-5 inline-flex rounded-full bg-[#2B4FA5] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#23408a]"
            href={program.officialUrl}
            rel="noreferrer"
            target="_blank"
          >
            {t("discover.detail.openOfficial")}
          </a>
        </div>
      </div>
    </article>
  );
}
