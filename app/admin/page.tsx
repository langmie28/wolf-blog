import Link from 'next/link'

const sections = [
  { href: '/admin/posts', title: '文章管理', desc: '创建、编辑、删除文章' },
  { href: '/admin/daily', title: '成长记录', desc: '管理每日成长记录' },
  { href: '/admin/about', title: '关于我', desc: '编辑关于页面内容' },
]

export default function AdminPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-bold text-gray-900">管理后台</h1>
      <div className="mt-6 grid gap-4">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
            <p className="mt-1 text-sm text-gray-500">{section.desc}</p>
          </Link>
        ))}
      </div>
    </main>
  )
}
