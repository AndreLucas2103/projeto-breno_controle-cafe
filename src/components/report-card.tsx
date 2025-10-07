import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ReportData {
  total: number;
  andarCima: number;
  andarBaixo: number;
}

interface ReportCardProps {
  title: string;
  data: ReportData;
}

export function ReportCard({ title, data }: ReportCardProps) {
  const cimaPercentage = data.total > 0 ? (data.andarCima / data.total) * 100 : 0;
  const baixoPercentage = data.total > 0 ? (data.andarBaixo / data.total) * 100 : 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold font-mono" data-testid="text-total">
          {data.total}
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-sm bg-chart-1" />
              <span className="text-xs text-muted-foreground">Andar de Cima</span>
            </div>
            <Badge variant="secondary" className="font-mono" data-testid="badge-andar-cima">
              {data.andarCima}
            </Badge>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-chart-1"
              style={{ width: `${cimaPercentage}%` }}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-sm bg-chart-2" />
              <span className="text-xs text-muted-foreground">Andar de Baixo</span>
            </div>
            <Badge variant="secondary" className="font-mono" data-testid="badge-andar-baixo">
              {data.andarBaixo}
            </Badge>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-chart-2"
              style={{ width: `${baixoPercentage}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
