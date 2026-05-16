import { VisaNotificationCard } from "@/components/visa/VisaNotificationCard";

export default function VisaNotificationPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#30413d_0%,#17211f_45%,#050807_100%)] px-6 py-10 text-white">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-sm flex-col">
        <div className="flex items-center justify-between text-xs font-bold text-white/75">
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-4 rounded-sm border border-white/70" />
            <span className="size-2 rounded-full bg-white/80" />
          </span>
        </div>

        <div className="flex flex-1 flex-col justify-between pb-10 pt-20">
          <div className="text-center">
            <p className="text-7xl font-black tracking-[-0.08em]">9:41</p>
            <p className="mt-3 text-lg font-bold text-white/75">Saturday, May 16</p>
          </div>

          <div>
            <p className="mb-3 px-2 text-xs font-black uppercase tracking-[0.28em] text-white/45">
              Notification
            </p>
            <VisaNotificationCard />
            <p className="mt-6 text-center text-xs font-bold text-white/45">
              Tap to unlock your visa horizon
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
