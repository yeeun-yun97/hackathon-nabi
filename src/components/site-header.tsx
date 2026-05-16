import Link from "next/link";

const navItems = [
  { href: "/discover", label: "Discover" },
  { href: "/checklists", label: "Checklists" },
  { href: "/faq", label: "FAQ" },
  { href: "/community", label: "Community" },
  { href: "/chat", label: "AI Chat" },
];

export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6">
      <Link className="flex items-center gap-3" href="/">
        <div className="flex size-11 items-center justify-center rounded-2xl bg-[#10c4a9] font-black text-white shadow-lg shadow-teal-200">
          N
        </div>
        <div>
          <p className="text-lg font-black">Nari</p>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6b756f]">
            Your local guide
          </p>
        </div>
      </Link>
      <nav className="hidden items-center gap-7 text-sm font-bold text-[#4e5a55] lg:flex">
        {navItems.map((item) => (
          <Link className="transition hover:text-[#0b8d79]" href={item.href} key={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
      <Link
        className="rounded-full bg-[#17211f] px-5 py-3 text-sm font-black text-white"
        href="/onboarding"
      >
        Set profile
      </Link>
    </header>
  );
}
