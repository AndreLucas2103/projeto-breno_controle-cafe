import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AttendanceCellProps {
  people: string[];
  onRemovePerson: (person: string) => void;
  onClick: () => void;
}

export default function AttendanceCell({
  people,
  onRemovePerson,
  onClick,
}: AttendanceCellProps) {
  if (people.length === 0) {
    return (
      <div
        className="min-h-[80px] flex items-center justify-center text-muted-foreground text-sm hover-elevate cursor-pointer rounded-md p-2"
        onClick={onClick}
        data-testid="cell-empty"
      >
        Clique para adicionar
      </div>
    );
  }

  return (
    <div
      className="min-h-[80px] p-2 space-y-1.5 hover-elevate cursor-pointer rounded-md"
      onClick={onClick}
      data-testid="cell-with-people"
    >
      <div className="flex flex-wrap gap-1.5">
        {people.slice(0, 3).map((person) => (
          <Badge
            key={person}
            variant="secondary"
            className="text-xs gap-1 pr-1"
            data-testid={`badge-person-${person}`}
          >
            {person}
            <Button
              size="icon"
              variant="ghost"
              className="h-3 w-3 p-0 hover:bg-transparent"
              onClick={(e) => {
                e.stopPropagation();
                onRemovePerson(person);
              }}
              data-testid={`button-remove-${person}`}
            >
              <X className="h-2.5 w-2.5" />
            </Button>
          </Badge>
        ))}
        {people.length > 3 && (
          <Badge
            variant="outline"
            className="text-xs"
            data-testid="badge-more-count"
          >
            +{people.length - 3}
          </Badge>
        )}
      </div>
    </div>
  );
}
