import { SiteHeader } from "@/components/site-header";
import { VisaEditPageClient } from "@/components/visa/visa-edit-page-client";

export default function VisaEditPage() {
  return (
    <main className="min-h-screen bg-[#f6f7fb] text-[#17211f]">
      <SiteHeader />
      <VisaEditPageClient />
    </main>
  );
}
