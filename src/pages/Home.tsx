import { useState } from "react";
import { type WeekDay, type Period, type SaturdayConfig } from "@shared/schema";
import WeekScheduleTable from "@/components/WeekScheduleTable";
import PersonSelector from "@/components/PersonSelector";
import SaturdayConfigDialog from "@/components/SaturdayConfig";
import AttendanceReport from "@/components/AttendanceReport";
import ThemeToggle from "@/components/ThemeToggle";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

export default function Home() {
  const [attendance, setAttendance] = useState<Map<string, string[]>>(new Map());
  const [saturdayConfig, setSaturdayConfig] = useState<SaturdayConfig>({ 
    andarCima: 0, 
    andarBaixo: 0 
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saturdayDialogOpen, setSaturdayDialogOpen] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [selectedDay, setSelectedDay] = useState<WeekDay>("Segunda");
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("Manhã");
  const { toast } = useToast();

  const getKey = (day: WeekDay, period: Period) => `${day}-${period}`;

  const handleCellClick = (day: WeekDay, period: Period) => {
    if (day === "Sábado") {
      setSaturdayDialogOpen(true);
      return;
    }
    setSelectedDay(day);
    setSelectedPeriod(period);
    setDialogOpen(true);
  };

  const handleSavePeople = (people: string[]) => {
    const key = getKey(selectedDay, selectedPeriod);
    const newAttendance = new Map(attendance);
    if (people.length === 0) {
      newAttendance.delete(key);
    } else {
      newAttendance.set(key, people);
    }
    setAttendance(newAttendance);
    
    toast({
      title: "Salvo com sucesso",
      description: `${people.length} pessoa(s) marcada(s) para ${selectedDay} - ${selectedPeriod}`,
    });
  };

  const handleSaveSaturday = (config: SaturdayConfig) => {
    setSaturdayConfig(config);
    toast({
      title: "Sábado configurado",
      description: `Cima: ${config.andarCima} | Baixo: ${config.andarBaixo}`,
    });
  };

  const handleRemovePerson = (day: WeekDay, period: Period, person: string) => {
    const key = getKey(day, period);
    const currentPeople = attendance.get(key) || [];
    const newPeople = currentPeople.filter((p) => p !== person);
    
    const newAttendance = new Map(attendance);
    if (newPeople.length === 0) {
      newAttendance.delete(key);
    } else {
      newAttendance.set(key, newPeople);
    }
    setAttendance(newAttendance);

    toast({
      title: "Pessoa removida",
      description: `${person} foi removido de ${day} - ${period}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Controle de Café</h1>
          <div className="flex items-center gap-2">
            <Button
              variant={showReport ? "default" : "outline"}
              size="sm"
              onClick={() => setShowReport(!showReport)}
              data-testid="button-toggle-report"
            >
              <FileText className="h-4 w-4 mr-2" />
              {showReport ? "Ocultar" : "Ver"} Relatório
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium mb-2">Grade Semanal</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Clique em qualquer período para selecionar as pessoas que irão consumir o café
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <WeekScheduleTable
                attendance={attendance}
                saturdayConfig={saturdayConfig}
                onCellClick={handleCellClick}
                onRemovePerson={handleRemovePerson}
                onSaturdayConfigClick={() => setSaturdayDialogOpen(true)}
              />
            </div>
            
            {showReport && (
              <div className="lg:col-span-1">
                <AttendanceReport 
                  attendance={attendance} 
                  saturdayConfig={saturdayConfig}
                />
              </div>
            )}
          </div>
        </div>
      </main>

      <PersonSelector
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        selectedPeople={attendance.get(getKey(selectedDay, selectedPeriod)) || []}
        onSave={handleSavePeople}
        day={selectedDay}
        period={selectedPeriod}
      />

      <SaturdayConfigDialog
        open={saturdayDialogOpen}
        onOpenChange={setSaturdayDialogOpen}
        config={saturdayConfig}
        onSave={handleSaveSaturday}
      />
    </div>
  );
}
