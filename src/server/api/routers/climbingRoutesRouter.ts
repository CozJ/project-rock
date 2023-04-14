import { z } from "zod";
import { deleteFile } from "../../../utils/s3";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "../../../server/api/trpc";

export const climbingRoutesRouter = createTRPCRouter({
  getUserRoutes: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.climbingRoutes.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      include: {
        ClimbingRoutesAttempts: true,
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
      return ctx.prisma.climbingRoutes.findFirstOrThrow({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
        include: {
          ClimbingRoutesAttempts: true,
        },
      });
    }),

  createRoute: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string().optional(),
        grade: z.string(),
        style: z.string(),
        location: z.string().optional(),
        date_started: z.date(),
        date_finished: z.date().optional(),
        status: z.string(),
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
          userId: ctx.session.user.id,
        },
      });
    }),

  updateRoute: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        description: z.string().optional(),
        grade: z.string().optional(),
        style: z.string().optional(),
        location: z.string().optional(),
        date_started: z.date().optional(),
        date_finished: z.date().optional(),
        status: z.string().optional(),
        attempts: z.number().optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.climbingRoutes.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name || undefined,
          description: input.description || undefined,
          grade: input.grade || undefined,
          style: input.style || undefined,
          location: input.location || undefined,
          date_started: input.date_started || undefined,
          date_finished: input.date_finished || undefined,
          status: input.status || undefined,
          userId: ctx.session.user.id,
        },
      });
    }),

  deleteRoute: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const images = ctx.prisma.climbingRoutesImages.findMany({
        where: {
          routeId: input.id,
        },
      });

      (await images).map(async (image) => {
        await deleteFile(`${ctx.session.user.id}/${input.id}/${image.uuid}`);
      });

      return await ctx.prisma.climbingRoutes.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
