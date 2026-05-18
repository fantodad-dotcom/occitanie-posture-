import { AppShell } from '@/components/layout/AppShell'
import { DebriefClient } from '@/components/debrief/DebriefClient'
import { getDeleguesActifs } from '@/lib/queries/delegues'

export default async function DebriefPage() {
  const delegues = await getDeleguesActifs()
  return (
    <AppShell>
      <DebriefClient delegues={delegues} />
    </AppShell>
  )
}
