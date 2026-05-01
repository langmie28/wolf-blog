'use server'

import { getSupabaseAdmin } from './supabase'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { decrypt } from './crypto'

async function hash(s: string): Promise<string> {
  const data = new TextEncoder().encode(s)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

async function requireAdmin() {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')?.value
  const adminPassword = await decrypt(process.env.ADMIN_PASSWORD || '')
  const expected = await hash(adminPassword)
  if (session !== expected) throw new Error('未授权访问')
}

export async function login(formData: FormData) {
  const password = formData.get('password') as string
  const adminPassword = await decrypt(process.env.ADMIN_PASSWORD || '')
  if (password === adminPassword) {
    const token = await hash(password)
    const cookieStore = await cookies()
    cookieStore.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/admin',
      maxAge: 60 * 60 * 24 * 7,
    })
    return { success: true }
  }
  return { error: '密码错误' }
}

// ---------- 文章 ----------
export async function createPost(formData: FormData) {
  await requireAdmin()
  const supabaseAdmin = await getSupabaseAdmin()
  const title = formData.get('title') as string
  const summary = formData.get('summary') as string
  const content = formData.get('content') as string
  const category = formData.get('category') as string
  const tags = (formData.get('tags') as string)?.split(',').map(t => t.trim()) || []
  const status = formData.get('status') as string
  const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')

  const { error } = await supabaseAdmin.from('posts').insert({
    title,
    slug,
    summary,
    content,
    category,
    tags,
    status,
    published_at: status === 'published' ? new Date().toISOString() : null,
  })

  if (error) return { error: error.message }
  revalidatePath('/blog', 'layout')
  revalidatePath('/')
  return { success: true }
}

export async function updatePost(id: string, formData: FormData) {
  await requireAdmin()
  const supabaseAdmin = await getSupabaseAdmin()
  const title = formData.get('title') as string
  const summary = formData.get('summary') as string
  const content = formData.get('content') as string
  const category = formData.get('category') as string
  const tags = (formData.get('tags') as string)?.split(',').map(t => t.trim()) || []
  const status = formData.get('status') as string
  const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')

  const { error } = await supabaseAdmin.from('posts').update({
    title,
    slug,
    summary,
    content,
    category,
    tags,
    status,
    published_at: status === 'published' ? new Date().toISOString() : null,
    updated_at: new Date().toISOString(),
  }).eq('id', id)

  if (error) return { error: error.message }
  revalidatePath('/blog', 'layout')
  revalidatePath('/')
  return { success: true }
}

export async function deletePost(id: string) {
  await requireAdmin()
  const supabaseAdmin = await getSupabaseAdmin()
  const { error } = await supabaseAdmin.from('posts').delete().eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/blog', 'layout')
  revalidatePath('/')
  return { success: true }
}

// ---------- 每日成长 ----------
export async function upsertDailyLog(date: string, content: string) {
  await requireAdmin()
  const supabaseAdmin = await getSupabaseAdmin()
  const { error } = await supabaseAdmin.from('daily_logs').upsert({
    date,
    content,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'date' })

  if (error) return { error: error.message }
  revalidatePath('/daily')
  revalidatePath('/')
  return { success: true }
}

// ---------- 关于我 ----------
export async function updateAbout(content: string) {
  await requireAdmin()
  const supabaseAdmin = await getSupabaseAdmin()
  const { error } = await supabaseAdmin.from('about').update({
    content,
    updated_at: new Date().toISOString(),
  }).eq('id', 1)

  if (error) return { error: error.message }
  revalidatePath('/about')
  return { success: true }
}
