import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { format } from "date-fns";

type HistoryEntry = {
  date: Date | string; // on tolère les deux
  type: string;
  scoreBefore: number;
  scoreAfter: number;
};

type ScanHistoryProps = {
  history: HistoryEntry[];
};

export function ScanHistory({ history }: ScanHistoryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Historique des scans</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {history.map((entry, i) => (
            <li key={i} className="text-sm text-muted-foreground">
              <div>
                <strong>{entry.type}</strong> le{" "}
                {format(new Date(entry.date), "dd/MM/yyyy HH:mm")} – Score:{" "}
                {entry.scoreBefore}% → {entry.scoreAfter}%
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
