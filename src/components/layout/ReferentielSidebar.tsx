import { markerPosition } from '@/lib/utils/scores'
import type { Cotation, Delegue } from '@/lib/supabase/types'

type SingleProps = {
  interpeller: number | null
  debattre: number | null
  engager: number | null
}

type MultiProps = {
  cotationsData: { delegue_id: string; cotation: Cotation }[]
  delegues: Delegue[]
}

type Props = SingleProps | MultiProps

function isSingleProps(p: Props): p is SingleProps {
  return 'interpeller' in p
}

const AXES = [
  {
    key: 'interpeller' as const,
    label: 'INTERPELLER',
    color: '#38BDF8',
    bg: 'rgba(56,189,248,0.12)',
    niveaux: ['En cours', 'Acquis', 'Expert'],
  },
  {
    key: 'debattre' as const,
    label: 'DÉBATTRE',
    color: '#4ADE80',
    bg: 'rgba(74,222,128,0.12)',
    niveaux: ['En cours', 'Acquis', 'Expert'],
  },
  {
    key: 'engager' as const,
    label: 'ENGAGER',
    color: '#FB923C',
    bg: 'rgba(251,146,60,0.12)',
    niveaux: ['En cours', 'Acquis', 'Expert'],
  },
]

export function ReferentielSidebar(props: Props) {
  let scores: { interpeller: number | null; debattre: number | null; engager: number | null }

  if (isSingleProps(props)) {
    scores = { interpeller: props.interpeller, debattre: props.debattre, engager: props.engager }
  } else {
    const cotations = props.cotationsData.map(({ cotation }) => cotation)
    const avg = (vals: (number | null)[]) => {
      const filtered = vals.filter((v): v is number => v !== null)
      return filtered.length ? filtered.reduce((a, b) => a + b, 0) / filtered.length : null
    }
    scores = {
      interpeller: markerPosition(avg(cotations.map(c => c.interpeller))),
      debattre: markerPosition(avg(cotations.map(c => c.debattre))),
      engager: markerPosition(avg(cotations.map(c => c.engager))),
    }
  }

  return (
    <div style={{ padding: '12px 8px', height: '100%' }}>
      <p style={{ color: '#444', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        Référentiel E&C
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {AXES.map((axe) => {
          const marker = markerPosition(scores[axe.key])
          return (
            <div key={axe.key}>
              <p style={{ fontSize: '9px', fontWeight: 700, marginBottom: '6px', color: axe.color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {axe.label}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {axe.niveaux.map((label, i) => {
                  const niveau = i + 1
                  const isMarker = marker === niveau
                  return (
                    <div
                      key={niveau}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        borderRadius: '4px',
                        padding: '2px 4px',
                        background: isMarker ? axe.bg : 'transparent',
                      }}
                    >
                      <span
                        style={{
                          color: '#fff',
                          fontSize: '8px',
                          padding: '1px 4px',
                          borderRadius: '3px',
                          fontWeight: 700,
                          minWidth: '14px',
                          textAlign: 'center',
                          backgroundColor:
                            niveau === 1 ? '#f85149' :
                            niveau === 2 ? '#f0883e' : '#3fb950',
                        }}
                      >
                        {niveau}
                      </span>
                      <span style={{
                        fontSize: '9px',
                        color: isMarker ? '#FCD34D' : '#444',
                        fontWeight: isMarker ? 600 : 400,
                      }}>
                        {isMarker ? '◀ ici' : label}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '12px' }}>
          <p style={{ color: '#444', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.07em', fontWeight: 600, marginBottom: '6px' }}>Règles E&C</p>
          <div style={{ fontSize: '9px', color: '#444', display: 'flex', flexDirection: 'column', gap: '2px', lineHeight: '1.5' }}>
            <p>1 geste / délégué</p>
            <p>Lui d&apos;abord</p>
            <p>Faits ≠ impressions</p>
            <p>Observer ≠ évaluer</p>
          </div>
        </div>
      </div>
    </div>
  )
}
