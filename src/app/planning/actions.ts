'use server'
import { createDV, marquerDVRealisee } from '@/lib/queries/doublesVisites'
import { revalidatePath } from 'next/cache'

export async function planifierDV(delegueId: string, date: string) {
  await createDV(delegueId, date)
  revalidatePath('/planning')
}

export async function marquerRealisee(dvId: string) {
  await marquerDVRealisee(dvId)
  revalidatePath('/planning')
}
