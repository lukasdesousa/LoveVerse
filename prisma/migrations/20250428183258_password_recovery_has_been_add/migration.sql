-- CreateTable
CREATE TABLE "PassWordRecovery" (
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PassWordRecovery_pkey" PRIMARY KEY ("email")
);
