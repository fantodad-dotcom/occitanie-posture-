'use client'
import { useEffect } from 'react'

type Props = { message: string; onClose: () => void }

export function Toast({ message, onClose }: Props) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000)
    return () => clearTimeout(t)
  }, [onClose])

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: 'fixed',
        bottom: 'calc(72px + env(safe-area-inset-bottom))',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(22,22,22,0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(200,113,78,0.35)',
        color: '#E8956D',
        padding: '10px 20px',
        borderRadius: '20px',
        fontSize: '13px',
        fontWeight: 600,
        zIndex: 100,
        whiteSpace: 'nowrap',
        boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
      }}
    >
      {message}
    </div>
  )
}
