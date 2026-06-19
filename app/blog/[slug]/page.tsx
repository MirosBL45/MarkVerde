import ReactMarkdown from "react-markdown";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import remarkGfm from "remark-gfm";

import { formatPostDate, getAllSlugs, getPostBySlug } from "@/lib/blog";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post not found — MarkVerde" };
  return {
    title: `${post.title} — MarkVerde`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <main className="flex flex-1 flex-col">
      <article className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          Back to blog
        </Link>

        <header className="mt-8">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <User className="size-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="size-4" />
              {formatPostDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-4" />
              {post.readingTime}
            </span>
          </div>
        </header>

        <div className="markdown-body mt-8 border-t border-border pt-8">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </div>
      </article>
    </main>
  );
}
