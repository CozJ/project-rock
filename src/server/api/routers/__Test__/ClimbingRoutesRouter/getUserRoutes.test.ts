import {test, expect} from "@jest/globals";
import { appRouter } from "../../../root"
import { mockDeep } from "jest-mock-extended";
import { PrismaClient } from "@prisma/client";

test("getUserRoutes", async () => {

    const prismaMock = mockDeep<PrismaClient>();

    const caller = appRouter.createCaller({session: null, prisma: prismaMock});

    expect(async () => 
        await caller.climbingRoutes.getUserRoutes()
    ).rejects.toThrow();
});