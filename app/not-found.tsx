import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <p className="text-8xl font-bold text-stone-200">404</p>
        <h1 className="mt-4 text-xl font-semibold text-stone-900">页面不存在</h1>
        <p className="mt-2 text-stone-500">你访问的页面可能已被删除或移动。</p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-stone-900 px-5 py-2 text-sm font-medium text-white hover:bg-stone-800 transition-colors"
        >
          返回首页
        </Link>
      </div>
    </main>
  )
}
