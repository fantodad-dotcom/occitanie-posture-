'use client'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import type { Cotation } from '@/lib/supabase/types'

type Props = { cotations: Cotation[] }

export function ProgressionChart({ cotations }: Props) {
  if (cotations.length < 2) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 text-center text-gray-500 text-sm mb-6">
        Minimum 2 DUOs pour afficher la progression.
      </div>
    )
  }

  const data = cotations.map(c => ({
    date: new Date(c.date_visite).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }),
    Interpeller: c.interpeller,
    Débattre: c.debattre,
    Engager: c.engager,
  }))

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 mb-6">
      <h2 className="text-sm font-semibold text-gray-300 mb-4">Progression</h2>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 11 }} />
          <YAxis domain={[1, 4]} ticks={[1, 2, 3, 4]} tick={{ fill: '#6b7280', fontSize: 11 }} />
          <Tooltip contentStyle={{ background: '#1f2937', border: '1px solid #374151', borderRadius: 8 }} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Line type="monotone" dataKey="Interpeller" stroke="#4fc3f7" strokeWidth={2} connectNulls dot={{ r: 4 }} />
          <Line type="monotone" dataKey="Débattre" stroke="#81c784" strokeWidth={2} connectNulls dot={{ r: 4 }} />
          <Line type="monotone" dataKey="Engager" stroke="#ffb74d" strokeWidth={2} connectNulls dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
