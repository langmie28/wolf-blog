import { supabase } from '@/lib/supabase'
import PostCard from '@/components/PostCard'

export default async function BlogPage() {
  const { data: posts } = await supabase
    .from('posts')
    .select('title, slug, summary, published_at, tags')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-stone-900">文章博客</h1>
        <p className="mt-1 text-stone-400">思考、技术与经验分享</p>
      </div>
      <div className="grid gap-4">
        {posts?.length ? (
          posts.map((post: any) => (
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
            <p className="text-stone-400">暂无文章。</p>
          </div>
        )}
      </div>
    </main>
  )
}
