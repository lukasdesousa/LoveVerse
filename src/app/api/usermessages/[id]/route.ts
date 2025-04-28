import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const paramsProperty = await params;

  try {
    const message = await prisma.message.findUnique({
      where: { id: paramsProperty.id },
    });

    if (!message) {
      return NextResponse.json({ error: "Mensagem não encontrada" }, { status: 404 });
    }

    return NextResponse.json(message);
  } catch (error) {
    console.error("Erro ao buscar mensagem:", error);
    return NextResponse.json({ error: "Erro ao buscar mensagem" }, { status: 500 });
  }
}
