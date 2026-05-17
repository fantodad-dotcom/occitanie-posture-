import { AppShell } from '@/components/layout/AppShell'
import { ReferentielSidebar } from '@/components/layout/ReferentielSidebar'

export default function Home() {
  return (
    <AppShell referentielSidebar={<ReferentielSidebar interpeller={2} debattre={3} engager={1} />}>
      <div className="p-6 text-white">Vue équipe — à implémenter</div>
    </AppShell>
  )
}
