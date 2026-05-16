import { AiChatPreview } from "@/components/ai-chat-preview";
import { InfoExplorer } from "@/components/info-explorer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  const services = [
    {
      title: "Government help",
      label: "Public support",
      description:
        "행정복지센터, 다문화가족지원센터, 통역 상담, 긴급 복지 제도를 가까운 위치 기준으로 찾습니다.",
    },
    {
      title: "Health & wellness",
      label: "Medical",
      description:
        "외국인 진료가 가능한 병원, 보건소, 보험 안내, 수영장과 체육시설까지 생활 건강 정보를 모읍니다.",
    },
    {
      title: "Housing & documents",
      label: "Housing",
      description:
        "주거 계약, 전입 신고, 체류기간 연장, 필요한 서류와 방문 장소를 단계별로 안내합니다.",
    },
    {
      title: "Language & culture",
      label: "Education",
      description:
        "한국어 수업, 문화 교육, 커뮤니티 이벤트, 지역별 무료 프로그램을 추천합니다.",
    },
  ];

  const faqs = [
    "서울에서 외국인이 무료로 상담받을 수 있는 곳은 어디인가요?",
    "체류기간 연장 전에 어떤 서류를 준비해야 하나요?",
    "한국 건강보험에 가입하지 않았을 때 갈 수 있는 병원이 있나요?",
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-[#fffaf0] text-[#17211f]">
      <SiteHeader />

      <main>
        <section className="relative mx-auto grid w-full max-w-7xl gap-12 px-6 pb-20 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pt-20">
          <div className="absolute left-1/2 top-10 -z-10 size-[520px] -translate-x-1/2 rounded-full bg-[#10c4a9]/15 blur-3xl" />
          <div>
            <div className="mb-7 inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-[#0d8f7d] shadow-sm ring-1 ring-black/5">
              For foreigners building a life in Korea
            </div>
            <h1 className="max-w-3xl text-5xl font-black tracking-[-0.05em] text-[#17211f] sm:text-6xl lg:text-7xl">
              Find the right help before life gets confusing.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#52615b]">
              Nari는 외국인이 한국에서 필요한 정부지원, 의료, 주거, 교육,
              체류 절차를 상황과 위치에 맞게 찾도록 돕는 정보 플랫폼입니다.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                className="rounded-full bg-[#ed9805] px-7 py-4 text-center text-base font-black text-white shadow-xl shadow-orange-200 transition hover:-translate-y-0.5"
                href="/onboarding"
              >
                Start finding support
              </a>
              <a
                className="rounded-full bg-white px-7 py-4 text-center text-base font-black text-[#17211f] shadow-sm ring-1 ring-black/10 transition hover:-translate-y-0.5"
                href="/chat"
              >
                Ask AI guide
              </a>
            </div>
          </div>

          <InfoExplorer />
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="font-black text-[#ed9805]">Filtered directory</p>
                <h2 className="mt-3 text-4xl font-black tracking-[-0.04em]">
                  필요한 도움을 상황별로 찾기
                </h2>
              </div>
              <p className="max-w-xl text-[#52615b]">
                Supabase에 기관, 프로그램, 지역, 언어, 비용, 신청 조건을
                저장하고 커스텀 필터로 검색하는 구조를 전제로 설계했습니다.
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {services.map((service) => (
                <article
                  className="rounded-[2rem] bg-[#fffaf0] p-6 ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-100"
                  key={service.title}
                >
                  <span className="rounded-full bg-[#10c4a9]/15 px-3 py-1 text-xs font-black text-[#0b8d79]">
                    {service.label}
                  </span>
                  <h3 className="mt-5 text-2xl font-black">{service.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-[#52615b]">
                    {service.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="mx-auto grid max-w-7xl gap-6 px-6 py-20 lg:grid-cols-2"
          id="community"
        >
          <div className="rounded-[2rem] bg-[#10c4a9] p-8 text-white">
            <p className="font-black text-white/70">Community</p>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.04em]">
              Ask people nearby
            </h2>
            <p className="mt-5 leading-7 text-white/80">
              같은 지역에 사는 외국인들이 병원 경험, 행정센터 방문 후기,
              한국어 수업 추천, 이민 절차 팁을 공유하는 커뮤니티 공간입니다.
            </p>
          </div>
          <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5">
            <p className="font-black text-[#ed9805]">
              FAQ
            </p>
            <div className="mt-5 grid gap-3">
              {faqs.map((faq) => (
                <details
                  className="rounded-2xl bg-[#fffaf0] p-5 text-sm font-bold"
                  key={faq}
                >
                  <summary className="cursor-pointer">{faq}</summary>
                  <p className="mt-3 font-medium leading-6 text-[#52615b]">
                    지역, 비자 상태, 언어, 보험 여부를 입력하면 공식 기관과
                    커뮤니티 답변을 함께 보여주는 흐름으로 확장할 수 있습니다.
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#17211f] py-20 text-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="font-black text-[#10c4a9]">AI concierge</p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.04em]">
                Ask in your own words
              </h2>
              <p className="mt-5 leading-7 text-white/70">
                ChatGPT API 라우트가 준비되어 있어 사용자가 “서울에 살고
                있고 비자 연장을 해야 해요”처럼 질문하면 체크리스트와 관련
                기관을 안내하도록 확장할 수 있습니다.
              </p>
            </div>
            <AiChatPreview />
          </div>
        </section>
      </main>
    </div>
  );
}
