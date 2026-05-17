import { AppShell } from '@/components/layout/AppShell'
import { ReferentielSidebar } from '@/components/layout/ReferentielSidebar'
import { VueEquipe } from '@/components/equipe/VueEquipe'
import { getDeleguesActifs } from '@/lib/queries/delegues'
import { getDernieresCotations } from '@/lib/queries/cotations'
import { getDVPlanifiees } from '@/lib/queries/doublesVisites'
import { scoreMoyen, markerPosition } from '@/lib/utils/scores'
import type { Cotation } from '@/lib/supabase/types'

export default async function Home() {
  const [delegues, cotations, dv] = await Promise.all([
    getDeleguesActifs(),
    getDernieresCotations(),
    getDVPlanifiees(),
  ])

  const cotationsData = cotations.filter(
    ({ cotation }) => cotation !== null
  ) as { delegue_id: string; cotation: Cotation }[]

  const allCotations = cotationsData.map(({ cotation }) => cotation)
  const moyI = scoreMoyen(allCotations.map(c => c.interpeller))
  const moyD = scoreMoyen(allCotations.map(c => c.debattre))
  const moyE = scoreMoyen(allCotations.map(c => c.engager))

  const dvCeMois = dv.filter(d => {
    const date = new Date(d.date_prevue)
    const now = new Date()
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
  }).length

  return (
    <AppShell referentielSidebar={
      <ReferentielSidebar
        interpeller={markerPosition(moyI)}
        debattre={markerPosition(moyD)}
        engager={markerPosition(moyE)}
      />
    }>
      <VueEquipe
        delegues={delegues}
        cotationsData={cotationsData}
        dvCeMois={dvCeMois}
      />
    </AppShell>
  )
}
