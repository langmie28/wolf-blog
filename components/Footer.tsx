import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-auto border-t border-stone-100 bg-white/50">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-6 text-sm text-stone-400">
            <Link href="/blog" className="hover:text-stone-600 transition-colors">
              文章
            </Link>
            <Link href="/daily" className="hover:text-stone-600 transition-colors">
              成长
            </Link>
            <Link href="/about" className="hover:text-stone-600 transition-colors">
              关于
            </Link>
          </div>
          <span className="text-sm text-stone-400">
            &copy; {year} 狼灭的个人成长网站
          </span>
        </div>
      </div>
    </footer>
  )
}
