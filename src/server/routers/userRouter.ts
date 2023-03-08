import { z } from "zod";
import { router, procedure } from "@/lib/trpc";
import prisma from "@/lib/prisma";

export const userRouter = router({
  getUser: procedure.input(z.string()).query(async (req) => {
    const { input } = req;
    const result = await prisma.user.findUnique({
      where: {
        email: input,
      },
    });
    return result;
  }),
});
