'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Users, ClipboardPlus, CalendarDays, Trophy, HelpCircle, Zap, Map, ChevronUp } from 'lucide-react'

const TABS_MAIN = [
  { href: '/', icon: Users, label: 'Équipe' },
  { href: '/saisie', icon: ClipboardPlus, label: 'Saisie' },
  { href: '/planning', icon: CalendarDays, label: 'Planning' },
  { href: '/competition', icon: Trophy, label: 'Compét.' },
]

const COACHING_ITEMS = [
  { href: '/coaching', icon: HelpCircle, label: 'Questions E&C', desc: 'Questions adaptées au niveau du délégué' },
  { href: '/debrief', icon: Zap, label: 'Auto-débrief', desc: 'Protocole 7 questions après le DUO' },
  { href: '/feuille-de-route', icon: Map, label: 'Feuille de route', desc: 'Le chemin décidé et où vous en êtes' },
]

const COACHING_HREFS = COACHING_ITEMS.map(i => i.href)

export function NavBottom() {
  const pathname = usePathname()
  const router = useRouter()
  const [coachingOpen, setCoachingOpen] = useState(false)

  const isActive = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href)
  const isCoachingActive = COACHING_HREFS.some(h => pathname.startsWith(h))

  // Close panel on route change
  useEffect(() => { setCoachingOpen(false) }, [pathname])

  return (
    <>
      {/* Overlay — tap outside to close */}
      {coachingOpen && (
        <div
          className="md:hidden fixed inset-0 z-40"
          onClick={() => setCoachingOpen(false)}
        />
      )}

      {/* Coaching panel */}
      {coachingOpen && (
        <div
          className="md:hidden fixed left-0 right-0 z-50"
          style={{
            bottom: `calc(64px + env(safe-area-inset-bottom))`,
            background: '#1C1C1C',
            borderTop: '1px solid rgba(255,255,255,0.12)',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            boxShadow: '0 -8px 32px rgba(0,0,0,0.4)',
          }}
        >
          <div style={{ padding: '8px 0' }}>
            {COACHING_ITEMS.map(({ href, icon: Icon, label, desc }) => {
              const active = pathname.startsWith(href)
              return (
                <button
                  key={href}
                  onClick={() => { router.push(href); setCoachingOpen(false) }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '14px',
                    width: '100%', padding: '12px 20px',
                    background: active ? 'rgba(99,102,241,0.12)' : 'transparent',
                    border: 'none', cursor: 'pointer',
                    transition: 'background 0.15s',
                  }}
                >
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '8px', flexShrink: 0,
                    background: active ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.06)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={18} strokeWidth={active ? 2.5 : 1.75} style={{ color: active ? '#818CF8' : '#888' }} />
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '14px', fontWeight: active ? 600 : 500, color: active ? '#ECECEC' : '#DCDCDC' }}>
                      {label}
                    </div>
                    <div style={{ fontSize: '11px', color: '#666', marginTop: '1px' }}>{desc}</div>
                  </div>
                  {active && (
                    <div style={{ marginLeft: 'auto', width: '6px', height: '6px', borderRadius: '50%', background: '#6366F1', flexShrink: 0 }} />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Bottom nav bar */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex"
        style={{
          background: '#1C1C1C',
          borderTop: '1px solid rgba(255,255,255,0.09)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        {TABS_MAIN.map(({ href, icon: Icon, label }) => {
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

        {/* Coaching trigger */}
        <button
          onClick={() => setCoachingOpen(o => !o)}
          className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5"
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: isCoachingActive || coachingOpen ? '#818CF8' : '#555',
          }}
        >
          {coachingOpen
            ? <ChevronUp size={22} strokeWidth={2.5} />
            : <HelpCircle size={22} strokeWidth={isCoachingActive ? 2.5 : 1.75} />
          }
          <span style={{ fontSize: '10px', fontWeight: isCoachingActive || coachingOpen ? 600 : 400 }}>
            Coaching
          </span>
        </button>
      </nav>
    </>
  )
}
