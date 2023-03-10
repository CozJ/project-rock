import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const climbingRoutesRouter = createTRPCRouter({

  getUserRoutes: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.climbingRoutes.findMany({
      where: {
        userId: ctx.session.user.id
      },
    });
  }),

  getRoute: protectedProcedure.input(z.object({
    id: z.string(),
  }))
  .query(({ ctx, input }) => {
    return ctx.prisma.climbingRoutes.findUnique({
      where: {
        id: input.id,
      },
    });
  }),
});