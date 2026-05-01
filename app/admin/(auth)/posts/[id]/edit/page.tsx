import { getSupabaseAdmin } from '@/lib/supabase'
import EditForm from './EditForm'

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabaseAdmin = await getSupabaseAdmin()
  const { data: post } = await supabaseAdmin.from('posts').select('*').eq('id', id).single()
  if (!post) return <p>文章不存在</p>
  return <EditForm post={post} />
}