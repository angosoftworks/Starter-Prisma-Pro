import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";

const mockProject = {
  name: "Survival RPG",
  status: "Corrigé",
  lastScan: new Date(),
  score: 87,
  diff: +3,
  metrics: {
    readability: 80,
    modularity: 90,
    performance: 75,
    bestPractices: 85,
  },
  recentModules: [
    { name: "InventorySystem", score: 82 },
    { name: "CraftingComponent", score: 78 },
    { name: "AIController", score: 70 },
  ],
  history: [
    { date: new Date(), type: "Scan", scoreBefore: 84, scoreAfter: 87 },
    { date: new Date(Date.now() - 86400000), type: "Refactor", scoreBefore: 75, scoreAfter: 84 },
  ],
};

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{mockProject.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline">{mockProject.status}</Badge>
            <span className="text-sm text-muted-foreground">
              Dernière analyse : {format(mockProject.lastScan, "dd/MM/yyyy HH:mm")}
            </span>
          </div>
        </div>
        <Button>Lancer une nouvelle analyse</Button>
      </div>

      {/* Score AAA Readiness */}
      <Card>
        <CardHeader>
          <CardTitle>Score AAA Readiness : {mockProject.score}%</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm mb-2 text-muted-foreground">
            Évolution : {mockProject.diff > 0 ? `+${mockProject.diff}%` : `${mockProject.diff}%`} depuis la dernière analyse
          </p>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(mockProject.metrics).map(([key, value]) => (
              <div key={key}>
                <p className="capitalize text-sm mb-1">{key}</p>
                <Progress value={value} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Derniers modules analysés */}
      <Card>
        <CardHeader>
          <CardTitle>Derniers modules analysés</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {mockProject.recentModules.map((module) => (
              <li key={module.name} className="flex justify-between">
                <span>{module.name}</span>
                <Badge>{module.score}%</Badge>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Historique des scans */}
      <Card>
        <CardHeader>
          <CardTitle>Historique des scans</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {mockProject.history.map((entry, i) => (
              <li key={i} className="text-sm text-muted-foreground">
                <div>
                  <strong>{entry.type}</strong> le {format(entry.date, "dd/MM/yyyy HH:mm")} – Score: {entry.scoreBefore}% → {entry.scoreAfter}%
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Actions rapides */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button variant="secondary">🔍 Nouvelle analyse</Button>
        <Button variant="secondary">🔧 Refactor IA</Button>
        <Button variant="secondary">➕ Générer une feature</Button>
        <Button variant="secondary">📚 Démarrer un tutoriel</Button>
      </div>
    </div>
  );
}
