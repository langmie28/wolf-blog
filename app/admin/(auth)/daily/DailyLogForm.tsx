'use client'

import { upsertDailyLog } from '@/lib/actions'
import { useRouter } from 'next/navigation'

export default function DailyLogForm() {
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    const date = formData.get('date') as string
    const content = formData.get('content') as string
    if (!date || !content) return
    const res = await upsertDailyLog(date, content)
    if (res?.error) alert(res.error)
    else router.refresh()
  }

  const inputClass =
    'w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-shadow'

  return (
    <form action={handleSubmit} className="space-y-4">
      <input
        name="date"
        type="date"
        defaultValue={new Date().toISOString().slice(0, 10)}
        required
        className={`${inputClass} max-w-xs`}
      />
      <textarea
        name="content"
        placeholder="记录今天的成长..."
        rows={6}
        required
        className={`${inputClass} font-mono text-sm`}
      />
      <button
        type="submit"
        className="rounded-lg bg-gray-900 px-6 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
      >
        保存
      </button>
    </form>
  )
}
