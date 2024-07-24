/*
  Warnings:

  - You are about to drop the column `employeName` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `empolyeEmail` on the `Profile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,source]` on the table `WaterTrack` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `employeeEmail` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employeeName` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "WaterTrack_userId_key";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "employeName",
DROP COLUMN "empolyeEmail",
ADD COLUMN     "employeeEmail" TEXT NOT NULL,
ADD COLUMN     "employeeName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "WaterTrack" ADD COLUMN     "description" TEXT,
ALTER COLUMN "isActive" SET DEFAULT true;

-- CreateIndex
CREATE INDEX "Profile_userId_idx" ON "Profile"("userId");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "WaterTrack_userId_idx" ON "WaterTrack"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "WaterTrack_userId_source_key" ON "WaterTrack"("userId", "source");
