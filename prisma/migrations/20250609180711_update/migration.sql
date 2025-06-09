/*
  Warnings:

  - You are about to drop the column `interactiveMessage` on the `Message` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "interactiveMessage",
ADD COLUMN     "emailSent" BOOLEAN NOT NULL DEFAULT false;
