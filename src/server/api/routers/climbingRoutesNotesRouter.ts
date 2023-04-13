import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const climbingRoutesNotesRouter = createTRPCRouter({
  getNotes: protectedProcedure
    .input(
      z.object({
        routeId: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.climbingRoutesNotes.findMany({
        where: {
          routeId: input.routeId,
        },
        orderBy: {
          date: "desc",
        },
      });
    }),

  createNote: protectedProcedure
    .input(
      z.object({
        routeId: z.string(),
        note: z.string(),
        title: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.climbingRoutesNotes.create({
        data: {
          routeId: input.routeId,
          note: input.note,
          title: input.title,
        },
      });
    }),

  updateNote: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        note: z.string().optional(),
        title: z.string().optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.climbingRoutesNotes.update({
        where: {
          id: input.id,
        },
        data: {
          note: input.note || undefined,
          title: input.title || undefined,
        },
      });
    }),

  deleteNote: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.climbingRoutesNotes.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
