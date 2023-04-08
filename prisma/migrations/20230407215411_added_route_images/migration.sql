-- CreateTable
CREATE TABLE "ClimbingRoutesImages" (
    "id" TEXT NOT NULL,
    "uuid" VARCHAR(255) NOT NULL,
    "routeId" TEXT NOT NULL,

    CONSTRAINT "ClimbingRoutesImages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ClimbingRoutesImages" ADD CONSTRAINT "ClimbingRoutesImages_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "ClimbingRoutes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
