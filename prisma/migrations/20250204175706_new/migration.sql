/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ADD COLUMN     "provider" TEXT,
ADD COLUMN     "sub" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- CreateTable
CREATE TABLE "Inrwallet" (
    "id" SERIAL NOT NULL,
    "balance" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Inrwallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "USD" (
    "id" SERIAL NOT NULL,
    "balance" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "USD_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Inrwallet_userId_key" ON "Inrwallet"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "USD_userId_key" ON "USD"("userId");

-- AddForeignKey
ALTER TABLE "Inrwallet" ADD CONSTRAINT "Inrwallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "USD" ADD CONSTRAINT "USD_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
