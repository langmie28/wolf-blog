'use client'

import { login } from '@/lib/actions'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const from = searchParams.get('from') || '/admin/posts'

  async function handleSubmit(formData: FormData) {
    const res = await login(formData)
    if (res?.error) {
      alert(res.error)
    } else {
      router.push(from)
    }
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-xl font-bold text-gray-900">管理员登录</h1>
        <form action={handleSubmit} className="mt-6 space-y-4">
          <input
            name="password"
            type="password"
            placeholder="请输入密码"
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-shadow"
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
          >
            登录
          </button>
        </form>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
