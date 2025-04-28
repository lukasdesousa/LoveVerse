'use server';

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function resetPasswordAction(token: string, newPassword: string) {
  const resetRequest = await prisma.passWordRecovery.findFirst({ where: { token } });

  if (!resetRequest || resetRequest.expiresAt < new Date()) {
    throw new Error('Token inválido ou expirado.');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { email: resetRequest.email },
    data: { password: hashedPassword },
  });

  await prisma.passWordRecovery.delete({ where: { email: resetRequest.email, token } });
}
