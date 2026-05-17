import { scoreColor } from '@/lib/utils/scores'

type Props = { score: number | null; size?: 'sm' | 'md' }

export function ScoreBadge({ score, size = 'md' }: Props) {
  const color = scoreColor(score)
  const sizeClass = size === 'sm' ? 'text-xs px-1.5 py-0.5' : 'text-sm px-2 py-1'
  return (
    <span
      className={`inline-flex items-center justify-center font-bold rounded ${sizeClass}`}
      style={{ backgroundColor: `${color}22`, color }}
    >
      {score ?? '?'}
    </span>
  )
}
