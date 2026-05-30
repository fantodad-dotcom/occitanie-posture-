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
        <div style={{ maxWidth: '520px', margin: '0 auto', padding: '0 24px 8px' }}>
          <h1 style={{ fontSize: '16px', fontWeight: 700, color: '#ECECEC', marginBottom: '4px' }}>Saisie post-DUO</h1>
          <p style={{ fontSize: '12px', color: '#888' }}>Évaluation E&C · 3 axes</p>
        </div>
        <SaisieForm delegues={delegues} preselectedId={delegue} />
      </div>
    </AppShell>
  )
}
