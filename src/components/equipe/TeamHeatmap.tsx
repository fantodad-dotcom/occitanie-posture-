'use client'
import { DelegueRow } from './DelegueRow'
import type { Cotation, Delegue } from '@/lib/supabase/types'

type CotationEntry = { delegue_id: string; cotation: Cotation }

type Props = {
  delegues: Delegue[]
  cotationsData: CotationEntry[]
  onSelectDelegue: (id: string) => void
}

export function TeamHeatmap({ delegues, cotationsData, onSelectDelegue }: Props) {
  const cotationsMap = new Map<string, Cotation>(
    cotationsData.map(({ delegue_id, cotation }) => [delegue_id, cotation])
  )

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-950 border-b border-gray-800">
            <th className="px-4 py-2.5 text-left text-xs font-semibold text-blue-400">Délégué</th>
            <th className="px-2 py-2.5 text-center text-xs font-semibold text-sky-400">🔵 I</th>
            <th className="px-2 py-2.5 text-center text-xs font-semibold text-green-400">🟢 D</th>
            <th className="px-2 py-2.5 text-center text-xs font-semibold text-orange-400">🟠 E</th>
            <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500">Geste en cours</th>
            <th className="px-4 py-2.5 text-right text-xs font-semibold text-gray-500">Dern. DV</th>
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
