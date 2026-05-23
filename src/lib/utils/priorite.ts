type Scores = { interpeller: number | null; debattre: number | null; engager: number | null }

export function calculPriorite(scoreMoyen: number, semainsSansDV: number): number {
  return (3 - scoreMoyen) + (semainsSansDV * 0.5)
}

export function statutDV(scores: Scores, semainsSansDV: number): 'urgent' | 'a_planifier' | 'ok' {
  const hasNiveau1 = [scores.interpeller, scores.debattre, scores.engager].some(s => s === 1)
  if (hasNiveau1 || semainsSansDV > 6) return 'urgent'
  if (semainsSansDV > 3) return 'a_planifier'
  return 'ok'
}
