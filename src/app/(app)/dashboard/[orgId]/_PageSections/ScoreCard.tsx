import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClientProgress } from "../_PageSections/ClientProgress";

type ScoreCardProps = {
  score: number;
  diff: number;
  metrics: Record<string, number>;
};

export function ScoreCard({ score, diff, metrics }: ScoreCardProps) {
  const diffLabel = diff > 0 ? `+${diff}%` : `${diff}%`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Score AAA Readiness : {score}%</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-2 text-muted-foreground">
          Évolution : {diffLabel} depuis la dernière analyse
        </p>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(metrics).map(([key, value]) => (
            <div key={key}>
              <p className="capitalize text-sm mb-1">{key}</p>
              <ClientProgress value={value} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
