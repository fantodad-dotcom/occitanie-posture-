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

const STATUT_CONFIG: Record<Statut, { label: string; color: string; bg: string; border: string }> = {
  urgent:     { label: 'Urgent',      color: '#f85149', bg: 'rgba(248,81,73,0.06)',   border: 'rgba(248,81,73,0.25)' },
  a_planifier:{ label: 'À planifier', color: '#f0883e', bg: 'rgba(240,136,62,0.06)',  border: 'rgba(240,136,62,0.2)' },
  ok:         { label: 'OK',          color: '#3fb950', bg: 'rgba(63,185,80,0.05)',   border: 'rgba(63,185,80,0.18)' },
}

export function PrioriteCard({ delegue, cotation, dvPlanifiee, semainsSansDV, statut }: Props) {
  const [date, setDate] = useState('')
  const [loading, setLoading] = useState(false)
  const cfg = STATUT_CONFIG[statut]

  async function handlePlanifier() {
    if (!date) return
    setLoading(true)
    await planifierDV(delegue.id, date)
    setLoading(false)
  }

  return (
    <div style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, borderRadius: '10px', padding: '16px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div>
          <Link href={`/delegue/${delegue.id}`}
            style={{ color: '#ECECEC', fontWeight: 600, fontSize: '14px', textDecoration: 'none', transition: 'color 0.15s' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#818CF8'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#ECECEC'}
          >
            {delegue.nom}
          </Link>
          {delegue.secteur && (
            <p style={{ color: '#666', fontSize: '11px', marginTop: '2px' }}>{delegue.secteur}</p>
          )}
        </div>
        <span style={{
          fontSize: '10px', fontWeight: 600, color: cfg.color,
          background: `${cfg.color}14`, border: `1px solid ${cfg.color}33`,
          padding: '2px 8px', borderRadius: '20px',
        }}>
          {cfg.label}
        </span>
      </div>

      {/* Scores + semaines */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '12px' }}>
        <ScoreBadge score={cotation?.interpeller ?? null} size="sm" />
        <ScoreBadge score={cotation?.debattre ?? null} size="sm" />
        <ScoreBadge score={cotation?.engager ?? null} size="sm" />
        <span style={{ color: '#555', fontSize: '11px', marginLeft: 'auto' }}>
          {semainsSansDV === 0 ? 'DUO cette semaine' : `${semainsSansDV} sem. sans DUO`}
        </span>
      </div>

      {/* DV planifiée ou formulaire */}
      {dvPlanifiee ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.04)', borderRadius: '6px', padding: '8px 12px' }}>
          <span style={{ color: '#DCDCDC', fontSize: '13px' }}>
            DUO prévu le {new Date(dvPlanifiee.date_prevue).toLocaleDateString('fr-FR')}
          </span>
          <button
            onClick={() => marquerRealisee(dvPlanifiee.id)}
            style={{ color: '#3fb950', fontSize: '12px', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.15s' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#5fd070'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#3fb950'}
          >
            Réalisé
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            style={{ flex: 1, padding: '7px 10px', background: '#242424', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', color: '#ECECEC', fontSize: '13px' }}
          />
          <button
            onClick={handlePlanifier}
            disabled={!date || loading}
            style={{
              padding: '7px 14px', borderRadius: '8px', border: 'none', fontSize: '13px', fontWeight: 600,
              background: date && !loading ? '#6366F1' : 'rgba(99,102,241,0.25)',
              color: date && !loading ? '#fff' : 'rgba(255,255,255,0.3)',
              cursor: date && !loading ? 'pointer' : 'not-allowed',
              transition: 'background 0.15s',
            }}
          >
            Planifier
          </button>
        </div>
      )}
    </div>
  )
}
