'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Users, ClipboardPlus, CalendarDays, Trophy, Settings, HelpCircle, Zap, Map } from 'lucide-react'

const NAV_MAIN = [
  { href: '/', icon: Users, label: 'Vue équipe' },
  { href: '/saisie', icon: ClipboardPlus, label: 'Saisie DUO' },
  { href: '/planning', icon: CalendarDays, label: 'Planning DUO' },
  { href: '/competition', icon: Trophy, label: 'Compétition' },
]

const NAV_COACHING = [
  { href: '/coaching', icon: HelpCircle, label: 'Questions E&C' },
  { href: '/debrief', icon: Zap, label: 'Auto-débrief' },
  { href: '/feuille-de-route', icon: Map, label: 'Feuille de route' },
]

export function NavLeft() {
  const pathname = usePathname()
  const isActive = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <nav style={{ background: '#141414', borderRight: '1px solid rgba(255,255,255,0.07)' }}
         className="w-[220px] shrink-0 flex flex-col py-0 overflow-y-auto">
      {/* Logo */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }} className="flex items-center gap-3 px-4 py-3.5">
        <div style={{ background: 'linear-gradient(135deg, #6366F1, #4F46E5)', boxShadow: '0 0 0 1px rgba(99,102,241,0.3)' }}
             className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs shrink-0">
          OP
        </div>
        <div>
          <div className="text-sm font-semibold text-white">Occitanie Posture</div>
          <div style={{ color: '#666' }} className="text-[10px]">Damien · Manager</div>
        </div>
      </div>

      {/* Main nav */}
      <div className="px-2 pt-3 pb-1">
        <div style={{ color: '#444', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}
             className="px-2 pb-1.5">Principal</div>
        {NAV_MAIN.map(({ href, icon: Icon, label }) => (
          <Link key={href} href={href}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-[13px] mb-0.5 transition-all duration-150 cursor-pointer ${
              isActive(href)
                ? 'font-medium'
                : 'hover:bg-white/5'
            }`}
            style={isActive(href)
              ? { background: 'rgba(99,102,241,0.15)', color: '#818CF8', position: 'relative' }
              : { color: '#888' }}>
            {isActive(href) && (
              <span style={{ position: 'absolute', left: 0, top: '25%', bottom: '25%', width: '2px', background: '#6366F1', borderRadius: '0 2px 2px 0' }} />
            )}
            <Icon size={15} strokeWidth={isActive(href) ? 2.5 : 1.75} />
            {label}
          </Link>
        ))}
      </div>

      {/* Coaching nav */}
      <div className="px-2 pt-2 pb-1">
        <div style={{ color: '#444', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}
             className="px-2 pb-1.5">Coaching E&C</div>
        {NAV_COACHING.map(({ href, icon: Icon, label }) => (
          <Link key={href} href={href}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-[13px] mb-0.5 transition-all duration-150 cursor-pointer ${
              isActive(href) ? 'font-medium' : 'hover:bg-white/5'
            }`}
            style={isActive(href)
              ? { background: 'rgba(99,102,241,0.15)', color: '#818CF8', position: 'relative' }
              : { color: '#888' }}>
            {isActive(href) && (
              <span style={{ position: 'absolute', left: 0, top: '25%', bottom: '25%', width: '2px', background: '#6366F1', borderRadius: '0 2px 2px 0' }} />
            )}
            <Icon size={15} strokeWidth={isActive(href) ? 2.5 : 1.75} />
            {label}
            <span style={{ marginLeft: 'auto', fontSize: '9px', padding: '1px 5px', borderRadius: '3px', background: 'rgba(99,102,241,0.15)', color: '#818CF8', fontWeight: 600 }}>Nouveau</span>
          </Link>
        ))}
      </div>

      {/* Bottom */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', marginTop: 'auto' }} className="px-2 py-2">
        <Link href="/parametres"
          className="flex items-center gap-2.5 px-3 py-2 rounded-md text-[13px] hover:bg-white/5 transition-colors cursor-pointer"
          style={pathname.startsWith('/parametres') ? { background: 'rgba(99,102,241,0.15)', color: '#818CF8' } : { color: '#888' }}>
          <Settings size={15} strokeWidth={1.75} />
          Paramètres
        </Link>
      </div>
    </nav>
  )
}
