import Link from 'next/link'
import { ScoreBadge } from '@/components/ui/ScoreBadge'
import type { Cotation, Delegue } from '@/lib/supabase/types'

type Props = { delegue: Delegue; derniereCotation: Cotation | null }

export function DelegueHeader({ delegue, derniereCotation }: Props) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-white">{delegue.nom}</h1>
        {delegue.secteur && <p className="text-gray-500 text-sm mt-0.5">{delegue.secteur}</p>}
        <div className="flex gap-2 mt-3">
          {(['interpeller', 'debattre', 'engager'] as const).map(axe => (
            <div key={axe} className="flex flex-col items-center gap-1">
              <span className="text-[9px] text-gray-500 uppercase">{axe.slice(0, 3)}.</span>
              <ScoreBadge score={derniereCotation?.[axe] ?? null} />
            </div>
          ))}
        </div>
        {derniereCotation?.geste_prioritaire && (
          <p className="mt-3 text-sm text-blue-300">
            Geste : <span className="text-white">{derniereCotation.geste_prioritaire}</span>
          </p>
        )}
      </div>
      <Link
        href={`/saisie?delegue=${delegue.id}`}
        className="px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors"
      >
        📋 Nouvelle cotation
      </Link>
    </div>
  )
}
