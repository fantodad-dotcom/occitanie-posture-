import type { ReactNode } from 'react'
import { NavLeft } from './NavLeft'

type Props = {
  children: ReactNode
  referentielSidebar?: ReactNode
}

export function AppShell({ children, referentielSidebar }: Props) {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-950">
      <NavLeft />
      <main className="flex-1 overflow-y-auto min-w-0">{children}</main>
      {referentielSidebar && (
        <aside className="w-36 shrink-0 bg-slate-950 border-l border-slate-800/60 overflow-y-auto">
          {referentielSidebar}
        </aside>
      )}
    </div>
  )
}
