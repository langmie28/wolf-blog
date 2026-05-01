import { createClient } from '@supabase/supabase-js'
import { decrypt } from './crypto'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

export async function getSupabaseAdmin() {
  const key = await decrypt(process.env.SUPABASE_SERVICE_ROLE_KEY!)
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, key)
}
