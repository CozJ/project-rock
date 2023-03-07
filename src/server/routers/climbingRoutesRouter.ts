import { z } from 'zod';
import { router, procedure } from '@/lib/trpc';
import prisma from '@/lib/prisma';

export const climbingRoutesRouter = router({
    addRoute: procedure.input(z.object({
        name: z.string(),
        description: z.string(),
        grade: z.string(),
        style: z.string(),
        location: z.string(),
        date_started: z.string(),
        date_finished: z.string(),
        attempts: z.number(),
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
                date_started: new Date(input.date_started),
                date_finished: new Date(input.date_finished),
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
