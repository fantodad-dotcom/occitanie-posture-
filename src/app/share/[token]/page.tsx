import { notFound } from 'next/navigation'
import { AppShell } from '@/components/layout/AppShell'
import { ReferentielSidebar } from '@/components/layout/ReferentielSidebar'
import { KpiCards } from '@/components/equipe/KpiCards'
import { TeamHeatmap } from '@/components/equipe/TeamHeatmap'
import { getDeleguesActifs } from '@/lib/queries/delegues'
import { getDernieresCotations } from '@/lib/queries/cotations'
import { getDVPlanifiees } from '@/lib/queries/doublesVisites'
import { validateToken } from '@/lib/queries/shareTokens'
import { scoreMoyen, markerPosition } from '@/lib/utils/scores'
import type { Cotation } from '@/lib/supabase/types'

type Props = { params: Promise<{ token: string }> }

export default async function SharePage({ params }: Props) {
  const { token } = await params
  const valid = await validateToken(token)
  if (!valid) notFound()

  const [delegues, cotationsData, dv] = await Promise.all([
    getDeleguesActifs(),
    getDernieresCotations(),
    getDVPlanifiees(),
  ])

  // Build serializable array for client components, filtering out null cotations
  const cotationsArr: { delegue_id: string; cotation: Cotation }[] = cotationsData
    .filter(({ cotation }) => cotation !== null)
    .map(({ delegue_id, cotation }) => ({ delegue_id, cotation: cotation! }))

  const allScores = cotationsArr.map(({ cotation }) => cotation)
  const moyI = markerPosition(scoreMoyen(allScores.map(c => c.interpeller)))
  const moyD = markerPosition(scoreMoyen(allScores.map(c => c.debattre)))
  const moyE = markerPosition(scoreMoyen(allScores.map(c => c.engager)))

  const now = new Date()
  const dvCeMois = dv.filter(d => {
    const date = new Date(d.date_prevue)
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
  }).length

  return (
    <AppShell referentielSidebar={<ReferentielSidebar interpeller={moyI} debattre={moyD} engager={moyE} />}>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <h1 className="text-xl font-bold text-white">Occitanie Posture</h1>
          <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded">Lecture seule</span>
        </div>
        <KpiCards delegues={delegues} cotationsData={cotationsArr} dvCeMois={dvCeMois} />
        <TeamHeatmap delegues={delegues} cotationsData={cotationsArr} onSelectDelegue={() => {}} />
      </div>
    </AppShell>
  )
}
