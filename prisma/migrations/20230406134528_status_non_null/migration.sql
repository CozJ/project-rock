/*
  Warnings:

  - Made the column `status` on table `ClimbingRoutes` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ClimbingRoutes" ALTER COLUMN "status" SET NOT NULL;
