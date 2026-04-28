'use client'

import { useEffect } from 'react'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <p className="text-6xl font-bold text-stone-200">500</p>
        <h1 className="mt-4 text-xl font-semibold text-stone-900">出错了</h1>
        <p className="mt-2 text-stone-500">抱歉，页面加载时发生了错误。</p>
        <button
          onClick={() => reset()}
          className="mt-6 inline-block rounded-lg bg-stone-900 px-5 py-2 text-sm font-medium text-white hover:bg-stone-800 transition-colors"
        >
          重试
        </button>
      </div>
    </main>
  )
}
