import { CommunityClient } from "@/components/community-client";
import { SiteHeader } from "@/components/site-header";

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-[#fffaf0] text-[#17211f]">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-6 pb-20 pt-10">
        <p className="font-black text-[#ed9805]">Community</p>
        <h1 className="mt-3 max-w-3xl text-5xl font-black tracking-[-0.05em]">
          Learn from people nearby.
        </h1>
        <p className="mb-10 mt-5 max-w-2xl text-lg leading-8 text-[#52615b]">
          같은 지역에서 경험한 행정, 의료, 수업, 생활 정보를 찾아봅니다.
        </p>
        <CommunityClient />
      </div>
    </main>
  );
}
