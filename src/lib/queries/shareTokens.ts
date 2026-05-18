import { createClient } from '@/lib/supabase/server'
import type { ShareToken } from '@/lib/supabase/types'

export async function getActiveToken(): Promise<ShareToken | null> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data } = await supabase
    .from('share_tokens')
    .select('*')
    .eq('manager_id', user!.id)
    .eq('actif', true)
    .single()
  return data
}

export async function createToken(): Promise<ShareToken> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data, error } = await supabase
    .from('share_tokens')
    .insert({ manager_id: user!.id })
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data
}

export async function revokeToken(id: string): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase.from('share_tokens').update({ actif: false }).eq('id', id)
  if (error) throw new Error(error.message)
}

export async function validateToken(token: string): Promise<boolean> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('share_tokens')
    .select('id')
    .eq('token', token)
    .eq('actif', true)
    .single()
  return !!data
}
