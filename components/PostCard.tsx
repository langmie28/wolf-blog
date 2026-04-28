import Link from 'next/link'

interface PostCardProps {
  title: string
  slug: string
  summary?: string
  publishedAt?: string
  tags?: string[]
}

export default function PostCard({ title, slug, summary, publishedAt, tags }: PostCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group block rounded-xl border border-stone-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-stone-300 hover:-translate-y-0.5"
    >
      <div className="card-gradient-bar h-1 w-12 rounded-full mb-4 group-hover:w-20 transition-all duration-300" />
      <h3 className="text-lg font-semibold text-stone-900 group-hover:text-accent transition-colors">
        {title}
      </h3>
      {summary && (
        <p className="mt-2 text-sm text-stone-500 leading-relaxed line-clamp-2">
          {summary}
        </p>
      )}
      <div className="mt-4 flex items-center gap-3 text-xs text-stone-400">
        {publishedAt && <span>{publishedAt.slice(0, 10)}</span>}
        {tags?.length ? (
          <div className="flex gap-1.5">
            {tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-stone-100 px-2 py-0.5 text-xs text-stone-500"
              >
                {t}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </Link>
  )
}
