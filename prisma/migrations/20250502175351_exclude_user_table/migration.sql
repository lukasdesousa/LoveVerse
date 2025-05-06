/*
  Warnings:

  - You are about to drop the column `userId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the `EmailVerification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PassWordRecovery` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_userId_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "userId",
ADD COLUMN     "email" TEXT NOT NULL DEFAULT 'example@example.com';

-- DropTable
DROP TABLE "EmailVerification";

-- DropTable
DROP TABLE "PassWordRecovery";

-- DropTable
DROP TABLE "User";
