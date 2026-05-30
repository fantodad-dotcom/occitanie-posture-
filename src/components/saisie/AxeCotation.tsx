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
  behaviors?: string[]
}

export function AxeCotation({ label, color, value, onChange, behaviors }: Props) {
  return (
    <div style={{ marginBottom: '4px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <p style={{ fontSize: '13px', fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {label}
        </p>
        {value !== null && (
          <span style={{
            fontSize: '10px', fontWeight: 600,
            color: NIVEAU_COLORS[value],
            background: `${NIVEAU_COLORS[value]}18`,
            border: `1px solid ${NIVEAU_COLORS[value]}44`,
            padding: '2px 8px', borderRadius: '20px',
          }}>
            {NIVEAU_LABELS[value]}
          </span>
        )}
      </div>

      {/* Boutons niveau */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: behaviors?.length ? '10px' : '0' }}>
        {[1, 2, 3].map(n => {
          const isSelected = value === n
          const levelColor = NIVEAU_COLORS[n]
          return (
            <button
              key={n}
              type="button"
              onClick={() => onChange(isSelected ? null : n)}
              onMouseEnter={e => { if (!isSelected) (e.currentTarget as HTMLElement).style.borderColor = `${levelColor}55` }}
              onMouseLeave={e => { if (!isSelected) (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)' }}
              style={{
                flex: 1,
                padding: '10px 8px 8px',
                borderRadius: '10px',
                border: `2px solid ${isSelected ? levelColor : 'rgba(255,255,255,0.08)'}`,
                background: isSelected ? `${levelColor}18` : 'rgba(255,255,255,0.03)',
                cursor: 'pointer',
                transition: 'border-color 0.15s, background 0.15s, color 0.15s',
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
          aria-label="Effacer la cotation"
          style={{
            width: '48px',
            borderRadius: '10px',
            border: `2px solid ${value === null ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.08)'}`,
            background: value === null ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 700,
            color: value === null ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.15)',
            transition: 'border-color 0.15s, background 0.15s',
          }}
        >
          ?
        </button>
      </div>

      {/* Comportements attendus */}
      {behaviors && behaviors.length > 0 && (
        <div style={{
          background: `${color}08`,
          border: `1px solid ${color}18`,
          borderRadius: '8px',
          padding: '10px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}>
          {behaviors.map((b, i) => (
            <div key={i} style={{ display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
              <span style={{ color, fontSize: '10px', marginTop: '2px', flexShrink: 0, opacity: 0.6 }}>•</span>
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', lineHeight: '1.55' }}>{b}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
