import { AppShell } from '@/components/layout/AppShell'
import { Skeleton } from '@/components/ui/Skeleton'

export default function Loading() {
  return (
    <AppShell>
      <div style={{ padding: '16px' }}>
        <Skeleton height="20px" width="180px" style={{ marginBottom: '20px' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[0,1,2,3,4,5].map(i => (
            <div key={i} style={{ background: '#1C1C1C', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <Skeleton height="14px" width={`${90 + i * 10}px`} />
                <Skeleton height="18px" width="60px" radius="20px" />
              </div>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                {[0,1,2].map(j => <Skeleton key={j} height="26px" width="26px" radius="6px" />)}
                <Skeleton height="11px" width="80px" style={{ marginLeft: 'auto', alignSelf: 'center' }} />
              </div>
              <Skeleton height="34px" radius="8px" />
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  )
}
