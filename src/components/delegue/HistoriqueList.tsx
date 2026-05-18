import { ScoreBadge } from '@/components/ui/ScoreBadge'
import type { Cotation } from '@/lib/supabase/types'

type Props = { cotations: Cotation[] }

export function HistoriqueList({ cotations }: Props) {
  const sorted = [...cotations].reverse()
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
      <h2 className="text-sm font-semibold text-gray-300 px-4 py-3 border-b border-gray-800">Historique des DV</h2>
      {sorted.length === 0 ? (
        <p className="text-gray-600 text-sm p-4">Aucune double visite enregistrée.</p>
      ) : (
        <div className="divide-y divide-gray-800">
          {sorted.map(c => (
            <details key={c.id} className="group">
              <summary className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-800/50 transition-colors list-none">
                <span className="text-sm text-gray-400 w-16 shrink-0">
                  {new Date(c.date_visite).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                </span>
                <div className="flex gap-1.5">
                  <ScoreBadge score={c.interpeller} size="sm" />
                  <ScoreBadge score={c.debattre} size="sm" />
                  <ScoreBadge score={c.engager} size="sm" />
                </div>
                <span className="text-xs text-gray-500 flex-1 truncate">{c.geste_prioritaire ?? '—'}</span>
                <span className="text-gray-600 group-open:rotate-90 transition-transform">›</span>
              </summary>
              {c.notes_debrief && (
                <div className="px-4 pb-3 pt-1">
                  <p className="text-xs text-gray-500 leading-relaxed">{c.notes_debrief}</p>
                </div>
              )}
            </details>
          ))}
        </div>
      )}
    </div>
  )
}
