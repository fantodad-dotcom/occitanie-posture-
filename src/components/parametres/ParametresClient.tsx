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
    setNewNom('')
    setNewSecteur('')
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

  async function handleEnable(id: string) {
    await enableDelegue(id)
    setToast('Délégué réactivé')
  }

  async function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setImporting(true)
    const text = await file.text()
    const result = await importEquipeMd(text)
    setImportResult(result)
    setImporting(false)
    setToast(`Import : ${result.created} créés, ${result.cotations} cotations`)
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
    <div className="p-6 max-w-2xl space-y-8">
      <h1 className="text-xl font-bold text-white">Parametres</h1>

      {/* Add delegate */}
      <section>
        <h2 className="text-sm font-semibold text-gray-300 mb-3">Ajouter un délégué</h2>
        <form onSubmit={handleAdd} className="flex gap-2">
          <input
            value={newNom}
            onChange={e => setNewNom(e.target.value)}
            placeholder="Nom"
            required
            className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-600"
          />
          <input
            value={newSecteur}
            onChange={e => setNewSecteur(e.target.value)}
            placeholder="Secteur"
            className="w-32 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-600"
          />
          <button type="submit" className="px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors">
            + Ajouter
          </button>
        </form>
      </section>

      {/* Active delegates list */}
      <section>
        <h2 className="text-sm font-semibold text-gray-300 mb-3">Délégués actifs ({deleguesActifs.length})</h2>
        <div className="space-y-2">
          {deleguesActifs.map(d => (
            <div key={d.id} className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 flex items-center gap-3">
              {editingId === d.id ? (
                <>
                  <input value={editNom} onChange={e => setEditNom(e.target.value)} className="flex-1 px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white text-sm" />
                  <input value={editSecteur} onChange={e => setEditSecteur(e.target.value)} className="w-28 px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white text-sm" />
                  <button onClick={() => handleEdit(d.id)} className="text-xs text-green-400 hover:text-green-300">&#10003;</button>
                  <button onClick={() => setEditingId(null)} className="text-xs text-gray-500 hover:text-gray-300">&#10005;</button>
                </>
              ) : (
                <>
                  <span className="flex-1 text-sm text-white">{d.nom}</span>
                  {d.secteur && <span className="text-xs text-gray-500">{d.secteur}</span>}
                  <button onClick={() => { setEditingId(d.id); setEditNom(d.nom); setEditSecteur(d.secteur ?? '') }} className="text-xs text-gray-500 hover:text-gray-300">Modifier</button>
                  <button onClick={() => setConfirmDisable(d.id)} className="text-xs text-red-500 hover:text-red-400">Désactiver</button>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Inactive delegates */}
      {deleguesInactifs.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold text-gray-500 mb-3">Délégués désactivés ({deleguesInactifs.length})</h2>
          <div className="space-y-2">
            {deleguesInactifs.map(d => (
              <div key={d.id} className="bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-3 flex items-center gap-3">
                <span className="flex-1 text-sm text-gray-500">{d.nom}</span>
                {d.secteur && <span className="text-xs text-gray-600">{d.secteur}</span>}
                <button onClick={() => handleEnable(d.id)} className="text-xs text-blue-400 hover:text-blue-300">Réactiver</button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Import equipe.md */}
      <section>
        <h2 className="text-sm font-semibold text-gray-300 mb-3">Importer depuis equipe.md</h2>
        <label className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-sm text-white rounded-lg cursor-pointer transition-colors">
          {importing ? 'Import en cours...' : 'Choisir un fichier .md'}
          <input type="file" accept=".md,.txt" onChange={handleImport} className="hidden" disabled={importing} />
        </label>
        {importResult && (
          <p className="mt-2 text-xs text-gray-400">
            {importResult.created} délégué(s) créé(s) · {importResult.cotations} cotation(s) importée(s) · {importResult.skipped} ligne(s) ignorée(s)
          </p>
        )}
      </section>

      {/* Share link */}
      <section>
        <h2 className="text-sm font-semibold text-gray-300 mb-3">Lien de partage lecture seule</h2>
        {shareUrl ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2">
              <span className="flex-1 text-xs text-gray-300 truncate">{shareUrl}</span>
              <button onClick={() => { navigator.clipboard.writeText(shareUrl); setToast('Lien copié'); }} className="text-xs text-blue-400 hover:text-blue-300">Copier</button>
            </div>
            <button onClick={() => revokeShareToken(shareToken!.id)} className="text-xs text-red-500 hover:text-red-400">Révoquer le lien</button>
          </div>
        ) : (
          <button onClick={() => generateToken()} className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-sm text-white rounded-lg transition-colors">
            Générer un lien de partage
          </button>
        )}
      </section>

      {/* CSV Export */}
      <section>
        <h2 className="text-sm font-semibold text-gray-300 mb-3">Export CSV</h2>
        <button onClick={handleExport} className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-sm text-white rounded-lg transition-colors">
          Exporter CSV ({cotations.length} cotations)
        </button>
      </section>

      {confirmDisable && (
        <ConfirmModal
          title="Désactiver ce délégué ?"
          message="L'historique sera conservé. Vous pourrez le réactiver plus tard."
          onConfirm={() => handleDisable(confirmDisable)}
          onCancel={() => setConfirmDisable(null)}
        />
      )}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  )
}
