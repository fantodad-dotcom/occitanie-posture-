'use client'
import { useMemo } from 'react'
import { DelegueRow } from './DelegueRow'
import type { Cotation, Delegue } from '@/lib/supabase/types'

type CotationEntry = { delegue_id: string; cotation: Cotation }

type Props = {
  delegues: Delegue[]
  cotationsData: CotationEntry[]
  onSelectDelegue: (id: string) => void
}

export function TeamHeatmap({ delegues, cotationsData, onSelectDelegue }: Props) {
  const cotationsMap = useMemo(
    () => new Map<string, Cotation>(
      cotationsData.map(({ delegue_id, cotation }) => [delegue_id, cotation])
    ),
    [cotationsData]
  )

  return (
    <div className="bg-slate-900/50 border border-slate-800/60 rounded-xl overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-slate-950/80 border-b border-slate-800/60">
            <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">Délégué</th>
            <th scope="col" className="px-3 py-3 text-center text-xs font-semibold text-sky-400 uppercase tracking-wide">Interpeller</th>
            <th scope="col" className="px-3 py-3 text-center text-xs font-semibold text-emerald-400 uppercase tracking-wide">Débattre</th>
            <th scope="col" className="px-3 py-3 text-center text-xs font-semibold text-amber-400 uppercase tracking-wide">Engager</th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Geste en cours</th>
            <th scope="col" className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wide">Dern. DV</th>
          </tr>
        </thead>
        <tbody>
          {delegues.map(d => (
            <DelegueRow
              key={d.id}
              delegue={d}
              cotation={cotationsMap.get(d.id) ?? null}
              onClick={() => onSelectDelegue(d.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
