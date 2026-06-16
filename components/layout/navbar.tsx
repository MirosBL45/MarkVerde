'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { PenLine } from 'lucide-react'

import { ThemeToggle } from '@/components/layout/theme-toggle'
import { cn } from '@/lib/utils'

const links = [
  { href: '/', label: 'Home', title: 'Home' },
  { href: '/editor', label: 'Editor', title: 'Editor' },
  { href: '/blog', label: 'Blog', title: 'Blog' },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight"
          title="Home"
        >
          <span className="hidden size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground sm:flex">
            <PenLine className="size-4" />
          </span>
          <span className="text-lg">
            Mark<span className="text-accent">Verde</span>
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <ul className="flex items-center gap-1">
            {links.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href)
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    title={link.title}
                    className={cn(
                      'relative rounded-md px-3 py-2 text-sm font-medium transition-colors',
                      isActive
                        ? 'text-primary'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {link.label}
                    <span
                      className={cn(
                        'absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-primary transition-transform duration-200',
                        isActive ? 'scale-x-100' : 'scale-x-0',
                      )}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
