import { notFound } from "next/navigation";

import { FacilityDetailPanel } from "@/components/health/FacilityDetailPanel";
import { FirstVisitOnboardingCard } from "@/components/health/FirstVisitOnboardingCard";
import { JoinRequirementsCard } from "@/components/health/JoinRequirementsCard";
import { SiteHeader } from "@/components/site-header";
import { mockFacilities } from "@/lib/data";

type FacilityDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return mockFacilities.map((facility) => ({ slug: facility.slug }));
}

export default async function FacilityDetailPage({ params }: FacilityDetailPageProps) {
  const { slug } = await params;
  const facility = mockFacilities.find((item) => item.slug === slug);

  if (!facility) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#fffaf0] text-[#17211f]">
      <SiteHeader />
      <article className="mx-auto max-w-5xl px-6 pb-20 pt-10">
        <FacilityDetailPanel facility={facility} />
        <div className="mt-8 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <JoinRequirementsCard facility={facility} />
          <FirstVisitOnboardingCard facility={facility} />
        </div>
      </article>
    </main>
  );
}
