import { FacilityGrid } from "@/components/health/FacilityGrid";
import { FacilityListByDistance } from "@/components/health/FacilityListByDistance";
import { SiteHeader } from "@/components/site-header";
import { mockFacilities } from "@/lib/data";

export default function HealthPage() {
  return (
    <main className="min-h-screen bg-[#fffaf0] text-[#17211f]">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-6 pb-20 pt-10">
        <div className="mb-10">
          <p className="font-black text-[#ed9805]">Health & Recreation</p>
          <h1 className="mt-3 max-w-3xl text-5xl font-black tracking-[-0.05em]">
            Find public gyms and pools that are easier to join.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#52615b]">
            Compare local facilities by sports, open hours, monthly public pricing, and the
            practical desk requirements foreigners need on the first visit.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div>
            <FacilityGrid facilities={mockFacilities} />
          </div>
          <aside className="lg:sticky lg:top-6 lg:h-fit">
            <FacilityListByDistance />
          </aside>
        </div>
      </div>
    </main>
  );
}
