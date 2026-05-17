import type { ReactNode } from 'react'
import { NavLeft } from './NavLeft'

type Props = {
  children: ReactNode
  referentielSidebar?: ReactNode
}

export function AppShell({ children, referentielSidebar }: Props) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-950">
      <NavLeft />
      <main className="flex-1 overflow-y-auto">{children}</main>
      {referentielSidebar && (
        <aside className="w-[140px] shrink-0 bg-gray-950 border-l border-gray-800 overflow-y-auto">
          {referentielSidebar}
        </aside>
      )}
    </div>
  )
}
