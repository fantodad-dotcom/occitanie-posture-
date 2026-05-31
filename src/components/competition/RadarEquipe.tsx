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
    <div style={{
      background: 'rgba(22,22,22,0.75)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '10px',
      padding: '16px 16px 8px',
    }}>
      <h2 style={{ fontSize: '12px', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>
        Radar équipe
      </h2>
      <ResponsiveContainer width="100%" height={220}>
        <RadarChart data={data} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
          <PolarGrid stroke="rgba(255,255,255,0.08)" />
          <PolarAngleAxis
            dataKey="axe"
            tick={{ fill: '#888', fontSize: 11, fontFamily: 'Fira Sans, system-ui, sans-serif' }}
          />
          <Radar
            dataKey="score"
            stroke="#C8714E"
            fill="#C8714E"
            fillOpacity={0.15}
            dot={{ fill: '#C8714E', r: 3 }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
