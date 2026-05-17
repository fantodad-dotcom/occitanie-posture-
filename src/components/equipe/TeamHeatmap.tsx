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
    <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-950 border-b border-gray-800">
            <th scope="col" className="px-4 py-2.5 text-left text-xs font-semibold text-blue-400">Délégué</th>
            <th scope="col" className="px-2 py-2.5 text-center text-xs font-semibold text-sky-400"><span aria-hidden="true">🔵</span> I</th>
            <th scope="col" className="px-2 py-2.5 text-center text-xs font-semibold text-green-400"><span aria-hidden="true">🟢</span> D</th>
            <th scope="col" className="px-2 py-2.5 text-center text-xs font-semibold text-orange-400"><span aria-hidden="true">🟠</span> E</th>
            <th scope="col" className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500">Geste en cours</th>
            <th scope="col" className="px-4 py-2.5 text-right text-xs font-semibold text-gray-500">Dern. DV</th>
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
