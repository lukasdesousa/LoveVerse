"use server";

import cron from "node-cron";
import { PrismaClient } from "@prisma/client";
// Job que roda a cada 10 minutos para excluir mensagens expiradas
cron.schedule("*/10 * * * *", async () => {
  console.log("🕒 Verificando mensagens expiradas...");
  const prisma = new PrismaClient();

  try {
    const now = new Date();

    const deletedMessages = await prisma.message.deleteMany({
      where: {
        expiresAt: {
          lte: now,
        },
      },
    });

    if (deletedMessages.count > 0) {
      console.log(`✅ ${deletedMessages.count} mensagens expiradas foram removidas.`);
    } else {
      console.log("ℹ Nenhuma mensagem expirada encontrada.");
    }
  } catch (error) {
    console.error("❌ Erro ao excluir mensagens expiradas:", error);
  }
});
