"use server";

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET as string;
const prisma = new PrismaClient();

async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
};

function validateInput(name: string, email: string, password: string): string | null {
  console.log(name)
  if (!name || typeof name !== "string" || name.trim() === "") {
    return "Nome inválido!";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return "E-mail inválido!";
  }

  if (!password || typeof password !== "string" || password.length < 8) {
    return "Senha deve ter pelo menos 8 caracteres!";
  }

  return null;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Valida os inputs
    const validationError = validateInput(body.name, body.email, body.password);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    // Verifica se o usuário já existe
    const existingUser = await prisma.user.findUnique({ where: { email: body.email } });
    if (existingUser) {
      return NextResponse.json({ error: "E-mail já cadastrado!" }, { status: 400 });
    }

    // Criptografa a senha e cria o novo usuário
    const hashedPassword = await hashPassword(body.password);

    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return NextResponse.json({ message: "Usuário registrado com sucesso!", user }, {
      status: 201,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
        "Set-Cookie": `token=${token}; HttpOnly; Secure; Path=/; Max-Age=${7 * 24 * 60 * 60}; SameSite=Strict`
      }
    });
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    return NextResponse.json({ error: "Erro ao registrar usuário" }, { status: 500 });
  }
}
