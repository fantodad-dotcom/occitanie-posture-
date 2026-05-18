import { AppShell } from '@/components/layout/AppShell'
import { ReferentielSidebar } from '@/components/layout/ReferentielSidebar'
import { CoachingClient } from '@/components/coaching/CoachingClient'
import { getDeleguesActifs } from '@/lib/queries/delegues'
import { getDernieresCotations } from '@/lib/queries/cotations'
import type { Cotation } from '@/lib/supabase/types'

export default async function CoachingPage() {
  const [delegues, cotationsRaw] = await Promise.all([
    getDeleguesActifs(),
    getDernieresCotations(),
  ])

  const cotationsData = cotationsRaw.filter(
    ({ cotation }) => cotation !== null
  ) as { delegue_id: string; cotation: Cotation }[]

  return (
    <AppShell referentielSidebar={<ReferentielSidebar cotationsData={cotationsData} delegues={delegues} />}>
      <CoachingClient delegues={delegues} cotationsData={cotationsData} />
    </AppShell>
  )
}
