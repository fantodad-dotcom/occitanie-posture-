import type { Cotation, Delegue } from '@/lib/supabase/types'

type CotationEntry = { delegue_id: string; cotation: Cotation }

type Props = {
  delegues: Delegue[]
  cotationsData: CotationEntry[]
  dvCeMois: number
}

export function KpiCards({ delegues, cotationsData, dvCeMois }: Props) {
  const cotationsMap = new Map<string, Cotation>(
    cotationsData.map(({ delegue_id, cotation }) => [delegue_id, cotation])
  )

  const scores = delegues.map(d => {
    const c = cotationsMap.get(d.id)
    const vals = [c?.interpeller, c?.debattre, c?.engager].filter(Boolean) as number[]
    return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null
  }).filter((s): s is number => s !== null)

  const moyenneEquipe = scores.length ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : '–'
  const urgents = delegues.filter(d => {
    const c = cotationsMap.get(d.id)
    return c && [c.interpeller, c.debattre, c.engager].some(s => s === 1)
  }).length
  const modeles = delegues.filter(d => {
    const c = cotationsMap.get(d.id)
    return c && [c.interpeller, c.debattre, c.engager].every(s => s !== null && s >= 3)
  }).length

  const cards = [
    { label: 'MOY. ÉQUIPE', value: moyenneEquipe, sub: '/ 4', color: 'text-white' },
    { label: 'URGENTS', value: urgents, sub: 'niveau 1', color: 'text-red-400' },
    { label: 'MODÈLES', value: modeles, sub: 'niveau 3+', color: 'text-green-400' },
    { label: 'PROCH. DV', value: dvCeMois, sub: 'ce mois', color: 'text-orange-400' },
  ]

  return (
    <div className="grid grid-cols-4 gap-3 mb-6">
      {cards.map(({ label, value, sub, color }) => (
        <div key={label} className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-center">
          <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">{label}</p>
          <p className={`text-3xl font-bold ${color}`}>{value}</p>
          <p className="text-gray-600 text-xs mt-0.5">{sub}</p>
        </div>
      ))}
    </div>
  )
}
