import { AppShell } from '@/components/layout/AppShell'
import { SaisieForm } from '@/components/saisie/SaisieForm'
import { getDeleguesActifs } from '@/lib/queries/delegues'

type Props = { searchParams: Promise<{ delegue?: string }> }

export default async function SaisiePage({ searchParams }: Props) {
  const { delegue } = await searchParams
  const delegues = await getDeleguesActifs()

  return (
    <AppShell>
      <div className="py-6">
        <h1 className="text-lg font-bold text-white text-center mb-6">📋 Saisie post-DV</h1>
        <SaisieForm delegues={delegues} preselectedId={delegue} />
      </div>
    </AppShell>
  )
}
