import { describe, it, expect } from 'vitest'
import { calculPriorite, statutDV } from './priorite'

describe('calculPriorite', () => {
  it('priorité haute si score bas et longue absence', () => {
    const p = calculPriorite(1.5, 8)
    expect(p).toBeGreaterThan(calculPriorite(3, 2))
  })
  it('score 4 et 0 semaines = priorité minimale', () =>
    expect(calculPriorite(4, 0)).toBeLessThan(1))
})

describe('statutDV', () => {
  it('urgent si niveau 1 présent', () =>
    expect(statutDV({ interpeller: 1, debattre: 3, engager: 2 }, 3)).toBe('urgent'))
  it('urgent si plus de 6 semaines sans DV', () =>
    expect(statutDV({ interpeller: 2, debattre: 2, engager: 2 }, 7)).toBe('urgent'))
  it('à_planifier entre 3 et 6 semaines', () =>
    expect(statutDV({ interpeller: 2, debattre: 3, engager: 2 }, 4)).toBe('a_planifier'))
  it('ok si DV récente et scores corrects', () =>
    expect(statutDV({ interpeller: 3, debattre: 3, engager: 3 }, 1)).toBe('ok'))
})
