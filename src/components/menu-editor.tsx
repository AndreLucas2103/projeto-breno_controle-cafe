import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";

interface MenuEditorProps {
  title: string;
  items: string[];
  onUpdate?: (items: string[]) => void;
}

export function MenuEditor({
  title,
  items: initialItems,
  onUpdate,
}: MenuEditorProps) {
  const [items, setItems] = useState<string[]>(initialItems);
  const [newItem, setNewItem] = useState("");

  const handleAddItem = () => {
    if (newItem.trim()) {
      const updatedItems = [...items, newItem.trim()];
      setItems(updatedItems);
      onUpdate?.(updatedItems);
      setNewItem("");
    }
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    onUpdate?.(updatedItems);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex gap-2">
          <Input
            placeholder="Adicionar item ao cardápio..."
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddItem()}
            data-testid="input-menu-item"
          />
          <Button
            onClick={handleAddItem}
            size="icon"
            data-testid="button-add-item"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-2">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 rounded-md bg-muted"
            >
              <span className="text-sm" data-testid={`text-menu-item-${index}`}>
                {item}
              </span>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleRemoveItem(index)}
                className="h-6 w-6"
                data-testid={`button-remove-item-${index}`}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}

          {items.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              Nenhum item no cardápio
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
