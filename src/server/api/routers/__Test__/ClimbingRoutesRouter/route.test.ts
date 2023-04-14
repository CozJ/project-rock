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

    expect(
      async () => await caller.climbingRoutes.getUserRoutes()
    ).rejects.toThrow();
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

describe("getRoute", () => {
  test("with session", async () => {
    const mockSession: Session = {
      expires: new Date().toISOString(),
      user: { id: "1", name: "test", email: "test@gmail.com" },
    };

    const prismaMock = mockDeep<PrismaClient>();

    const mockClimbingRoutes: ClimbingRoutes = {
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
    };

    prismaMock.climbingRoutes.findFirstOrThrow.mockResolvedValue(
      mockClimbingRoutes
    );

    const caller = appRouter.createCaller({
      session: mockSession,
      prisma: prismaMock,
    });

    const result = await caller.climbingRoutes.getRoute({ id: "1" });

    expect(
      async () => await caller.climbingRoutes.getRoute({ id: "1" })
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
      async () => await caller.climbingRoutes.getRoute({ id: "1" })
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

    expect(
      async () => await caller.climbingRoutes.getRoute({ id: "1" })
    ).rejects.toThrow();
  });

  test("no route", async () => {
    const mockSession: Session = {
      expires: new Date().toISOString(),
      user: { id: "1", name: "test", email: "test@gmail.com" },
    };

    const prismaMock = mockDeep<PrismaClient>();

    const caller = appRouter.createCaller({
      session: mockSession,
      prisma: prismaMock,
    });

    expect(
      async () => await caller.climbingRoutes.getRoute({ id: "1" })
    ).rejects.toThrow();
  });
});

describe("createRoute", () => {
  test("with session", async () => {
    const mockSession: Session = {
      expires: new Date().toISOString(),
      user: { id: "1", name: "test", email: "test@gmail.com" },
    };

    const prismaMock = mockDeep<PrismaClient>();

    const mockClimbingRoutes: ClimbingRoutes = {
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
    };

    prismaMock.climbingRoutes.create.mockResolvedValue(mockClimbingRoutes);

    const caller = appRouter.createCaller({
      session: mockSession,
      prisma: prismaMock,
    });

    expect(
      async () =>
        await caller.climbingRoutes.createRoute({
          name: "test",
          description: "test",
          grade: "5.10a",
          style: "Sport",
          location: "test",
          date_started: new Date(),
          date_finished: new Date(),
          status: "Completed",
        })
    ).not.toThrow();
  });

  test("no session", async () => {
    const prismaMock = mockDeep<PrismaClient>();

    const caller = appRouter.createCaller({
      session: null,
      prisma: prismaMock,
    });

    expect(
      async () =>
        await caller.climbingRoutes.createRoute({
          name: "test",
          description: "test",
          grade: "5.10a",
          style: "Sport",
          location: "test",
          date_started: new Date(),
          date_finished: new Date(),
          status: "Completed",
        })
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

    expect(
      async () =>
        await caller.climbingRoutes.createRoute({
          name: "test",
          description: "test",
          grade: "5.10a",
          style: "Sport",
          location: "test",
          date_started: new Date(),
          date_finished: new Date(),
          status: "Completed",
        })
    ).rejects.toThrow();
  });

  test("input with really long data", async () => {
    const mockSession: Session = {
      expires: new Date().toISOString(),
      user: { id: "1", name: "test", email: "test@gmail.com" },
    };

    const prismaMock = mockDeep<PrismaClient>();

    const caller = appRouter.createCaller({
      session: mockSession,
      prisma: prismaMock,
    });

    expect(
      async () =>
        await caller.climbingRoutes.createRoute({
          name: "test".repeat(100),
          description: "test",
          grade: "5.10a",
          style: "Sport",
          location: "test",
          date_started: new Date(),
          date_finished: new Date(),
          status: "Completed",
        })
    ).rejects.toThrow();
  });

  test("input with invalid data", async () => {
    const mockSession: Session = {
      expires: new Date().toISOString(),
      user: { id: "1", name: "test", email: "test@gmail.com" },
    };

    const prismaMock = mockDeep<PrismaClient>();

    const caller = appRouter.createCaller({
      session: mockSession,
      prisma: prismaMock,
    });

    expect(
      async () =>
        await caller.climbingRoutes.createRoute({
          name: undefined,
          description: "test",
          grade: "5.10a",
          style: "Sport",
          location: "test",
          date_started: new Date(),
          date_finished: new Date(),
          status: "Completed",
        } as any) // casting as any to get around the type checking for trpc call
    ).rejects.toThrow();
  });
});

describe("updateRoute", () => {
  test("with session", async () => {
    const mockSession: Session = {
      expires: new Date().toISOString(),
      user: { id: "1", name: "test", email: "test@gmail.com" },
    };

    const prismaMock = mockDeep<PrismaClient>();

    const mockClimbingRoutes: ClimbingRoutes = {
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
    };

    prismaMock.climbingRoutes.update.mockResolvedValue(mockClimbingRoutes);

    const caller = appRouter.createCaller({
      session: mockSession,
      prisma: prismaMock,
    });

    expect(
      async () =>
        await caller.climbingRoutes.updateRoute({
          id: "1",
          name: "test",
          description: "test",
          grade: "5.10a",
          style: "Sport",
          location: "test",
          date_started: new Date(),
          date_finished: new Date(),
          status: "Completed",
        })
    ).not.toThrow();
  });

  test("no session", async () => {
    const prismaMock = mockDeep<PrismaClient>();

    const caller = appRouter.createCaller({
      session: null,
      prisma: prismaMock,
    });

    expect(
      async () =>
        await caller.climbingRoutes.updateRoute({
          id: "1",
          name: "test",
          description: "test",
          grade: "5.10a",
          style: "Sport",
          location: "test",
          date_started: new Date(),
          date_finished: new Date(),
          status: "Completed",
        })
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

    expect(
      async () =>
        await caller.climbingRoutes.updateRoute({
          id: "1",
          name: "test",
          description: "test",
          grade: "5.10a",
          style: "Sport",
          location: "test",
          date_started: new Date(),
          date_finished: new Date(),
          status: "Completed",
        })
    ).rejects.toThrow();
  });

  test("input with really long data", async () => {
    const mockSession: Session = {
      expires: new Date().toISOString(),
      user: { id: "1", name: "test", email: "test@gmail.com" },
    };

    const prismaMock = mockDeep<PrismaClient>();

    const caller = appRouter.createCaller({
      session: mockSession,
      prisma: prismaMock,
    });

    expect(
      async () =>
        await caller.climbingRoutes.updateRoute({
          id: "1",
          name: "test".repeat(100),
          description: "test",
          grade: "5.10a",
          style: "Sport",
          location: "test",
          date_started: new Date(),
          date_finished: new Date(),
          status: "Completed",
        })
    ).rejects.toThrow();
  });

  test("input with invalid data", async () => {
    const mockSession: Session = {
      expires: new Date().toISOString(),
      user: { id: "1", name: "test", email: "test@gmail.com" },
    };

    const prismaMock = mockDeep<PrismaClient>();

    const caller = appRouter.createCaller({
      session: mockSession,
      prisma: prismaMock,
    });

    expect(
      async () =>
        await caller.climbingRoutes.updateRoute({
          id: "1",
          name: undefined,
          description: "test",
          grade: "5.10a",
          style: "Sport",
          location: "test",
          date_started: new Date(),
          date_finished: new Date(),
          status: "Completed",
        } as any) // casting as any to get around the type checking for trpc call
    ).rejects.toThrow();
  });
});

describe("deleteRoute", () => {
  test("with session", async () => {
    const mockSession: Session = {
      expires: new Date().toISOString(),
      user: { id: "1", name: "test", email: "test@gmail.com" },
    };

    const prismaMock = mockDeep<PrismaClient>();

    const mockClimbingRoutes: ClimbingRoutes = {
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
    };

    prismaMock.climbingRoutes.delete.mockResolvedValue(mockClimbingRoutes);

    const caller = appRouter.createCaller({
      session: mockSession,
      prisma: prismaMock,
    });

    expect(
      async () =>
        await caller.climbingRoutes.deleteRoute({
          id: "1",
        })
    ).not.toThrow();
  });

  test("no session", async () => {
    const prismaMock = mockDeep<PrismaClient>();

    const caller = appRouter.createCaller({
      session: null,
      prisma: prismaMock,
    });

    expect(
      async () =>
        await caller.climbingRoutes.deleteRoute({
          id: "1",
        })
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

    expect(
      async () =>
        await caller.climbingRoutes.deleteRoute({
          id: "1",
        })
    ).rejects.toThrow();
  });

  test("input with really long data", async () => {
    const mockSession: Session = {
      expires: new Date().toISOString(),
      user: { id: "1", name: "test", email: "test@gmail.com" },
    };

    const prismaMock = mockDeep<PrismaClient>();

    const caller = appRouter.createCaller({
      session: mockSession,
      prisma: prismaMock,
    });

    expect(
      async () =>
        await caller.climbingRoutes.deleteRoute({
          id: "1".repeat(100),
        })
    ).rejects.toThrow();
  });

  test("input with invalid data", async () => {
    const mockSession: Session = {
      expires: new Date().toISOString(),
      user: { id: "1", name: "test", email: "test@gmail.com" },
    };

    const prismaMock = mockDeep<PrismaClient>();

    const caller = appRouter.createCaller({
      session: mockSession,
      prisma: prismaMock,
    });

    expect(
      async () =>
        await caller.climbingRoutes.deleteRoute({
          id: undefined,
        } as any) // casting as any to get around the type checking for trpc call
    ).rejects.toThrow();
  });
});
