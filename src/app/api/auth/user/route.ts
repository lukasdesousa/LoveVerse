"use server";

import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error("❌ Defina a variável de ambiente JWT_SECRET no .env.local");
}

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Não autenticado!" }, { status: 401 });
    }

    interface DecodedToken extends JwtPayload {
      id: string;
      email: string;
      name: string;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;

    // Buscar o usuário incluindo suas mensagens
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: { messages: true },
    });

    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Erro ao verificar token:", error);
    if (error instanceof jwt.TokenExpiredError) {
      return NextResponse.json({ error: "Token expirado!" }, { status: 401 });
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ error: "Token inválido!" }, { status: 401 });
    }
    return NextResponse.json({ error: "Erro desconhecido!" }, { status: 500 });
  }
}
