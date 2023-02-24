import { User } from '@prisma/client'
import { NextApiResponse, NextApiRequest } from 'next'
import prisma from '../../../lib/prisma'

// find all users in the database and return them
async function getUsers() {
  prisma.$connect();
  const result = await prisma.user.findMany();
  prisma.$disconnect();
  return result;
}

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<User[]>
) {
  return res.status(200).json(await getUsers());
}