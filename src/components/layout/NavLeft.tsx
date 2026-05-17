'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { href: '/', icon: '📊', label: 'Équipe' },
  { href: '/saisie', icon: '📋', label: 'Saisie' },
  { href: '/planning', icon: '📅', label: 'Planning' },
  { href: '/competition', icon: '🏆', label: 'Compétition' },
  { href: '/parametres', icon: '⚙️', label: 'Paramètres' },
]

export function NavLeft() {
  const pathname = usePathname()
  return (
    <nav className="w-[42px] bg-gray-950 border-r border-gray-800 flex flex-col items-center py-3 gap-2 shrink-0">
      {NAV_ITEMS.map(({ href, icon, label }) => {
        const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
        return (
          <Link
            key={href}
            href={href}
            title={label}
            className={`w-8 h-8 flex items-center justify-center rounded-md text-base transition-colors ${
              active ? 'bg-blue-700' : 'hover:bg-gray-800 text-gray-500'
            }`}
          >
            {icon}
          </Link>
        )
      })}
    </nav>
  )
}
