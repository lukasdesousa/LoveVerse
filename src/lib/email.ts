// lib/email.ts
import { PrismaClient } from '@prisma/client';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const prisma = new PrismaClient();

export async function sendVerificationEmail(email: string) {
  const code = Math.floor(100000 + Math.random() * 900000).toString(); // Gera um código de 6 dígitos
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + 10);

  try {
    // Armazenar o código no banco de dados
    await prisma.emailVerification.upsert({
      where: { email },
      update: { code, expiresAt },
      create: { email, code, expiresAt },
    });

    // Enviar o código para o e-mail usando Resend
    await resend.emails.send({
      from: 'LoveVerse - Confirme seu E-mail <loveverse@loveverse.space>', // Defina seu e-mail
      to: email,
      subject: 'Código de Verificação do Loveverse',
      text: `Seu código de verificação é: ${code}. Ele irá expirar em 10 minutos.`,
    });
  } catch (err) {
    alert(err)
  }
}
