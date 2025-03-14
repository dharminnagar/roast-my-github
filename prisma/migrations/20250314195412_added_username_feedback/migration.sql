/*
  Warnings:

  - Added the required column `username` to the `Feedback` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Feedback" ADD COLUMN     "username" TEXT NOT NULL;
