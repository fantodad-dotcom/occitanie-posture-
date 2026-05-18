export type DelegueImport = {
  nom: string
  interpeller: number | null
  debattre: number | null
  engager: number | null
  geste: string | null
  derniereDV: string | null
}

function parseScore(s: string): number | null {
  const n = parseInt(s.trim())
  return n >= 1 && n <= 4 ? n : null
}

export function parseMdTable(markdown: string): DelegueImport[] {
  const lines = markdown.split('\n').map(l => l.trim()).filter(l => l.startsWith('|'))
  const dataLines = lines.filter(l => !l.includes('---') && !l.toLowerCase().includes('délégué'))

  return dataLines.map(line => {
    const cells = line.split('|').map(c => c.trim()).filter(Boolean)
    if (cells.length < 4) return null
    return {
      nom: cells[0],
      interpeller: parseScore(cells[1]),
      debattre: parseScore(cells[2]),
      engager: parseScore(cells[3]),
      geste: cells[4] && cells[4] !== '—' ? cells[4] : null,
      derniereDV: cells[5] && cells[5] !== '—' ? cells[5] : null,
    }
  }).filter(Boolean) as DelegueImport[]
}
