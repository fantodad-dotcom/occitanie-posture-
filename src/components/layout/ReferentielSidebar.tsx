import { markerPosition } from '@/lib/utils/scores'

type Props = {
  interpeller: number | null
  debattre: number | null
  engager: number | null
}

const AXES = [
  {
    key: 'interpeller' as const,
    label: '🔵 INTERPELLER',
    color: '#4fc3f7',
    bg: 'bg-blue-950',
    niveaux: ['Réflexe produit', 'Premiers gestes', 'Posture acquise', 'Compétiteur'],
  },
  {
    key: 'debattre' as const,
    label: '🟢 DÉBATTRE',
    color: '#81c784',
    bg: 'bg-green-950',
    niveaux: ['Polémique', 'Conscience', 'Débat ouvert', 'Silence tenu'],
  },
  {
    key: 'engager' as const,
    label: '🟠 ENGAGER',
    color: '#ffb74d',
    bg: 'bg-orange-950',
    niveaux: ['Imposé', 'Incohérent', 'Patient-centré', 'Fil rouge'],
  },
]

export function ReferentielSidebar({ interpeller, debattre, engager }: Props) {
  const scores = { interpeller, debattre, engager }

  return (
    <div className="p-2 h-full">
      <p className="text-gray-500 text-[9px] uppercase tracking-widest mb-3 border-b border-gray-800 pb-2">
        📖 Référentiel
      </p>
      <div className="space-y-4">
        {AXES.map((axe) => {
          const marker = markerPosition(scores[axe.key])
          return (
            <div key={axe.key}>
              <p className="text-[9px] font-bold mb-1.5" style={{ color: axe.color }}>
                {axe.label}
              </p>
              <div className="space-y-0.5">
                {axe.niveaux.map((label, i) => {
                  const niveau = i + 1
                  const isMarker = marker === niveau
                  return (
                    <div
                      key={niveau}
                      className={`flex items-center gap-1.5 rounded px-1 py-0.5 ${isMarker ? axe.bg : ''}`}
                    >
                      <span
                        className="text-white text-[8px] px-1 rounded font-bold min-w-[14px] text-center"
                        style={{
                          backgroundColor:
                            niveau === 1 ? '#f85149' :
                            niveau === 2 ? '#f0883e' :
                            niveau === 3 ? '#388e3c' : '#1565c0',
                        }}
                      >
                        {niveau}
                      </span>
                      <span className={`text-[9px] ${isMarker ? 'text-yellow-400 font-semibold' : 'text-gray-500'}`}>
                        {isMarker ? '◀ ici' : label}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
        <div className="border-t border-gray-800 pt-3">
          <p className="text-gray-500 text-[9px] uppercase tracking-widest mb-1.5">⚡ Règles</p>
          <div className="text-[9px] text-gray-600 space-y-0.5 leading-relaxed">
            <p>1 geste / délégué</p>
            <p>Lui d&apos;abord</p>
            <p>Faits ≠ impressions</p>
            <p>Observer ≠ évaluer</p>
          </div>
        </div>
      </div>
    </div>
  )
}
