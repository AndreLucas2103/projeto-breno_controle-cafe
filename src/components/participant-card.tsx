import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Umbrella } from "lucide-react";

interface ParticipantCardProps {
  name: string;
  floor: string;
  vacationStart?: string;
  vacationEnd?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

function isOnVacation(vacationStart?: string, vacationEnd?: string): boolean {
  if (!vacationStart || !vacationEnd) return false;
  const today = new Date();
  const start = new Date(vacationStart);
  const end = new Date(vacationEnd);
  return today >= start && today <= end;
}

export function ParticipantCard({ name, floor, vacationStart, vacationEnd, onEdit, onDelete }: ParticipantCardProps) {
  const onVacation = isOnVacation(vacationStart, vacationEnd);
  
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div>
            <div className="flex items-center gap-2">
              <p className="font-medium" data-testid={`text-participant-name`}>{name}</p>
              {onVacation && (
                <Badge variant="outline" className="gap-1" data-testid="badge-vacation">
                  <Umbrella className="h-3 w-3" />
                  Férias
                </Badge>
              )}
            </div>
            <Badge variant="secondary" className="mt-1" data-testid={`badge-floor`}>
              {floor === "cima" ? "Andar de Cima" : "Andar de Baixo"}
            </Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={onEdit}
            data-testid="button-edit-participant"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={onDelete}
            data-testid="button-delete-participant"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
