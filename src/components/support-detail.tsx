"use client";

import Link from "next/link";

import { GoogleMapCard } from "@/components/google-map-card";
import { useLanguage } from "@/components/language-provider";
import type { SupportProgram } from "@/lib/data";

export function SupportDetail({ program }: { program: SupportProgram }) {
  const { t, tCategory } = useLanguage();

  return (
    <article className="mx-auto max-w-5xl px-6 pb-20 pt-10">
      <Link className="text-sm font-black text-[#0b8d79]" href="/discover">
        {t("discover.detail.back")}
      </Link>
      <div className="mt-8 rounded-[2.5rem] bg-white p-8 shadow-sm ring-1 ring-black/5">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-[#10c4a9]/15 px-3 py-1 text-xs font-black text-[#0b8d79]">
            {tCategory(program.category)}
          </span>
          <span className="rounded-full bg-[#ed9805]/15 px-3 py-1 text-xs font-black text-[#b66f00]">
            {program.cost}
          </span>
          <span className="rounded-full bg-[#17211f]/10 px-3 py-1 text-xs font-black text-[#52615b]">
            {program.location}
          </span>
        </div>
        <h1 className="mt-5 text-5xl font-black tracking-[-0.05em]">{program.title}</h1>
        <p className="mt-5 text-lg leading-8 text-[#52615b]">{program.description}</p>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <section className="rounded-3xl bg-[#fffaf0] p-6">
            <h2 className="text-xl font-black">{t("discover.detail.whatToBring")}</h2>
            <ul className="mt-4 grid gap-3 text-sm font-bold text-[#52615b]">
              {program.requiredDocuments.map((document) => (
                <li key={document}>{document}</li>
              ))}
            </ul>
          </section>
          <section className="rounded-3xl bg-[#fffaf0] p-6">
            <h2 className="text-xl font-black">{t("discover.detail.details")}</h2>
            <dl className="mt-4 grid gap-3 text-sm">
              <div>
                <dt className="font-black">{t("discover.detail.languages")}</dt>
                <dd className="mt-1 text-[#52615b]">{program.languages.join(", ")}</dd>
              </div>
              <div>
                <dt className="font-black">{t("discover.detail.contact")}</dt>
                <dd className="mt-1 text-[#52615b]">{program.contact}</dd>
              </div>
              <div>
                <dt className="font-black">{t("discover.detail.updated")}</dt>
                <dd className="mt-1 text-[#52615b]">{program.updatedAt}</dd>
              </div>
            </dl>
          </section>
        </div>

        <GoogleMapCard
          address={program.address}
          mapQuery={program.mapQuery}
          title={program.title}
        />

        <div className="mt-8 rounded-3xl bg-[#17211f] p-6 text-white">
          <h2 className="text-xl font-black">{t("discover.detail.beforeYouGo")}</h2>
          <p className="mt-3 leading-7 text-white/70">
            {t("discover.detail.beforeYouGoDescription")}
          </p>
          <a
            className="mt-5 inline-flex rounded-full bg-[#ed9805] px-5 py-3 text-sm font-black text-white"
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
