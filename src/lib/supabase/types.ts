export type Delegue = {
  id: string
  nom: string
  secteur: string | null
  actif: boolean
  manager_id: string
  created_at: string
}

export type Cotation = {
  id: string
  delegue_id: string
  date_visite: string
  interpeller: number | null  // 1-3, null = non observé
  debattre: number | null
  engager: number | null
  geste_prioritaire: string | null
  notes_debrief: string | null
  created_at: string
}

export type DoubleVisite = {
  id: string
  delegue_id: string
  date_prevue: string
  statut: 'planifiée' | 'réalisée' | 'annulée'
  created_at: string
}

export type ShareToken = {
  id: string
  manager_id: string
  token: string
  actif: boolean
  created_at: string
}

// Vue enrichie utilisée dans les composants
export type DelegueAvecDernieresCotations = Delegue & {
  derniereCotation: Cotation | null
  derniereDV: string | null  // date ISO
}
