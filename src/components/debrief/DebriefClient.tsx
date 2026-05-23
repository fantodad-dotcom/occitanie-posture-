'use client'
import { useState } from 'react'
import type { Delegue } from '@/lib/supabase/types'

const QUESTIONS_DEBRIEF = [
  { id: 1, question: "Qu'est-ce que tu voulais provoquer comme réaction chez ce médecin ?", axe: "Intention", hint: "Pas ce que tu voulais dire — ce que tu voulais qu'il ressente ou pense." },
  { id: 2, question: "Il a réagi comment à ton accroche ? C'était quoi son premier mot ?", axe: "Interpeller", hint: "Fais-le se souvenir du moment exact. Son premier mot dit tout." },
  { id: 3, question: "À quel moment tu as senti qu'il était vraiment dans la conversation ?", axe: "Interpeller", hint: "Cherche le moment de bascule — avant, il était poli. Après, il était présent." },
  { id: 4, question: "Quand il a objecté — tu as fait quoi dans les 3 premières secondes ?", axe: "Débattre", hint: "3 secondes seulement. C'est là que tout se joue — réflexe ou posture ?" },
  { id: 5, question: "Qui a parlé le plus longtemps ? Est-ce que ça te va ?", axe: "Débattre", hint: "Pas de bonne réponse — juste une prise de conscience." },
  { id: 6, question: "Sur quoi tu l'as engagé — c'était lié à quoi dans la visite ?", axe: "Engager", hint: "L'engagement doit être le prolongement naturel de ce qui a été débattu." },
  { id: 7, question: "Si tu refaisais cette visite demain, tu changerais quoi — un seul truc ?", axe: "Geste", hint: "Un seul. Pas trois. Un. C'est lui qui le choisit, pas toi." },
]

type Props = { delegues: Delegue[] }

export function DebriefClient({ delegues }: Props) {
  const [step, setStep] = useState(0) // 0 = select delegate, 1-7 = questions, 8 = summary
  const [selectedDelegue, setSelectedDelegue] = useState<Delegue | null>(null)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [geste, setGeste] = useState('')

  const currentQ = QUESTIONS_DEBRIEF[step - 1]
  const progress = step === 0 ? 0 : Math.round((step / 7) * 100)

  if (step === 0) {
    return (
      <div className="p-6 max-w-xl mx-auto">
        <div className="mb-6">
          <h1 className="text-lg font-semibold text-white mb-1">Auto-débrief DUO</h1>
          <p style={{ color: '#666' }} className="text-sm">Protocole E&C — 7 questions dans l'ordre.</p>
        </div>
        <div style={{ background: '#1C1C1C', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '20px' }}>
          <div style={{ color: '#888', fontSize: '12px', marginBottom: '12px' }}>Sélectionne le délégué</div>
          <div className="flex flex-col gap-2">
            {delegues.map(d => (
              <button key={d.id}
                onClick={() => { setSelectedDelegue(d); setStep(1) }}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all cursor-pointer w-full hover:bg-white/5"
                style={{ background: '#242424', border: '1px solid rgba(255,255,255,0.05)', color: '#DCDCDC' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(99,102,241,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#818CF8', fontWeight: 700, fontSize: '12px', flexShrink: 0 }}>
                  {d.nom.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-medium">{d.nom}</div>
                  <div style={{ color: '#555', fontSize: '11px' }}>{d.secteur ?? 'Secteur non défini'}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (step <= 7 && currentQ) {
    return (
      <div className="p-6 max-w-xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div style={{ color: '#666', fontSize: '12px', marginBottom: '2px' }}>Débrief avec {selectedDelegue?.nom}</div>
            <h1 className="text-base font-semibold text-white">Question {step} / 7</h1>
          </div>
          <div style={{ background: '#1C1C1C', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: '4px 12px', fontSize: '11px', color: '#818CF8', fontWeight: 600 }}>
            {currentQ.axe}
          </div>
        </div>

        {/* Progress */}
        <div style={{ height: '3px', background: '#242424', borderRadius: '2px', marginBottom: '24px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #6366F1, #818CF8)', borderRadius: '2px', transition: 'width 0.4s ease' }} />
        </div>

        {/* Question */}
        <div style={{ background: '#1C1C1C', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '24px', marginBottom: '16px' }}>
          <div style={{ fontSize: '17px', fontWeight: 500, color: '#ECECEC', lineHeight: '1.5', marginBottom: '12px' }}>
            {currentQ.question}
          </div>
          <div style={{ fontSize: '11px', color: '#555', fontStyle: 'italic', lineHeight: '1.5', padding: '10px 12px', background: '#242424', borderRadius: '6px' }}>
            {currentQ.hint}
          </div>
        </div>

        {/* Answer */}
        <textarea
          value={answers[step] ?? ''}
          onChange={e => setAnswers(prev => ({ ...prev, [step]: e.target.value }))}
          placeholder="Notes de débrief (optionnel)..."
          rows={4}
          style={{ width: '100%', background: '#1C1C1C', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '8px', padding: '12px', color: '#ECECEC', fontSize: '13px', resize: 'vertical', outline: 'none', fontFamily: 'inherit', lineHeight: '1.6' }}
        />

        <div className="flex gap-3 mt-4">
          {step > 1 && (
            <button onClick={() => setStep(s => s - 1)}
              style={{ background: '#242424', border: '1px solid rgba(255,255,255,0.07)', color: '#888', padding: '10px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>
              ← Retour
            </button>
          )}
          <button onClick={() => setStep(s => s + 1)}
            style={{ flex: 1, background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.3)', color: '#818CF8', padding: '10px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
            {step === 7 ? 'Voir le résumé →' : 'Question suivante →'}
          </button>
        </div>
      </div>
    )
  }

  // Summary
  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-white mb-1">Résumé du débrief</h1>
        <p style={{ color: '#666' }} className="text-sm">{selectedDelegue?.nom} · {new Date().toLocaleDateString('fr-FR')}</p>
      </div>

      <div style={{ background: '#1C1C1C', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '20px', marginBottom: '16px' }}>
        {QUESTIONS_DEBRIEF.map((q, i) => (
          <div key={q.id} style={{ borderBottom: i < 6 ? '1px solid rgba(255,255,255,0.05)' : 'none', paddingBottom: i < 6 ? '14px' : 0, marginBottom: i < 6 ? '14px' : 0 }}>
            <div style={{ fontSize: '10px', color: '#555', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '4px' }}>Q{q.id} · {q.axe}</div>
            <div style={{ fontSize: '12px', color: '#888', marginBottom: '6px' }}>{q.question}</div>
            <div style={{ fontSize: '13px', color: answers[q.id] ? '#DCDCDC' : '#444', fontStyle: answers[q.id] ? 'normal' : 'italic' }}>
              {answers[q.id] || '(pas de note)'}
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: '#1C1C1C', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '10px', padding: '16px', marginBottom: '16px' }}>
        <div style={{ fontSize: '12px', color: '#818CF8', fontWeight: 600, marginBottom: '8px' }}>Geste prioritaire retenu</div>
        <input value={geste} onChange={e => setGeste(e.target.value)}
          placeholder="1 geste, 1 axe, 1 comportement observable..."
          style={{ width: '100%', background: '#242424', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '6px', padding: '10px 12px', color: '#ECECEC', fontSize: '13px', outline: 'none', fontFamily: 'inherit' }} />
      </div>

      <div className="flex gap-3">
        <button onClick={() => { setStep(0); setAnswers({}); setGeste('') }}
          style={{ flex: 1, background: '#242424', border: '1px solid rgba(255,255,255,0.07)', color: '#888', padding: '10px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer' }}>
          Nouveau débrief
        </button>
        <button onClick={() => { setStep(0); setAnswers({}); setGeste('') }}
          style={{ flex: 1, background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.3)', color: '#818CF8', padding: '10px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
          Terminer
        </button>
      </div>
    </div>
  )
}
