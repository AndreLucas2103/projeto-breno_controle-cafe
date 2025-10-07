import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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
import { Switch } from "@/components/ui/switch";

interface AddParticipantDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd?: (name: string, floor: string) => void;
}

export function AddParticipantDialog({
  open,
  onOpenChange,
  onAdd,
}: AddParticipantDialogProps) {
  const [name, setName] = useState("");
  const [floor, setFloor] = useState<string>("");
  const [keepDialogOpen, setKeepDialogOpen] = useState(false);

  const handleSubmit = () => {
    if (name.trim() && floor) {
      onAdd?.(name.trim(), floor);
      setName("");
      setFloor("");

      // Fecha o diálogo apenas se o switch estiver desabilitado
      if (!keepDialogOpen) {
        onOpenChange(false);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Participante</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              placeholder="Digite o nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              data-testid="input-participant-name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="floor">Andar</Label>
            <Select value={floor} onValueChange={setFloor}>
              <SelectTrigger id="floor" data-testid="select-floor">
                <SelectValue placeholder="Selecione o andar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cima">Andar de Cima</SelectItem>
                <SelectItem value="baixo">Andar de Baixo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="keep-open">
              Continuar adicionando participantes
            </Label>
            <Switch
              id="keep-open"
              checked={keepDialogOpen}
              onCheckedChange={setKeepDialogOpen}
              data-testid="switch-keep-open"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            data-testid="button-cancel"
          >
            Fechar
          </Button>
          <Button onClick={handleSubmit} data-testid="button-save">
            {keepDialogOpen ? "Adicionar e Continuar" : "Adicionar e Fechar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
