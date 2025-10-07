import { ReportCard } from "../report-card";

export default function ReportCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ReportCard
        title="Café da Manhã - Segunda-feira"
        data={{ total: 15, andarCima: 9, andarBaixo: 6 }}
      />
      <ReportCard
        title="Café da Tarde - Segunda-feira"
        data={{ total: 12, andarCima: 5, andarBaixo: 7 }}
      />
    </div>
  );
}
