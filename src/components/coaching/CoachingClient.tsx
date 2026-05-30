'use client'
import { useState } from 'react'
import type { Delegue, Cotation } from '@/lib/supabase/types'

type CotationEntry = { delegue_id: string; cotation: Cotation }

// Bibliothèque de questions E&C par axe et niveau
const QUESTIONS_EC = {
  interpeller: {
    1: [
      "Qu'est-ce que tu voulais provoquer comme réaction chez ce médecin ?",
      "Qui a parlé le plus longtemps dans les 2 premières minutes ?",
      "Est-ce que le médecin a posé une question de lui-même ? Laquelle ?",
      "À quel moment tu t'es positionné en ton nom propre — pas 'les études montrent' ?",
    ],
    2: [
      "Qu'est-ce qui t'a amené à parler produit en premier ?",
      "Après ton accroche, tu as fait quoi dans les 3 premières secondes ?",
      "Est-ce que tu as laissé un vrai silence après ton interpellation ?",
      "Comment tu savais que le médecin était vraiment interpellé ?",
    ],
    3: [
      "Sur quoi tu t'es appuyé pour construire ton interpellation — un patient, un fait terrain ?",
      "Est-ce que tu as adapté ton accroche à ce médecin en particulier, ou c'était le même script ?",
      "À quel moment tu as senti que tu avais créé un écart dans sa tête ?",
    ],
  },
  debattre: {
    1: [
      "Quand il a objecté — tu as fait quoi dans les 3 premières secondes ?",
      "Est-ce que tu as lâché ta position ou tu l'as maintenue ? Pourquoi ?",
      "À quel moment tu t'es senti obligé de répondre tout de suite ?",
      "Si tu refaisais ce moment, tu changerais quoi — un seul truc ?",
    ],
    2: [
      "Tu as dit 'c'est vrai, mais...' combien de fois dans la visite ? Qu'est-ce que ça dit ?",
      "Est-ce que le médecin a verbalisé quelque chose de personnel, ou tu lui as soufflé ses mots ?",
      "Après ton 'c'est intéressant', il a dit quoi ? Tu as fait quoi avec ça ?",
    ],
    3: [
      "À quel moment tu as tenu le silence après avoir posé ton désaccord ?",
      "Comment tu as maintenu ta conviction sans entrer dans un duel ?",
      "Est-ce que le médecin s'est repositionné de lui-même, ou tu l'as poussé à le faire ?",
    ],
  },
  engager: {
    1: [
      "Sur quoi tu l'as engagé — c'était lié à quoi dans la visite ?",
      "Est-ce que l'engagement que tu as demandé était lié à ce que vous aviez débattu ?",
      "Quand il a dit 'on verra' — tu as fait quoi ?",
      "Tu avais préparé quel engagement avant d'entrer ? C'est celui-là que tu as demandé ?",
    ],
    2: [
      "Est-ce que tu as parlé patient dans la phase d'engagement, ou tu es revenu au produit ?",
      "L'engagement était précis — un patient, une situation — ou c'était vague ?",
      "Est-ce que tu as reformulé ce qui avait retenu son attention avant de demander l'engagement ?",
    ],
    3: [
      "Comment tu as construit le lien entre ce qui avait retenu son attention et ce que tu lui as demandé ?",
      "L'engagement qu'il a pris — c'est lui qui l'a formulé, ou toi ?",
      "Tu sors avec quel prochain pas concret ?",
    ],
  },
}

const AXES = ['interpeller', 'debattre', 'engager'] as const
type Axe = typeof AXES[number]

const AXE_LABELS: Record<Axe, { label: string; color: string; bg: string }> = {
  interpeller: { label: 'Interpeller', color: '#38BDF8', bg: 'rgba(56,189,248,0.08)' },
  debattre: { label: 'Débattre', color: '#4ADE80', bg: 'rgba(74,222,128,0.08)' },
  engager: { label: 'Engager', color: '#FB923C', bg: 'rgba(251,146,60,0.08)' },
}

type Props = {
  delegues: Delegue[]
  cotationsData: CotationEntry[]
}

export function CoachingClient({ delegues, cotationsData }: Props) {
  const cotationsMap = new Map(cotationsData.map(({ delegue_id, cotation }) => [delegue_id, cotation]))
  const [selectedId, setSelectedId] = useState<string | null>(delegues[0]?.id ?? null)
  const [selectedAxe, setSelectedAxe] = useState<Axe>('interpeller')

  const selected = delegues.find(d => d.id === selectedId)
  const cotation = selectedId ? cotationsMap.get(selectedId) : null
  const level = cotation ? (cotation[selectedAxe] ?? 1) : 1
  const questions = QUESTIONS_EC[selectedAxe][level as 1 | 2 | 3] ?? QUESTIONS_EC[selectedAxe][1]

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-white mb-1">Questions de coaching E&C</h1>
        <p style={{ color: '#666' }} className="text-sm">Questions adaptées au niveau actuel du délégué sur chaque axe.</p>
      </div>

      <div className="flex flex-col gap-4 md:grid md:grid-cols-3">
        {/* Sélecteur délégué */}
        <div style={{ background: '#1C1C1C', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '16px' }}>
          <div style={{ color: '#666', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '12px' }}>
            Délégué
          </div>
          <div className="flex md:flex-col gap-1 overflow-x-auto md:overflow-x-visible pb-1 md:pb-0">
            {delegues.map(d => {
              const c = cotationsMap.get(d.id)
              const vals = c ? [c.interpeller, c.debattre, c.engager].filter((v): v is number => v !== null) : []
              const avg = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null
              return (
                <button key={d.id} onClick={() => setSelectedId(d.id)}
                  className="flex items-center justify-between gap-2 px-3 py-2 rounded-md text-left transition-all duration-150 cursor-pointer shrink-0 md:w-full"
                  style={selectedId === d.id
                    ? { background: 'rgba(200,113,78,0.15)', color: '#E8956D' }
                    : { color: '#888', background: 'transparent' }}>
                  <span className="text-sm font-medium">{d.nom}</span>
                  {avg !== null && (
                    <span style={{ fontSize: '11px', fontWeight: 700, color: avg >= 3 ? '#4ADE80' : avg >= 2 ? '#FB923C' : '#F87171' }}>
                      {avg.toFixed(1)}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Questions */}
        <div className="col-span-2">
          {/* Axe selector */}
          <div style={{ background: '#1C1C1C', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '4px', display: 'flex', gap: '2px', marginBottom: '16px' }}>
            {AXES.map(axe => (
              <button key={axe} onClick={() => setSelectedAxe(axe)}
                className="flex-1 px-4 py-2 rounded-md text-xs font-medium transition-all cursor-pointer"
                style={selectedAxe === axe
                  ? { background: AXE_LABELS[axe].bg, color: AXE_LABELS[axe].color, border: `1px solid ${AXE_LABELS[axe].color}33` }
                  : { color: '#666', background: 'transparent', border: '1px solid transparent' }}>
                {AXE_LABELS[axe].label}
              </button>
            ))}
          </div>

          {selected && (
            <div style={{ background: '#1C1C1C', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '20px' }}>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <span className="text-base font-semibold text-white">{selected.nom}</span>
                  <span style={{ color: '#666', marginLeft: '8px', fontSize: '13px' }}>· axe {AXE_LABELS[selectedAxe].label}</span>
                </div>
                <div style={{
                  background: `${AXE_LABELS[selectedAxe].bg}`,
                  color: AXE_LABELS[selectedAxe].color,
                  border: `1px solid ${AXE_LABELS[selectedAxe].color}44`,
                  padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 700
                }}>
                  Niveau {level}
                </div>
              </div>

              <div style={{ marginBottom: '16px', fontSize: '11px', color: '#555', fontStyle: 'italic' }}>
                Questions à poser lors du débrief DUO — protocole E&C
              </div>

              <div className="flex flex-col gap-3">
                {questions.map((q, i) => (
                  <div key={i} style={{ background: '#242424', borderRadius: '8px', padding: '14px 16px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{ color: AXE_LABELS[selectedAxe].color, fontWeight: 700, fontSize: '13px', flexShrink: 0, marginTop: '1px' }}>{i + 1}</span>
                    <span style={{ color: '#DCDCDC', fontSize: '13px', lineHeight: '1.6' }}>{q}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '16px', padding: '12px 14px', background: 'rgba(200,113,78,0.08)', border: '1px solid rgba(200,113,78,0.15)', borderRadius: '8px', fontSize: '11px', color: '#888', lineHeight: '1.6' }}>
                <strong style={{ color: '#E8956D' }}>Règle E&C :</strong> Maximum 1 geste prioritaire par délégué. Faits ≠ impressions. Observer ≠ évaluer.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
