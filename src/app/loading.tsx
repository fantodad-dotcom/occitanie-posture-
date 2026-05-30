import { AppShell } from '@/components/layout/AppShell'
import { Skeleton, SkeletonCard } from '@/components/ui/Skeleton'

export default function Loading() {
  return (
    <AppShell>
      <div style={{ padding: '16px' }}>
        <div style={{ marginBottom: '16px' }}>
          <Skeleton height="16px" width="120px" style={{ marginBottom: '6px' }} />
          <Skeleton height="12px" width="160px" />
        </div>
        {/* KPI cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
          {[0,1,2,3].map(i => (
            <div key={i} style={{ background: '#1C1C1C', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '16px' }}>
              <Skeleton height="11px" width="80px" style={{ marginBottom: '10px' }} />
              <Skeleton height="28px" width="50px" style={{ marginBottom: '6px' }} />
              <Skeleton height="10px" width="40px" />
            </div>
          ))}
        </div>
        {/* Delegate cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[0,1,2,3,4].map(i => (
            <div key={i} style={{ background: '#242424', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '14px 16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <Skeleton height="14px" width={`${80 + i * 12}px`} />
                <Skeleton height="11px" width="50px" />
              </div>
              {[0,1,2].map(j => (
                <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: j < 2 ? '7px' : '0' }}>
                  <Skeleton height="12px" width="80px" />
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {[0,1,2].map(k => <Skeleton key={k} height="8px" width="8px" radius="50%" />)}
                  </div>
                  <Skeleton height="11px" width="55px" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  )
}
