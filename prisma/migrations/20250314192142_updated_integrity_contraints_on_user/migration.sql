/*
  Warnings:

  - A unique constraint covering the columns `[username,roastLevel,roastLength]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_username_key";

-- CreateIndex
CREATE UNIQUE INDEX "User_username_roastLevel_roastLength_key" ON "User"("username", "roastLevel", "roastLength");
