import { User } from '@prisma/client'
import { NextApiResponse, NextApiRequest } from 'next'
import { getServerSession } from 'next-auth';
import { AuthOptions } from '../auth/[...nextauth]';
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
    return result as User;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<User | null | string>
) {
    const session = await getServerSession(req, res, AuthOptions);

    if (session) {
        console.log(req.query)
        return res.status(200).json(await getUser(req.query.id as string));
    } else {
        return res.status(401).json("You must be signed in to view the protected content on this page.");
    }

}