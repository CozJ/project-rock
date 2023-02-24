import { z } from 'zod';
import { procedure, router, mergeRouters } from '@/lib/trpc';
import { userRouter } from './userRouter';

export const appRouter = mergeRouters(userRouter)

export type AppRouter = typeof appRouter;