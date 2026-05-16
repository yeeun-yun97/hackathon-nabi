import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteHeader } from "@/components/site-header";
import { communityPosts, getCategoryLabel } from "@/lib/data";

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
    <main className="min-h-screen bg-[#fffaf0] text-[#17211f]">
      <SiteHeader />
      <article className="mx-auto max-w-4xl px-6 pb-20 pt-10">
        <Link className="text-sm font-black text-[#0b8d79]" href="/community">
          Back to community
        </Link>
        <div className="mt-8 rounded-[2.5rem] bg-white p-8 ring-1 ring-black/5">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-[#10c4a9]/15 px-3 py-1 text-xs font-black text-[#0b8d79]">
              {getCategoryLabel(post.category)}
            </span>
            <span className="rounded-full bg-[#17211f]/10 px-3 py-1 text-xs font-black text-[#52615b]">
              {post.city}
            </span>
          </div>
          <h1 className="mt-5 text-5xl font-black tracking-[-0.05em]">{post.title}</h1>
          <p className="mt-3 text-sm font-black text-[#ed9805]">
            By {post.author} · Updated {post.updatedAt}
          </p>
          <p className="mt-8 text-lg leading-8 text-[#52615b]">{post.body}</p>
          <div className="mt-8 rounded-3xl bg-[#fffaf0] p-5">
            <p className="font-black">Safety note</p>
            <p className="mt-2 leading-7 text-[#52615b]">
              Community posts are personal experiences. For legal, medical, visa, or emergency
              questions, verify details with official institutions.
            </p>
          </div>
        </div>
        <section className="mt-8 grid gap-4">
          <h2 className="text-2xl font-black">Replies</h2>
          {post.replies.map((reply) => (
            <div className="rounded-3xl bg-white p-6 ring-1 ring-black/5" key={`${reply.author}-${reply.body}`}>
              <p className="font-black">{reply.author}</p>
              <p className="mt-3 leading-7 text-[#52615b]">{reply.body}</p>
            </div>
          ))}
        </section>
      </article>
    </main>
  );
}
