import { AppShell } from '@/components/layout/AppShell'
import { Skeleton } from '@/components/ui/Skeleton'

export default function Loading() {
  return (
    <AppShell>
      <div style={{ padding: '16px', maxWidth: '672px' }}>
        <Skeleton height="20px" width="180px" style={{ marginBottom: '20px' }} />
        <Skeleton height="120px" radius="10px" style={{ marginBottom: '16px' }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
          <Skeleton height="90px" radius="10px" />
          <Skeleton height="90px" radius="10px" />
        </div>
        <Skeleton height="260px" radius="10px" />
      </div>
    </AppShell>
  )
}
