import type { ReactNode } from 'react'
import { NavLeft } from './NavLeft'
import { NavBottom } from './NavBottom'

type Props = {
  children: ReactNode
  referentielSidebar?: ReactNode
}

export function AppShell({ children, referentielSidebar }: Props) {
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#141414' }}>
      <NavLeft />
      <main className="flex-1 overflow-y-auto min-w-0 pb-[calc(64px+env(safe-area-inset-bottom))] md:pb-0">
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
