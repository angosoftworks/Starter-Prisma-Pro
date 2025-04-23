import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Module = {
  name: string;
  score: number;
};

type ModuleListProps = {
  modules: Module[];
};

export function ModuleList({ modules }: ModuleListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Derniers modules analysés</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {modules.map((module) => (
            <li key={module.name} className="flex justify-between items-center">
              <span>{module.name}</span>
              <Badge>{module.score}%</Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
} 