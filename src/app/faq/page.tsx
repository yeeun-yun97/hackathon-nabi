import { FaqClient } from "@/components/faq-client";
import { SiteHeader } from "@/components/site-header";

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-[#fffaf0] text-[#17211f]">
      <SiteHeader />
      <div className="mx-auto max-w-5xl px-6 pb-20 pt-10">
        <p className="font-black text-[#ed9805]">FAQ</p>
        <h1 className="mt-3 max-w-3xl text-5xl font-black tracking-[-0.05em]">
          Quick answers for life in Korea.
        </h1>
        <p className="mb-10 mt-5 max-w-2xl text-lg leading-8 text-[#52615b]">
          지역구와 관심 카테고리에 맞춰 자주 묻는 질문을 검색합니다.
        </p>
        <FaqClient />
      </div>
    </main>
  );
}
