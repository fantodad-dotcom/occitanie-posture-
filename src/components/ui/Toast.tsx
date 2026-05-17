'use client'
import { useEffect } from 'react'

type Props = { message: string; onClose: () => void }

export function Toast({ message, onClose }: Props) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000)
    return () => clearTimeout(t)
  }, [onClose])

  return (
    <div role="status" aria-live="polite" className="fixed bottom-4 right-4 bg-green-800 text-green-100 px-4 py-2 rounded-lg shadow-lg text-sm z-50">
      {message}
    </div>
  )
}
