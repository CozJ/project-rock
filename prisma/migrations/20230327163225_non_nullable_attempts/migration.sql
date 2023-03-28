/*
  Warnings:

  - Made the column `attempts` on table `ClimbingRoutes` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ClimbingRoutes" ALTER COLUMN "attempts" SET NOT NULL;
