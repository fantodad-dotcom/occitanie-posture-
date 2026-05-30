import { AppShell } from '@/components/layout/AppShell'
import { Skeleton } from '@/components/ui/Skeleton'

export default function Loading() {
  return (
    <AppShell>
      <div style={{ padding: '16px', maxWidth: '768px' }}>
        {/* Header */}
        <div style={{ background: '#1C1C1C', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '20px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '16px' }}>
            <Skeleton height="44px" width="44px" radius="50%" />
            <div style={{ flex: 1 }}>
              <Skeleton height="16px" width="120px" style={{ marginBottom: '6px' }} />
              <Skeleton height="12px" width="80px" />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {[0,1,2].map(i => (
              <div key={i} style={{ flex: 1, background: '#242424', borderRadius: '8px', padding: '12px' }}>
                <Skeleton height="11px" width="60%" style={{ marginBottom: '8px' }} />
                <Skeleton height="20px" width="40%" />
              </div>
            ))}
          </div>
        </div>
        {/* Chart */}
        <Skeleton height="180px" radius="10px" style={{ marginBottom: '16px' }} />
        {/* History */}
        <div style={{ background: '#1C1C1C', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', overflow: 'hidden' }}>
          {[0,1,2,3].map(i => (
            <div key={i} style={{ padding: '14px 16px', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none', display: 'flex', gap: '12px', alignItems: 'center' }}>
              <Skeleton height="12px" width="60px" />
              <div style={{ display: 'flex', gap: '6px', marginLeft: 'auto' }}>
                {[0,1,2].map(j => <Skeleton key={j} height="24px" width="24px" radius="6px" />)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  )
}
