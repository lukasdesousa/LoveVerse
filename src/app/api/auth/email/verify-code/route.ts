// src/app/api/auth/email/verify-code/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, code } = body;
  console.log(email, code)

  if (!email || !code) {
    return NextResponse.json({ error: 'E-mail e código são necessários' }, { status: 400 });
  }

  try {
    const verification = await prisma.emailVerification.findUnique({
      where: { email },
    });

    if (!verification) {
      return NextResponse.json({ error: 'E-mail não encontrado' }, { status: 404 });
    }

    const isCodeValid = verification.code === code;
    const isNotExpired = new Date() < new Date(verification.expiresAt);

    if (isCodeValid && isNotExpired) {
      await prisma.user.update({
        where: { email },
        data: { email_verified: true },
      });

      await prisma.emailVerification.delete({ where: { email } });

      return NextResponse.json({ message: 'E-mail verificado com sucesso' }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Código inválido ou expirado' }, { status: 400 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao verificar o código' }, { status: 500 });
  }
}
