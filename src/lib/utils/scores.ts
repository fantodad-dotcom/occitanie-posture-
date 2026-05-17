export function scoreColor(score: number | null): string {
  if (score === null) return '#6e7681'
  const colors: Record<number, string> = {
    1: '#f85149',
    2: '#f0883e',
    3: '#3fb950',
    4: '#58a6ff',
  }
  return colors[score] ?? '#6e7681'
}

export function scoreMoyen(scores: (number | null)[]): number | null {
  const valides = scores.filter((s): s is number => s !== null)
  if (valides.length === 0) return null
  return valides.reduce((a, b) => a + b, 0) / valides.length
}

export function markerPosition(moyenne: number | null): number | null {
  if (moyenne === null) return null
  return Math.round(moyenne)
}
