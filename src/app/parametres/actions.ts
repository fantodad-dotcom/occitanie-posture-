'use server'
import { createDelegue, updateDelegue, desactiverDelegue, reactiverDelegue } from '@/lib/queries/delegues'
import { createCotation } from '@/lib/queries/cotations'
import { createToken, revokeToken } from '@/lib/queries/shareTokens'
import { parseMdTable } from '@/lib/utils/equipeMdParser'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function addDelegue(nom: string, secteur: string) {
  await createDelegue(nom, secteur)
  revalidatePath('/parametres')
  revalidatePath('/')
}

export async function editDelegue(id: string, nom: string, secteur: string) {
  await updateDelegue(id, { nom, secteur })
  revalidatePath('/parametres')
}

export async function disableDelegue(id: string) {
  await desactiverDelegue(id)
  revalidatePath('/parametres')
  revalidatePath('/')
}

export async function enableDelegue(id: string) {
  await reactiverDelegue(id)
  revalidatePath('/parametres')
  revalidatePath('/')
}

export async function generateToken() {
  await createToken()
  revalidatePath('/parametres')
}

export async function revokeShareToken(id: string) {
  await revokeToken(id)
  revalidatePath('/parametres')
}

export async function importEquipeMd(mdContent: string): Promise<{ created: number; cotations: number; skipped: number }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const rows = parseMdTable(mdContent)

  let created = 0, cotations = 0, skipped = 0
  const today = new Date().toISOString().split('T')[0]

  for (const row of rows) {
    if (!row.nom) { skipped++; continue }
    const { data: existing } = await supabase.from('delegues').select('id').eq('nom', row.nom).eq('manager_id', user!.id).single()

    let delegueId: string
    if (existing) {
      delegueId = existing.id
    } else {
      const { data } = await supabase.from('delegues').insert({ nom: row.nom, manager_id: user!.id }).select('id').single()
      delegueId = data!.id
      created++
    }

    if (row.interpeller || row.debattre || row.engager) {
      await createCotation({ delegue_id: delegueId, date_visite: today, interpeller: row.interpeller, debattre: row.debattre, engager: row.engager, geste_prioritaire: row.geste ?? '' })
      cotations++
    }
  }

  revalidatePath('/')
  return { created, cotations, skipped }
}
