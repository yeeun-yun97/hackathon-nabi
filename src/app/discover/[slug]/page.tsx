import Link from "next/link";
import { notFound } from "next/navigation";

import { GoogleMapCard } from "@/components/google-map-card";
import { SiteHeader } from "@/components/site-header";
import { getCategoryLabel, supportPrograms } from "@/lib/data";

type SupportDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return supportPrograms.map((program) => ({ slug: program.slug }));
}

export default async function SupportDetailPage({ params }: SupportDetailPageProps) {
  const { slug } = await params;
  const program = supportPrograms.find((item) => item.slug === slug);

  if (!program) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#fffaf0] text-[#17211f]">
      <SiteHeader />
      <article className="mx-auto max-w-5xl px-6 pb-20 pt-10">
        <Link className="text-sm font-black text-[#0b8d79]" href="/discover">
          Back to discover
        </Link>
        <div className="mt-8 rounded-[2.5rem] bg-white p-8 shadow-sm ring-1 ring-black/5">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-[#10c4a9]/15 px-3 py-1 text-xs font-black text-[#0b8d79]">
              {getCategoryLabel(program.category)}
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
              <h2 className="text-xl font-black">What to bring</h2>
              <ul className="mt-4 grid gap-3 text-sm font-bold text-[#52615b]">
                {program.requiredDocuments.map((document) => (
                  <li key={document}>{document}</li>
                ))}
              </ul>
            </section>
            <section className="rounded-3xl bg-[#fffaf0] p-6">
              <h2 className="text-xl font-black">Details</h2>
              <dl className="mt-4 grid gap-3 text-sm">
                <div>
                  <dt className="font-black">Languages</dt>
                  <dd className="mt-1 text-[#52615b]">{program.languages.join(", ")}</dd>
                </div>
                <div>
                  <dt className="font-black">Contact</dt>
                  <dd className="mt-1 text-[#52615b]">{program.contact}</dd>
                </div>
                <div>
                  <dt className="font-black">Updated</dt>
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
            <h2 className="text-xl font-black">Before you go</h2>
            <p className="mt-3 leading-7 text-white/70">
              Legal, visa, medical, and emergency matters can change by personal situation.
              Always verify requirements with the official institution before visiting.
            </p>
            <a
              className="mt-5 inline-flex rounded-full bg-[#ed9805] px-5 py-3 text-sm font-black text-white"
              href={program.officialUrl}
              rel="noreferrer"
              target="_blank"
            >
              Open official site
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}
