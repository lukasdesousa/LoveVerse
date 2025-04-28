/*
  Warnings:

  - Added the required column `destinataryName` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "destinataryName" TEXT NOT NULL;
