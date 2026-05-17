'use client'
import { useState } from 'react'
import { KpiCards } from './KpiCards'
import { TeamHeatmap } from './TeamHeatmap'
import type { Cotation, Delegue } from '@/lib/supabase/types'

type CotationEntry = { delegue_id: string; cotation: Cotation }

type Props = {
  delegues: Delegue[]
  cotationsData: CotationEntry[]
  dvCeMois: number
}

export function VueEquipe({ delegues, cotationsData, dvCeMois }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selected = selectedId ? delegues.find(d => d.id === selectedId) : null

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-0 bg-gray-900 border border-gray-800 rounded-lg p-1">
          <button
            onClick={() => setSelectedId(null)}
            className={`px-4 py-1.5 text-sm rounded-md transition-colors ${!selectedId ? 'bg-blue-700 text-white font-medium' : 'text-gray-400 hover:text-white'}`}
          >
            Équipe ({delegues.length})
          </button>
          {selected && (
            <button className="px-4 py-1.5 text-sm text-blue-400 font-medium">
              {selected.nom} →
            </button>
          )}
        </div>
      </div>

      {!selectedId ? (
        <>
          <KpiCards delegues={delegues} cotationsData={cotationsData} dvCeMois={dvCeMois} />
          <TeamHeatmap
            delegues={delegues}
            cotationsData={cotationsData}
            onSelectDelegue={setSelectedId}
          />
        </>
      ) : (
        <div className="text-gray-400">Profil délégué — voir /delegue/[id]</div>
      )}
    </div>
  )
}
