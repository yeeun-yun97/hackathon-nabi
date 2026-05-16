import type { VisaPointComponent } from "@/lib/data";
import type { Locale } from "@/lib/i18n";
import { pickLocalized } from "@/lib/i18n";

type StrategyOptionsProps = {
  strategies: VisaPointComponent[];
  locale: Locale;
};

const statusStyles: Record<VisaPointComponent["status"], string> = {
  available: "bg-[#10c4a9]/15 text-[#0b8d79]",
  earned: "bg-[#17211f]/10 text-[#52615b]",
  locked: "bg-[#ed9805]/15 text-[#b66f00]",
};

export function StrategyOptions({ strategies, locale }: StrategyOptionsProps) {
  return (
    <div className="grid gap-4">
      {strategies.map((strategy) => (
        <article className="rounded-[2rem] bg-white p-5 ring-1 ring-black/5" key={strategy.id}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className={`rounded-full px-3 py-1 text-xs font-black ${statusStyles[strategy.status]}`}>
              {strategy.status}
            </span>
            <span className="text-sm font-black text-[#ed9805]">+{strategy.points} pts</span>
          </div>
          <h3 className="mt-4 text-xl font-black tracking-[-0.03em]">
            {pickLocalized(strategy.label, locale)}
          </h3>
          <p className="mt-3 text-sm leading-6 text-[#52615b]">
            {pickLocalized(strategy.action, locale)}
          </p>
          {strategy.locality ? (
            <div className="mt-4 rounded-2xl bg-[#fffaf0] p-4 text-sm leading-6 text-[#52615b]">
              <p className="font-bold">{pickLocalized(strategy.locality.label, locale)}</p>
              {strategy.locality.nextIntake ? (
                <p className="mt-2 text-xs font-black text-[#0b8d79]">
                  Next intake: {strategy.locality.nextIntake}
                </p>
              ) : null}
              {strategy.locality.url ? (
                <a
                  className="mt-2 inline-flex text-xs font-black text-[#0b8d79]"
                  href={strategy.locality.url}
                  rel="noreferrer"
                  target="_blank"
                >
                  Open resource
                </a>
              ) : null}
            </div>
          ) : null}
        </article>
      ))}
    </div>
  );
}
