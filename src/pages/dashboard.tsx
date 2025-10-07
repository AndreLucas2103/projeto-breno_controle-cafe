import { useState, useEffect, useMemo } from "react";
import { AttendanceTable } from "@/components/attendance-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";

const weekDays = [
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

interface Participant {
  id: string;
  name: string;
  floor: string;
  vacationStart?: string;
  vacationEnd?: string;
}

interface AttendanceRecord {
  [day: string]: {
    [participantId: string]: {
      breakfast: boolean;
      afternoon: boolean;
      observation?: string;
    };
  };
}

function isOnVacation(vacationStart?: string, vacationEnd?: string): boolean {
  if (!vacationStart || !vacationEnd) return false;
  const today = new Date();
  const start = new Date(vacationStart);
  const end = new Date(vacationEnd);
  return today >= start && today <= end;
}

export default function Dashboard() {
  const [selectedDay, setSelectedDay] = useState("Segunda-feira");
  const [participants] = useLocalStorage<Participant[]>("participants", []);
  const [attendance, setAttendance] = useLocalStorage<AttendanceRecord>(
    "attendance",
    {}
  );

  useEffect(() => {
    const initialAttendance: AttendanceRecord = {};
    weekDays.forEach((day) => {
      initialAttendance[day] = {};
      participants.forEach((p) => {
        if (!attendance[day]?.[p.id]) {
          initialAttendance[day][p.id] = { breakfast: false, afternoon: false };
        }
      });
    });

    if (Object.keys(attendance).length === 0) {
      setAttendance(initialAttendance);
    }
  }, [participants]);

  const attendanceData = useMemo(() => {
    const sortedParticipants = [...participants].sort((a, b) =>
      a.name.localeCompare(b.name, "pt-BR")
    );
    return sortedParticipants.map((p) => ({
      id: p.id,
      name: p.name,
      floor: p.floor,
      breakfast: attendance[selectedDay]?.[p.id]?.breakfast || false,
      afternoon: attendance[selectedDay]?.[p.id]?.afternoon || false,
      observation: attendance[selectedDay]?.[p.id]?.observation || "",
      vacationStart: p.vacationStart,
      vacationEnd: p.vacationEnd,
    }));
  }, [participants, attendance, selectedDay]);

  const handleToggleBreakfast = (id: string) => {
    setAttendance((prev) => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        [id]: {
          ...prev[selectedDay]?.[id],
          breakfast: !prev[selectedDay]?.[id]?.breakfast,
          afternoon: prev[selectedDay]?.[id]?.afternoon || false,
          observation: prev[selectedDay]?.[id]?.observation || "",
        },
      },
    }));
  };

  const handleToggleAfternoon = (id: string) => {
    setAttendance((prev) => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        [id]: {
          breakfast: prev[selectedDay]?.[id]?.breakfast || false,
          afternoon: !prev[selectedDay]?.[id]?.afternoon,
          observation: prev[selectedDay]?.[id]?.observation || "",
        },
      },
    }));
  };

  const handleObservationChange = (id: string, observation: string) => {
    setAttendance((prev) => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        [id]: {
          breakfast: prev[selectedDay]?.[id]?.breakfast || false,
          afternoon: prev[selectedDay]?.[id]?.afternoon || false,
          observation,
        },
      },
    }));
  };

  const breakfastCount = attendanceData.filter(
    (item) =>
      item.breakfast && !isOnVacation(item.vacationStart, item.vacationEnd)
  ).length;
  const afternoonCount = attendanceData.filter(
    (item) =>
      item.afternoon && !isOnVacation(item.vacationStart, item.vacationEnd)
  ).length;
  const breakfastCima = attendanceData.filter(
    (item) =>
      item.breakfast &&
      item.floor === "cima" &&
      !isOnVacation(item.vacationStart, item.vacationEnd)
  ).length;
  const breakfastBaixo = attendanceData.filter(
    (item) =>
      item.breakfast &&
      item.floor === "baixo" &&
      !isOnVacation(item.vacationStart, item.vacationEnd)
  ).length;
  const afternoonCima = attendanceData.filter(
    (item) =>
      item.afternoon &&
      item.floor === "cima" &&
      !isOnVacation(item.vacationStart, item.vacationEnd)
  ).length;
  const afternoonBaixo = attendanceData.filter(
    (item) =>
      item.afternoon &&
      item.floor === "baixo" &&
      !isOnVacation(item.vacationStart, item.vacationEnd)
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-4">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <Select value={selectedDay} onValueChange={setSelectedDay}>
            <SelectTrigger className="w-[200px]" data-testid="select-day">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {weekDays.map((day) => (
                <SelectItem key={day} value={day}>
                  {day}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Café da Manhã</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="text-2xl font-bold font-mono"
              data-testid="text-breakfast-total"
            >
              {breakfastCount}
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Andar de Cima</span>
                <span
                  className="font-mono font-medium"
                  data-testid="text-breakfast-cima"
                >
                  {breakfastCima}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Andar de Baixo</span>
                <span
                  className="font-mono font-medium"
                  data-testid="text-breakfast-baixo"
                >
                  {breakfastBaixo}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {selectedDay !== "Sábado" && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Café da Tarde
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="text-2xl font-bold font-mono"
                data-testid="text-afternoon-total"
              >
                {afternoonCount}
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Andar de Cima</span>
                  <span
                    className="font-mono font-medium"
                    data-testid="text-afternoon-cima"
                  >
                    {afternoonCima}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Andar de Baixo</span>
                  <span
                    className="font-mono font-medium"
                    data-testid="text-afternoon-baixo"
                  >
                    {afternoonBaixo}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {participants.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            Nenhum participante cadastrado. Adicione participantes na página de
            Participantes.
          </CardContent>
        </Card>
      ) : (
        <AttendanceTable
          data={attendanceData}
          day={selectedDay}
          onToggleBreakfast={handleToggleBreakfast}
          onToggleAfternoon={handleToggleAfternoon}
          onObservationChange={handleObservationChange}
        />
      )}
    </div>
  );
}
