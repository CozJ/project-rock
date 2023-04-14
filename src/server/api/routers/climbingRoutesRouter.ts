import { z } from "zod";
import { deleteFile } from "../../../utils/s3";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "../../../server/api/trpc";
import { TRPCError } from "@trpc/server";

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
        id: z.string().max(36).nonempty(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.climbingRoutes
        .findFirstOrThrow({
          where: {
            id: input.id,
            userId: ctx.session.user.id,
          },
          include: {
            ClimbingRoutesAttempts: true,
          },
        })
        .catch(() => {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Route not found",
          });
        });
    }),

  createRoute: protectedProcedure
    .input(
      z.object({
        name: z.string().max(255),
        description: z.string().optional(),
        grade: z.string().max(16),
        style: z.string().max(24),
        location: z.string().optional(),
        date_started: z.date(),
        date_finished: z.date().optional(),
        status: z.string().max(16),
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
        id: z.string().max(36).nonempty(),
        name: z.string().max(255).optional(),
        description: z.string().optional(),
        grade: z.string().max(16).optional(),
        style: z.string().max(24).optional(),
        location: z.string().optional(),
        date_started: z.date().optional(),
        date_finished: z.date().optional(),
        status: z.string().max(16).optional(),
        attempts: z.number().optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.climbingRoutes
        .update({
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
        })
        .catch(() => {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Route not found",
          });
        });
    }),

  deleteRoute: protectedProcedure
    .input(
      z.object({
        id: z.string().max(36).nonempty(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const images = ctx.prisma.climbingRoutesImages.findMany({
        where: {
          routeId: input.id,
        },
      });

      if (images) {
        (await images).map(async (image) => {
          await deleteFile(`${ctx.session.user.id}/${input.id}/${image.uuid}`);
        });
      }

      return await ctx.prisma.climbingRoutes.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
