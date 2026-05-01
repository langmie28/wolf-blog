import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { decrypt } from '@/lib/crypto'

async function hash(s: string): Promise<string> {
  const data = new TextEncoder().encode(s)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const session = (await cookies()).get('admin_session')?.value
  const adminPassword = await decrypt(process.env.ADMIN_PASSWORD || '')
  const expected = await hash(adminPassword)
  if (session !== expected) redirect('/admin/login')

  return <>{children}</>
}
