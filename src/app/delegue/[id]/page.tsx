import { notFound } from 'next/navigation'
import { AppShell } from '@/components/layout/AppShell'
import { ReferentielSidebar } from '@/components/layout/ReferentielSidebar'
import { DelegueHeader } from '@/components/delegue/DelegueHeader'
import { ProgressionChart } from '@/components/delegue/ProgressionChart'
import { HistoriqueList } from '@/components/delegue/HistoriqueList'
import { getDelegueById } from '@/lib/queries/delegues'
import { getCotationsByDelegue } from '@/lib/queries/cotations'

type Props = { params: Promise<{ id: string }> }

export default async function DeleguePage({ params }: Props) {
  const { id } = await params
  const [delegue, cotations] = await Promise.all([
    getDelegueById(id),
    getCotationsByDelegue(id),
  ])

  if (!delegue) notFound()

  const derniere = cotations.at(-1) ?? null

  return (
    <AppShell referentielSidebar={
      <ReferentielSidebar
        interpeller={derniere?.interpeller ?? null}
        debattre={derniere?.debattre ?? null}
        engager={derniere?.engager ?? null}
      />
    }>
      <div className="p-6 max-w-3xl">
        <DelegueHeader delegue={delegue} derniereCotation={derniere} />
        <ProgressionChart cotations={cotations} />
        <HistoriqueList cotations={cotations} />
      </div>
    </AppShell>
  )
}
