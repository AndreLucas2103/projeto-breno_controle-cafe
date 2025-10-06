import AttendanceReport from '../AttendanceReport'

export default function AttendanceReportExample() {
  const mockAttendance = new Map([
    ["Segunda-Manhã", ["Alessandro", "Ana Claudia", "André Aurelio"]],
    ["Segunda-Tarde", ["Daniel Freire", "Felipe"]],
    ["Terça-Manhã", ["Gustavo Anchieta", "Henrique", "Jefferson"]],
  ]);
  
  const mockSaturdayConfig = { andarCima: 5, andarBaixo: 8 };
  
  return (
    <div className="p-4 max-w-2xl">
      <AttendanceReport
        attendance={mockAttendance}
        saturdayConfig={mockSaturdayConfig}
      />
    </div>
  )
}
