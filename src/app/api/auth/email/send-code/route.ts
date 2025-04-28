// src/app/api/auth/send-verification/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sendVerificationEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: 'E-mail é necessário' }, { status: 400 });
  }

  try {
    await sendVerificationEmail(email);
    return NextResponse.json({ message: 'Código de verificação enviado' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao enviar o código' }, { status: 500 });
  }
}
