import { promise, z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "../../../server/api/trpc";

export const climbingRoutesAttemptsRouter = createTRPCRouter({
  createAttempt: protectedProcedure
  .input(
    z.object({
      routeId: z.string().max(36),
      type: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {

    const exists = await ctx.prisma.climbingRoutes.findUnique({
      where: {
        id: input.routeId,
      },
    });

    if (!exists) {
      throw new Error("Route does not exist");
    }

    return await ctx.prisma.climbingRoutesAttempts.create({
      data: {
        routeId: input.routeId,
        type: input.type,
      },
    });
  }),
});
