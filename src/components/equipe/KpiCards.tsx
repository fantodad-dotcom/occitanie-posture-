'use client'
import { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import type { Cotation, Delegue } from '@/lib/supabase/types'

type CotationEntry = { delegue_id: string; cotation: Cotation }

type Props = {
  delegues: Delegue[]
  cotationsData: CotationEntry[]
  dvCeMois: number
}

export function KpiCards({ delegues, cotationsData, dvCeMois }: Props) {
  const router = useRouter()

  const cotationsMap = useMemo(
    () => new Map<string, Cotation>(
      cotationsData.map(({ delegue_id, cotation }) => [delegue_id, cotation])
    ),
    [cotationsData]
  )

  const scores = delegues.map(d => {
    const c = cotationsMap.get(d.id)
    const vals = [c?.interpeller, c?.debattre, c?.engager].filter(Boolean) as number[]
    return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null
  }).filter((s): s is number => s !== null)

  const moyenneEquipe = scores.length
    ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1)
    : null

  const urgentsListe = delegues.filter(d => {
    const c = cotationsMap.get(d.id)
    return c && [c.interpeller, c.debattre, c.engager].some(s => s === 1)
  })
  const urgents = urgentsListe.length

  const modeles = delegues.filter(d => {
    const c = cotationsMap.get(d.id)
    return c && [c.interpeller, c.debattre, c.engager].every(s => s !== null && s >= 3)
  }).length

  const sansCotation = delegues.filter(d => !cotationsMap.get(d.id)).length

  return (
    <div style={{ marginBottom: '16px' }}>

      {/* Alerte urgents — visible uniquement s'il y en a */}
      {urgents > 0 && (
        <button
          onClick={() => router.push('/planning')}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            width: '100%', padding: '14px 16px', marginBottom: '10px',
            background: 'rgba(248,81,73,0.08)',
            border: '1px solid rgba(248,81,73,0.25)',
            borderRadius: '10px', cursor: 'pointer',
            textAlign: 'left', transition: 'background 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(248,81,73,0.12)'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(248,81,73,0.08)'}
        >
          <div>
            <span style={{ fontSize: '15px', fontWeight: 700, color: '#f85149' }}>
              {urgents} délégué{urgents > 1 ? 's' : ''} à niveau 1
            </span>
            <div style={{ fontSize: '12px', color: 'rgba(248,81,73,0.7)', marginTop: '2px' }}>
              {urgentsListe.map(d => d.nom).join(', ')}
            </div>
          </div>
          <span style={{ fontSize: '12px', color: '#f85149', fontWeight: 600, flexShrink: 0, marginLeft: '12px' }}>
            Planifier →
          </span>
        </button>
      )}

      {/* Ligne de contexte — toujours visible */}
      <div style={{
        display: 'flex', gap: '0',
        background: '#1C1C1C',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '10px',
        overflow: 'hidden',
      }}>
        {[
          {
            value: moyenneEquipe ?? '—',
            label: 'Moy. équipe',
            sub: moyenneEquipe ? `/ 3` : 'aucune donnée',
            color: moyenneEquipe
              ? Number(moyenneEquipe) >= 2.5 ? '#3fb950'
              : Number(moyenneEquipe) >= 1.5 ? '#f0883e'
              : '#f85149'
              : '#555',
          },
          {
            value: modeles,
            label: 'Modèles',
            sub: 'niveau 3',
            color: modeles > 0 ? '#3fb950' : '#555',
          },
          {
            value: dvCeMois,
            label: 'DUOs ce mois',
            sub: 'planifiés',
            color: dvCeMois > 0 ? '#818CF8' : '#555',
          },
          ...(sansCotation > 0 ? [{
            value: sansCotation,
            label: 'Sans DUO',
            sub: 'non évalués',
            color: '#888' as string,
          }] : []),
        ].map(({ value, label, sub, color }, i, arr) => (
          <div key={label} style={{
            flex: 1, padding: '12px 14px', textAlign: 'center',
            borderRight: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
          }}>
            <div style={{ fontSize: '20px', fontWeight: 700, color, lineHeight: 1, marginBottom: '3px' }}>
              {value}
            </div>
            <div style={{ fontSize: '10px', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {label}
            </div>
            <div style={{ fontSize: '10px', color: '#555', marginTop: '1px' }}>{sub}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
