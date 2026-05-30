import { createClient } from '@/lib/supabase/server'
import type { Cotation } from '@/lib/supabase/types'

export async function getDernieresCotations(): Promise<
  { delegue_id: string; cotation: Cotation | null }[]
> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('cotations')
    .select('*')
    .order('date_visite', { ascending: false })
  if (error) throw new Error(error.message)

  const map = new Map<string, Cotation>()
  for (const c of data ?? []) {
    if (!map.has(c.delegue_id)) map.set(c.delegue_id, c)
  }
  return Array.from(map.entries()).map(([delegue_id, cotation]) => ({ delegue_id, cotation }))
}

export async function getCotationsByDelegue(delegueId: string): Promise<Cotation[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('cotations')
    .select('*')
    .eq('delegue_id', delegueId)
    .order('date_visite', { ascending: true })
  if (error) throw new Error(error.message)
  return data ?? []
}

export async function getAllCotations(): Promise<Cotation[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('cotations')
    .select('*, delegues(nom)')
    .order('date_visite', { ascending: false })
  if (error) throw new Error(error.message)
  return data ?? []
}

export async function updateGesteCotation(delegueId: string, geste: string): Promise<void> {
  const supabase = await createClient()
  // Récupère l'ID de la dernière cotation du délégué
  const { data, error: fetchError } = await supabase
    .from('cotations')
    .select('id')
    .eq('delegue_id', delegueId)
    .order('date_visite', { ascending: false })
    .limit(1)
    .single()
  if (fetchError) throw new Error(fetchError.message)
  const { error } = await supabase
    .from('cotations')
    .update({ geste_prioritaire: geste })
    .eq('id', data.id)
  if (error) throw new Error(error.message)
}

export async function createCotation(input: {
  delegue_id: string
  date_visite: string
  interpeller: number | null
  debattre: number | null
  engager: number | null
  geste_prioritaire: string
  notes_debrief?: string
}): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase.from('cotations').insert(input)
  if (error) throw new Error(error.message)
}
