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
    <tr style={{
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      background: hasUrgent ? 'rgba(239,68,68,0.04)' : 'transparent',
      transition: 'background 150ms',
    }}
    onMouseEnter={e => { if (!hasUrgent) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)' }}
    onMouseLeave={e => { if (!hasUrgent) (e.currentTarget as HTMLElement).style.background = 'transparent' }}
    >
      <td style={{ padding: '10px 16px' }}>
        <button
          onClick={onClick}
          style={{ display: 'flex', alignItems: 'center', textAlign: 'left', fontSize: '13px', fontWeight: 500, color: '#DCDCDC', cursor: 'pointer', background: 'none', border: 'none', width: '100%', padding: 0, transition: 'color 150ms' }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#E8956D'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#DCDCDC'}
          aria-label={`Voir le profil de ${delegue.nom}`}
        >
          {hasUrgent && <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: '#EF4444', marginRight: '8px', marginBottom: '1px' }} aria-hidden="true" />}
          {delegue.nom}
        </button>
      </td>
      <td style={{ padding: '10px 12px', textAlign: 'center' }}><ScoreBadge score={cotation?.interpeller ?? null} size="sm" /></td>
      <td style={{ padding: '10px 12px', textAlign: 'center' }}><ScoreBadge score={cotation?.debattre ?? null} size="sm" /></td>
      <td style={{ padding: '10px 12px', textAlign: 'center' }}><ScoreBadge score={cotation?.engager ?? null} size="sm" /></td>
      <td className="hidden md:table-cell" style={{ padding: '10px 16px', fontSize: '12px', color: '#555', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {cotation?.geste_prioritaire ?? <span style={{ color: '#333' }}>—</span>}
      </td>
      <td className="hidden md:table-cell" style={{ padding: '10px 16px', fontSize: '12px', color: '#555', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
        {cotation ? new Date(cotation.date_visite).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }) : <span style={{ color: '#333' }}>—</span>}
      </td>
    </tr>
  )
}
