"use client";

import Link from "next/link";

import { AiChatPreview } from "@/components/ai-chat-preview";
import { InfoExplorer } from "@/components/info-explorer";
import { SiteHeader } from "@/components/site-header";
import { useLanguage } from "@/components/language-provider";

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

  return (
    <div className="min-h-screen overflow-hidden bg-[#fffaf0] text-[#17211f]">
      <SiteHeader />

      <main>
        <section className="mx-auto max-w-7xl px-6 pt-4">
          <Link
            className="group flex flex-col gap-3 rounded-[2rem] bg-[#17211f] p-5 text-white shadow-xl shadow-teal-100 transition hover:-translate-y-0.5 sm:flex-row sm:items-center sm:justify-between"
            href="/visa/notification"
          >
            <div className="flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#10c4a9] text-xl">
                Bell
              </div>
              <div>
                <p className="text-sm font-black text-[#10c4a9]">Visa Status Update</p>
                <p className="mt-1 text-sm font-bold leading-6 text-white/80">
                  Your current residence permit expires in 180 days. Based on your updated
                  employment profile, you may be eligible for an EU Blue Card. Review your options.
                </p>
              </div>
            </div>
            <span className="w-fit rounded-full bg-white px-4 py-2 text-sm font-black text-[#17211f] transition group-hover:bg-[#ed9805] group-hover:text-white">
              Open mock lock screen
            </span>
          </Link>
        </section>

        <section className="relative mx-auto grid w-full max-w-7xl gap-12 px-6 pb-20 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pt-20">
          <div className="absolute left-1/2 top-10 -z-10 size-[520px] -translate-x-1/2 rounded-full bg-[#10c4a9]/15 blur-3xl" />
          <div>
            <div className="mb-7 inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-[#0d8f7d] shadow-sm ring-1 ring-black/5">
              {t("home.heroBadge")}
            </div>
            <h1 className="max-w-3xl text-5xl font-black tracking-[-0.05em] text-[#17211f] sm:text-6xl lg:text-7xl">
              {t("home.heroTitle")}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#52615b]">
              {t("home.heroSubtitle")}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                className="rounded-full bg-[#ed9805] px-7 py-4 text-center text-base font-black text-white shadow-xl shadow-orange-200 transition hover:-translate-y-0.5"
                href="/onboarding"
              >
                {t("home.heroPrimaryCta")}
              </a>
              <a
                className="rounded-full bg-white px-7 py-4 text-center text-base font-black text-[#17211f] shadow-sm ring-1 ring-black/10 transition hover:-translate-y-0.5"
                href="/chat"
              >
                {t("home.heroSecondaryCta")}
              </a>
            </div>
          </div>

          <InfoExplorer />
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="font-black text-[#ed9805]">{t("home.servicesEyebrow")}</p>
                <h2 className="mt-3 text-4xl font-black tracking-[-0.04em]">
                  {t("home.servicesTitle")}
                </h2>
              </div>
              <p className="max-w-xl text-[#52615b]">{t("home.servicesSubtitle")}</p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {services.map((service) => (
                <article
                  className="rounded-[2rem] bg-[#fffaf0] p-6 ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-100"
                  key={service.key}
                >
                  <span className="rounded-full bg-[#10c4a9]/15 px-3 py-1 text-xs font-black text-[#0b8d79]">
                    {service.label}
                  </span>
                  <h3 className="mt-5 text-2xl font-black">{service.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-[#52615b]">
                    {service.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="mx-auto grid max-w-7xl gap-6 px-6 py-20 lg:grid-cols-2"
          id="community"
        >
          <div className="rounded-[2rem] bg-[#10c4a9] p-8 text-white">
            <p className="font-black text-white/70">{t("home.communityEyebrow")}</p>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.04em]">
              {t("home.communityTitle")}
            </h2>
            <p className="mt-5 leading-7 text-white/80">{t("home.communityDescription")}</p>
          </div>
          <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5">
            <p className="font-black text-[#ed9805]">{t("home.faqEyebrow")}</p>
            <div className="mt-5 grid gap-3">
              {faqs.map((faq) => (
                <details
                  className="rounded-2xl bg-[#fffaf0] p-5 text-sm font-bold"
                  key={faq}
                >
                  <summary className="cursor-pointer">{faq}</summary>
                  <p className="mt-3 font-medium leading-6 text-[#52615b]">
                    {t("home.faqDescription")}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-20">
          <div className="grid gap-6 rounded-[2.5rem] bg-[#10c4a9] p-8 text-white shadow-xl shadow-teal-100 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="font-black text-white/70">Health & Recreation</p>
              <h2 className="mt-3 max-w-2xl text-4xl font-black tracking-[-0.04em]">
                Compare public gyms, pools, and first-visit rules near your district.
              </h2>
              <p className="mt-5 max-w-2xl leading-7 text-white/80">
                See ARC requirements, resident pricing, local-card payment notes, indoor-shoe rules,
                and a Korean desk prompt before you visit.
              </p>
            </div>
            <Link
              className="w-fit rounded-full bg-white px-6 py-4 text-sm font-black text-[#17211f] transition hover:-translate-y-0.5"
              href="/health"
            >
              Explore facilities
            </Link>
          </div>
        </section>

        <section className="bg-[#17211f] py-20 text-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="font-black text-[#10c4a9]">{t("home.aiEyebrow")}</p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.04em]">
                {t("home.aiTitle")}
              </h2>
              <p className="mt-5 leading-7 text-white/70">{t("home.aiDescription")}</p>
            </div>
            <AiChatPreview />
          </div>
        </section>
      </main>
    </div>
  );
}
