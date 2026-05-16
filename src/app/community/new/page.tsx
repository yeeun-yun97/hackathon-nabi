"use client";

import { CommunityNewPost } from "@/components/community-new-post";
import { SiteHeader } from "@/components/site-header";

export default function CommunityNewPage() {
  return (
    <main className="min-h-screen bg-[#f6f7fb] text-[#17211f]">
      <SiteHeader />
      <CommunityNewPost />
    </main>
  );
}
