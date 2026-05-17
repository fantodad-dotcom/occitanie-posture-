'use client'
type Props = {
  label: string
  color: string
  value: number | null
  onChange: (v: number | null) => void
}

export function AxeCotation({ label, color, value, onChange }: Props) {
  return (
    <div className="mb-5">
      <p className="text-sm font-semibold mb-2" style={{ color }}>{label}</p>
      <div className="flex gap-2">
        {[1, 2, 3, 4].map(n => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(value === n ? null : n)}
            className={`flex-1 py-3 text-lg font-bold rounded-lg border-2 transition-colors ${
              value === n
                ? 'border-current text-white'
                : 'border-gray-700 text-gray-500 hover:border-gray-500'
            }`}
            style={value === n ? { borderColor: color, color } : {}}
          >
            {n}
          </button>
        ))}
        <button
          type="button"
          onClick={() => onChange(null)}
          className={`flex-1 py-3 text-lg font-bold rounded-lg border-2 transition-colors ${
            value === null ? 'border-gray-400 text-gray-300' : 'border-gray-700 text-gray-600 hover:border-gray-500'
          }`}
        >
          ?
        </button>
      </div>
    </div>
  )
}
