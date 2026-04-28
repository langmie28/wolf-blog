import { supabaseAdmin } from '@/lib/supabase'
import DailyLogForm from './DailyLogForm'

export default async function AdminDailyPage() {
  const { data: logs } = await supabaseAdmin
    .from('daily_logs')
    .select('date, content')
    .order('date', { ascending: false })

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-bold text-gray-900">成长记录管理</h1>

      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">新增 / 更新记录</h2>
        <div className="mt-4">
          <DailyLogForm />
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">已有记录</h2>
        {logs?.length ? (
          logs.map((log: any) => (
            <div
              key={log.date}
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <span className="text-sm font-medium text-gray-400">{log.date}</span>
              <p className="mt-1 whitespace-pre-wrap text-sm text-gray-700">
                {log.content}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">暂无记录</p>
        )}
      </div>
    </main>
  )
}
