'use client'

import { deletePost } from '@/lib/actions'
import { useRouter } from 'next/navigation'

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter()

  async function handleClick() {
    if (!confirm('确定要删除这篇文章吗？')) return
    const res = await deletePost(id)
    if (res?.error) alert(res.error)
    else router.refresh()
  }

  return (
    <button
      onClick={handleClick}
      className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
    >
      删除
    </button>
  )
}
