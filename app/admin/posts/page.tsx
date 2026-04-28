import { supabaseAdmin } from '@/lib/supabase'
import Link from 'next/link'
import DeleteButton from './DeleteButton'

export default async function AdminPostsPage() {
  const { data: posts } = await supabaseAdmin
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">文章管理</h1>
        <Link
          href="/admin/posts/new"
          className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
        >
          新建文章
        </Link>
      </div>
      <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-3 text-left text-sm font-medium text-gray-500">标题</th>
              <th className="p-3 text-left text-sm font-medium text-gray-500">状态</th>
              <th className="p-3 text-left text-sm font-medium text-gray-500">发布时间</th>
              <th className="p-3 text-left text-sm font-medium text-gray-500">操作</th>
            </tr>
          </thead>
          <tbody>
            {posts?.map((post: any) => (
              <tr key={post.id} className="border-t border-gray-100">
                <td className="p-3 text-sm text-gray-900">{post.title}</td>
                <td className="p-3">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      post.status === 'published'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {post.status === 'published' ? '已发布' : '草稿'}
                  </span>
                </td>
                <td className="p-3 text-sm text-gray-400">
                  {post.published_at?.slice(0, 10) || '-'}
                </td>
                <td className="p-3 space-x-3">
                  <Link
                    href={`/admin/posts/${post.id}/edit`}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    编辑
                  </Link>
                  <DeleteButton id={post.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
