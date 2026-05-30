import type { ReactNode } from 'react'
import { NavLeft } from './NavLeft'
import { NavBottom } from './NavBottom'

type Props = {
  children: ReactNode
  referentielSidebar?: ReactNode
}

export function AppShell({ children, referentielSidebar }: Props) {
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'transparent' }}>
      <NavLeft />
      <main className="flex-1 overflow-y-auto min-w-0 pb-[calc(64px+env(safe-area-inset-bottom))] md:pb-0">
        {/* Mobile header */}
        <div
          className="md:hidden sticky top-0 z-30 flex items-center gap-2.5 px-4"
          style={{
            height: '58px',
            background: 'rgba(15,15,15,0.88)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-rb.png"
            alt="Logo Occitanie Posture"
            width={48}
            height={48}
            style={{ objectFit: 'contain', flexShrink: 0, mixBlendMode: 'screen' }}
          />
          <span style={{ fontFamily: 'Lora, Georgia, serif', fontSize: '14px', fontWeight: 700, color: '#ECECEC' }}>
            Occitanie Posture
          </span>
        </div>
        {children}
      </main>
      {referentielSidebar && (
        <aside className="hidden md:block w-44 shrink-0 overflow-y-auto" style={{ background: '#141414', borderLeft: '1px solid rgba(255,255,255,0.07)' }}>
          {referentielSidebar}
        </aside>
      )}
      <NavBottom />
    </div>
  )
}
