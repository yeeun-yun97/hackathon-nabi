import type { UserProfile } from "@/lib/data";

type RenewVisaChecklistCardProps = {
  profile: UserProfile;
  currentVisaLabel: string;
};

const renewalSteps = [
  "Reserve a HiKorea visit before the renewal window fills.",
  "Prepare passport, ARC, application form, housing proof, and fee.",
  "Bring enrollment or employment proof that matches your current visa.",
];

function formatDaysUntilExpiry(dateString: string) {
  if (!dateString) {
    return "Expiry date not set";
  }

  const target = new Date(dateString).getTime();

  if (Number.isNaN(target)) {
    return "Check expiry date";
  }

  const days = Math.max(0, Math.ceil((target - Date.now()) / (1000 * 60 * 60 * 24)));

  return `${days} days left`;
}

export function RenewVisaChecklistCard({
  profile,
  currentVisaLabel,
}: RenewVisaChecklistCardProps) {
  return (
    <section className="overflow-hidden rounded-[2.5rem] bg-[#17211f] text-white shadow-2xl shadow-[#17211f]/20">
      <div className="grid gap-8 p-6 md:grid-cols-[1fr_280px] md:p-8">
        <div>
          <p className="font-black text-[#10c4a9]">Renewal track</p>
          <h1 className="mt-3 max-w-2xl text-4xl font-black tracking-[-0.05em] md:text-5xl">
            Keep your {currentVisaLabel} status ready before the deadline.
          </h1>
          <p className="mt-5 max-w-2xl leading-7 text-white/70">
            Nari turns your stored visa, district, and education profile into a practical
            immigration visit checklist.
          </p>
          <ol className="mt-7 grid gap-3">
            {renewalSteps.map((step, index) => (
              <li className="flex gap-3 rounded-2xl bg-white/8 p-4 text-sm font-bold" key={step}>
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#ed9805] text-xs text-white">
                  {index + 1}
                </span>
                <span className="leading-6 text-white/80">{step}</span>
              </li>
            ))}
          </ol>
        </div>
        <aside className="rounded-[2rem] bg-white p-6 text-[#17211f]">
          <p className="text-sm font-black text-[#ed9805]">Your visa clock</p>
          <p className="mt-4 text-4xl font-black tracking-[-0.05em]">
            {formatDaysUntilExpiry(profile.visaExpiryDate)}
          </p>
          <dl className="mt-6 grid gap-4 text-sm">
            <div>
              <dt className="font-black">Expiry</dt>
              <dd className="mt-1 text-[#52615b]">{profile.visaExpiryDate || "Not provided"}</dd>
            </div>
            <div>
              <dt className="font-black">District</dt>
              <dd className="mt-1 text-[#52615b]">{profile.district || "Not selected"}</dd>
            </div>
            <div>
              <dt className="font-black">Profile basis</dt>
              <dd className="mt-1 text-[#52615b]">
                TOPIK {profile.topikLevel}, KIIP {profile.kiipStage}, {profile.degreeLevel}
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}
