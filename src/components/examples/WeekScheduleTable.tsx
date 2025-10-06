import WeekScheduleTable from '../WeekScheduleTable'

export default function WeekScheduleTableExample() {
  const mockAttendance = new Map([
    ["Segunda-Manhã", ["Alessandro", "Ana Claudia", "Carlos Roberto"]],
    ["Terça-Tarde", ["Daniel Freire", "Felipe", "Gustavo Anchieta", "Henrique"]],
    ["Quinta-Manhã", ["Jefferson", "Vander Carlos"]],
  ]);
  
  const mockSaturdayConfig = { andarCima: 5, andarBaixo: 8 };
  
  return (
    <div className="p-4">
      <WeekScheduleTable
        attendance={mockAttendance}
        saturdayConfig={mockSaturdayConfig}
        onCellClick={(day, period) => console.log('Clicked:', day, period)}
        onRemovePerson={(day, period, person) => console.log('Remove:', day, period, person)}
        onSaturdayConfigClick={() => console.log('Saturday config clicked')}
      />
    </div>
  )
}
