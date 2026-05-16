import { notFound } from "next/navigation";

import { CommunityDetail } from "@/components/community-detail";
import { SiteHeader } from "@/components/site-header";
import { communityPosts } from "@/lib/data";

type CommunityDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return communityPosts.map((post) => ({ slug: post.slug }));
}

export default async function CommunityDetailPage({ params }: CommunityDetailPageProps) {
  const { slug } = await params;
  const post = communityPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f6f7fb] text-[#17211f]">
      <SiteHeader />
      <CommunityDetail post={post} />
    </main>
  );
}
