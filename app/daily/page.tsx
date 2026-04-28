import { supabase } from '@/lib/supabase'

export default async function DailyPage() {
  const { data: logs } = await supabase
    .from('daily_logs')
    .select('date, content')
    .order('date', { ascending: false })

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-stone-900">每日成长</h1>
        <p className="mt-1 text-stone-400">记录每天的进步与反思</p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[19px] top-2 bottom-2 w-px bg-stone-200" />

        <div className="space-y-8">
          {logs?.length ? (
            logs.map((log: any, idx: number) => (
              <div key={log.date} className="relative flex gap-6 animate-fade-in"
                   style={{ animationDelay: `${idx * 80}ms` }}>
                {/* Timeline dot */}
                <div className="relative z-10 mt-1.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-stone-200 bg-white">
                  <div className={`h-2.5 w-2.5 rounded-full ${idx === 0 ? 'bg-emerald-400' : 'bg-stone-300'}`} />
                </div>
                {/* Content */}
                <div className="flex-1 rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
                  <span className="text-sm font-medium text-stone-400">{log.date}</span>
                  <p className="mt-2 whitespace-pre-wrap leading-relaxed text-stone-700">
                    {log.content}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-xl border border-dashed border-stone-300 bg-white p-12 text-center">
              <p className="text-stone-400">还没有记录，成长之旅即将开始。</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
