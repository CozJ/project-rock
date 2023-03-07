-- CreateTable
CREATE TABLE "ClimbingRoutes" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "grade" VARCHAR(16) NOT NULL,
    "style" VARCHAR(24) NOT NULL,
    "location" TEXT NOT NULL,
    "date_started" DATE NOT NULL,
    "date_finished" DATE NOT NULL,
    "attempts" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ClimbingRoutes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ClimbingRoutes" ADD CONSTRAINT "ClimbingRoutes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
