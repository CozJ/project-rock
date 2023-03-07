import { z } from 'zod';
import { router, procedure } from '@/lib/trpc';
import prisma from '@/lib/prisma';

export const climbingRoutesRouter = router({
    addRoute: procedure.input(z.object({
        name: z.string(),
        description: z.string().nullable(),
        grade: z.string().nullable(),
        style: z.string().nullable(),
        location: z.string().nullable(),
        date_started: z.date().nullable(),
        date_finished: z.date().nullable(),
        attempts: z.number().nullable(),
        userEmail: z.string()
    })).mutation(async (req) => {
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
                        id: await getUserIdFromEmail(input.userEmail)
                    }
                }
            }
        })
        return result;
    }),

    getUsersRoutes: procedure.input(z.object({
        userEmail: z.string().nullish()
    })).query(async (req) => {
        const { input } = req;
        if (input.userEmail === null || input.userEmail === undefined) {
            return null;
        }
        const result = await prisma.climbingRoutes.findMany({
            where: {
                userId: await getUserIdFromEmail(input.userEmail)
            }
        })
        return result;
    }),
})

async function getUserIdFromEmail(userEmail: string): Promise<string | undefined> {
    const user = await prisma.user.findUnique({
        where: {
            email: userEmail
        }
    })
    return user?.id;
}
