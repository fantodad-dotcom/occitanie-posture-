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
      <div style={{ padding: '0 16px 40px', maxWidth: '640px' }}>
        <h1 style={{ fontFamily: 'Lora, Georgia, serif', fontSize: '20px', fontWeight: 700, color: '#ECECEC', marginTop: '4px', marginBottom: '16px' }}>
          Posture vs Marché
        </h1>
        <GaugeObjectif actuel={pctProactifs} cible={60} />
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div style={{ background: 'rgba(63,185,80,0.06)', border: '1px solid rgba(63,185,80,0.2)', borderRadius: '10px', padding: '16px', textAlign: 'center' }}>
            <p style={{ color: '#888', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Proactifs</p>
            <p style={{ color: '#3fb950', fontSize: '32px', fontWeight: 700, lineHeight: 1, fontFamily: 'Lora, Georgia, serif' }}>{proactifs}</p>
            <p style={{ color: '#3fb950', fontSize: '10px', marginTop: '4px', opacity: 0.7 }}>niveau 3 sur 2+ axes</p>
          </div>
          <div style={{ background: 'rgba(248,81,73,0.06)', border: '1px solid rgba(248,81,73,0.2)', borderRadius: '10px', padding: '16px', textAlign: 'center' }}>
            <p style={{ color: '#888', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Réactifs</p>
            <p style={{ color: '#f85149', fontSize: '32px', fontWeight: 700, lineHeight: 1, fontFamily: 'Lora, Georgia, serif' }}>{delegues.length - proactifs}</p>
            <p style={{ color: '#f85149', fontSize: '10px', marginTop: '4px', opacity: 0.7 }}>niveaux 1-2</p>
          </div>
        </div>
        <RadarEquipe interpeller={moyI} debattre={moyD} engager={moyE} />
      </div>
    </AppShell>
  )
}
