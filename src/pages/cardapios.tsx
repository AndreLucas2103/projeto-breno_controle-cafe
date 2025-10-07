import { useState } from "react";
import { MenuEditor } from "@/components/menu-editor";
import { Button } from "@/components/ui/button";
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

interface MenuData {
  [key: string]: {
    breakfast: string[];
    afternoon: string[];
  };
}

const defaultMenus: MenuData = {
  "Segunda-feira": { breakfast: [], afternoon: [] },
  "Terça-feira": { breakfast: [], afternoon: [] },
  "Quarta-feira": { breakfast: [], afternoon: [] },
  "Quinta-feira": { breakfast: [], afternoon: [] },
  "Sexta-feira": { breakfast: [], afternoon: [] },
  Sábado: { breakfast: [], afternoon: [] },
};

export default function Cardapios() {
  const [selectedDay, setSelectedDay] = useState("Segunda-feira");
  const [menus, setMenus] = useLocalStorage<MenuData>("menus", defaultMenus);

  const handleUpdateBreakfast = (items: string[]) => {
    setMenus((prev) => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        breakfast: items,
      },
    }));
  };

  const handleUpdateAfternoon = (items: string[]) => {
    setMenus((prev) => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        afternoon: items,
      },
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Cardápios</h1>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {weekDays.map((day) => (
          <Button
            key={day}
            variant={selectedDay === day ? "default" : "outline"}
            onClick={() => setSelectedDay(day)}
            className="whitespace-nowrap"
            data-testid={`button-day-${day}`}
          >
            <Calendar className="h-4 w-4 mr-2" />
            {day}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MenuEditor
          title={`Café da Manhã - ${selectedDay}`}
          items={menus[selectedDay]?.breakfast || []}
          onUpdate={handleUpdateBreakfast}
          key={selectedDay + "_breakfast"}
        />

        {selectedDay !== "Sábado" && (
          <MenuEditor
            title={`Café da Tarde - ${selectedDay}`}
            items={menus[selectedDay]?.afternoon || []}
            onUpdate={handleUpdateAfternoon}
            key={selectedDay + "_afternoon"}
          />
        )}
      </div>
    </div>
  );
}
