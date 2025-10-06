import { Fragment } from "react";
import {
  weekDays,
  type WeekDay,
  type Period,
  type SaturdayConfig,
} from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AttendanceCell from "./AttendanceCell";
import { Coffee, Settings } from "lucide-react";

interface WeekScheduleTableProps {
  attendance: Map<string, string[]>;
  saturdayConfig: SaturdayConfig;
  onCellClick: (day: WeekDay, period: Period) => void;
  onRemovePerson: (day: WeekDay, period: Period, person: string) => void;
  onSaturdayConfigClick: () => void;
}

export default function WeekScheduleTable({
  attendance,
  saturdayConfig,
  onCellClick,
  onRemovePerson,
  onSaturdayConfigClick,
}: WeekScheduleTableProps) {
  const getKey = (day: WeekDay, period: Period) => `${day}-${period}`;

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[800px]">
        <div className="grid grid-cols-3 gap-4">
          <div className="font-semibold text-base flex items-center gap-2">
            <Coffee className="h-5 w-5 text-primary" />
            Dia da Semana
          </div>
          <div className="font-semibold text-base text-center">
            Café da Manhã
          </div>
          <div className="font-semibold text-base text-center">
            Café da Tarde
          </div>

          {weekDays.map((dayInfo) => (
            <Fragment key={dayInfo.day}>
              <Card className="flex items-center">
                <CardHeader className="p-4">
                  <CardTitle className="text-base">{dayInfo.day}</CardTitle>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="p-3 pb-2 space-y-0">
                  <div className="text-xs text-muted-foreground">
                    {dayInfo.morning}
                  </div>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  {dayInfo.day === "Sábado" ? (
                    <div
                      className="min-h-[80px] flex flex-col items-center justify-center gap-2 hover-elevate cursor-pointer rounded-md p-2"
                      onClick={onSaturdayConfigClick}
                      data-testid="cell-saturday-config"
                    >
                      <div className="flex items-center gap-2 text-sm">
                        <Settings className="h-4 w-4" />
                        <span>Configurar quantidade</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Cima: {saturdayConfig.andarCima} | Baixo:{" "}
                        {saturdayConfig.andarBaixo}
                      </div>
                    </div>
                  ) : (
                    <AttendanceCell
                      people={
                        attendance.get(getKey(dayInfo.day, "Manhã")) || []
                      }
                      onRemovePerson={(person) =>
                        onRemovePerson(dayInfo.day, "Manhã", person)
                      }
                      onClick={() => onCellClick(dayInfo.day, "Manhã")}
                    />
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="p-3 pb-2 space-y-0">
                  <div className="text-xs text-muted-foreground">
                    {dayInfo.afternoon || "-"}
                  </div>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  {dayInfo.afternoon ? (
                    <AttendanceCell
                      people={
                        attendance.get(getKey(dayInfo.day, "Tarde")) || []
                      }
                      onRemovePerson={(person) =>
                        onRemovePerson(dayInfo.day, "Tarde", person)
                      }
                      onClick={() => onCellClick(dayInfo.day, "Tarde")}
                    />
                  ) : (
                    <div className="min-h-[80px] flex items-center justify-center text-muted-foreground text-sm">
                      -
                    </div>
                  )}
                </CardContent>
              </Card>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
