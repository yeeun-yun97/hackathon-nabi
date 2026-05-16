import { MeClient } from "@/components/me-client";
import { SiteHeader } from "@/components/site-header";

export default function MePage() {
  return (
    <main className="min-h-screen bg-[#f6f7fb] text-[#17211f]">
      <SiteHeader />
      <MeClient />
    </main>
  );
}
