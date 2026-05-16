import { DiscoverClient } from "@/components/discover-client";
import { SiteHeader } from "@/components/site-header";

export default function DiscoverPage() {
  return (
    <main className="min-h-screen bg-[#fffaf0] text-[#17211f]">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-6 pb-20 pt-10">
        <div className="mb-10">
          <p className="font-black text-[#ed9805]">Discover support</p>
          <h1 className="mt-3 max-w-3xl text-5xl font-black tracking-[-0.05em]">
            Find public help and local services near you.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#52615b]">
            지역구와 관심 카테고리를 기준으로 정부지원, 의료, 교육, 교통, 법률,
            노동 정보를 필터링합니다.
          </p>
        </div>
        <DiscoverClient />
      </div>
    </main>
  );
}
