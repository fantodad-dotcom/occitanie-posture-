'use client'
import { useMemo } from 'react'
import { TrendingUp, AlertTriangle, Star, CalendarCheck } from 'lucide-react'
import type { Cotation, Delegue } from '@/lib/supabase/types'

type CotationEntry = { delegue_id: string; cotation: Cotation }

type Props = {
  delegues: Delegue[]
  cotationsData: CotationEntry[]
  dvCeMois: number
}

export function KpiCards({ delegues, cotationsData, dvCeMois }: Props) {
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

  const moyenneEquipe = scores.length ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : '–'
  const urgents = delegues.filter(d => {
    const c = cotationsMap.get(d.id)
    return c && [c.interpeller, c.debattre, c.engager].some(s => s === 1)
  }).length
  const modeles = delegues.filter(d => {
    const c = cotationsMap.get(d.id)
    return c && [c.interpeller, c.debattre, c.engager].every(s => s !== null && s >= 3)
  }).length

  const cards = [
    {
      label: 'Moyenne équipe',
      value: moyenneEquipe,
      sub: '/ 3',
      color: '#60A5FA',
      accentColor: '#3B82F6',
      icon: TrendingUp,
    },
    {
      label: 'Urgents',
      value: urgents,
      sub: 'niveau 1',
      color: '#F87171',
      accentColor: '#EF4444',
      icon: AlertTriangle,
    },
    {
      label: 'Modèles',
      value: modeles,
      sub: 'niveau 3',
      color: '#4ADE80',
      accentColor: '#22C55E',
      icon: Star,
    },
    {
      label: 'DUOs ce mois',
      value: dvCeMois,
      sub: 'planifiés',
      color: '#FBBF24',
      accentColor: '#F59E0B',
      icon: CalendarCheck,
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      {cards.map(({ label, value, sub, color, accentColor, icon: Icon }) => (
        <div key={label} style={{
          background: '#1C1C1C',
          border: '1px solid rgba(255,255,255,0.07)',
          borderTop: `2px solid ${accentColor}44`,
          borderRadius: '10px',
          padding: '16px',
        }}>
          <div className="flex items-center justify-between mb-3">
            <p style={{ color: '#888', fontSize: '12px', fontWeight: 500 }}>{label}</p>
            <Icon size={15} style={{ color }} />
          </div>
          <p style={{ color, fontSize: '28px', fontWeight: 700, lineHeight: 1 }}>{value}</p>
          <p style={{ color: '#555', fontSize: '11px', marginTop: '6px' }}>{sub}</p>
        </div>
      ))}
    </div>
  )
}
