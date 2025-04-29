'use server';

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function verifyToken(token: string) {
  const getToken = prisma.passWordRecovery.findFirst({ where: { token } })

  return getToken;
}