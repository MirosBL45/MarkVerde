import Link from 'next/link'

import { ArrowRight } from 'lucide-react'

export function CtaSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-primary px-6 py-14 text-center text-primary-foreground sm:px-12">
        <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          Start your first note in seconds
        </h2>
        <p className="mx-auto mt-4 max-w-md text-pretty leading-relaxed text-primary-foreground/80">
          No sign-up, no setup. Open the editor and your work is saved
          automatically as you type.
        </p>
        <Link
          href="/editor"
          title="Open the editor"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.03]"
        >
          Open the editor
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  )
}