import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const id = request.nextUrl.pathname.split('/').pop();
  const theme = request.nextUrl.searchParams.get('theme');

  if (!id) {
    return NextResponse.json({ error: "ID não fornecido" }, { status: 400 });
  }

  try {
    let message;

    if (theme === 'love') {
      message = await prisma.love_message_theme.findUnique({
        where: { id },
      });
    } else {
      message = await prisma.message.findUnique({
        where: { id },
      });
    }

    if (!message) {
      return NextResponse.json({ error: "Mensagem não encontrada" }, { status: 404 });
    }

    return NextResponse.json(message);
  } catch (error) {
    console.error("Erro ao buscar mensagem:", error);
    return NextResponse.json({ error: "Erro interno ao buscar mensagem" }, { status: 500 });
  }
}
