import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type SaturdayConfig } from "@shared/schema";
import { useState, useEffect } from "react";

interface SaturdayConfigProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  config: SaturdayConfig;
  onSave: (config: SaturdayConfig) => void;
}

export default function SaturdayConfig({
  open,
  onOpenChange,
  config,
  onSave,
}: SaturdayConfigProps) {
  const [andarCima, setAndarCima] = useState(config.andarCima);
  const [andarBaixo, setAndarBaixo] = useState(config.andarBaixo);

  useEffect(() => {
    if (open) {
      setAndarCima(config.andarCima);
      setAndarBaixo(config.andarBaixo);
    }
  }, [open, config]);

  const handleSave = () => {
    onSave({ andarCima, andarBaixo });
    onOpenChange(false);
  };

  const total = andarCima + andarBaixo;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" data-testid="dialog-saturday-config">
        <DialogHeader>
          <DialogTitle>Configurar Sábado</DialogTitle>
          <DialogDescription>
            Defina a quantidade de café da manhã para cada andar (por escala)
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="andar-cima">Andar de Cima</Label>
            <Input
              id="andar-cima"
              type="number"
              min="0"
              value={andarCima}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setAndarCima(isNaN(val) || val < 0 ? 0 : val);
              }}
              data-testid="input-andar-cima"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="andar-baixo">Andar de Baixo</Label>
            <Input
              id="andar-baixo"
              type="number"
              min="0"
              value={andarBaixo}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setAndarBaixo(isNaN(val) || val < 0 ? 0 : val);
              }}
              data-testid="input-andar-baixo"
            />
          </div>

          <div className="pt-4 border-t">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Total:</span>
              <span className="text-lg font-semibold" data-testid="text-total">
                {total} café(s)
              </span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} data-testid="button-cancel">
            Cancelar
          </Button>
          <Button onClick={handleSave} data-testid="button-save">
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
