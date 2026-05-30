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
        <h1 className="text-xl font-bold text-white mb-6">Posture vs Marché</h1>
        <GaugeObjectif actuel={pctProactifs} cible={60} />
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div style={{ background: '#1C1C1C', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '16px', textAlign: 'center' }}>
            <p style={{ color: '#888', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>Proactifs (niv. 3)</p>
            <p style={{ color: '#3fb950', fontSize: '28px', fontWeight: 700, lineHeight: 1 }}>{proactifs}</p>
          </div>
          <div style={{ background: '#1C1C1C', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '16px', textAlign: 'center' }}>
            <p style={{ color: '#888', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>Réactifs (niv. 1-2)</p>
            <p style={{ color: '#f85149', fontSize: '28px', fontWeight: 700, lineHeight: 1 }}>{delegues.length - proactifs}</p>
          </div>
        </div>
        <RadarEquipe interpeller={moyI} debattre={moyD} engager={moyE} />
      </div>
    </AppShell>
  )
}
