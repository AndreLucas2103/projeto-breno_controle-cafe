import { useState } from "react";
import { AttendanceTable } from "../attendance-table";

export default function AttendanceTableExample() {
  const [data, setData] = useState([
    { id: "1", name: "João Silva", floor: "cima", breakfast: true, afternoon: false },
    { id: "2", name: "Maria Santos", floor: "baixo", breakfast: false, afternoon: true },
    { id: "3", name: "Pedro Costa", floor: "cima", breakfast: true, afternoon: true },
  ]);

  const handleToggleBreakfast = (id: string) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, breakfast: !item.breakfast } : item
      )
    );
  };

  const handleToggleAfternoon = (id: string) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, afternoon: !item.afternoon } : item
      )
    );
  };

  return (
    <AttendanceTable
      data={data}
      day="Segunda-feira"
      onToggleBreakfast={handleToggleBreakfast}
      onToggleAfternoon={handleToggleAfternoon}
    />
  );
}
