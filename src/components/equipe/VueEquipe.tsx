'use client'
import { useState } from 'react'
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
    <div className="p-6">
      <KpiCards delegues={delegues} cotationsData={cotationsData} dvCeMois={dvCeMois} />
      <TeamHeatmap
        delegues={delegues}
        cotationsData={cotationsData}
        onSelectDelegue={(id) => router.push(`/delegue/${id}`)}
      />
    </div>
  )
}
