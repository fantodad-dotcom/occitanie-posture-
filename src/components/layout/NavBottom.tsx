'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Users, ClipboardPlus, CalendarDays, Trophy, HelpCircle } from 'lucide-react'

const TABS = [
  { href: '/', icon: Users, label: 'Équipe' },
  { href: '/saisie', icon: ClipboardPlus, label: 'Saisie' },
  { href: '/planning', icon: CalendarDays, label: 'Planning' },
  { href: '/competition', icon: Trophy, label: 'Compét.' },
  { href: '/coaching', icon: HelpCircle, label: 'Coaching' },
]

export function NavBottom() {
  const pathname = usePathname()
  const isActive = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex"
      style={{
        background: '#1C1C1C',
        borderTop: '1px solid rgba(255,255,255,0.09)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      {TABS.map(({ href, icon: Icon, label }) => {
        const active = isActive(href)
        return (
          <Link
            key={href}
            href={href}
            className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5"
            style={{ color: active ? '#818CF8' : '#555' }}
          >
            <Icon size={22} strokeWidth={active ? 2.5 : 1.75} />
            <span style={{ fontSize: '10px', fontWeight: active ? 600 : 400 }}>{label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
