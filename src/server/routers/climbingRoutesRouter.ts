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
    }),
    ).mutation(async (req) => {
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
                        id: await getUserEmail(input.userEmail)
                    }
                }
            }
        })
        return result;
    })
})

async function getUserEmail(userEmail: string): Promise<any> {
    const user = await prisma.user.findUnique({
        where: {
            email: userEmail
        }
    })
    return user?.id;
}
