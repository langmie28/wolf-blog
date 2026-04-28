import { supabase } from '@/lib/supabase'
import PostCard from '@/components/PostCard'
import Link from 'next/link'

export default async function HomePage() {
  const { data: latestPosts } = await supabase
    .from('posts')
    .select('title, slug, summary, published_at, tags')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(3)

  const { data: daily } = await supabase
    .from('daily_logs')
    .select('date, content')
    .order('date', { ascending: false })
    .limit(1)

  return (
    <main>
      {/* Hero */}
      <section className="hero-gradient px-4 py-24 text-center">
        <div className="mx-auto max-w-2xl animate-fade-in">
          <h1 className="text-5xl font-extrabold tracking-tight text-stone-900 sm:text-6xl">
            🐺 狼灭的个人成长
          </h1>
          <p className="mt-6 text-lg text-stone-500 leading-relaxed">
            公开记录我的思考、学习与每日行动。<br />
            成长的每一步，都值得被看见。
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              href="/blog"
              className="rounded-lg bg-stone-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-stone-800 transition-colors shadow-sm"
            >
              阅读文章
            </Link>
            <Link
              href="/daily"
              className="rounded-lg border border-stone-300 bg-white px-5 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors shadow-sm"
            >
              每日成长
            </Link>
          </div>
        </div>
      </section>

      {/* 最新文章 */}
      <section className="mx-auto max-w-5xl px-4 pb-16 pt-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-stone-900">最新文章</h2>
            <p className="mt-1 text-sm text-stone-400">思考与技术沉淀</p>
          </div>
          <Link
            href="/blog"
            className="text-sm font-medium text-accent hover:text-accent-dark transition-colors"
          >
            查看全部 &rarr;
          </Link>
        </div>
        <div className="grid gap-4">
          {latestPosts?.length ? (
            latestPosts.map((post: any) => (
              <PostCard
                key={post.slug}
                title={post.title}
                slug={post.slug}
                summary={post.summary}
                publishedAt={post.published_at}
                tags={post.tags}
              />
            ))
          ) : (
            <div className="rounded-xl border border-dashed border-stone-300 bg-white p-12 text-center">
              <p className="text-stone-400">暂无文章，敬请期待。</p>
            </div>
          )}
        </div>
      </section>

      {/* 今日成长 */}
      <section className="bg-stone-50/80">
        <div className="mx-auto max-w-5xl px-4 py-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-stone-900">今日成长</h2>
              <p className="mt-1 text-sm text-stone-400">每天的进步与反思</p>
            </div>
            <Link
              href="/daily"
              className="text-sm font-medium text-accent hover:text-accent-dark transition-colors"
            >
              查看全部 &rarr;
            </Link>
          </div>
          <div className="rounded-xl border border-stone-200 bg-white p-8 shadow-sm">
            {daily?.[0] ? (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse-dot" />
                  <span className="text-sm font-medium text-stone-400">
                    {daily[0].date}
                  </span>
                </div>
                <p className="whitespace-pre-wrap leading-relaxed text-stone-700">
                  {daily[0].content}
                </p>
              </>
            ) : (
              <p className="text-stone-400 text-center py-4">
                今天还没有记录，晚点再来看看。
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
