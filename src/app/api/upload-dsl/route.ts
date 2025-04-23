import { NextResponse } from "next/server";
import { auth } from "@/lib/API/Services/auth/auth"; // ✅ tu l’exportes déjà !
import { prisma } from "@/lib/prisma";

// 🔄 Utilitaire pour extraire le nom du Blueprint
function extractBPName(dsl: string): string {
  const match = dsl.match(/@BP\|Type=.*?\|Name=(.+)/);
  return match?.[1]?.trim() ?? "UnknownBP";
}

// ✅ POST: Enregistrement d’un Blueprint lié à l’utilisateur ET à une organization
export async function POST(req: Request) {
  try {
    const session = await auth(); // ✅ ta propre fonction auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { dsl, organizationId } = await req.json();

    if (!dsl || !organizationId) {
      return NextResponse.json({ error: "Données manquantes" }, { status: 400 });
    }

    const userId = session.user.id;
    const name = extractBPName(dsl);

    await prisma.blueprint.create({
      data: {
        name,
        dsl,
        userId,
        organizationId,
      },
    });

    return NextResponse.json({ success: true, message: "DSL enregistré en DB ✅" });
  } catch (err) {
    console.error("❌ Erreur enregistrement DSL :", err);
    return NextResponse.json({ success: false, error: "Erreur serveur" }, { status: 500 });
  }
}