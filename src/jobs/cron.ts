'use server';

import cron from "node-cron";
import { PrismaClient } from "@prisma/client";
// Job que roda a cada 10 minutos para excluir mensagens expiradas
cron.schedule("*/10 * * * *", async () => {
  const prisma = new PrismaClient();
  try {
    const now = new Date();
    await prisma.message.deleteMany({
      where: {
        expiresAt: {
          lte: now,
        },
      },
    });
  } catch {
    //ignore
  }
});
