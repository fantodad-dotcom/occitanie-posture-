'use client'
import { useRouter } from 'next/navigation'
import { KpiCards } from './KpiCards'
import { TeamHeatmap } from './TeamHeatmap'
import type { Cotation, Delegue } from '@/lib/supabase/types'

type CotationEntry = { delegue_id: string; cotation: Cotation }

type Props = {
  delegues: Delegue[]
  cotationsData: CotationEntry[]
  dvCeMois: number
}

export function VueEquipe({ delegues, cotationsData, dvCeMois }: Props) {
  const router = useRouter()

  return (
    <div className="p-4 md:p-6">
      <div style={{ marginBottom: '16px' }}>
        <h1 style={{ fontFamily: 'Lora, Georgia, serif', fontSize: '18px', fontWeight: 700, color: '#ECECEC', marginBottom: '2px' }}>Vue équipe</h1>
        <p style={{ fontSize: '12px', color: '#888' }}>{delegues.length} délégués · Occitanie</p>
      </div>
      <KpiCards delegues={delegues} cotationsData={cotationsData} dvCeMois={dvCeMois} />
      <TeamHeatmap
        delegues={delegues}
        cotationsData={cotationsData}
        onSelectDelegue={(id) => router.push(`/delegue/${id}`)}
      />
    </div>
  )
}
