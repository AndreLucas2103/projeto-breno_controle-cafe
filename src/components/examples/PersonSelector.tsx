import { useState } from 'react'
import PersonSelector from '../PersonSelector'
import { Button } from '@/components/ui/button'

export default function PersonSelectorExample() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<string[]>(["Alessandro", "Ana Claudia"])
  
  return (
    <div className="p-4">
      <Button onClick={() => setOpen(true)}>Abrir Seletor</Button>
      <PersonSelector
        open={open}
        onOpenChange={setOpen}
        selectedPeople={selected}
        onSave={(people) => {
          setSelected(people)
          console.log('Saved:', people)
        }}
        day="Segunda"
        period="Manhã"
      />
    </div>
  )
}
