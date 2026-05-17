'use server'
import { createCotation } from '@/lib/queries/cotations'
import { revalidatePath } from 'next/cache'

export async function saveCotation(formData: {
  delegue_id: string
  date_visite: string
  interpeller: number | null
  debattre: number | null
  engager: number | null
  geste_prioritaire: string
  notes_debrief: string
}) {
  await createCotation(formData)
  revalidatePath('/')
  revalidatePath(`/delegue/${formData.delegue_id}`)
}
