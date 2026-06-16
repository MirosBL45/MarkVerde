import Link from 'next/link'

import { PenLine } from 'lucide-react'

import { YEAR } from '@/constants/footer'

export function Footer() {
  

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2 text-sm font-medium">
          <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <PenLine className="size-3.5" />
          </span>
          Mark<span className="-ml-2 text-accent">Verde</span>
        </div>
        <p className="text-sm text-muted-foreground">
              © {YEAR} Made by{' '}
              <Link
                rel="noopener noreferrer"
                target="_blank"
                href={'https://miroslavjovic.com/'}
                title={'Miroslav Jović | Frontend Developer'}
                className="text-primary hover:text-accent"
              >
                Miroslav Jović
              </Link>
            </p>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <Link href="/editor" title="Editor" className="hover:text-accent">
            Editor
          </Link>
          <Link href="/blog" title="Blog" className="hover:text-accent">
            Blog
          </Link>
        </div>
      </div>
    </footer>
  )
}
