import { useState } from "react";
import { AddParticipantDialog } from "../add-participant-dialog";
import { Button } from "@/components/ui/button";

export default function AddParticipantDialogExample() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Abrir Dialog</Button>
      <AddParticipantDialog
        open={open}
        onOpenChange={setOpen}
        onAdd={(name, floor) => console.log("Added:", name, floor)}
      />
    </div>
  );
}
