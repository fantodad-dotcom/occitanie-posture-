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

      {/* ── Mobile cards (< md) ── */}
      <div className="md:hidden" style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {delegues.map(d => {
          const cotation = cotationsMap.get(d.id) ?? null
          const axes = [
            { label: 'Interpeller', color: '#38BDF8', score: cotation?.interpeller ?? null },
            { label: 'Débattre',    color: '#4ADE80', score: cotation?.debattre    ?? null },
            { label: 'Engager',     color: '#FB923C', score: cotation?.engager     ?? null },
          ]
          const hasUrgent = axes.some(a => a.score === 1)
          const avgScore = (() => {
            const vals = axes.map(a => a.score).filter((s): s is number => s !== null)
            return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null
          })()

          return (
            <button
              key={d.id}
              onClick={() => onSelectDelegue(d.id)}
              aria-label={`Voir le profil de ${d.nom}`}
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                background: hasUrgent ? 'rgba(248,81,73,0.05)' : '#242424',
                border: `1px solid ${hasUrgent ? 'rgba(248,81,73,0.2)' : 'rgba(255,255,255,0.07)'}`,
                borderRadius: '10px', padding: '14px 16px',
                cursor: 'pointer', transition: 'border-color 0.15s, background 0.15s',
              }}
            >
              {/* Card header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#ECECEC' }}>{d.nom}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {avgScore !== null && (
                    <span style={{
                      fontSize: '11px', fontWeight: 700,
                      color: avgScore >= 3 ? '#3fb950' : avgScore >= 2 ? '#f0883e' : '#f85149',
                    }}>
                      {avgScore.toFixed(1)} moy.
                    </span>
                  )}
                  {hasUrgent && (
                    <span style={{
                      fontSize: '10px', fontWeight: 600, color: '#f85149',
                      background: 'rgba(248,81,73,0.12)', border: '1px solid rgba(248,81,73,0.25)',
                      padding: '2px 7px', borderRadius: '20px',
                    }}>urgent</span>
                  )}
                </div>
              </div>

              {/* Axes */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                {axes.map(({ label, color, score }) => {
                  const levelColor = score === null ? '#444' : score === 1 ? '#f85149' : score === 2 ? '#f0883e' : '#3fb950'
                  const levelLabel = score === null ? '—' : score === 1 ? 'En cours' : score === 2 ? 'Acquis' : 'Expert'
                  return (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 600, color, width: '80px', flexShrink: 0 }}>{label}</span>
                      {/* Dots */}
                      <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                        {[1, 2, 3].map(n => (
                          <span key={n} style={{
                            width: '8px', height: '8px', borderRadius: '50%',
                            background: score !== null && n <= score ? levelColor : 'rgba(255,255,255,0.1)',
                            display: 'inline-block',
                            transition: 'background 0.15s',
                          }} />
                        ))}
                      </div>
                      <span style={{ fontSize: '11px', color: score !== null ? levelColor : '#444', fontWeight: score !== null ? 500 : 400 }}>
                        {levelLabel}
                      </span>
                    </div>
                  )
                })}
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
