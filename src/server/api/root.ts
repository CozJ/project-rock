import { createTRPCRouter } from "../../server/api/trpc";
import { climbingRoutesRouter } from "../../server/api/routers/climbingRoutesRouter";
import { climbingRoutesNotesRouter } from "../../server/api/routers/climbingRoutesNotesRouter";
import { climbingRoutesAttemptsRouter } from "./routers/climbingRoutesAttemptsRouter";
import { userStatisticsRouter } from "./routers/userStatisticsRouter";
import { fileManagerRouter } from "./routers/fileManagerRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  climbingRoutes: climbingRoutesRouter,
  climbingRoutesNotes: climbingRoutesNotesRouter,
  climbingRoutesAttempts: climbingRoutesAttemptsRouter,
  userStatistics: userStatisticsRouter,
  fileManager: fileManagerRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
