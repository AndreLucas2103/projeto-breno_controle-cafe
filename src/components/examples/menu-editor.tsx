import { MenuEditor } from "../menu-editor";

export default function MenuEditorExample() {
  return (
    <div className="space-y-4">
      <MenuEditor
        title="Café da Manhã - Segunda-feira"
        items={["Café", "Pão com manteiga", "Frutas"]}
        onUpdate={(items) => console.log("Updated items:", items)}
      />
      <MenuEditor
        title="Café da Tarde - Segunda-feira"
        items={["Café", "Biscoitos"]}
        onUpdate={(items) => console.log("Updated items:", items)}
      />
    </div>
  );
}
