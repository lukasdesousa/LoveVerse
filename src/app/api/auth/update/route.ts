"use server";

/*
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function validateInput(name: string, email: string): string | null {
  console.log(name)
  if (!name || typeof name !== "string" || name.trim() === "") {
    return "Nome inválido!";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return "E-mail inválido!";
  }
  return null;
}

export async function POST(req: NextRequest) {

  try {
    const body = await req.json();
    console.log(body, 'cheguei aqui')

    // Valida os inputs
    const validationError = validateInput(body.name, body.email);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }
    console.log('opa')
    // Verifica se o usuário já existe
    const existingUser = await prisma.user.findUnique({ where: { email: body.email } });
    if (existingUser) {
      return NextResponse.json({ error: "Endereço de email já utilizado" }, { status: 400 });
    }

    const user = await prisma.user.update({
      where: { id: body.id },
      data: {
        name: body.name,
        email: body.email,
      },
      include: { messages: true },
    });
    return NextResponse.json({ message: "Usuário editado com sucesso!", user }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erro ao editar usuário" }, { status: 500 });
  }
}
*/