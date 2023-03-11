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

  getRoute: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.climbingRoutes.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  createRoute: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string().nullable(),
        grade: z.string().nullable(),
        style: z.string().nullable(),
        location: z.string().nullable(),
        date_started: z.string().nullable(),
        date_finished: z.string().nullable(),
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
        grade: z.string().nullable(),
        style: z.string().nullable(),
        location: z.string().nullable(),
        date_started: z.string().nullable(),
        date_finished: z.string().nullable(),
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
