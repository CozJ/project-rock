import { test, expect } from "@jest/globals";
import { appRouter } from "../../../root";
import { mockDeep } from "jest-mock-extended";
import { ClimbingRoutes, PrismaClient } from "@prisma/client";
import { Session } from "next-auth";

describe("getUserRoutes", () => {
  test("with session", async () => {
    const mockSession: Session = {
      expires: new Date().toISOString(),
      user: { id: "1", name: "test", email: "test@gmail.com" },
    };

    const prismaMock = mockDeep<PrismaClient>();

    const mockClimbingRoutes: ClimbingRoutes[] = [
      {
        id: "1",
        name: "test",
        description: "test",
        grade: "5.10a",
        style: "Sport",
        location: "test",
        date_started: null,
        date_finished: null,
        status: "Completed",
        userId: "1",
      },
    ];

    prismaMock.climbingRoutes.findMany.mockResolvedValue(mockClimbingRoutes);

    const caller = appRouter.createCaller({
      session: mockSession,
      prisma: prismaMock,
    });

    const result = await caller.climbingRoutes.getUserRoutes();

    expect(
      async () => await caller.climbingRoutes.getUserRoutes()
    ).not.toThrow();
    expect(result).toEqual(mockClimbingRoutes);
  });

  test("no session", async () => {
    const prismaMock = mockDeep<PrismaClient>();

    const caller = appRouter.createCaller({
      session: null,
      prisma: prismaMock,
    });

    expect(
      async () => await caller.climbingRoutes.getUserRoutes()
    ).rejects.toThrow();
  });

  test("no user id", async () => {
    const mockSession: Session = {
      expires: new Date().toISOString(),
      user: { id: "", name: "test", email: "" },
    };

    const prismaMock = mockDeep<PrismaClient>();

    const caller = appRouter.createCaller({
      session: mockSession,
      prisma: prismaMock,
    });


    console.log(await caller.climbingRoutes.getUserRoutes());
  });

  test("no routes", async () => {
    const mockSession: Session = {
      expires: new Date().toISOString(),
      user: { id: "1", name: "test", email: "test@gmail.com" },
    };

    const prismaMock = mockDeep<PrismaClient>();

    const mockClimbingRoutes: ClimbingRoutes[] = [];

    prismaMock.climbingRoutes.findMany.mockResolvedValue(mockClimbingRoutes);

    const caller = appRouter.createCaller({
      session: mockSession,
      prisma: prismaMock,
    });

    const result = await caller.climbingRoutes.getUserRoutes();

    expect(
      async () => await caller.climbingRoutes.getUserRoutes()
    ).not.toThrow();
    expect(result).toEqual(mockClimbingRoutes);
  });
});
