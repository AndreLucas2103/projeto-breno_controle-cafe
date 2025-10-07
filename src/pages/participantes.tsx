import { useState } from "react";
import { ParticipantCard } from "@/components/participant-card";
import { AddParticipantDialog } from "@/components/add-participant-dialog";
import { EditParticipantDialog } from "@/components/edit-participant-dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useToast } from "@/hooks/use-toast";

interface Participant {
  id: string;
  name: string;
  floor: string;
  vacationStart?: string;
  vacationEnd?: string;
}

export default function Participantes() {
  const [participants, setParticipants] = useLocalStorage<Participant[]>("participants", []);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingParticipant, setEditingParticipant] = useState<Participant | null>(null);
  const { toast } = useToast();

  const handleAddParticipant = (name: string, floor: string) => {
    const newParticipant: Participant = {
      id: Date.now().toString(),
      name,
      floor,
    };
    setParticipants((prev) => [...prev, newParticipant]);
    toast({
      title: "Participante adicionado",
      description: `${name} foi adicionado com sucesso.`,
    });
  };

  const handleEditParticipant = (
    id: string,
    name: string,
    floor: string,
    vacationStart: string,
    vacationEnd: string
  ) => {
    setParticipants((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, name, floor, vacationStart: vacationStart || undefined, vacationEnd: vacationEnd || undefined }
          : p
      )
    );
    toast({
      title: "Participante atualizado",
      description: `${name} foi atualizado com sucesso.`,
    });
  };

  const handleDeleteParticipant = (id: string) => {
    setParticipants((prev) => prev.filter((p) => p.id !== id));
    toast({
      title: "Participante removido",
      description: "O participante foi removido com sucesso.",
    });
  };

  const handleOpenEdit = (participant: Participant) => {
    setEditingParticipant(participant);
    setEditDialogOpen(true);
  };

  const sortedParticipants = [...participants].sort((a, b) => 
    a.name.localeCompare(b.name, 'pt-BR')
  );
  const cimaParticipants = sortedParticipants.filter((p) => p.floor === "cima");
  const baixoParticipants = sortedParticipants.filter((p) => p.floor === "baixo");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Participantes</h1>
        <Button onClick={() => setDialogOpen(true)} data-testid="button-add-participant">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all" data-testid="tab-all">
            Todos ({participants.length})
          </TabsTrigger>
          <TabsTrigger value="cima" data-testid="tab-cima">
            Andar de Cima ({cimaParticipants.length})
          </TabsTrigger>
          <TabsTrigger value="baixo" data-testid="tab-baixo">
            Andar de Baixo ({baixoParticipants.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-3 mt-4">
          {sortedParticipants.map((participant) => (
            <ParticipantCard
              key={participant.id}
              name={participant.name}
              floor={participant.floor}
              vacationStart={participant.vacationStart}
              vacationEnd={participant.vacationEnd}
              onEdit={() => handleOpenEdit(participant)}
              onDelete={() => handleDeleteParticipant(participant.id)}
            />
          ))}
        </TabsContent>

        <TabsContent value="cima" className="space-y-3 mt-4">
          {cimaParticipants.map((participant) => (
            <ParticipantCard
              key={participant.id}
              name={participant.name}
              floor={participant.floor}
              vacationStart={participant.vacationStart}
              vacationEnd={participant.vacationEnd}
              onEdit={() => handleOpenEdit(participant)}
              onDelete={() => handleDeleteParticipant(participant.id)}
            />
          ))}
        </TabsContent>

        <TabsContent value="baixo" className="space-y-3 mt-4">
          {baixoParticipants.map((participant) => (
            <ParticipantCard
              key={participant.id}
              name={participant.name}
              floor={participant.floor}
              vacationStart={participant.vacationStart}
              vacationEnd={participant.vacationEnd}
              onEdit={() => handleOpenEdit(participant)}
              onDelete={() => handleDeleteParticipant(participant.id)}
            />
          ))}
        </TabsContent>
      </Tabs>

      <AddParticipantDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onAdd={handleAddParticipant}
      />

      <EditParticipantDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        participant={editingParticipant}
        onSave={handleEditParticipant}
      />
    </div>
  );
}
