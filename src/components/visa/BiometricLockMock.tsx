type BiometricLockMockProps = {
  statusText?: string;
};

export function BiometricLockMock({ statusText = "Confirming identity" }: BiometricLockMockProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,#24413c_0%,#17211f_48%,#07100e_100%)] px-6 text-white">
      <section className="w-full max-w-sm rounded-[2.5rem] bg-white/8 p-8 text-center shadow-2xl shadow-black/30 ring-1 ring-white/15 backdrop-blur">
        <p className="text-xs font-black uppercase tracking-[0.35em] text-[#10c4a9]">
          nabi secure pass
        </p>
        <div className="mx-auto mt-8 flex size-44 items-center justify-center rounded-full bg-[#10c4a9]/10 ring-1 ring-[#10c4a9]/30">
          <div className="relative flex size-32 items-center justify-center rounded-full bg-[#17211f] shadow-2xl shadow-[#10c4a9]/20">
            <div className="absolute size-40 animate-ping rounded-full border border-[#10c4a9]/40" />
            <svg
              aria-hidden="true"
              className="size-24 text-[#10c4a9]"
              fill="none"
              viewBox="0 0 96 96"
            >
              <path
                d="M28 42c0-12 8-22 20-22s20 10 20 22"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="5"
              />
              <path
                d="M24 54c0-15 10-28 24-28s24 13 24 28"
                stroke="currentColor"
                strokeLinecap="round"
                strokeOpacity="0.65"
                strokeWidth="4"
              />
              <path
                d="M34 52c0-9 5-16 14-16s14 7 14 16c0 13-4 20-11 28"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="5"
              />
              <path
                d="M43 54c0-4 2-8 5-8s5 4 5 8c0 10-3 17-9 24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeOpacity="0.75"
                strokeWidth="4"
              />
              <path
                d="M63 62c-1 7-4 14-9 20"
                stroke="currentColor"
                strokeLinecap="round"
                strokeOpacity="0.45"
                strokeWidth="4"
              />
            </svg>
          </div>
        </div>
        <div className="mt-8" role="status" aria-live="polite">
          <h1 className="text-3xl font-black tracking-[-0.04em]">{statusText}</h1>
          <p className="mt-3 text-sm leading-6 text-white/65">
            Unlocking your visa dashboard with stored profile context.
          </p>
        </div>
      </section>
    </div>
  );
}
