import { useState } from 'react'
import SaturdayConfig from '../SaturdayConfig'
import { Button } from '@/components/ui/button'
import { type SaturdayConfig as SaturdayConfigType } from '@shared/schema'

export default function SaturdayConfigExample() {
  const [open, setOpen] = useState(false)
  const [config, setConfig] = useState<SaturdayConfigType>({ andarCima: 5, andarBaixo: 8 })
  
  return (
    <div className="p-4">
      <Button onClick={() => setOpen(true)}>Configurar Sábado</Button>
      <SaturdayConfig
        open={open}
        onOpenChange={setOpen}
        config={config}
        onSave={(newConfig) => {
          setConfig(newConfig)
          console.log('Saved:', newConfig)
        }}
      />
    </div>
  )
}
