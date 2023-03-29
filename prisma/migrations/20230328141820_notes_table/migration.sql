-- CreateTable
CREATE TABLE "ClimbingRoutesNotes" (
    "id" TEXT NOT NULL,
    "note" VARCHAR(255) NOT NULL,
    "date" DATE,
    "routeId" TEXT NOT NULL,

    CONSTRAINT "ClimbingRoutesNotes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ClimbingRoutesNotes" ADD CONSTRAINT "ClimbingRoutesNotes_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "ClimbingRoutes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
