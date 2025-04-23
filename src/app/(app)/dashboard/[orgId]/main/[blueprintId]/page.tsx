// /app/(app)/dashboard/[orgId]/main/[blueprintId]/page.tsx
import { getBlueprint } from "@/lib/blueprints";
import { notFound } from "next/navigation";
import { BackButton } from "@/components/ui/back-button";

type Props = {
  params: {
    orgId: string;
    blueprintId: string;
  };
};

export default async function BlueprintDetailPage({ params }: Props) {
  const { orgId, blueprintId } = params;

  const blueprint = await getBlueprint(orgId, blueprintId);

  if (!blueprint) return notFound();

  return (
    <div className="p-6 space-y-4">
      <BackButton />
      <h1 className="text-2xl font-bold">📘 {blueprint.name}</h1>
      <p className="text-gray-500">Créé le {new Date(blueprint.createdAt).toLocaleString()}</p>

      <div className="bg-muted p-4 rounded">
        <h2 className="font-semibold mb-2">Contenu DSL</h2>
        <pre className="text-sm whitespace-pre-wrap break-words">{blueprint.dsl}</pre>
      </div>
    </div>
  );
}
