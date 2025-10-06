import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  weekDays,
  getFloorForPerson,
  type SaturdayConfig,
} from "@shared/schema";
import { FileText } from "lucide-react";

interface AttendanceReportProps {
  attendance: Map<string, string[]>;
  saturdayConfig: SaturdayConfig;
}

export default function AttendanceReport({
  attendance,
  saturdayConfig,
}: AttendanceReportProps) {
  const getKey = (day: string, period: string) => `${day}-${period}`;

  const calculateTotals = (day: string, period: string) => {
    if (day === "Sábado" && period === "Manhã") {
      return {
        total: saturdayConfig.andarCima + saturdayConfig.andarBaixo,
        andarCima: saturdayConfig.andarCima,
      };
    }

    const people = attendance.get(getKey(day, period)) || [];
    const andarCima = people.filter((p) => {
      const floor = getFloorForPerson(p);
      return floor === "Andar de Cima";
    }).length;

    return {
      total: people.length,
      andarCima,
    };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Relatório de Totais
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-2 text-sm font-medium border-b pb-2">
            <div>Dia</div>
            <div>Período</div>
            <div className="text-right">Total</div>
            <div className="text-right">Andar Cima</div>
          </div>

          {weekDays.map((dayInfo) => (
            <div key={dayInfo.day} className="space-y-2">
              {dayInfo.morning && (
                <div
                  className="grid grid-cols-4 gap-2 text-sm"
                  data-testid={`report-${dayInfo.day}-Manhã`}
                >
                  <div className="font-medium">{dayInfo.day}</div>
                  <div className="text-muted-foreground">Manhã</div>
                  <div
                    className="text-right"
                    data-testid={`total-${dayInfo.day}-Manhã`}
                  >
                    {calculateTotals(dayInfo.day, "Manhã").total}
                  </div>
                  <div
                    className="text-right text-muted-foreground"
                    data-testid={`cima-${dayInfo.day}-Manhã`}
                  >
                    {calculateTotals(dayInfo.day, "Manhã").andarCima}
                  </div>
                </div>
              )}

              {dayInfo.afternoon && (
                <div
                  className="grid grid-cols-4 gap-2 text-sm"
                  data-testid={`report-${dayInfo.day}-Tarde`}
                >
                  <div className="font-medium">{dayInfo.day}</div>
                  <div className="text-muted-foreground">Tarde</div>
                  <div
                    className="text-right"
                    data-testid={`total-${dayInfo.day}-Tarde`}
                  >
                    {calculateTotals(dayInfo.day, "Tarde").total}
                  </div>
                  <div
                    className="text-right text-muted-foreground"
                    data-testid={`cima-${dayInfo.day}-Tarde`}
                  >
                    {calculateTotals(dayInfo.day, "Tarde").andarCima}
                  </div>
                </div>
              )}
            </div>
          ))}

          <div className="pt-4 border-t">
            <div className="grid grid-cols-4 gap-2 text-sm font-semibold">
              <div className="col-span-2">Total Semanal</div>
              <div className="text-right" data-testid="total-week">
                {weekDays.reduce((sum, day) => {
                  const morning = calculateTotals(day.day, "Manhã").total;
                  const afternoon = day.afternoon
                    ? calculateTotals(day.day, "Tarde").total
                    : 0;
                  return sum + morning + afternoon;
                }, 0)}
              </div>
              <div className="text-right" data-testid="total-week-cima">
                {weekDays.reduce((sum, day) => {
                  const morning = calculateTotals(day.day, "Manhã").andarCima;
                  const afternoon = day.afternoon
                    ? calculateTotals(day.day, "Tarde").andarCima
                    : 0;
                  return sum + morning + afternoon;
                }, 0)}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
