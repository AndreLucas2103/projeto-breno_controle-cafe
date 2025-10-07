import { ParticipantCard } from "../participant-card";

export default function ParticipantCardExample() {
  return (
    <div className="space-y-3">
      <ParticipantCard
        name="João Silva"
        floor="cima"
        onEdit={() => console.log("Edit clicked")}
        onDelete={() => console.log("Delete clicked")}
      />
      <ParticipantCard
        name="Maria Santos"
        floor="baixo"
        onEdit={() => console.log("Edit clicked")}
        onDelete={() => console.log("Delete clicked")}
      />
    </div>
  );
}
