/*
  Warnings:

  - You are about to drop the column `aprovadoEm` on the `Pagamento` table. All the data in the column will be lost.
  - You are about to drop the column `criadoEm` on the `Pagamento` table. All the data in the column will be lost.
  - You are about to drop the column `emailPagador` on the `Pagamento` table. All the data in the column will be lost.
  - You are about to drop the column `metodoPagamento` on the `Pagamento` table. All the data in the column will be lost.
  - You are about to drop the column `nomePagador` on the `Pagamento` table. All the data in the column will be lost.
  - You are about to drop the column `valor` on the `Pagamento` table. All the data in the column will be lost.
  - Added the required column `value` to the `Pagamento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pagamento" DROP COLUMN "aprovadoEm",
DROP COLUMN "criadoEm",
DROP COLUMN "emailPagador",
DROP COLUMN "metodoPagamento",
DROP COLUMN "nomePagador",
DROP COLUMN "valor",
ADD COLUMN     "approvedAt" TIMESTAMP(3),
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "payerEmail" TEXT,
ADD COLUMN     "payerName" TEXT,
ADD COLUMN     "paymentMethod" TEXT,
ADD COLUMN     "value" DECIMAL(65,30) NOT NULL;
