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
    <nav style={{ background: 'rgba(15,15,15,0.85)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderRight: '1px solid rgba(255,255,255,0.08)' }}
         className="hidden md:flex w-[220px] shrink-0 flex-col py-0 overflow-y-auto">
      {/* Logo */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }} className="flex items-center gap-3 px-4 py-3.5">
        <div style={{ width: '32px', height: '32px', borderRadius: '8px', overflow: 'hidden', background: '#1a1a1a', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-rb.png" alt="Logo" width={32} height={32} style={{ objectFit: 'contain' }} onError={e => {
            const t = e.currentTarget as HTMLImageElement
            t.style.display = 'none'
            if (t.nextElementSibling) (t.nextElementSibling as HTMLElement).style.display = 'flex'
          }} />
          <span style={{ display: 'none', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', background: 'rgba(200,113,78,0.2)', color: '#C8714E', fontWeight: 700, fontSize: '12px' }}>OP</span>
        </div>
        <div>
          <div style={{ fontFamily: 'Lora, Georgia, serif', fontSize: '13px', fontWeight: 700, color: '#ECECEC' }}>Occitanie Posture</div>
          <div style={{ color: '#555', fontSize: '10px' }}>Damien · Manager</div>
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
              ? { background: 'rgba(200,113,78,0.15)', color: '#E8956D', position: 'relative' }
              : { color: '#888' }}>
            {isActive(href) && (
              <span style={{ position: 'absolute', left: 0, top: '25%', bottom: '25%', width: '2px', background: '#C8714E', borderRadius: '0 2px 2px 0' }} />
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
              ? { background: 'rgba(200,113,78,0.15)', color: '#E8956D', position: 'relative' }
              : { color: '#888' }}>
            {isActive(href) && (
              <span style={{ position: 'absolute', left: 0, top: '25%', bottom: '25%', width: '2px', background: '#C8714E', borderRadius: '0 2px 2px 0' }} />
            )}
            <Icon size={15} strokeWidth={isActive(href) ? 2.5 : 1.75} />
            {label}
            <span style={{ marginLeft: 'auto', fontSize: '9px', padding: '1px 5px', borderRadius: '3px', background: 'rgba(200,113,78,0.15)', color: '#E8956D', fontWeight: 600 }}>Nouveau</span>
          </Link>
        ))}
      </div>

      {/* Bottom */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', marginTop: 'auto' }} className="px-2 py-2">
        <Link href="/parametres"
          className="flex items-center gap-2.5 px-3 py-2 rounded-md text-[13px] hover:bg-white/5 transition-colors cursor-pointer"
          style={pathname.startsWith('/parametres') ? { background: 'rgba(200,113,78,0.15)', color: '#E8956D' } : { color: '#888' }}>
          <Settings size={15} strokeWidth={1.75} />
          Paramètres
        </Link>
      </div>
    </nav>
  )
}
