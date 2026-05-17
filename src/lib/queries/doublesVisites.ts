import { createClient } from '@/lib/supabase/server'
import type { DoubleVisite } from '@/lib/supabase/types'

export async function getDVPlanifiees(): Promise<DoubleVisite[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('doubles_visites')
    .select('*')
    .in('statut', ['planifiée'])
    .order('date_prevue')
  if (error) throw new Error(error.message)
  return data ?? []
}

export async function createDV(delegueId: string, datePrevue: string): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase
    .from('doubles_visites')
    .insert({ delegue_id: delegueId, date_prevue: datePrevue })
  if (error) throw new Error(error.message)
}

export async function marquerDVRealisee(id: string): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase
    .from('doubles_visites')
    .update({ statut: 'réalisée' })
    .eq('id', id)
  if (error) throw new Error(error.message)
}
