import "server-only";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";

export async function handleMercadoPagoPayment(paymentData: PaymentResponse) {
  const metadata = paymentData.metadata;
  const paymentStatus = paymentData.status;
  //const userEmail = metadata.user_email; // Os metadados do Mercado Pago são convertidos para snake_case
  const testeId = metadata.teste_id; // Os metadados do Mercado Pago são convertidos para snake_case

  if(paymentStatus === 'approved') {
    try {
      await prisma.payment.update({
        where: { id: testeId },
          data: {
          status: "approved",
          paymentMethod: paymentData.payment_method_id,
          approvedAt: paymentData.date_approved,
        },
      });
    } catch {
      // ignore
    }
  }

  return;
}