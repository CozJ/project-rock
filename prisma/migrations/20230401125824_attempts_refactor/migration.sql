/*
  Warnings:

  - You are about to drop the column `attempts` on the `ClimbingRoutes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ClimbingRoutes" DROP COLUMN "attempts";

-- AlterTable
ALTER TABLE "ClimbingRoutesNotes" ALTER COLUMN "note" SET DATA TYPE VARCHAR(1000);

-- CreateTable
CREATE TABLE "ClimbingRoutesAttempts" (
    "id" TEXT NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "section" VARCHAR(255),
    "date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "routeId" TEXT NOT NULL,

    CONSTRAINT "ClimbingRoutesAttempts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ClimbingRoutesAttempts" ADD CONSTRAINT "ClimbingRoutesAttempts_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "ClimbingRoutes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
