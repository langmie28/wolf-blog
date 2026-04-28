import { supabase } from '@/lib/supabase'
import MarkdownRenderer from '@/components/MarkdownRenderer'

export default async function AboutPage() {
  const { data } = await supabase.from('about').select('content').single()

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-stone-900">关于我</h1>
        <p className="mt-1 text-stone-400">了解我与这个网站的故事</p>
      </div>
      <div className="rounded-xl border border-stone-200 bg-white p-8 shadow-sm animate-fade-in">
        {data?.content ? (
          <MarkdownRenderer content={data.content} />
        ) : (
          <p className="text-stone-400 text-center py-8">还没有介绍，敬请期待。</p>
        )}
      </div>
    </main>
  )
}
