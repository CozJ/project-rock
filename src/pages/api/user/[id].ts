import { User } from '@prisma/client'
import { NextApiResponse, NextApiRequest } from 'next'
import prisma from '../../../lib/prisma'

// find a specific user in the database where the id matches the id in the url
async function getUser(id: string) {
    prisma.$connect();
    const result = await prisma.user.findUnique({
        where: {
            id: String(id),
        },
    });
    prisma.$disconnect();
    return result;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<User | null>
) {
    console.log(req.query)
    return res.status(200).json(await getUser(req.query.id as string));
}