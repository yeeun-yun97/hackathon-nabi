import Link from "next/link";

type VisaNotificationCardProps = {
  href?: string;
  title?: string;
  body?: string;
  timestamp?: string;
};

export function VisaNotificationCard({
  href = "/visa/biometric",
  title = "Visa renewal window opens soon",
  body = "Nari prepared your renewal checklist and F-2-7 horizon options.",
  timestamp = "now",
}: VisaNotificationCardProps) {
  return (
    <Link
      aria-label={`${title}. ${body}`}
      className="block rounded-[2rem] bg-white/95 p-5 text-[#17211f] shadow-2xl shadow-black/30 ring-1 ring-white/40 backdrop-blur transition hover:-translate-y-1 hover:bg-white"
      href={href}
    >
      <div className="flex items-start gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#10c4a9] font-black text-white">
          N
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-black">Nari Visa Horizon</p>
            <p className="shrink-0 text-xs font-bold text-[#52615b]">{timestamp}</p>
          </div>
          <h2 className="mt-1 text-xl font-black tracking-[-0.03em]">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-[#52615b]">{body}</p>
        </div>
      </div>
    </Link>
  );
}
