import { createClient } from '@/lib/supabase/server'
import type { Delegue } from '@/lib/supabase/types'

export async function getDeleguesActifs(): Promise<Delegue[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('delegues')
    .select('*')
    .eq('actif', true)
    .order('nom')
  if (error) throw new Error(error.message)
  return data ?? []
}

export async function getDelegueById(id: string): Promise<Delegue | null> {
  const supabase = await createClient()
  const { data } = await supabase.from('delegues').select('*').eq('id', id).single()
  return data
}

export async function createDelegue(nom: string, secteur: string): Promise<Delegue> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data, error } = await supabase
    .from('delegues')
    .insert({ nom, secteur, manager_id: user!.id })
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data
}

export async function updateDelegue(id: string, updates: Partial<Pick<Delegue, 'nom' | 'secteur'>>): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase.from('delegues').update(updates).eq('id', id)
  if (error) throw new Error(error.message)
}

export async function desactiverDelegue(id: string): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase.from('delegues').update({ actif: false }).eq('id', id)
  if (error) throw new Error(error.message)
}

export async function reactiverDelegue(id: string): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase.from('delegues').update({ actif: true }).eq('id', id)
  if (error) throw new Error(error.message)
}
