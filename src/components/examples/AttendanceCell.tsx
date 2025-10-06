import AttendanceCell from '../AttendanceCell'

export default function AttendanceCellExample() {
  const mockPeople = ["Alessandro", "Ana Claudia", "Carlos Roberto", "Daniel Freire"];
  
  return (
    <div className="w-full max-w-md space-y-4 p-4">
      <div className="border rounded-md">
        <AttendanceCell 
          people={[]} 
          onRemovePerson={() => console.log('Remove person')}
          onClick={() => console.log('Cell clicked')}
        />
      </div>
      <div className="border rounded-md">
        <AttendanceCell 
          people={mockPeople} 
          onRemovePerson={(person) => console.log('Remove:', person)}
          onClick={() => console.log('Cell clicked')}
        />
      </div>
    </div>
  )
}
