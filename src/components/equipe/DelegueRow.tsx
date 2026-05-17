'use client'
import { ScoreBadge } from '@/components/ui/ScoreBadge'
import type { Cotation, Delegue } from '@/lib/supabase/types'

type Props = {
  delegue: Delegue
  cotation: Cotation | null
  onClick: () => void
}

export function DelegueRow({ delegue, cotation, onClick }: Props) {
  const hasUrgent = cotation && [cotation.interpeller, cotation.debattre, cotation.engager].some(s => s === 1)

  return (
    <tr
      onClick={onClick}
      className={`border-b border-gray-800 cursor-pointer hover:bg-gray-800/50 transition-colors ${hasUrgent ? 'bg-red-950/20' : ''}`}
    >
      <td className="px-4 py-3 text-sm text-gray-200">{delegue.nom}</td>
      <td className="px-2 py-3 text-center"><ScoreBadge score={cotation?.interpeller ?? null} size="sm" /></td>
      <td className="px-2 py-3 text-center"><ScoreBadge score={cotation?.debattre ?? null} size="sm" /></td>
      <td className="px-2 py-3 text-center"><ScoreBadge score={cotation?.engager ?? null} size="sm" /></td>
      <td className="px-4 py-3 text-xs text-gray-500 max-w-[200px] truncate">
        {hasUrgent && <span className="text-red-400 mr-1">🔴</span>}
        {cotation?.geste_prioritaire ?? '—'}
      </td>
      <td className="px-4 py-3 text-xs text-gray-500 text-right">
        {cotation ? new Date(cotation.date_visite).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }) : '—'}
      </td>
    </tr>
  )
}
