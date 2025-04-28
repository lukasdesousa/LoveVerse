/*
  Warnings:

  - You are about to drop the column `link` on the `Message` table. All the data in the column will be lost.
  - Added the required column `creatorName` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "link",
ADD COLUMN     "creatorName" TEXT NOT NULL,
ADD COLUMN     "spotifyLink" TEXT;
