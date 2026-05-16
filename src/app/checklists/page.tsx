import { ChecklistsClient } from "@/components/checklists-client";
import { SiteHeader } from "@/components/site-header";

export default function ChecklistsPage() {
  return (
    <main className="min-h-screen bg-[#fffaf0] text-[#17211f]">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-6 pb-20 pt-10">
        <p className="font-black text-[#ed9805]">Checklists</p>
        <h1 className="mt-3 max-w-3xl text-5xl font-black tracking-[-0.05em]">
          Know what to prepare before you go.
        </h1>
        <p className="mb-10 mt-5 max-w-2xl text-lg leading-8 text-[#52615b]">
          비자, 의료, 금융, 노동처럼 실수하기 쉬운 절차를 단계별로 확인하세요.
        </p>
        <ChecklistsClient />
      </div>
    </main>
  );
}
