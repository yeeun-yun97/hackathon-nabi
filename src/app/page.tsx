"use client";

import Image from "next/image";
import Link from "next/link";

import { AiChatPreview } from "@/components/ai-chat-preview";
import { InfoExplorer } from "@/components/info-explorer";
import { SiteHeader } from "@/components/site-header";
import { useLanguage } from "@/components/language-provider";

const lifeMomentImages = [
  { src: "/life-in-korea1.webp", index: 0 },
  { src: "/life-in-korea2.webp", index: 1 },
  { src: "/life-in-korea3.webp", index: 2 },
] as const;

export default function Home() {
  const { t } = useLanguage();

  const services = [
    {
      key: "government",
      title: t("home.service.government.title"),
      label: t("home.service.government.label"),
      description: t("home.service.government.desc"),
    },
    {
      key: "health",
      title: t("home.service.health.title"),
      label: t("home.service.health.label"),
      description: t("home.service.health.desc"),
    },
    {
      key: "housing",
      title: t("home.service.housing.title"),
      label: t("home.service.housing.label"),
      description: t("home.service.housing.desc"),
    },
    {
      key: "language",
      title: t("home.service.language.title"),
      label: t("home.service.language.label"),
      description: t("home.service.language.desc"),
    },
  ];

  const faqs = [t("home.faqs.0"), t("home.faqs.1"), t("home.faqs.2")];

  const lifeMoments = lifeMomentImages.map(({ src, index }) => ({
    src,
    alt: t(`home.life.${index}.alt` as const),
    eyebrow: t(`home.life.${index}.eyebrow` as const),
    caption: t(`home.life.${index}.caption` as const),
  }));

  return (
    <div className="min-h-screen overflow-hidden bg-[#f6f7fb] text-[#17211f]">
      <SiteHeader />

      <main>
        {/* Visa status alert — the single most prominent teal usage */}
        <section className="mx-auto max-w-7xl px-6 pt-6">
          <Link
            className="group relative flex flex-col gap-4 overflow-hidden rounded-3xl bg-[#0f172a] p-5 text-white transition hover:-translate-y-0.5 sm:flex-row sm:items-center sm:justify-between"
            href="/visa/notification"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-[#13C3A8]"
            />
            <div className="flex items-start gap-4 pl-2">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#13C3A8]/15 text-[#13C3A8] ring-1 ring-[#13C3A8]/30">
                <svg aria-hidden className="size-5" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.36-6.36-.71.71M6.34 17.66l-.7.7M18.36 18.36l-.71-.71M6.34 6.34l-.7-.7M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.6"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#13C3A8]">
                  {t("home.visaAlert.eyebrow")}
                </p>
                <p className="mt-1.5 text-sm font-medium leading-6 text-white/80">
                  {t("home.visaAlert.body")}
                </p>
              </div>
            </div>
            <span className="ml-2 w-fit shrink-0 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0f172a] transition group-hover:bg-[#13C3A8] group-hover:text-white sm:ml-0">
              {t("home.visaAlert.cta")}
            </span>
          </Link>
        </section>

        {/* Hero — text + cinematic photo gallery */}
        <section className="mx-auto max-w-7xl px-6 pb-16 pt-10 lg:pt-16">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-black/[0.06] bg-white px-4 py-2 text-sm font-semibold text-[#2B4FA5]">
              <span className="size-1.5 rounded-full bg-[#2B4FA5]" />
              {t("home.heroBadge")}
            </div>
            <h1 className="mt-7 text-5xl font-bold tracking-[-0.04em] text-[#17211f] sm:text-6xl lg:text-7xl">
              {t("home.heroTitle")}
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-[#52615b]">
              {t("home.heroSubtitle")}
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                className="rounded-full bg-[#2B4FA5] px-7 py-3.5 text-center text-base font-semibold text-white transition hover:bg-[#23408a]"
                href="/onboarding"
              >
                {t("home.heroPrimaryCta")}
              </a>
              <a
                className="rounded-full border border-black/10 bg-white px-7 py-3.5 text-center text-base font-semibold text-[#17211f] transition hover:border-[#2B4FA5]/40 hover:text-[#2B4FA5]"
                href="/chat"
              >
                {t("home.heroSecondaryCta")}
              </a>
            </div>
          </div>

          <ul className="mt-14 grid gap-4 md:grid-cols-3">
            {lifeMoments.map((moment, index) => (
              <li
                className="group relative overflow-hidden rounded-3xl bg-[#0f172a]"
                key={moment.src}
              >
                <div className="relative aspect-[3/4]">
                  <Image
                    alt={moment.alt}
                    className="object-cover transition duration-700 ease-out group-hover:scale-105"
                    fill
                    priority={index === 0}
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    src={moment.src}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#0f172a]/85 via-[#0f172a]/30 to-transparent"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80">
                    {moment.eyebrow}
                  </p>
                  <p className="mt-2 text-2xl font-bold tracking-[-0.02em]">{moment.caption}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Program explorer */}
        <section className="mx-auto max-w-7xl px-6 pb-20 pt-4">
          <div className="mb-8 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2B4FA5]">
              {t("home.explorerEyebrow")}
            </p>
            <h2 className="mt-3 text-4xl font-bold tracking-[-0.03em]">
              {t("home.explorerTitle")}
            </h2>
            <p className="mt-4 leading-7 text-[#52615b]">{t("home.explorerDescription")}</p>
          </div>
          <InfoExplorer />
        </section>

        {/* Services grid */}
        <section className="border-y border-black/[0.06] bg-white py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2B4FA5]">
                  {t("home.servicesEyebrow")}
                </p>
                <h2 className="mt-3 text-4xl font-bold tracking-[-0.03em]">
                  {t("home.servicesTitle")}
                </h2>
              </div>
              <p className="max-w-xl text-[#52615b]">{t("home.servicesSubtitle")}</p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {services.map((service) => (
                <article
                  className="group rounded-3xl border border-black/[0.06] bg-white p-6 transition hover:-translate-y-1 hover:border-[#2B4FA5]/30 hover:shadow-lg hover:shadow-[#2B4FA5]/5"
                  key={service.key}
                >
                  <span className="rounded-full bg-[#2B4FA5]/8 px-3 py-1 text-xs font-semibold text-[#2B4FA5]">
                    {service.label}
                  </span>
                  <h3 className="mt-5 text-2xl font-bold tracking-[-0.02em]">{service.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#52615b]">{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Community + FAQ */}
        <section
          className="mx-auto grid max-w-7xl gap-6 px-6 py-20 lg:grid-cols-2"
          id="community"
        >
          <div className="rounded-3xl bg-[#0f172a] p-8 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
              {t("home.communityEyebrow")}
            </p>
            <h2 className="mt-3 text-4xl font-bold tracking-[-0.03em]">
              {t("home.communityTitle")}
            </h2>
            <p className="mt-5 leading-7 text-white/70">{t("home.communityDescription")}</p>
          </div>
          <div className="rounded-3xl border border-black/[0.06] bg-white p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2B4FA5]">
              {t("home.faqEyebrow")}
            </p>
            <div className="mt-5 grid gap-3">
              {faqs.map((faq) => (
                <details
                  className="rounded-2xl border border-black/[0.06] bg-[#f6f7fb] p-5 text-sm font-semibold open:border-[#2B4FA5]/20"
                  key={faq}
                >
                  <summary className="cursor-pointer">{faq}</summary>
                  <p className="mt-3 font-normal leading-6 text-[#52615b]">
                    {t("home.faqDescription")}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Health & Recreation */}
        <section className="mx-auto max-w-7xl px-6 pb-20">
          <div className="grid gap-6 rounded-3xl border border-black/[0.06] bg-white p-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2B4FA5]">
                {t("home.health.eyebrow")}
              </p>
              <h2 className="mt-3 max-w-2xl text-4xl font-bold tracking-[-0.03em]">
                {t("home.health.title")}
              </h2>
              <p className="mt-5 max-w-2xl leading-7 text-[#52615b]">
                {t("home.health.description")}
              </p>
            </div>
            <Link
              className="w-fit rounded-full bg-[#2B4FA5] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#23408a]"
              href="/discover?tab=health"
            >
              {t("home.health.cta")}
            </Link>
          </div>
        </section>

        {/* AI chat */}
        <section className="bg-[#0f172a] py-20 text-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
                {t("home.aiEyebrow")}
              </p>
              <h2 className="mt-3 text-4xl font-bold tracking-[-0.03em]">{t("home.aiTitle")}</h2>
              <p className="mt-5 leading-7 text-white/70">{t("home.aiDescription")}</p>
            </div>
            <AiChatPreview />
          </div>
        </section>
      </main>
    </div>
  );
}
