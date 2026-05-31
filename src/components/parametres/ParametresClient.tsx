'use client'
import { useState } from 'react'
import { Toast } from '@/components/ui/Toast'
import { ConfirmModal } from '@/components/ui/ConfirmModal'
import { addDelegue, editDelegue, disableDelegue, enableDelegue, generateToken, revokeShareToken, importEquipeMd } from '@/app/parametres/actions'
import { exportCotationsCSV } from '@/lib/utils/csvExport'
import type { Cotation, Delegue, ShareToken } from '@/lib/supabase/types'

type CotationAvecNom = Cotation & { delegues: { nom: string } }

type Props = {
  deleguesActifs: Delegue[]
  deleguesInactifs: Delegue[]
  shareToken: ShareToken | null
  shareBaseUrl: string
  cotations: CotationAvecNom[]
}

const S = {
  card: { background: 'rgba(22,22,22,0.75)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '16px' },
  input: { background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px 12px', color: '#ECECEC', fontSize: '13px', outline: 'none', width: '100%' },
  btn: { background: '#C8714E', color: '#fff', border: 'none', borderRadius: '8px', padding: '8px 14px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'background 0.15s' },
  btnGhost: { background: 'rgba(255,255,255,0.05)', color: '#888', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '7px 12px', fontSize: '12px', cursor: 'pointer', transition: 'background 0.15s' },
  btnDanger: { background: 'rgba(248,81,73,0.1)', color: '#f85149', border: '1px solid rgba(248,81,73,0.2)', borderRadius: '8px', padding: '7px 12px', fontSize: '12px', cursor: 'pointer' },
  sectionTitle: { fontFamily: 'Lora, Georgia, serif', fontSize: '14px', fontWeight: 700, color: '#ECECEC', marginBottom: '12px' },
  label: { fontSize: '11px', fontWeight: 600, color: '#888', textTransform: 'uppercase' as const, letterSpacing: '0.06em', marginBottom: '6px', display: 'block' },
}

export function ParametresClient({ deleguesActifs, deleguesInactifs, shareToken, shareBaseUrl, cotations }: Props) {
  const [toast, setToast] = useState<string | null>(null)
  const [confirmDisable, setConfirmDisable] = useState<string | null>(null)
  const [newNom, setNewNom] = useState('')
  const [newSecteur, setNewSecteur] = useState('')
  const [importResult, setImportResult] = useState<{ created: number; cotations: number; skipped: number } | null>(null)
  const [importing, setImporting] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editNom, setEditNom] = useState('')
  const [editSecteur, setEditSecteur] = useState('')

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!newNom.trim()) return
    await addDelegue(newNom.trim(), newSecteur.trim())
    setNewNom(''); setNewSecteur('')
    setToast('Délégué ajouté')
  }

  async function handleEdit(id: string) {
    await editDelegue(id, editNom, editSecteur)
    setEditingId(null)
    setToast('Délégué modifié')
  }

  async function handleDisable(id: string) {
    await disableDelegue(id)
    setConfirmDisable(null)
    setToast('Délégué désactivé')
  }

  async function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setImporting(true)
    const text = await file.text()
    const result = await importEquipeMd(text)
    setImportResult(result)
    setImporting(false)
    setToast(`${result.created} délégué(s) créé(s)`)
    e.target.value = ''
  }

  function handleExport() {
    const csv = exportCotationsCSV(cotations)
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `occitanie-posture-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const shareUrl = shareToken ? `${shareBaseUrl}/share/${shareToken.token}` : null

  return (
    <div style={{ maxWidth: '600px', padding: '0 16px 40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h1 style={{ fontFamily: 'Lora, Georgia, serif', fontSize: '20px', fontWeight: 700, color: '#ECECEC', marginTop: '4px' }}>
        Paramètres
      </h1>

      {/* Ajouter un délégué */}
      <section style={S.card}>
        <p style={S.sectionTitle}>Ajouter un délégué</p>
        <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ flex: 2 }}>
              <label style={S.label} htmlFor="new-nom">Nom</label>
              <input id="new-nom" value={newNom} onChange={e => setNewNom(e.target.value)} placeholder="Prénom Nom" required style={S.input} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={S.label} htmlFor="new-secteur">Secteur</label>
              <input id="new-secteur" value={newSecteur} onChange={e => setNewSecteur(e.target.value)} placeholder="Ville" style={S.input} />
            </div>
          </div>
          <button type="submit" style={{ ...S.btn, alignSelf: 'flex-start' }}>+ Ajouter</button>
        </form>
      </section>

      {/* Délégués actifs */}
      <section style={S.card}>
        <p style={S.sectionTitle}>Délégués actifs ({deleguesActifs.length})</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {deleguesActifs.map(d => (
            <div key={d.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', background: '#1a1a1a', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
              {editingId === d.id ? (
                <>
                  <input value={editNom} onChange={e => setEditNom(e.target.value)} style={{ ...S.input, flex: 2 }} />
                  <input value={editSecteur} onChange={e => setEditSecteur(e.target.value)} placeholder="Secteur" style={{ ...S.input, flex: 1 }} />
                  <button onClick={() => handleEdit(d.id)} style={{ color: '#3fb950', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '16px' }}>✓</button>
                  <button onClick={() => setEditingId(null)} style={{ color: '#555', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>✕</button>
                </>
              ) : (
                <>
                  <span style={{ flex: 1, fontSize: '13px', fontWeight: 500, color: '#ECECEC' }}>{d.nom}</span>
                  {d.secteur && <span style={{ fontSize: '11px', color: '#555' }}>{d.secteur}</span>}
                  <button onClick={() => { setEditingId(d.id); setEditNom(d.nom); setEditSecteur(d.secteur ?? '') }} style={{ ...S.btnGhost, padding: '4px 10px' }}>Modifier</button>
                  <button onClick={() => setConfirmDisable(d.id)} style={{ ...S.btnDanger, padding: '4px 10px' }}>Désactiver</button>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Délégués désactivés */}
      {deleguesInactifs.length > 0 && (
        <section style={{ ...S.card, opacity: 0.8 }}>
          <p style={{ ...S.sectionTitle, color: '#666' }}>Délégués désactivés ({deleguesInactifs.length})</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {deleguesInactifs.map(d => (
              <div key={d.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', background: '#161616', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.04)' }}>
                <span style={{ flex: 1, fontSize: '13px', color: '#555' }}>{d.nom}</span>
                {d.secteur && <span style={{ fontSize: '11px', color: '#444' }}>{d.secteur}</span>}
                <button onClick={() => enableDelegue(d.id).then(() => setToast('Délégué réactivé'))} style={{ ...S.btnGhost, padding: '4px 10px', color: '#C8714E' }}>Réactiver</button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Lien de partage */}
      <section style={S.card}>
        <p style={S.sectionTitle}>Lien de partage lecture seule</p>
        <p style={{ fontSize: '12px', color: '#666', marginBottom: '12px' }}>
          Permet à ta direction ou à E&C de consulter le dashboard sans connexion.
        </p>
        {shareUrl ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '8px 12px' }}>
              <span style={{ flex: 1, fontSize: '11px', color: '#888', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{shareUrl}</span>
              <button onClick={() => { navigator.clipboard.writeText(shareUrl); setToast('Lien copié') }} style={{ ...S.btn, padding: '5px 12px', fontSize: '12px', flexShrink: 0 }}>Copier</button>
            </div>
            <button onClick={() => revokeShareToken(shareToken!.id).then(() => setToast('Lien révoqué'))} style={{ ...S.btnDanger, alignSelf: 'flex-start' }}>Révoquer le lien</button>
          </div>
        ) : (
          <button onClick={() => generateToken().then(() => setToast('Lien généré'))} style={S.btn}>Générer un lien</button>
        )}
      </section>

      {/* Export CSV */}
      <section style={S.card}>
        <p style={S.sectionTitle}>Export CSV</p>
        <p style={{ fontSize: '12px', color: '#666', marginBottom: '12px' }}>
          Télécharge toutes les cotations au format Excel / Google Sheets.
        </p>
        <button onClick={handleExport} style={{ ...S.btnGhost, color: '#ECECEC', display: 'flex', alignItems: 'center', gap: '8px' }}>
          ↓ Exporter ({cotations.length} cotations)
        </button>
      </section>

      {/* Import équipe.md */}
      <section style={{ ...S.card, opacity: 0.7 }}>
        <p style={{ ...S.sectionTitle, color: '#666' }}>Import depuis equipe.md</p>
        <p style={{ fontSize: '12px', color: '#555', marginBottom: '10px' }}>
          Import en masse depuis un fichier markdown — initialisation uniquement.
        </p>
        <label style={{ ...S.btnGhost, display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
          {importing ? 'Import...' : 'Choisir un fichier .md'}
          <input type="file" accept=".md,.txt" onChange={handleImport} style={{ display: 'none' }} disabled={importing} />
        </label>
        {importResult && (
          <p style={{ marginTop: '8px', fontSize: '11px', color: '#888' }}>
            {importResult.created} créé(s) · {importResult.cotations} cotation(s) · {importResult.skipped} ignorée(s)
          </p>
        )}
      </section>

      {confirmDisable && (
        <ConfirmModal
          title="Désactiver ce délégué ?"
          message="L'historique est conservé. Tu pourras le réactiver plus tard."
          onConfirm={() => handleDisable(confirmDisable)}
          onCancel={() => setConfirmDisable(null)}
        />
      )}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  )
}
