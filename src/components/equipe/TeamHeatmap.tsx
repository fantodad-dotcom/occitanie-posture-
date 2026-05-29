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
    <div style={{ background: '#1C1C1C', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', overflow: 'hidden' }}>
      <table className="w-full">
        <thead>
          <tr style={{ background: '#141414', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <th scope="col" style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: '#555', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Délégué</th>
            <th scope="col" style={{ padding: '10px 12px', textAlign: 'center', fontSize: '11px', fontWeight: 600, color: '#38BDF8', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Interpeller</th>
            <th scope="col" style={{ padding: '10px 12px', textAlign: 'center', fontSize: '11px', fontWeight: 600, color: '#4ADE80', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Débattre</th>
            <th scope="col" style={{ padding: '10px 12px', textAlign: 'center', fontSize: '11px', fontWeight: 600, color: '#FB923C', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Engager</th>
            <th scope="col" className="hidden md:table-cell" style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: '#555', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Geste en cours</th>
            <th scope="col" className="hidden md:table-cell" style={{ padding: '10px 16px', textAlign: 'right', fontSize: '11px', fontWeight: 600, color: '#555', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Dernier DUO</th>
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
