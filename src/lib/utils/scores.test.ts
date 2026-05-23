import { describe, it, expect } from 'vitest'
import { scoreColor, scoreMoyen, markerPosition } from './scores'

describe('scoreColor', () => {
  it('retourne rouge pour niveau 1', () => expect(scoreColor(1)).toBe('#f85149'))
  it('retourne orange pour niveau 2', () => expect(scoreColor(2)).toBe('#f0883e'))
  it('retourne vert pour niveau 3', () => expect(scoreColor(3)).toBe('#3fb950'))
  it('retourne gris pour niveau inexistant', () => expect(scoreColor(4)).toBe('#6e7681'))
  it('retourne gris pour null', () => expect(scoreColor(null)).toBe('#6e7681'))
})

describe('scoreMoyen', () => {
  it('calcule la moyenne en excluant les nulls', () =>
    expect(scoreMoyen([2, null, 3])).toBeCloseTo(2.5))
  it('retourne null si tous les scores sont null', () =>
    expect(scoreMoyen([null, null])).toBeNull())
})

describe('markerPosition', () => {
  it('arrondit au niveau le plus proche', () => {
    expect(markerPosition(1.4)).toBe(1)
    expect(markerPosition(1.6)).toBe(2)
    expect(markerPosition(2.5)).toBe(3)
  })
  it('retourne null si moyenne null', () => expect(markerPosition(null)).toBeNull())
})
