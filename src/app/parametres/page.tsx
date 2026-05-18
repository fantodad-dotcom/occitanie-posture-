import { AppShell } from '@/components/layout/AppShell'
import { getDeleguesActifs } from '@/lib/queries/delegues'
import { createClient } from '@/lib/supabase/server'
import { getActiveToken } from '@/lib/queries/shareTokens'
import { getAllCotations } from '@/lib/queries/cotations'
import { ParametresClient } from '@/components/parametres/ParametresClient'
import type { Cotation } from '@/lib/supabase/types'

export default async function ParametresPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const [deleguesActifs, inactifsResult, token, cotations] = await Promise.all([
    getDeleguesActifs(),
    supabase.from('delegues').select('*').eq('actif', false).eq('manager_id', user!.id),
    getActiveToken(),
    getAllCotations(),
  ])

  const origin = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000'

  return (
    <AppShell>
      <ParametresClient
        deleguesActifs={deleguesActifs}
        deleguesInactifs={inactifsResult.data ?? []}
        shareToken={token}
        shareBaseUrl={origin}
        cotations={cotations as (Cotation & { delegues: { nom: string } })[]}
      />
    </AppShell>
  )
}
