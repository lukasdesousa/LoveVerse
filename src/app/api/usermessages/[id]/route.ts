import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const id = request.nextUrl.pathname.split('/').pop(); // Captura o [id] da URL

  if (!id) {
    return NextResponse.json({ error: "ID não fornecido" }, { status: 400 });
  }

  try {
    const message = await prisma.message.findUnique({
      where: { id },
    });

    if (!message) {
      return NextResponse.json({ error: "Mensagem não encontrada" }, { status: 404 });
    }

    return NextResponse.json(message);
  } catch (error) {
    console.error("Erro ao buscar mensagem:", error);
    return NextResponse.json({ error: "Erro interno ao buscar mensagem" }, { status: 500 });
  }
}
