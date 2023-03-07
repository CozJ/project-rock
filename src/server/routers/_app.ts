import { z } from 'zod';
import { procedure, router, mergeRouters } from '@/lib/trpc';
import { userRouter } from './userRouter';
import { climbingRoutesRouter } from './climbingRoutesRouter';

export const appRouter = mergeRouters(userRouter, climbingRoutesRouter)

export type AppRouter = typeof appRouter;