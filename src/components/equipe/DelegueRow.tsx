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
    <tr className={`border-b border-slate-800/40 transition-colors duration-150 ${hasUrgent ? 'bg-red-500/5' : 'hover:bg-slate-800/30'}`}>
      <td className="px-4 py-3">
        <button
          onClick={onClick}
          className="text-left text-sm font-medium text-slate-200 hover:text-blue-400 transition-colors duration-150 w-full cursor-pointer"
          aria-label={`Voir le profil de ${delegue.nom}`}
        >
          {hasUrgent && <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 mr-2 mb-0.5" aria-hidden="true" />}
          {delegue.nom}
        </button>
      </td>
      <td className="px-3 py-3 text-center"><ScoreBadge score={cotation?.interpeller ?? null} size="sm" /></td>
      <td className="px-3 py-3 text-center"><ScoreBadge score={cotation?.debattre ?? null} size="sm" /></td>
      <td className="px-3 py-3 text-center"><ScoreBadge score={cotation?.engager ?? null} size="sm" /></td>
      <td className="px-4 py-3 text-xs text-slate-500 max-w-[200px] truncate">
        {cotation?.geste_prioritaire ?? <span className="text-slate-700">—</span>}
      </td>
      <td className="px-4 py-3 text-xs text-slate-500 text-right tabular-nums">
        {cotation ? new Date(cotation.date_visite).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }) : <span className="text-slate-700">—</span>}
      </td>
    </tr>
  )
}
