import { z } from "zod";
import { router, procedure } from "@/lib/trpc";
import prisma from "@/lib/prisma";

export const climbingRoutesRouter = router({
  createRoute: procedure
    .input(
      z.object({
        name: z.string(),
        description: z.string().nullable(),
        grade: z.string().nullable(),
        style: z.string().nullable(),
        location: z.string().nullable(),
        date_started: z.date().nullable(),
        date_finished: z.date().nullable(),
        attempts: z.number().nullable(),
        userEmail: z.string(),
      })
    )
    .mutation(async (req) => {
      const { input } = req;
      const result = await prisma.climbingRoutes.create({
        data: {
          name: input.name,
          description: input.description,
          grade: input.grade,
          style: input.style,
          location: input.location,
          date_started: input.date_started,
          date_finished: input.date_finished,
          attempts: input.attempts,
          user: {
            connect: {
              id: await getUserIdFromEmail(input.userEmail),
            },
          },
        },
      });
      return result;
    }),

  getUsersRoutes: procedure
    .input(
      z.object({
        userEmail: z.string().nullish(),
      })
    )
    .query(async (req) => {
      const { input } = req;
      if (input.userEmail === null || input.userEmail === undefined) {
        return null;
      }
      const result = await prisma.climbingRoutes.findMany({
        where: {
          userId: await getUserIdFromEmail(input.userEmail),
        },
      });
      return result;
    }),

  getRouteById: procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async (req) => {
      const { input } = req;
      const result = await prisma.climbingRoutes.findUnique({
        where: {
          id: input.id,
        },
      });
      return result;
    }),

  updateRoute: procedure.input(
    z.object({
      id: z.string(),
      name: z.string(),
      description: z.string().nullable(),
      grade: z.string().nullable(),
      style: z.string().nullable(),
      location: z.string().nullable(),
      date_started: z.date().nullable(),
      date_finished: z.date().nullable(),
      attempts: z.number().nullable(),
      userEmail: z.string(),
    })
    )
    .mutation(async (req) => {
        const { input } = req;
        const result = await prisma.climbingRoutes.update({
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
            user: {
                connect: {
                id: await getUserIdFromEmail(input.userEmail),
                },
            },
            },
        });
        return result;
    }),

  deleteRoute: procedure.input(
    z.object({
        id: z.string(),
    })
    )
    .mutation(async (req) => {
    const { input } = req;
    const result = await prisma.climbingRoutes.delete({
      where: {
        id: input.id,
      },
    });
    return result;
    }),
});

async function getUserIdFromEmail(
  userEmail: string
): Promise<string | undefined> {
  const user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });
  return user?.id;
}
