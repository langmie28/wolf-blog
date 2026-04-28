export default function BlogLoading() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 animate-fade-in">
      <div className="skeleton h-10 w-40 mb-8" />
      <div className="grid gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-xl border border-stone-200 bg-white p-6">
            <div className="skeleton h-3 w-16 mb-4" />
            <div className="skeleton h-6 w-2/3 mb-2" />
            <div className="skeleton h-4 w-full mb-1" />
            <div className="skeleton h-4 w-1/2" />
          </div>
        ))}
      </div>
    </main>
  )
}
