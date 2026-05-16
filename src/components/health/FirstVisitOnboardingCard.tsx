"use client";

import { useState } from "react";

import { KoreanTranslationShield } from "@/components/health/KoreanTranslationShield";
import type { Facility } from "@/lib/data";

export function FirstVisitOnboardingCard({ facility }: { facility: Facility }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
      <p className="text-sm font-black text-[#ed9805]">First visit onboarding</p>
      <h2 className="mt-2 text-2xl font-black tracking-[-0.03em]">A desk script for joining</h2>
      <ol className="mt-5 grid gap-3 text-sm font-bold leading-6 text-[#52615b]">
        <li>1. Arrive during desk hours and take a queue ticket if available.</li>
        <li>2. Show your ARC and ask for the local resident discount before paying.</li>
        <li>3. Confirm the swim lane or gym time block, then ask where to store indoor shoes.</li>
      </ol>
      <button
        className="mt-5 rounded-full bg-[#10c4a9] px-5 py-3 text-sm font-black text-white"
        onClick={() => setIsOpen(true)}
        type="button"
      >
        Open Korean receptionist text
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#17211f]/60 p-6">
          <div className="w-full max-w-xl rounded-[2rem] bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-black text-[#ed9805]">Reception desk</p>
                <h3 className="mt-2 text-2xl font-black tracking-[-0.03em]">
                  Show this sentence
                </h3>
              </div>
              <button
                className="rounded-full bg-[#fffaf0] px-4 py-2 text-sm font-black text-[#17211f]"
                onClick={() => setIsOpen(false)}
                type="button"
              >
                Close
              </button>
            </div>
            <div className="mt-5">
              <KoreanTranslationShield text={facility.koreanReceptionPrompt} />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
