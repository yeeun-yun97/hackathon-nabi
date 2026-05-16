import { ChatClient } from "@/components/chat-client";
import { SiteHeader } from "@/components/site-header";

export default function ChatPage() {
  return (
    <main className="min-h-screen bg-[#fffaf0] text-[#17211f]">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-6 pb-20 pt-10">
        <p className="font-black text-[#ed9805]">AI concierge</p>
        <h1 className="mt-3 max-w-3xl text-5xl font-black tracking-[-0.05em]">
          Ask with your city and visa context included.
        </h1>
        <p className="mb-10 mt-5 max-w-2xl text-lg leading-8 text-[#52615b]">
          온보딩에서 저장한 도시, 언어, 비자 유무, 다문화 가족 여부, 연령대,
          비자 만료일을 함께 보내 더 맞춤형 안내를 받습니다.
        </p>
        <ChatClient />
      </div>
    </main>
  );
}
