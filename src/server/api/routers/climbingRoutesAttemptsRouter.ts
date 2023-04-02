import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const climbingRoutesAttemptsRouter = createTRPCRouter({
  createAttempt: protectedProcedure
  .input(
    z.object({
      routeId: z.string(),
      type: z.string(),
    })
  )
  .mutation(({ ctx, input }) => {
    return ctx.prisma.climbingRoutesAttempts.create({
      data: {
        routeId: input.routeId,
        type: input.type,
      },
    });
  }),
});
