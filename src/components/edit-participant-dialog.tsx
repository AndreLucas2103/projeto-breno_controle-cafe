import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EditParticipantDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  participant: {
    id: string;
    name: string;
    floor: string;
    vacationStart?: string;
    vacationEnd?: string;
  } | null;
  onSave?: (
    id: string,
    name: string,
    floor: string,
    vacationStart: string,
    vacationEnd: string
  ) => void;
}

export function EditParticipantDialog({
  open,
  onOpenChange,
  participant,
  onSave,
}: EditParticipantDialogProps) {
  const [name, setName] = useState("");
  const [floor, setFloor] = useState<string>("");
  const [vacationStart, setVacationStart] = useState("");
  const [vacationEnd, setVacationEnd] = useState("");

  useEffect(() => {
    if (participant) {
      setName(participant.name);
      setFloor(participant.floor);
      setVacationStart(participant.vacationStart || "");
      setVacationEnd(participant.vacationEnd || "");
    }
  }, [participant]);

  const handleSubmit = () => {
    if (participant && name.trim() && floor) {
      onSave?.(participant.id, name.trim(), floor, vacationStart, vacationEnd);
      onOpenChange(false);
    }
  };

  const handleClearVacation = () => {
    setVacationStart("");
    setVacationEnd("");
  };

  if (!participant) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Participante</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Nome</Label>
            <Input
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite o nome"
              data-testid="input-edit-name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-floor">Andar</Label>
            <Select value={floor} onValueChange={setFloor}>
              <SelectTrigger id="edit-floor" data-testid="select-edit-floor">
                <SelectValue placeholder="Selecione o andar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cima">Andar de Cima</SelectItem>
                <SelectItem value="baixo">Andar de Baixo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Período de Férias</Label>
              {(vacationStart || vacationEnd) && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleClearVacation}
                  data-testid="button-clear-vacation"
                >
                  Limpar
                </Button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor="vacation-start" className="text-xs text-muted-foreground">
                  Início
                </Label>
                <Input
                  id="vacation-start"
                  type="date"
                  value={vacationStart}
                  onChange={(e) => setVacationStart(e.target.value)}
                  data-testid="input-vacation-start"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vacation-end" className="text-xs text-muted-foreground">
                  Fim
                </Label>
                <Input
                  id="vacation-end"
                  type="date"
                  value={vacationEnd}
                  onChange={(e) => setVacationEnd(e.target.value)}
                  data-testid="input-vacation-end"
                />
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} data-testid="button-cancel-edit">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} data-testid="button-save-edit">
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
