import { NextResponse } from "next/server";
import { auth } from "@/lib/API/Services/auth/auth";
import { prisma } from "@/lib/prisma";

// ✅ GET: Blueprints d'une organization (auth sécurisée)
export async function GET(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const organizationId = searchParams.get("organizationId");

    if (!organizationId) {
      return NextResponse.json({ error: "organizationId requis" }, { status: 400 });
    }

    const blueprints = await prisma.blueprint.findMany({
      where: {
        userId: session.user.id,
        organizationId,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ blueprints });
  } catch (err) {
    console.error("❌ Erreur récupération DSL :", err);
    return NextResponse.json({ blueprints: [] }, { status: 500 });
  }
}
