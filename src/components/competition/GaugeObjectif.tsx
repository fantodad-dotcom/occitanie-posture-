type Props = { actuel: number; cible: number }

export function GaugeObjectif({ actuel, cible }: Props) {
  const pct = Math.min(100, Math.round((actuel / cible) * 100))
  const color = pct >= 100 ? '#3fb950' : pct >= 60 ? '#f0883e' : '#f85149'

  return (
    <div style={{
      background: 'rgba(22,22,22,0.75)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '10px',
      padding: '20px',
      marginBottom: '12px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
        <h2 style={{ fontSize: '12px', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Délégués niveau 3 sur 2+ axes
        </h2>
        <span style={{ fontSize: '11px', color: '#555' }}>Cible {cible}%</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '14px' }}>
        <span style={{ fontSize: '36px', fontWeight: 700, color, lineHeight: 1, fontFamily: 'Lora, Georgia, serif' }}>{actuel}%</span>
        <span style={{ fontSize: '12px', color: '#555' }}>{pct}% de l&apos;objectif</span>
      </div>
      <div style={{ height: '6px', background: 'rgba(255,255,255,0.07)', borderRadius: '20px', overflow: 'hidden' }}>
        <div style={{ height: '100%', borderRadius: '20px', background: color, width: `${pct}%`, transition: 'width 0.5s ease' }} />
      </div>
    </div>
  )
}
