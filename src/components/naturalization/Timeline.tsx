"use client";

import type { ReactNode } from "react";

export type TimelineItem = {
  id: string;
  title: string;
  description: string;
};

type TimelineProps = {
  items: TimelineItem[];
  trailing?: ReactNode;
};

export function Timeline({ items, trailing }: TimelineProps) {
  return (
    <ol className="relative grid gap-5">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <li className="relative flex gap-4" key={item.id}>
            <div className="relative flex w-8 flex-col items-center">
              <span className="z-10 flex size-8 shrink-0 items-center justify-center rounded-full bg-[#2B4FA5] text-xs font-bold text-white">
                {index + 1}
              </span>
              {!isLast ? (
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-8 h-[calc(100%+1.25rem)] w-px -translate-x-1/2 bg-[#2B4FA5]/20"
                />
              ) : null}
            </div>
            <div className="flex-1 rounded-2xl border border-black/[0.06] bg-[#f6f7fb] p-4">
              <p className="text-sm font-semibold text-[#17211f]">{item.title}</p>
              <p className="mt-2 text-sm leading-6 text-[#52615b]">
                {item.description}
              </p>
            </div>
          </li>
        );
      })}
      {trailing}
    </ol>
  );
}
