import { prisma } from "@/lib/prisma";
import { OpenAI } from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // stocké dans .env
});

export async function POST(req: Request) {
  const { question, userId } = await req.json();

  const blueprints = await prisma.blueprint.findMany({
    where: { userId },
  });

  const allDSL = blueprints.map(b => b.dsl).join("\n\n");

  const systemPrompt = `
Tu es un expert Unreal Engine.
Voici les blueprints exportés pour ce projet :

${allDSL}

Réponds à la question de l'utilisateur en te basant uniquement sur les informations ci-dessus.
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: question },
    ],
  });

  const reply = completion.choices[0].message.content;

  return NextResponse.json({ reply });
}
