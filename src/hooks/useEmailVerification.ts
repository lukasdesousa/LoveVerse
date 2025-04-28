import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function checkIfEmailIsVerified(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        email_verified: true,
      },
    });

    if (user) {
      return user.email_verified;
    } else {
      console.log("Usuário não encontrado");
      return false;
    }
  } catch (error) {
    console.error("Erro ao verificar o status do e-mail:", error);
    return false;
  }
}