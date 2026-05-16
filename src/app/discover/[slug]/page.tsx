import { notFound } from "next/navigation";

import { SiteHeader } from "@/components/site-header";
import { SupportDetail } from "@/components/support-detail";
import { supportPrograms } from "@/lib/data";

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
      <SupportDetail program={program} />
    </main>
  );
}
