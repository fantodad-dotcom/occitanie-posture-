'use server'
import { updateGesteCotation } from '@/lib/queries/cotations'
import { revalidatePath } from 'next/cache'

export async function saveGesteDebrief(delegueId: string, geste: string): Promise<void> {
  if (!geste.trim()) return
  await updateGesteCotation(delegueId, geste)
  revalidatePath('/')
  revalidatePath(`/delegue/${delegueId}`)
}
