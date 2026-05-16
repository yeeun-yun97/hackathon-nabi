type HorizonProgressArcProps = {
  currentPoints: number;
  targetPoints: number;
  unlockEtaDays: number;
};

export function HorizonProgressArc({
  currentPoints,
  targetPoints,
  unlockEtaDays,
}: HorizonProgressArcProps) {
  const progress = Math.min(currentPoints / targetPoints, 1);
  const radius = 78;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);

  return (
    <div className="rounded-[2rem] bg-[#fffaf0] p-6 ring-1 ring-black/5">
      <div className="relative mx-auto size-56">
        <svg className="size-56 -rotate-90" viewBox="0 0 192 192">
          <circle
            className="text-[#17211f]/10"
            cx="96"
            cy="96"
            fill="none"
            r={radius}
            stroke="currentColor"
            strokeWidth="16"
          />
          <circle
            className="text-[#10c4a9]"
            cx="96"
            cy="96"
            fill="none"
            r={radius}
            stroke="currentColor"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            strokeWidth="16"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="text-5xl font-black tracking-[-0.06em]">{currentPoints}</p>
          <p className="mt-1 text-sm font-black text-[#52615b]">of {targetPoints} pts</p>
        </div>
      </div>
      <div className="mt-5 rounded-2xl bg-white p-4 text-center ring-1 ring-black/5">
        <p className="text-sm font-black text-[#ed9805]">Estimated unlock</p>
        <p className="mt-1 text-2xl font-black">{unlockEtaDays} days</p>
      </div>
    </div>
  );
}
