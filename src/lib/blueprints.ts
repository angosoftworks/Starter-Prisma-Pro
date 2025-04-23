// /lib/blueprints.ts
import { prisma } from "@/lib/prisma";

export async function getBlueprint(orgId: string, blueprintId: string) {
  return await prisma.blueprint.findFirst({
    where: {
      id: blueprintId,
      organizationId: orgId,
    },
  });
}
