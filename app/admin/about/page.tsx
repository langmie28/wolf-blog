import { supabaseAdmin } from '@/lib/supabase'
import AboutForm from './AboutForm'

export default async function AdminAboutPage() {
  const { data } = await supabaseAdmin.from('about').select('content').single()

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-bold text-gray-900">关于我管理</h1>
      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <AboutForm currentContent={data?.content || ''} />
      </div>
    </main>
  )
}
