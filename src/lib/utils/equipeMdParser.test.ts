import { describe, it, expect } from 'vitest'
import { parseMdTable } from './equipeMdParser'

const MD_SAMPLE = `
| Délégué | Interpeller | Débattre | Engager | Geste en cours | Dernière DV |
|---------|------------|---------|---------|----------------|------------|
| Alexandre | 2 | 3 | ? | Tenir le silence | 08/05/2025 |
| Marie | 1 | ? | 1 | — | — |
| Thomas | ? | ? | ? | — | — |
`

describe('parseMdTable', () => {
  it('extrait les délégués avec leurs scores', () => {
    const result = parseMdTable(MD_SAMPLE)
    expect(result).toHaveLength(3)
    expect(result[0]).toMatchObject({ nom: 'Alexandre', interpeller: 2, debattre: 3, engager: null })
    expect(result[1]).toMatchObject({ nom: 'Marie', interpeller: 1, debattre: null, engager: 1 })
    expect(result[2]).toMatchObject({ nom: 'Thomas', interpeller: null, debattre: null, engager: null })
  })

  it('ignore la ligne de séparation ---', () => {
    const result = parseMdTable(MD_SAMPLE)
    expect(result.every(r => r.nom !== '---')).toBe(true)
  })
})
