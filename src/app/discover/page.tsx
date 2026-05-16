import { Suspense } from "react";

import { DiscoverContent } from "@/components/discover-content";
import { SiteHeader } from "@/components/site-header";

export default function DiscoverPage() {
  return (
    <main className="min-h-screen bg-[#f6f7fb] text-[#17211f]">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-6 pb-20 pt-10">
        <Suspense fallback={null}>
          <DiscoverContent />
        </Suspense>
      </div>
    </main>
  );
}
