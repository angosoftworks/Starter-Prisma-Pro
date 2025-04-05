import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// POST: Enregistrement DSL
export async function POST(req: Request) {
  try {
    const dslText = await req.text();
    const userId = "demo-user";
    const name = extractBPName(dslText);

    await prisma.blueprint.create({
      data: {
        userId,
        name,
        dsl: dslText,
      },
    });

    return NextResponse.json({ success: true, message: "DSL enregistré en DB ✅" });
  } catch (err) {
    console.error("❌ Erreur enregistrement DSL :", err);
    return NextResponse.json({ success: false, error: "Erreur serveur" }, { status: 500 });
  }
}

// ✅ GET: Récupération de tous les DSL
export async function GET() {
  try {
    const userId = "demo-user"; // à sécuriser + tard
    const blueprints = await prisma.blueprint.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    const dslList = blueprints.map((bp) => bp.dsl);

    return NextResponse.json({ dslList });
  } catch (err) {
    console.error("❌ Erreur récupération DSL :", err);
    return NextResponse.json({ dslList: [] }, { status: 500 });
  }
}

function extractBPName(dsl: string): string {
  const match = dsl.match(/@BP\|Type=.*?\|Name=(.+)/);
  return match?.[1]?.trim() ?? "UnknownBP";
}
