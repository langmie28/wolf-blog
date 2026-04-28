export default function DailyLoading() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 animate-fade-in">
      <div className="skeleton h-10 w-36 mb-8" />
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-xl border border-stone-200 bg-white p-6">
            <div className="skeleton h-4 w-24 mb-3" />
            <div className="skeleton h-4 w-full mb-1" />
            <div className="skeleton h-4 w-3/4" />
          </div>
        ))}
      </div>
    </main>
  )
}
