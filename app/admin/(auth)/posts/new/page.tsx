'use client'

import { createPost } from '@/lib/actions'
import { useRouter } from 'next/navigation'

export default function NewPostPage() {
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    const res = await createPost(formData)
    if (res?.error) alert(res.error)
    else router.push('/admin/posts')
  }

  const inputClass =
    'w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-shadow text-sm'

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-bold text-gray-900">新建文章</h1>
      <form action={handleSubmit} className="mt-6 space-y-4">
        <input
          name="title"
          placeholder="标题"
          required
          className={`${inputClass} text-lg font-semibold`}
        />
        <textarea
          name="summary"
          placeholder="摘要"
          rows={2}
          className={inputClass}
        />
        <textarea
          name="content"
          placeholder="正文（支持 Markdown）"
          rows={15}
          className={`${inputClass} font-mono`}
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            name="category"
            placeholder="分类"
            className={inputClass}
          />
          <input
            name="tags"
            placeholder="标签，逗号分隔"
            className={inputClass}
          />
        </div>
        <div className="flex items-center gap-4">
          <select name="status" className={inputClass}>
            <option value="draft">草稿</option>
            <option value="published">发布</option>
          </select>
          <button
            type="submit"
            className="rounded-lg bg-gray-900 px-6 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
          >
            保存
          </button>
        </div>
      </form>
    </main>
  )
}
