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
        userId: ctx.session.user.id,
      },
    });
  }),

  getRecentRoutes: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.climbingRoutes.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: {
        date_started: "desc",
      },
      take: 6,
    });
  }),

  getRoute: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.climbingRoutes.findFirstOrThrow({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
      });
    }),

  createRoute: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string().nullable(),
        grade: z.string(),
        style: z.string(),
        location: z.string().nullable(),
        date_started: z.date(),
        date_finished: z.date().nullable(),
        status: z.string(),
        attempts: z.number().nullable(),
        userId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.climbingRoutes.create({
        data: {
          name: input.name,
          description: input.description,
          grade: input.grade,
          style: input.style,
          location: input.location,
          date_started: input.date_started,
          date_finished: input.date_finished,
          status: input.status,
          attempts: input.attempts,
          userId: input.userId,
        },
      });
    }),

  updateRoute: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        description: z.string().nullable(),
        grade: z.string(),
        style: z.string(),
        location: z.string().nullable(),
        date_started: z.string(),
        date_finished: z.string().nullable(),
        status: z.string(),
        attempts: z.number().nullable(),
        userId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.climbingRoutes.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          description: input.description,
          grade: input.grade,
          style: input.style,
          location: input.location,
          date_started: input.date_started,
          date_finished: input.date_finished,
          status: input.status,
          attempts: input.attempts,
          userId: input.userId,
        },
      });
    }),

  deleteRoute: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.climbingRoutes.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
