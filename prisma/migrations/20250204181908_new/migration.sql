/*
  Warnings:

  - You are about to drop the column `privateKey` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `publiclkey` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `USD` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "USD" DROP CONSTRAINT "USD_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "privateKey",
DROP COLUMN "publiclkey";

-- DropTable
DROP TABLE "USD";

-- CreateTable
CREATE TABLE "SOLWALLET" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "publiclkey" TEXT,
    "privateKey" TEXT,

    CONSTRAINT "SOLWALLET_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SOLWALLET_userId_key" ON "SOLWALLET"("userId");

-- AddForeignKey
ALTER TABLE "SOLWALLET" ADD CONSTRAINT "SOLWALLET_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
