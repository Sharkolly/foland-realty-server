/*
  Warnings:

  - A unique constraint covering the columns `[mongoDbID]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mongoDbID` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `mongoDbID` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_mongoDbID_key` ON `User`(`mongoDbID`);
