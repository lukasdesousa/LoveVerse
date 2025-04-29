'use server';

import { PrismaClient } from '@prisma/client';
import { Resend } from 'resend';
import { v4 as uuidv4 } from 'uuid';

const resend = new Resend(process.env.RESEND_API_KEY);
const prisma = new PrismaClient();

export async function forgotPasswordAction(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });

  if (user) {
    const token = uuidv4();
    await prisma.passWordRecovery.create({
      data: {
        email,
        token,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hora
      },
    });

    await resend.emails.send({
        from: 'LoveVerse - Confirme seu E-mail <loveverse@loveverse.space>', // Defina seu e-mail
        to: email,
        subject: 'Código de Verificação do Loveverse',
        text: `<p>Clique <a href="https://loveverse-umber.vercel.app/reset_password?token=${token}">aqui</a> para redefinir sua senha.</p>`,
      });
  }
}
