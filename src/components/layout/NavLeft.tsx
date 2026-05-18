'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Users, ClipboardPlus, CalendarDays, Trophy, Settings } from 'lucide-react'

const NAV_ITEMS = [
  { href: '/', icon: Users, label: 'Équipe' },
  { href: '/saisie', icon: ClipboardPlus, label: 'Saisie' },
  { href: '/planning', icon: CalendarDays, label: 'Planning' },
  { href: '/competition', icon: Trophy, label: 'Compétition' },
  { href: '/parametres', icon: Settings, label: 'Paramètres' },
]

export function NavLeft() {
  const pathname = usePathname()
  return (
    <nav className="w-14 bg-slate-950 border-r border-slate-800/60 flex flex-col items-center py-4 gap-1 shrink-0">
      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center mb-3 shrink-0">
        <span className="text-white font-bold text-xs">OP</span>
      </div>
      {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
        const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
        return (
          <Link
            key={href}
            href={href}
            title={label}
            aria-label={label}
            className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-200 cursor-pointer ${
              active
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                : 'text-slate-500 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Icon size={18} strokeWidth={active ? 2.5 : 1.75} />
          </Link>
        )
      })}
    </nav>
  )
}
