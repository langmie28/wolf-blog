import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import Link from 'next/link'

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (!post) notFound()

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <article className="animate-fade-in">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-stone-400 hover:text-stone-600 transition-colors mb-8"
        >
          &larr; 返回文章列表
        </Link>

        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-stone-900 leading-tight">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
            {post.published_at && (
              <time className="text-stone-400">
                {post.published_at.slice(0, 10)}
              </time>
            )}
            {post.category && (
              <span className="rounded-full bg-accent/10 px-3 py-0.5 text-xs font-medium text-accent">
                {post.category}
              </span>
            )}
          </div>
          {post.tags?.length ? (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {post.tags.map((t: string) => (
                <span
                  key={t}
                  className="rounded-full bg-stone-100 px-2.5 py-0.5 text-xs text-stone-500"
                >
                  {t}
                </span>
              ))}
            </div>
          ) : null}
        </header>

        {/* Content */}
        <MarkdownRenderer content={post.content} />
      </article>

      {/* Divider */}
      <hr className="my-12 border-stone-200" />

      {/* Back to blog */}
      <div className="text-center">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-dark transition-colors"
        >
          &larr; 返回文章列表
        </Link>
      </div>
    </main>
  )
}
