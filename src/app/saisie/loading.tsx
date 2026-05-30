import { AppShell } from '@/components/layout/AppShell'
import { Skeleton } from '@/components/ui/Skeleton'

export default function Loading() {
  return (
    <AppShell>
      <div style={{ maxWidth: '520px', margin: '0 auto', padding: '16px 24px 40px' }}>
        <Skeleton height="16px" width="140px" style={{ marginBottom: '6px' }} />
        <Skeleton height="12px" width="160px" style={{ marginBottom: '20px' }} />
        {/* Délégué + date */}
        <div style={{ background: '#1C1C1C', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '16px', marginBottom: '16px', display: 'flex', gap: '12px' }}>
          <div style={{ flex: 2 }}>
            <Skeleton height="11px" width="60px" style={{ marginBottom: '8px' }} />
            <Skeleton height="36px" />
          </div>
          <div style={{ flex: 1 }}>
            <Skeleton height="11px" width="60px" style={{ marginBottom: '8px' }} />
            <Skeleton height="36px" />
          </div>
        </div>
        {/* 3 axes */}
        {[0,1,2].map(i => (
          <div key={i} style={{ background: '#1C1C1C', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '16px', marginBottom: '12px' }}>
            <Skeleton height="13px" width="100px" style={{ marginBottom: '12px' }} />
            <div style={{ display: 'flex', gap: '8px' }}>
              {[0,1,2].map(j => <Skeleton key={j} height="60px" style={{ flex: 1, borderRadius: '10px' }} />)}
              <Skeleton height="60px" width="48px" style={{ borderRadius: '10px' }} />
            </div>
          </div>
        ))}
        <Skeleton height="48px" radius="10px" style={{ marginTop: '4px' }} />
      </div>
    </AppShell>
  )
}
