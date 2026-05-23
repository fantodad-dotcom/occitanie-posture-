'use client'

const NIVEAU_LABELS: Record<number, string> = {
  1: 'En cours',
  2: 'Acquis',
  3: 'Expert',
}

const NIVEAU_COLORS: Record<number, string> = {
  1: '#f85149',
  2: '#f0883e',
  3: '#3fb950',
}

type Props = {
  label: string
  color: string
  value: number | null
  onChange: (v: number | null) => void
}

export function AxeCotation({ label, color, value, onChange }: Props) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <p style={{ fontSize: '13px', fontWeight: 600, marginBottom: '10px', color }}>{label}</p>
      <div style={{ display: 'flex', gap: '8px' }}>
        {[1, 2, 3].map(n => {
          const isSelected = value === n
          const levelColor = NIVEAU_COLORS[n]
          return (
            <button
              key={n}
              type="button"
              onClick={() => onChange(isSelected ? null : n)}
              style={{
                flex: 1,
                padding: '10px 8px 8px',
                borderRadius: '10px',
                border: `2px solid ${isSelected ? levelColor : 'rgba(255,255,255,0.08)'}`,
                background: isSelected ? `${levelColor}18` : 'rgba(255,255,255,0.03)',
                cursor: 'pointer',
                transition: 'all 0.15s',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <span style={{
                fontSize: '20px',
                fontWeight: 700,
                color: isSelected ? levelColor : 'rgba(255,255,255,0.25)',
              }}>{n}</span>
              <span style={{
                fontSize: '10px',
                fontWeight: 500,
                color: isSelected ? levelColor : 'rgba(255,255,255,0.2)',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}>{NIVEAU_LABELS[n]}</span>
            </button>
          )
        })}
        <button
          type="button"
          onClick={() => onChange(null)}
          style={{
            width: '48px',
            borderRadius: '10px',
            border: `2px solid ${value === null ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.08)'}`,
            background: value === null ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 700,
            color: value === null ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.15)',
          }}
        >
          ?
        </button>
      </div>
    </div>
  )
}
