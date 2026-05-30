import { AppShell } from '@/components/layout/AppShell'
import { Skeleton } from '@/components/ui/Skeleton'

export default function Loading() {
  return (
    <AppShell>
      <div style={{ padding: '16px' }}>
        <Skeleton height="16px" width="200px" style={{ marginBottom: '6px' }} />
        <Skeleton height="12px" width="260px" style={{ marginBottom: '20px' }} />
        {/* Delegate selector */}
        <div style={{ background: '#1C1C1C', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '16px', marginBottom: '16px' }}>
          <Skeleton height="11px" width="60px" style={{ marginBottom: '10px' }} />
          <div style={{ display: 'flex', gap: '6px', overflowX: 'hidden' }}>
            {[0,1,2,3].map(i => <Skeleton key={i} height="34px" width="80px" radius="8px" />)}
          </div>
        </div>
        {/* Axis tabs */}
        <Skeleton height="40px" radius="10px" style={{ marginBottom: '16px' }} />
        {/* Questions */}
        <div style={{ background: '#1C1C1C', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '20px' }}>
          <Skeleton height="14px" width="120px" style={{ marginBottom: '16px' }} />
          {[0,1,2,3].map(i => (
            <div key={i} style={{ background: '#242424', borderRadius: '8px', padding: '14px', marginBottom: i < 3 ? '10px' : '0', display: 'flex', gap: '12px' }}>
              <Skeleton height="14px" width="14px" radius="3px" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div style={{ flex: 1 }}>
                <Skeleton height="13px" width="100%" style={{ marginBottom: '6px' }} />
                <Skeleton height="13px" width={`${60 + i * 10}%`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  )
}
