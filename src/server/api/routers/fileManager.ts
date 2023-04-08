import { z } from "zod";
import { getDownloadUrl, getSignedUrl } from "@/utils/s3";
import { uuid } from "uuidv4";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const fileManager = createTRPCRouter({
  getSignedUrl: protectedProcedure
    .input(
      z.object({
        routeId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const data = {
        routeId: input.routeId,
        uuid: uuid(),
      };

      await ctx.prisma.climbingRoutesImages.create({ data });

      return await getSignedUrl(
        `${ctx.session.user.id}/${input.routeId}/${data.uuid}`
      );
    }),

  getDownloadUrl: protectedProcedure
    .input(
      z.object({
        routeId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const image = await ctx.prisma.climbingRoutesImages.findMany({
        where: {
          routeId: input.routeId,
        },
      });
      return await Promise.all(
        image.map(async (image) => {
          return await getDownloadUrl(
            `${ctx.session.user.id}/${input.routeId}/${image.uuid}`
          );
        })
      );
    }),
});
