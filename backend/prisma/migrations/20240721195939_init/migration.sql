/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `WaterTrack` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `WaterTrack` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WaterTrack" ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "WaterTrack_userId_key" ON "WaterTrack"("userId");

-- AddForeignKey
ALTER TABLE "WaterTrack" ADD CONSTRAINT "WaterTrack_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
