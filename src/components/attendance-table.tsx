import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Umbrella } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface AttendanceData {
  id: string;
  name: string;
  floor: string;
  breakfast: boolean;
  afternoon: boolean;
  observation?: string;
  vacationStart?: string;
  vacationEnd?: string;
}

interface AttendanceTableProps {
  data: AttendanceData[];
  day: string;
  onToggleBreakfast?: (id: string) => void;
  onToggleAfternoon?: (id: string) => void;
  onObservationChange?: (id: string, observation: string) => void;
}

function isOnVacation(vacationStart?: string, vacationEnd?: string): boolean {
  if (!vacationStart || !vacationEnd) return false;
  const today = new Date();
  const start = new Date(vacationStart);
  const end = new Date(vacationEnd);
  return today >= start && today <= end;
}

export function AttendanceTable({
  data,
  day,
  onToggleBreakfast,
  onToggleAfternoon,
  onObservationChange,
}: AttendanceTableProps) {
  const [filter, setFilter] = useState<"all" | "cima" | "baixo">("all");

  const filteredData =
    filter === "all" ? data : data.filter((item) => item.floor === filter);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("all")}
          data-testid="button-filter-all"
        >
          Todos
        </Button>
        <Button
          variant={filter === "cima" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("cima")}
          data-testid="button-filter-cima"
        >
          Andar de Cima
        </Button>
        <Button
          variant={filter === "baixo" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("baixo")}
          data-testid="button-filter-baixo"
        >
          Andar de Baixo
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Andar</TableHead>
              <TableHead className="text-center">Café da Manhã</TableHead>
              {day !== "Sábado" && (
                <TableHead className="text-center">Café da Tarde</TableHead>
              )}
              <TableHead>Observação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item) => {
              const onVacation = isOnVacation(item.vacationStart, item.vacationEnd);
              
              return (
                <TableRow key={item.id}>
                  <TableCell className="font-medium" data-testid={`text-name-${item.id}`}>
                    <div className="flex items-center gap-2">
                      {item.name}
                      {onVacation && (
                        <Badge variant="outline" className="gap-1" data-testid={`badge-vacation-${item.id}`}>
                          <Umbrella className="h-3 w-3" />
                          Férias
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" data-testid={`badge-floor-${item.id}`}>
                      {item.floor === "cima" ? "Andar de Cima" : "Andar de Baixo"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Checkbox
                      checked={item.breakfast}
                      onCheckedChange={() => onToggleBreakfast?.(item.id)}
                      data-testid={`checkbox-breakfast-${item.id}`}
                      disabled={onVacation}
                    />
                  </TableCell>
                  {day !== "Sábado" && (
                    <TableCell className="text-center">
                      <Checkbox
                        checked={item.afternoon}
                        onCheckedChange={() => onToggleAfternoon?.(item.id)}
                        data-testid={`checkbox-afternoon-${item.id}`}
                        disabled={onVacation}
                      />
                    </TableCell>
                  )}
                  <TableCell>
                    <Input
                      value={item.observation || ""}
                      onChange={(e) => onObservationChange?.(item.id, e.target.value)}
                      placeholder="Adicionar observação..."
                      className="max-w-xs"
                      data-testid={`input-observation-${item.id}`}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
