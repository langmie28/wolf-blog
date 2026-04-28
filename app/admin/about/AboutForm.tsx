'use client'

import { updateAbout } from '@/lib/actions'
import { useRouter } from 'next/navigation'

export default function AboutForm({ currentContent }: { currentContent: string }) {
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    const content = formData.get('content') as string
    const res = await updateAbout(content)
    if (res?.error) alert(res.error)
    else router.refresh()
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <textarea
        name="content"
        defaultValue={currentContent}
        rows={12}
        placeholder="写一些关于你的介绍..."
        className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-shadow text-sm"
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
