import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  peopleByFloor,
  type WeekDay,
  type Period,
  type Floor,
} from "@shared/schema";
import { Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PersonSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPeople: string[];
  onSave: (people: string[]) => void;
  day: WeekDay;
  period: Period;
}

export default function PersonSelector({
  open,
  onOpenChange,
  selectedPeople,
  onSave,
  day,
  period,
}: PersonSelectorProps) {
  const [selected, setSelected] = useState<Set<string>>(
    new Set(selectedPeople)
  );
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<Floor>("Andar de Cima");

  useEffect(() => {
    if (open) {
      setSelected(new Set(selectedPeople));
      setSearch("");
    }
  }, [open, selectedPeople]);

  const currentFloorPeople = peopleByFloor[activeTab];
  const filteredPeople = currentFloorPeople.filter((person) =>
    person.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggle = (person: string) => {
    const newSelected = new Set(selected);
    if (newSelected.has(person)) {
      newSelected.delete(person);
    } else {
      newSelected.add(person);
    }
    setSelected(newSelected);
  };

  const handleSelectAll = () => {
    const newSelected = new Set(selected);
    filteredPeople.forEach((person) => newSelected.add(person));
    setSelected(newSelected);
  };

  const handleClearAll = () => {
    const newSelected = new Set(selected);
    filteredPeople.forEach((person) => newSelected.delete(person));
    setSelected(newSelected);
  };

  const handleSave = () => {
    onSave(Array.from(selected));
    onOpenChange(false);
  };

  const getFloorCount = (floor: Floor) => {
    return peopleByFloor[floor].filter((p) => selected.has(p)).length;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-3xl max-h-[80vh] flex flex-col"
        data-testid="dialog-person-selector"
      >
        <DialogHeader>
          <DialogTitle>Selecionar Pessoas</DialogTitle>
          <DialogDescription>
            {day} - {period}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 flex-1 overflow-hidden flex flex-col">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar pessoa..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
              data-testid="input-search-person"
            />
          </div>

          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as Floor)}
            className="flex-1 flex flex-col overflow-hidden"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="Andar de Cima" data-testid="tab-andar-cima">
                Andar de Cima ({getFloorCount("Andar de Cima")})
              </TabsTrigger>
              <TabsTrigger value="Andar de Baixo" data-testid="tab-andar-baixo">
                Andar de Baixo ({getFloorCount("Andar de Baixo")})
              </TabsTrigger>
            </TabsList>

            <div className="flex gap-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSelectAll}
                data-testid="button-select-all"
              >
                Selecionar Todos ({activeTab})
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearAll}
                data-testid="button-clear-all"
              >
                Limpar ({activeTab})
              </Button>
              <div className="ml-auto text-sm text-muted-foreground flex items-center">
                Total: {selected.size} pessoa(s)
              </div>
            </div>

            <TabsContent
              value="Andar de Cima"
              className="flex-1 overflow-y-auto border rounded-md p-4 mt-4"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {filteredPeople.map((person) => (
                  <div
                    key={person}
                    className="flex items-center space-x-2 hover-elevate p-2 rounded-md cursor-pointer"
                    onClick={() => handleToggle(person)}
                    data-testid={`checkbox-person-${person}`}
                  >
                    <Checkbox
                      checked={selected.has(person)}
                      onCheckedChange={() => handleToggle(person)}
                    />
                    <label className="text-sm font-medium leading-none cursor-pointer">
                      {person}
                    </label>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent
              value="Andar de Baixo"
              className="flex-1 overflow-y-auto border rounded-md p-4 mt-4"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {filteredPeople.map((person) => (
                  <div
                    key={person}
                    className="flex items-center space-x-2 hover-elevate p-2 rounded-md cursor-pointer"
                    onClick={() => handleToggle(person)}
                    data-testid={`checkbox-person-${person}`}
                  >
                    <Checkbox
                      checked={selected.has(person)}
                      onCheckedChange={() => handleToggle(person)}
                    />
                    <label className="text-sm font-medium leading-none cursor-pointer">
                      {person}
                    </label>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            data-testid="button-cancel"
          >
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
