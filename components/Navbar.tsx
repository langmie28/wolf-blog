'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: '首页' },
  { href: '/blog', label: '文章' },
  { href: '/daily', label: '成长' },
  { href: '/about', label: '关于' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/60 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-stone-900 hover:text-accent transition-colors"
        >
          🐺 狼灭
        </Link>
        <div className="flex items-center gap-0.5">
          {links.map((link) => {
            const active =
              pathname === link.href ||
              (link.href !== '/' && pathname.startsWith(link.href))
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? 'text-accent'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-5 rounded-full bg-accent" />
                )}
              </Link>
            )
          })}
          <Link
            href="/admin"
            className="ml-2 rounded-lg border border-stone-200 px-3 py-2 text-sm text-stone-400 hover:border-stone-300 hover:text-stone-600 transition-colors"
          >
            管理
          </Link>
        </div>
      </nav>
    </header>
  )
}
