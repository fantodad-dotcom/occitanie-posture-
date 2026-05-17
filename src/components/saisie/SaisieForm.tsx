'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AxeCotation } from './AxeCotation'
import { saveCotation } from '@/app/saisie/actions'
import { Toast } from '@/components/ui/Toast'
import type { Delegue } from '@/lib/supabase/types'

type Props = { delegues: Delegue[]; preselectedId?: string }

export function SaisieForm({ delegues, preselectedId }: Props) {
  const router = useRouter()
  const [delegueId, setDelegueId] = useState(preselectedId ?? '')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [interpeller, setInterpeller] = useState<number | null>(null)
  const [debattre, setDebattre] = useState<number | null>(null)
  const [engager, setEngager] = useState<number | null>(null)
  const [geste, setGeste] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(false)

  const canSubmit = Boolean(delegueId && (interpeller || debattre || engager))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit) return
    setLoading(true)
    await saveCotation({ delegue_id: delegueId, date_visite: date, interpeller, debattre, engager, geste_prioritaire: geste, notes_debrief: notes })
    setToast(true)
    setTimeout(() => router.push('/'), 1500)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 space-y-6">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Délégué</label>
          <select
            value={delegueId}
            onChange={e => setDelegueId(e.target.value)}
            required
            className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white"
          >
            <option value="">Sélectionner…</option>
            {delegues.map(d => <option key={d.id} value={d.id}>{d.nom}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Date de visite</label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white"
          />
        </div>

        <AxeCotation label="🔵 INTERPELLER" color="#4fc3f7" value={interpeller} onChange={setInterpeller} />
        <AxeCotation label="🟢 DÉBATTRE" color="#81c784" value={debattre} onChange={setDebattre} />
        <AxeCotation label="🟠 ENGAGER" color="#ffb74d" value={engager} onChange={setEngager} />

        <div>
          <label className="block text-sm text-gray-400 mb-1">Geste prioritaire</label>
          <input
            type="text"
            value={geste}
            onChange={e => setGeste(e.target.value)}
            placeholder="ex. Tenir le silence après désaccord"
            className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Notes de débrief (optionnel)</label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows={3}
            className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-600 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={!canSubmit || loading}
          className="w-full py-3.5 bg-green-700 hover:bg-green-600 disabled:opacity-40 text-white font-semibold rounded-lg text-lg transition-colors"
        >
          {loading ? 'Enregistrement…' : '✓ Enregistrer'}
        </button>
      </form>
      {toast && <Toast message="Cotation enregistrée ✓" onClose={() => setToast(false)} />}
    </>
  )
}
