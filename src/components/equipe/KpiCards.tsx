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
      sub: '/ 4',
      color: 'text-blue-400',
      bg: 'bg-blue-500/8',
      border: 'border-blue-500/20',
      icon: TrendingUp,
      iconColor: 'text-blue-400',
    },
    {
      label: 'Urgents',
      value: urgents,
      sub: 'niveau 1',
      color: 'text-red-400',
      bg: 'bg-red-500/8',
      border: 'border-red-500/20',
      icon: AlertTriangle,
      iconColor: 'text-red-400',
    },
    {
      label: 'Modèles',
      value: modeles,
      sub: 'niveau 3+',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/8',
      border: 'border-emerald-500/20',
      icon: Star,
      iconColor: 'text-emerald-400',
    },
    {
      label: 'DV ce mois',
      value: dvCeMois,
      sub: 'planifiées',
      color: 'text-amber-400',
      bg: 'bg-amber-500/8',
      border: 'border-amber-500/20',
      icon: CalendarCheck,
      iconColor: 'text-amber-400',
    },
  ]

  return (
    <div className="grid grid-cols-4 gap-3 mb-6">
      {cards.map(({ label, value, sub, color, bg, border, icon: Icon, iconColor }) => (
        <div key={label} className={`${bg} border ${border} rounded-xl p-4`}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-slate-400 text-xs font-medium">{label}</p>
            <Icon size={15} className={iconColor} />
          </div>
          <p className={`text-3xl font-bold ${color} leading-none`}>{value}</p>
          <p className="text-slate-500 text-xs mt-1.5">{sub}</p>
        </div>
      ))}
    </div>
  )
}
