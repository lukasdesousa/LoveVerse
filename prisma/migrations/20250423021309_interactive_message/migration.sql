/*
  Warnings:

  - You are about to drop the column `theme` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Message` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "theme",
DROP COLUMN "title",
ADD COLUMN     "interactiveMessage" BOOLEAN NOT NULL DEFAULT true;
