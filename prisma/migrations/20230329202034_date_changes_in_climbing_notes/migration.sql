/*
  Warnings:

  - Made the column `date` on table `ClimbingRoutesNotes` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ClimbingRoutesNotes" ALTER COLUMN "date" SET NOT NULL,
ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP;
