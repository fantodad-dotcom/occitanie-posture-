type Props = { actuel: number; cible: number }

export function GaugeObjectif({ actuel, cible }: Props) {
  const pct = Math.min(100, Math.round((actuel / cible) * 100))
  const color = pct >= 100 ? '#3fb950' : pct >= 60 ? '#f0883e' : '#f85149'
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-4">
      <div className="flex justify-between items-baseline mb-2">
        <h2 className="text-sm font-semibold text-gray-300">% délégués niveau 3+ sur 2 axes</h2>
        <span className="text-sm text-gray-500">Cible : {cible}%</span>
      </div>
      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-4xl font-bold" style={{ color }}>{actuel}%</span>
        <span className="text-gray-500 text-sm">({pct}% de l&apos;objectif)</span>
      </div>
      <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
    </div>
  )
}
