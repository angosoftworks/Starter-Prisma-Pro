'use client';

import { Button } from "@/components/ui/button";

const actions = [
  { label: "Nouvelle analyse", icon: "🔍" },
  { label: "Refactor IA", icon: "🔧" },
  { label: "Générer une feature", icon: "➕" },
  { label: "Démarrer un tutoriel", icon: "📚" },
];

export function ClientQuickActions() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {actions.map((action, index) => (
        <Button
        key={index}
        variant="secondary"
        className="flex items-center gap-2 px-4 py-4"
      >
        <span className="text-xl">{action.icon}</span>
        <span className="text-sm">{action.label}</span>
      </Button>
      
      ))}
    </div>
  );
}
