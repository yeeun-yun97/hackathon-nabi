"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import {
  communityPosts,
  getCategoryLabel,
  serviceCategories,
  type City,
  type ServiceCategory,
} from "@/lib/data";
import { defaultProfile, readStoredProfile } from "@/lib/profile";

function toggleCategory(categories: ServiceCategory[], category: ServiceCategory) {
  return categories.includes(category)
    ? categories.filter((item) => item !== category)
    : [...categories, category];
}

export function CommunityClient() {
  const [city, setCity] = useState<City>(defaultProfile.city);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);

  useEffect(() => {
    queueMicrotask(() => {
      const profile = readStoredProfile();
      setCity(profile.city);
    });
  }, []);

  const filteredPosts = useMemo(
    () =>
      communityPosts.filter(
        (post) =>
          post.city === city &&
          (categories.length === 0 || categories.includes(post.category)),
      ),
    [categories, city],
  );

  const visiblePosts = filteredPosts.length > 0 ? filteredPosts : communityPosts;

  return (
    <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
      <aside className="h-fit rounded-[2rem] bg-white p-6 ring-1 ring-black/5">
        <p className="text-sm font-black text-[#ed9805]">Your community filters</p>
        <p className="mt-3 text-2xl font-black">{city}</p>
        <div className="mt-5 grid gap-2">
          {serviceCategories.map((category) => {
            const isActive = categories.includes(category.id);

            return (
              <button
                className={`rounded-2xl px-4 py-3 text-left text-sm font-black ${
                  isActive ? "bg-[#10c4a9] text-white" : "bg-[#fffaf0] text-[#52615b]"
                }`}
                key={category.id}
                onClick={() => setCategories((current) => toggleCategory(current, category.id))}
                type="button"
              >
                {category.label}
              </button>
            );
          })}
        </div>
      </aside>
      <section className="grid gap-5">
        {filteredPosts.length === 0 ? (
          <div className="rounded-[2rem] bg-white p-6 ring-1 ring-black/5">
            <p className="font-black">No exact local match yet</p>
            <p className="mt-2 text-[#52615b]">Showing sample posts from other cities.</p>
          </div>
        ) : null}
        {visiblePosts.map((post) => (
          <Link
            className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-100"
            href={`/community/${post.slug}`}
            key={post.id}
          >
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-[#10c4a9]/15 px-3 py-1 text-xs font-black text-[#0b8d79]">
                {getCategoryLabel(post.category)}
              </span>
              <span className="rounded-full bg-[#17211f]/10 px-3 py-1 text-xs font-black text-[#52615b]">
                {post.city}
              </span>
            </div>
            <h2 className="mt-4 text-2xl font-black tracking-[-0.03em]">{post.title}</h2>
            <p className="mt-3 leading-7 text-[#52615b]">{post.excerpt}</p>
            <p className="mt-4 text-sm font-black text-[#ed9805]">By {post.author}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
