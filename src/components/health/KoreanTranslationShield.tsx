"use client";

type KoreanTranslationShieldProps = {
  text: string;
  label?: string;
};

export function KoreanTranslationShield({ text, label = "Show this exact Korean" }: KoreanTranslationShieldProps) {
  async function copyText() {
    await navigator.clipboard.writeText(text);
  }

  return (
    <div className="rounded-3xl bg-[#17211f] p-5 text-white">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-[#10c4a9]">{label}</p>
      <p className="mt-3 text-lg font-black leading-8" lang="ko">
        {text}
      </p>
      <p className="mt-3 text-sm leading-6 text-white/65">
        Keep this sentence in Korean so a receptionist can read it directly.
      </p>
      <button
        className="mt-4 rounded-full bg-[#ed9805] px-4 py-2 text-sm font-black text-white"
        onClick={copyText}
        type="button"
      >
        Copy Korean text
      </button>
    </div>
  );
}
