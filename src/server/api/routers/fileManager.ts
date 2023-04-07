import { z } from "zod";
import { getDownloadUrl, getSignedUrl } from "@/utils/s3";
import { uuid } from "uuidv4";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const fileManager = createTRPCRouter({
    getSignedUrl: protectedProcedure.input(
        z.object({
            routeId: z.string(),
        }),
    ).mutation(async ({ctx, input}) => {
        return await getSignedUrl(`${ctx.session.user.id}/${input.routeId}/${uuid()}`);
    }),

    getDownloadUrl: protectedProcedure.input(
        z.object({
            routeId: z.string(),
        }),
    ).mutation(async ({ctx, input}) => {
        return await getDownloadUrl(`${ctx.session.user.id}/${input.routeId}/`);
    }),

})