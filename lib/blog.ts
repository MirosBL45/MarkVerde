import type { BlogPost } from "@/types/blog";

import blogData from "@/data/blog-posts.json";

const posts = blogData.posts as BlogPost[];

export function getAllPosts(): BlogPost[] {
  return [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getAllSlugs(): string[] {
  return posts.map((post) => post.slug);
}

export function formatPostDate(date: string): string {
  return new Date(date).toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
