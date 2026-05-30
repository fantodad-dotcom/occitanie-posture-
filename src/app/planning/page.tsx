import { AppShell } from '@/components/layout/AppShell'
import { ReferentielSidebar } from '@/components/layout/ReferentielSidebar'
import { PrioriteCard } from '@/components/planning/PrioriteCard'
import { getDeleguesActifs } from '@/lib/queries/delegues'
import { getDernieresCotations, getAllCotations } from '@/lib/queries/cotations'
import { getDVPlanifiees } from '@/lib/queries/doublesVisites'
import { calculPriorite, statutDV } from '@/lib/utils/priorite'
import { scoreMoyen } from '@/lib/utils/scores'
import type { Cotation } from '@/lib/supabase/types'

export default async function PlanningPage() {
  const [delegues, cotationsData, dvPlanifiees, allCotations] = await Promise.all([
    getDeleguesActifs(),
    getDernieresCotations(),
    getDVPlanifiees(),
    getAllCotations(),
  ])

  const cotationsMap = new Map<string, Cotation>(
    cotationsData
      .filter(({ cotation }) => cotation !== null)
      .map(({ delegue_id, cotation }) => [delegue_id, cotation!])
  )

  const dvMap = new Map(dvPlanifiees.map(dv => [dv.delegue_id, dv]))

  function semainsSansDV(delegueId: string): number {
    const dvs = allCotations.filter(c => c.delegue_id === delegueId)
    if (dvs.length === 0) return 99
    const derniere = new Date(dvs[dvs.length - 1].date_visite)
    return Math.floor((Date.now() - derniere.getTime()) / (1000 * 60 * 60 * 24 * 7))
  }

  const items = delegues.map(d => {
    const c = cotationsMap.get(d.id) ?? null
    const sem = semainsSansDV(d.id)
    const moy = scoreMoyen([c?.interpeller ?? null, c?.debattre ?? null, c?.engager ?? null])
    const priorite = calculPriorite(moy ?? 2, sem)
    const statut = statutDV(
      { interpeller: c?.interpeller ?? null, debattre: c?.debattre ?? null, engager: c?.engager ?? null },
      sem
    )
    return { delegue: d, cotation: c, dvPlanifiee: dvMap.get(d.id) ?? null, sem, priorite, statut }
  }).sort((a, b) => b.priorite - a.priorite)

  return (
    <AppShell referentielSidebar={<ReferentielSidebar interpeller={null} debattre={null} engager={null} />}>
      <div className="p-6">
        <h1 className="text-xl font-bold text-white mb-6">File de priorité DUO</h1>
        <div className="space-y-3">
          {items.map(({ delegue, cotation, dvPlanifiee, sem, statut }) => (
            <PrioriteCard
              key={delegue.id}
              delegue={delegue}
              cotation={cotation}
              dvPlanifiee={dvPlanifiee}
              semainsSansDV={sem}
              statut={statut}
            />
          ))}
        </div>
      </div>
    </AppShell>
  )
}
