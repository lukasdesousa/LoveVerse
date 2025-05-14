-- CreateTable
CREATE TABLE "Pagamento" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "metodoPagamento" TEXT,
    "valor" DECIMAL(65,30) NOT NULL,
    "aprovadoEm" TIMESTAMP(3),
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nomePagador" TEXT,
    "emailPagador" TEXT,
    "mpPaymentId" TEXT,

    CONSTRAINT "Pagamento_pkey" PRIMARY KEY ("id")
);
