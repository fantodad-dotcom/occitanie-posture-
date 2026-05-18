'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ScoreBadge } from '@/components/ui/ScoreBadge'
import { planifierDV, marquerRealisee } from '@/app/planning/actions'
import type { Cotation, Delegue, DoubleVisite } from '@/lib/supabase/types'

type Statut = 'urgent' | 'a_planifier' | 'ok'

type Props = {
  delegue: Delegue
  cotation: Cotation | null
  dvPlanifiee: DoubleVisite | null
  semainsSansDV: number
  statut: Statut
}

const STATUT_CONFIG = {
  urgent: { label: '🔴 Urgent', bg: 'bg-red-950/30 border-red-900', badge: 'text-red-400' },
  a_planifier: { label: '🟡 À planifier', bg: 'bg-yellow-950/20 border-yellow-900/50', badge: 'text-yellow-400' },
  ok: { label: '🟢 OK', bg: 'bg-green-950/20 border-green-900/50', badge: 'text-green-400' },
}

export function PrioriteCard({ delegue, cotation, dvPlanifiee, semainsSansDV, statut }: Props) {
  const [date, setDate] = useState('')
  const [loading, setLoading] = useState(false)
  const config = STATUT_CONFIG[statut]

  async function handlePlanifier() {
    if (!date) return
    setLoading(true)
    await planifierDV(delegue.id, date)
    setLoading(false)
  }

  return (
    <div className={`border rounded-lg p-4 ${config.bg}`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <Link href={`/delegue/${delegue.id}`} className="text-white font-semibold hover:text-blue-400 transition-colors">
            {delegue.nom}
          </Link>
          {delegue.secteur && <p className="text-gray-500 text-xs">{delegue.secteur}</p>}
        </div>
        <span className={`text-xs font-medium ${config.badge}`}>{config.label}</span>
      </div>

      <div className="flex gap-2 mb-3">
        <ScoreBadge score={cotation?.interpeller ?? null} size="sm" />
        <ScoreBadge score={cotation?.debattre ?? null} size="sm" />
        <ScoreBadge score={cotation?.engager ?? null} size="sm" />
        <span className="text-xs text-gray-500 ml-auto">
          {semainsSansDV === 0 ? 'DV cette semaine' : `${semainsSansDV} sem. sans DV`}
        </span>
      </div>

      {dvPlanifiee ? (
        <div className="flex items-center justify-between bg-gray-800/50 rounded px-3 py-2 text-sm">
          <span className="text-gray-300">DV prévue le {new Date(dvPlanifiee.date_prevue).toLocaleDateString('fr-FR')}</span>
          <button
            onClick={() => marquerRealisee(dvPlanifiee.id)}
            className="text-xs text-green-400 hover:text-green-300"
          >
            ✓ Réalisée
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="flex-1 px-2 py-1.5 bg-gray-800 border border-gray-700 rounded text-sm text-white"
          />
          <button
            onClick={handlePlanifier}
            disabled={!date || loading}
            className="px-3 py-1.5 bg-blue-700 hover:bg-blue-600 disabled:opacity-40 text-white text-sm rounded transition-colors"
          >
            Planifier
          </button>
        </div>
      )}
    </div>
  )
}
