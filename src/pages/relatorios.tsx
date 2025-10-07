import { useMemo } from "react";
import { ReportCard } from "@/components/report-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Card, CardContent } from "@/components/ui/card";

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

export default function Relatorios() {
  const [participants] = useLocalStorage<Participant[]>("participants", []);
  const [attendance] = useLocalStorage<AttendanceRecord>("attendance", {});

  const reportData = useMemo(() => {
    const data: any = {};
    
    weekDays.forEach((day) => {
      const dayAttendance = attendance[day] || {};
      
      let breakfastTotal = 0;
      let breakfastCima = 0;
      let breakfastBaixo = 0;
      let afternoonTotal = 0;
      let afternoonCima = 0;
      let afternoonBaixo = 0;

      participants.forEach((p) => {
        const record = dayAttendance[p.id] || { breakfast: false, afternoon: false };
        const onVacation = isOnVacation(p.vacationStart, p.vacationEnd);
        
        if (record.breakfast && !onVacation) {
          breakfastTotal++;
          if (p.floor === "cima") breakfastCima++;
          else breakfastBaixo++;
        }
        
        if (record.afternoon && day !== "Sábado" && !onVacation) {
          afternoonTotal++;
          if (p.floor === "cima") afternoonCima++;
          else afternoonBaixo++;
        }
      });

      data[day] = {
        breakfast: { total: breakfastTotal, andarCima: breakfastCima, andarBaixo: breakfastBaixo },
        afternoon: { total: afternoonTotal, andarCima: afternoonCima, andarBaixo: afternoonBaixo },
      };
    });

    return data;
  }, [participants, attendance]);

  if (participants.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">Relatórios</h1>
        </div>
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            Nenhum participante cadastrado. Adicione participantes para gerar relatórios.
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Relatórios</h1>
      </div>

      <div className="space-y-8">
        {weekDays.map((day) => (
          <div key={day} className="space-y-4">
            <h2 className="text-lg font-semibold">{day}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ReportCard
                title="Café da Manhã"
                data={reportData[day].breakfast}
              />
              {day !== "Sábado" && (
                <ReportCard
                  title="Café da Tarde"
                  data={reportData[day].afternoon}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Resumo Semanal</h2>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dia</TableHead>
                <TableHead className="text-center">Café da Manhã</TableHead>
                <TableHead className="text-center">Café da Tarde</TableHead>
                <TableHead className="text-center">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {weekDays.map((day) => {
                const breakfast = reportData[day].breakfast.total;
                const afternoon = reportData[day].afternoon.total;
                const total = breakfast + afternoon;

                return (
                  <TableRow key={day}>
                    <TableCell className="font-medium">{day}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary" className="font-mono">
                        {breakfast}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      {day !== "Sábado" ? (
                        <Badge variant="secondary" className="font-mono">
                          {afternoon}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground text-sm">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge className="font-mono">{total}</Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
