import { AppShell } from '@/components/layout/AppShell'

export default function FeuilleDeRoutePage() {
  return (
    <AppShell>
      <div className="p-6 max-w-3xl">
        <div className="mb-6">
          <h1 className="text-lg font-semibold text-white mb-1">Feuille de route</h1>
          <p style={{ color: '#888', fontSize: '13px' }}>Le chemin décidé et où nous en sommes · méthode E&C</p>
        </div>

        {/* Vision */}
        <div style={{ background: 'rgba(200,113,78,0.08)', border: '1px solid rgba(200,113,78,0.2)', borderRadius: '10px', padding: '20px', marginBottom: '16px' }}>
          <div style={{ fontSize: '11px', color: '#E8956D', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>Vision</div>
          <p style={{ color: '#DCDCDC', fontSize: '14px', lineHeight: '1.7' }}>
            L&apos;état d&apos;esprit et la posture sont des leviers majeurs pour renforcer notre impact commercial et notre compétitivité. L&apos;enjeu collectif est simple : <strong style={{ color: '#fff' }}>faire passer la formation d&apos;un moment fort… à un vrai changement durable dans les pratiques.</strong>
          </p>
        </div>

        {/* 2 priorités */}
        <div style={{ fontSize: '11px', color: '#888', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>2 Priorités immédiates</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div style={{ background: '#1C1C1C', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: 'rgba(251,146,60,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FB923C', fontWeight: 800, fontSize: '12px' }}>1</div>
              <span style={{ color: '#ECECEC', fontSize: '13px', fontWeight: 600 }}>Préparer les équipes</span>
            </div>
            <p style={{ color: '#888', fontSize: '12px', lineHeight: '1.6' }}>
              Installer la conviction. Le facteur déterminant pour générer interpellation, débat et engagement est clair : la <strong style={{ color: '#FB923C' }}>CONVICTION</strong>.
            </p>
            <div style={{ marginTop: '12px', padding: '10px', background: '#242424', borderRadius: '6px', fontSize: '11px', color: '#888', lineHeight: '1.6' }}>
              → Travailler la conviction lors des réunions régionales<br/>
              → Aider chacun à s&apos;approprier les messages et les incarner
            </div>
          </div>

          <div style={{ background: '#1C1C1C', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: 'rgba(200,113,78,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E8956D', fontWeight: 800, fontSize: '12px' }}>2</div>
              <span style={{ color: '#ECECEC', fontSize: '13px', fontWeight: 600 }}>Notre rôle de coach</span>
            </div>
            <p style={{ color: '#888', fontSize: '12px', lineHeight: '1.6' }}>
              Ancrer et mesurer le changement. Notre valeur ajoutée : transformer la formation en changements concrets et durables.
            </p>
            <div style={{ marginTop: '12px', padding: '10px', background: '#242424', borderRadius: '6px', fontSize: '11px', color: '#666', lineHeight: '1.6' }}>
              → Préparer le 9 juin<br/>
              → Travailler en synergie avec Virginie et E&C
            </div>
          </div>
        </div>

        {/* 2 axes clés */}
        <div style={{ fontSize: '11px', color: '#888', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>2 Axes clés du coaching</div>
        <div className="flex flex-col gap-3 mb-6">
          <div style={{ background: '#1C1C1C', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '18px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(74,222,128,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ color: '#4ADE80', fontSize: '14px' }}>A</span>
            </div>
            <div>
              <div style={{ color: '#ECECEC', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>La mise en application</div>
              <p style={{ color: '#888', fontSize: '12px', lineHeight: '1.6' }}>
                Quel geste chaque délégué va-t-il modifier à l&apos;issue des 2 jours ? L&apos;objectif : <strong style={{ color: '#4ADE80' }}>passer d&apos;un comportement ponctuel à un comportement systématique.</strong>
              </p>
            </div>
          </div>

          <div style={{ background: '#1C1C1C', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '18px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(56,189,248,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ color: '#38BDF8', fontSize: '14px' }}>B</span>
            </div>
            <div>
              <div style={{ color: '#ECECEC', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Le pilotage et la mesure</div>
              <p style={{ color: '#888', fontSize: '12px', lineHeight: '1.6', marginBottom: '8px' }}>
                Formaliser l&apos;approche de coaching (synergie Virginie + E&C). Structurer des temps de training réguliers. Suivre l&apos;adoption des nouveaux réflexes sur le terrain.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {['Formaliser le coaching', 'Training régulier', "Mesurer l'adoption", '9 juin — Jour J'].map(tag => (
                  <span key={tag} style={{ fontSize: '10px', padding: '3px 8px', borderRadius: '4px', background: 'rgba(56,189,248,0.08)', color: '#38BDF8', border: '1px solid rgba(56,189,248,0.15)', fontWeight: 500 }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Suivi progression */}
        <div style={{ background: '#1C1C1C', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '18px' }}>
          <div style={{ fontSize: '11px', color: '#888', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>Méthode E&C · 3 axes à piloter</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { axe: 'Interpeller', desc: "Créer l'écart. Provoquer la réaction. Tenir le silence.", color: '#38BDF8' },
              { axe: 'Débattre', desc: 'Maintenir la conviction. Ne pas lâcher sous pression. Laisser parler.', color: '#4ADE80' },
              { axe: 'Engager', desc: "Lier l'engagement à ce qui a été débattu. 1 patient, 1 situation précise.", color: '#FB923C' },
            ].map(({ axe, desc, color }) => (
              <div key={axe} style={{ background: '#242424', borderRadius: '8px', padding: '14px', borderTop: `2px solid ${color}44` }}>
                <div style={{ color, fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>{axe}</div>
                <p style={{ color: '#888', fontSize: '12px', lineHeight: '1.6' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
