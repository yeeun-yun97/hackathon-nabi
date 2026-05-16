"use client";

import type { Facility } from "@/lib/data";

const paymentLabels: Record<Facility["paymentAccepted"][number], string> = {
  cash: "Cash",
  "foreign-card": "Foreign card",
  "local-card": "Local Korean card",
};

export function JoinRequirementsCard({ facility }: { facility: Facility }) {
  return (
    <section className="rounded-3xl bg-[#fffaf0] p-6">
      <p className="text-sm font-black text-[#ed9805]">Join requirements</p>
      <h2 className="mt-2 text-2xl font-black tracking-[-0.03em]">Bring these before you queue</h2>
      <ul className="mt-5 grid gap-3 text-sm font-bold leading-6 text-[#52615b]">
        <li>
          <span className="font-black text-[#17211f]">ARC required:</span> Show your Alien
          Registration Card for local residency discounts.
        </li>
        <li>
          <span className="font-black text-[#17211f]">Payment:</span>{" "}
          {facility.paymentAccepted.map((payment) => paymentLabels[payment]).join(", ")}. Public
          centers may prefer a Korean-issued card at the desk.
        </li>
        <li>
          <span className="font-black text-[#17211f]">Indoor shoes:</span>{" "}
          {facility.indoorShoeRule
            ? "Bring clean indoor-only shoes for the gym floor."
            : "Ask the desk whether separate indoor shoes are required."}
        </li>
      </ul>
    </section>
  );
}
