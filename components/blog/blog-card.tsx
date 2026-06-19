import Link from "next/link";

import { ArrowUpRight, Calendar, Clock } from "lucide-react";

import { formatPostDate } from "@/lib/blog";
import type { BlogPost } from "@/types/blog";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      title={`Read "${post.title}"`}
      className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary"
    >
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
      <h3 className="mt-4 text-balance text-xl font-semibold text-card-foreground group-hover:text-primary">
        {post.title}
      </h3>
      <p className="mt-2 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">
        {post.excerpt}
      </p>
      <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
        <span className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Calendar className="size-3.5" />
            {formatPostDate(post.date)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" />
            {post.readingTime}
          </span>
        </span>
        <ArrowUpRight className="size-4 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </Link>
  );
}
