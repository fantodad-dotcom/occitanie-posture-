import { AppShell } from '@/components/layout/AppShell'
import { ReferentielSidebar } from '@/components/layout/ReferentielSidebar'
import { GaugeObjectif } from '@/components/competition/GaugeObjectif'
import { RadarEquipe } from '@/components/competition/RadarEquipe'
import { getDeleguesActifs } from '@/lib/queries/delegues'
import { getDernieresCotations } from '@/lib/queries/cotations'
import { scoreMoyen, markerPosition } from '@/lib/utils/scores'
import type { Cotation } from '@/lib/supabase/types'

export default async function CompetitionPage() {
  const [delegues, cotationsData] = await Promise.all([getDeleguesActifs(), getDernieresCotations()])

  const cotationsMap = new Map<string, Cotation>(
    cotationsData
      .filter(({ cotation }) => cotation !== null)
      .map(({ delegue_id, cotation }) => [delegue_id, cotation!])
  )

  const cotes = delegues.map(d => cotationsMap.get(d.id)).filter((c): c is Cotation => c !== undefined)
  const moyI = scoreMoyen(cotes.map(c => c.interpeller)) ?? 0
  const moyD = scoreMoyen(cotes.map(c => c.debattre)) ?? 0
  const moyE = scoreMoyen(cotes.map(c => c.engager)) ?? 0

  const proactifs = cotes.filter(c => {
    const axes = [c.interpeller, c.debattre, c.engager].filter((s): s is number => s !== null)
    return axes.filter(s => s >= 3).length >= 2
  }).length

  const pctProactifs = delegues.length ? Math.round((proactifs / delegues.length) * 100) : 0

  return (
    <AppShell referentielSidebar={
      <ReferentielSidebar
        interpeller={markerPosition(moyI)}
        debattre={markerPosition(moyD)}
        engager={markerPosition(moyE)}
      />
    }>
      <div className="p-6 max-w-2xl">
        <h1 className="text-xl font-bold text-white mb-6">🏆 Posture vs Marché</h1>
        <GaugeObjectif actuel={pctProactifs} cible={60} />
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-center">
            <p className="text-gray-500 text-xs uppercase mb-1">Proactifs (niv. 3+)</p>
            <p className="text-3xl font-bold text-green-400">{proactifs}</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-center">
            <p className="text-gray-500 text-xs uppercase mb-1">Réactifs (niv. 1-2)</p>
            <p className="text-3xl font-bold text-red-400">{delegues.length - proactifs}</p>
          </div>
        </div>
        <RadarEquipe interpeller={moyI} debattre={moyD} engager={moyE} />
      </div>
    </AppShell>
  )
}
