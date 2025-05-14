/*
  Warnings:

  - You are about to drop the `Pagamento` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Pagamento";

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "paymentMethod" TEXT,
    "value" DECIMAL(65,30) NOT NULL,
    "approvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "payerName" TEXT,
    "payerEmail" TEXT,
    "mpPaymentId" TEXT,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);
