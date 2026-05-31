'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AxeCotation } from './AxeCotation'
import { saveCotation } from '@/app/saisie/actions'
import { Toast } from '@/components/ui/Toast'
import type { Delegue } from '@/lib/supabase/types'

const BEHAVIORS = {
  interpeller: [
    "L'enjeu préparatoire est clairement défini en amont",
    "Crée un écart entre ce qu'on propose et ce que l'autre croit ou utilise",
    "Donne de la valeur au produit et au bénéfice patient",
    "Se positionne sur le registre émotionnel, pas uniquement rationnel",
  ],
  debattre: [
    "Fait réfléchir sans polémique",
    "Reste sur le fil de pensée de l'autre",
    "Valorise le point de vue de l'autre, marque son désaccord avec tact",
    "Écoute activement et échange avec une posture assertive",
  ],
  engager: [
    "Recherche un engagement concret, uniquement sur ce qui a suscité l'échange",
    "Reformule ce qui a retenu l'attention",
    "Reste cohérent avec le discours patient : bénéfices, état futur, positivisme",
  ],
}

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
      <form onSubmit={handleSubmit} style={{ maxWidth: '520px', margin: '0 auto', padding: '0 24px 40px' }}>

        {/* Délégué + Date */}
        <div style={{ background: 'rgba(22,22,22,0.75)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '12px', padding: '16px', marginBottom: '16px', display: 'flex', gap: '12px' }}>
          <div style={{ flex: 2 }}>
            <label htmlFor="select-delegue" style={{ display: 'block', fontSize: '11px', color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
              Délégué
            </label>
            <select
              id="select-delegue"
              value={delegueId}
              onChange={e => setDelegueId(e.target.value)}
              required
              style={{ width: '100%', padding: '8px 10px', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: delegueId ? '#ECECEC' : '#888', fontSize: '13px', cursor: 'pointer' }}
            >
              <option value="">Sélectionner…</option>
              {delegues.map(d => <option key={d.id} value={d.id}>{d.nom}</option>)}
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label htmlFor="input-date" style={{ display: 'block', fontSize: '11px', color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
              Date DUO
            </label>
            <input
              id="input-date"
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              style={{ width: '100%', padding: '8px 10px', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#ECECEC', fontSize: '13px' }}
            />
          </div>
        </div>

        {/* Axes E&C */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
          {[
            { key: 'interpeller' as const, label: 'Interpeller', color: '#38BDF8', value: interpeller, onChange: setInterpeller },
            { key: 'debattre' as const, label: 'Débattre', color: '#4ADE80', value: debattre, onChange: setDebattre },
            { key: 'engager' as const, label: 'Engager', color: '#FB923C', value: engager, onChange: setEngager },
          ].map(axe => (
            <div key={axe.key} style={{ background: 'rgba(22,22,22,0.75)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '12px', padding: '16px' }}>
              <AxeCotation
                label={axe.label}
                color={axe.color}
                value={axe.value}
                onChange={axe.onChange}
                behaviors={BEHAVIORS[axe.key]}
              />
            </div>
          ))}
        </div>

        {/* Geste prioritaire */}
        <div style={{ background: 'rgba(22,22,22,0.75)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '12px', padding: '16px', marginBottom: '12px' }}>
          <label htmlFor="input-geste" style={{ display: 'block', fontSize: '11px', color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
            Geste prioritaire
          </label>
          <input
            id="input-geste"
            type="text"
            value={geste}
            onChange={e => setGeste(e.target.value)}
            placeholder="ex. Tenir le silence après le désaccord"
            style={{ width: '100%', padding: '8px 10px', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#ECECEC', fontSize: '13px' }}
          />
          <p style={{ fontSize: '11px', color: '#666', marginTop: '6px' }}>1 seul geste par délégué.</p>
        </div>

        {/* Notes */}
        <div style={{ background: 'rgba(22,22,22,0.75)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '12px', padding: '16px', marginBottom: '20px' }}>
          <label htmlFor="textarea-notes" style={{ display: 'block', fontSize: '11px', color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
            Notes <span style={{ color: '#666', fontWeight: 400, textTransform: 'none' }}>(optionnel)</span>
          </label>
          <textarea
            id="textarea-notes"
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows={3}
            style={{ width: '100%', padding: '8px 10px', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#ECECEC', fontSize: '13px', resize: 'vertical', fontFamily: 'inherit', lineHeight: '1.6' }}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!canSubmit || loading}
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: '10px',
            border: 'none',
            background: canSubmit && !loading ? '#C8714E' : 'rgba(200,113,78,0.25)',
            color: canSubmit && !loading ? '#fff' : 'rgba(255,255,255,0.3)',
            fontSize: '14px',
            fontWeight: 600,
            cursor: canSubmit && !loading ? 'pointer' : 'not-allowed',
            transition: 'all 0.15s',
          }}
        >
          {loading ? 'Enregistrement…' : 'Enregistrer le DUO'}
        </button>
      </form>
      {toast && <Toast message="Cotation enregistrée ✓" onClose={() => setToast(false)} />}
    </>
  )
}
