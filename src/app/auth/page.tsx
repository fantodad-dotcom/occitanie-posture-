'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const supabase = createClient()
    await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${location.origin}/auth/confirm` },
    })
    setSent(true)
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="w-full max-w-sm p-8 bg-gray-900 rounded-xl border border-gray-800">
        <h1 className="text-xl font-bold text-white mb-2">Occitanie Posture</h1>
        <p className="text-gray-400 text-sm mb-6">Connexion par lien email</p>
        {sent ? (
          <p className="text-green-400 text-sm">
            Lien envoyé à {email}. Vérifie ta boîte mail.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="ton@email.com"
              required
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium rounded-lg transition-colors"
            >
              {loading ? 'Envoi…' : 'Recevoir le lien'}
            </button>
          </form>
        )}
      </div>
    </main>
  )
}
