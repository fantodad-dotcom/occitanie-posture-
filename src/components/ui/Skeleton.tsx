export function Skeleton({ width = '100%', height = '16px', radius = '6px', style }: {
  width?: string
  height?: string
  radius?: string
  style?: React.CSSProperties
}) {
  return (
    <div style={{
      width, height, borderRadius: radius,
      background: 'linear-gradient(90deg, #242424 25%, #2A2A2A 50%, #242424 75%)',
      backgroundSize: '200% 100%',
      animation: 'skeleton-shimmer 1.4s ease infinite',
      ...style,
    }} />
  )
}

export function SkeletonCard({ rows = 3 }: { rows?: number }) {
  return (
    <div style={{
      background: '#1C1C1C', border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: '10px', padding: '16px',
    }}>
      <Skeleton height="14px" width="40%" style={{ marginBottom: '12px' }} />
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} height="12px" width={`${70 + i * 10}%`} style={{ marginBottom: i < rows - 1 ? '8px' : '0' }} />
      ))}
    </div>
  )
}
