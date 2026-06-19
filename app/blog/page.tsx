import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — MarkVerde",
  description: "Notes on programming, clean code, and the craft of writing software.",
};

export default function BlogPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-4xl flex-1 px-4 py-16 sm:px-6">
        <header className="mb-12 text-center">
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            The MarkVerde <span className="text-primary">Blog</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            Thoughts on programming, clean code, and building better software, one post at a time.
          </p>
        </header>
      </div>
    </main>
  );
}
