'use client'
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts'

type Props = { interpeller: number; debattre: number; engager: number }

export function RadarEquipe({ interpeller, debattre, engager }: Props) {
  const data = [
    { axe: 'Interpeller', score: interpeller },
    { axe: 'Débattre', score: debattre },
    { axe: 'Engager', score: engager },
  ]
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
      <h2 className="text-sm font-semibold text-gray-300 mb-2">Radar équipe</h2>
      <ResponsiveContainer width="100%" height={200}>
        <RadarChart data={data}>
          <PolarGrid stroke="#374151" />
          <PolarAngleAxis dataKey="axe" tick={{ fill: '#9ca3af', fontSize: 11 }} />
          <Radar dataKey="score" stroke="#4fc3f7" fill="#4fc3f7" fillOpacity={0.2} dot={true} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
