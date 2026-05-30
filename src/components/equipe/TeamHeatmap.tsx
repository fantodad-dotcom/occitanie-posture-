'use client'
import { useMemo } from 'react'
import { DelegueRow } from './DelegueRow'
import { ScoreBadge } from '@/components/ui/ScoreBadge'
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

      {/* ── Mobile list (< md) ── */}
      <div className="md:hidden">
        {/* Header */}
        <div style={{ background: '#141414', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#555', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Délégué</span>
          <div style={{ display: 'flex', gap: '28px' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#38BDF8', textTransform: 'uppercase', letterSpacing: '0.06em', width: '28px', textAlign: 'center' }}>I</span>
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#4ADE80', textTransform: 'uppercase', letterSpacing: '0.06em', width: '28px', textAlign: 'center' }}>D</span>
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#FB923C', textTransform: 'uppercase', letterSpacing: '0.06em', width: '28px', textAlign: 'center' }}>E</span>
          </div>
        </div>

        {delegues.map(d => {
          const cotation = cotationsMap.get(d.id) ?? null
          const hasUrgent = cotation && [cotation.interpeller, cotation.debattre, cotation.engager].some(s => s === 1)
          return (
            <button
              key={d.id}
              onClick={() => onSelectDelegue(d.id)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                width: '100%', padding: '12px 16px',
                background: hasUrgent ? 'rgba(239,68,68,0.04)' : 'transparent',
                border: 'none', borderBottom: '1px solid rgba(255,255,255,0.05)',
                cursor: 'pointer', textAlign: 'left',
                transition: 'background 150ms',
              }}
              onMouseEnter={e => { if (!hasUrgent) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)' }}
              onMouseLeave={e => { if (!hasUrgent) (e.currentTarget as HTMLElement).style.background = hasUrgent ? 'rgba(239,68,68,0.04)' : 'transparent' }}
              aria-label={`Voir le profil de ${d.nom}`}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 500, color: '#DCDCDC' }}>
                {hasUrgent && <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f85149', flexShrink: 0, display: 'inline-block' }} />}
                {d.nom}
              </span>
              <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                <ScoreBadge score={cotation?.interpeller ?? null} size="sm" />
                <ScoreBadge score={cotation?.debattre ?? null} size="sm" />
                <ScoreBadge score={cotation?.engager ?? null} size="sm" />
              </div>
            </button>
          )
        })}
      </div>

      {/* ── Desktop table (>= md) ── */}
      <table className="hidden md:table w-full">
        <thead>
          <tr style={{ background: '#141414', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <th scope="col" style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: '#555', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Délégué</th>
            <th scope="col" style={{ padding: '10px 12px', textAlign: 'center', fontSize: '11px', fontWeight: 600, color: '#38BDF8', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Interpeller</th>
            <th scope="col" style={{ padding: '10px 12px', textAlign: 'center', fontSize: '11px', fontWeight: 600, color: '#4ADE80', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Débattre</th>
            <th scope="col" style={{ padding: '10px 12px', textAlign: 'center', fontSize: '11px', fontWeight: 600, color: '#FB923C', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Engager</th>
            <th scope="col" style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: '#555', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Geste en cours</th>
            <th scope="col" style={{ padding: '10px 16px', textAlign: 'right', fontSize: '11px', fontWeight: 600, color: '#555', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Dernier DUO</th>
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
