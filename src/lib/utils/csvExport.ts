import type { Cotation } from '@/lib/supabase/types'

type CotationAvecNom = Cotation & { delegues: { nom: string } }

export function exportCotationsCSV(cotations: CotationAvecNom[]): string {
  const header = ['Délégué', 'Date', 'Interpeller', 'Débattre', 'Engager', 'Geste', 'Notes'].join(';')
  const rows = cotations.map(c =>
    [
      c.delegues.nom,
      c.date_visite,
      c.interpeller ?? '?',
      c.debattre ?? '?',
      c.engager ?? '?',
      c.geste_prioritaire ?? '',
      (c.notes_debrief ?? '').replace(/;/g, ','),
    ].join(';')
  )
  return [header, ...rows].join('\n')
}
