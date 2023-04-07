import { z } from "zod";
import { getDownloadUrl, getSignedUrl } from "@/utils/s3";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const fileManager = createTRPCRouter({
    getSignedUrl: protectedProcedure.input(
        z.object({
            key: z.string(),
        }),
    ).query(async ({ctx, input}) => {
        return await getSignedUrl(input.key);
    })
})