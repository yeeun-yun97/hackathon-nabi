import Link from "next/link";

import { OnboardingForm } from "@/components/onboarding-form";

export default function OnboardingPage() {
  return (
    <main className="min-h-screen bg-[#fffaf0] px-6 py-10 text-[#17211f]">
      <div className="mx-auto max-w-5xl">
        <Link className="text-sm font-black text-[#0b8d79]" href="/">
          Nari
        </Link>
        <div className="mb-10 mt-12">
          <p className="font-black text-[#ed9805]">Personal setup</p>
          <h1 className="mt-3 max-w-3xl text-5xl font-black tracking-[-0.05em]">
            Tell Nari where you are and what you need.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#52615b]">
            가입 시 받은 도시, 비자 유무, 다문화 가족 여부, 연령대, 비자
            만료일은 검색, 체크리스트, 커뮤니티, AI 답변의 기본 맥락으로
            사용됩니다.
          </p>
        </div>
        <OnboardingForm />
      </div>
    </main>
  );
}
