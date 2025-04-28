"use server";

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const JWT_SECRET = process.env.JWT_SECRET as string;
const prisma = new PrismaClient();

if (!JWT_SECRET) {
  throw new Error("❌ Defina a variável de ambiente JWT_SECRET no .env.local");
}

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Validação básica
    if (!email || !password) {
      return NextResponse.json({ error: "E-mail e senha são obrigatórios!" }, { status: 400 });
    }

    // Verifica se o usuário existe
    const user = await prisma.user.findUnique({
      where: { email: email },
      include: { messages: true }, // Include the messages relation
    });
    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado!" }, { status: 404 });
    }

    // Compara a senha informada com a senha criptografada
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Senha incorreta!" }, { status: 401 });
    }

    // Gera um token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: "7d" } // Token válido por 7 dias
    );

    // Define o cookie com o token
    const response = NextResponse.json(
      { message: "Login bem-sucedido!", user: { nome: user.name, email: user.email } }, 
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
          "Set-Cookie": `token=${token}; HttpOnly; Secure; Path=/; Max-Age=${7 * 24 * 60 * 60}; SameSite=Strict`
        }
      }
    );

    return response;
  } catch (error) {
    console.error("Erro no login:", error);
    return NextResponse.json({ error: "Erro ao realizar login" }, { status: 500 });
  }
}
