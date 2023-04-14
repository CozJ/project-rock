import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "../../../server/api/trpc";

export const userStatisticsRouter = createTRPCRouter({
  getRouteAttempts: protectedProcedure
    .input(
      z.object({
        routeId: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.climbingRoutesAttempts.groupBy({
        by: ["type"],
        where: {
          routeId: input.routeId,
        },
        _count: true
      });
    }),

});
