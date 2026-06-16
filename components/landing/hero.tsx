import Image from 'next/image'
import Link from 'next/link'

import { ArrowRight, Sparkles } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
        <div className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
            <Sparkles className="size-3.5 text-accent" />
            Write in markdown, see it live
          </span>
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Your thoughts, beautifully{' '}
            <span className="text-primary">rendered</span> in real time.
          </h1>
          <p className="max-w-md text-pretty leading-relaxed text-muted-foreground">
            MarkVerde is a fast, distraction-free markdown notebook. Split-view
            live preview, instant auto-save, full-text search, and one-click
            export. Everything stays on your device.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/editor"
              title="Start writing"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              Start writing
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/blog"
                title="Read the blog"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              Read the blog
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-3xl bg-primary/10 blur-2xl" />
          <div className="relative overflow-hidden rounded-2xl border border-border shadow-2xl">
            <Image
              src="/hero-preview.png"
              alt="MarkVerde editor showing markdown on the left and rendered preview on the right"
              title="MarkVerde editor showing markdown on the left and rendered preview on the right"
              width={960}
              height={600}
              className="h-auto w-full"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
