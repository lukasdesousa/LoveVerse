/* eslint-disable @typescript-eslint/no-unused-vars */
import "server-only";

import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";

export async function handleMercadoPagoPayment(paymentData: PaymentResponse) {
  const metadata = paymentData.metadata;
  const paymentStatus = paymentData.status;
  const userEmail = metadata.user_email; // Os metadados do Mercado Pago são convertidos para snake_case
  const testeId = metadata.teste_id; // Os metadados do Mercado Pago são convertidos para snake_case

  if(paymentStatus === 'approved') {
    console.log('O pagamento foi aprovado, redirecionando para a rota...')
  }

  return;
}