import { STATUS, STATUS_COLOUR, STATUS_DESCRIPTIONS } from "@/types/types";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { AddIcon } from "../svg/AddIcon";
import { RouteCard } from "./RouteCard";
import { ClimbingRoutes } from "@prisma/client";

export const ProjectBoard = () => {
  const { data: session } = useSession();

  const queryEnabled = session ? true : false;

  const userRoutes = api.climbingRoutes.getUserRoutes.useQuery(undefined, {
    enabled: queryEnabled,
  });

  if (userRoutes.isLoading) return <div>Loading...</div>;

  if (userRoutes.error) return <div>Error: {userRoutes.error.message}</div>;

  return (
    <div className="flex h-full w-full justify-center">
      <div className="flex h-[650px] max-w-min flex-grow flex-row overflow-x-scroll rounded-lg border px-1 shadow-lg">
        {Object.values(STATUS).map((status) => (
          <div className="m-2 h-modal w-72 flex-shrink-0 rounded-lg border bg-slate-100">
            <div className="flex h-14 w-full flex-col border-b p-1 font-semibold text-slate-600">
              <div className="flex w-full flex-row items-center">
                <span
                  className={`h-4 w-4 rounded-full ${STATUS_COLOUR[status]}`}
                />
                <h1 className="pl-2">{status}</h1>
              </div>
              <span className="text-sm ">{`${STATUS_DESCRIPTIONS[status]}`}</span>
            </div>
            <div className="h-[32rem] w-full overflow-y-scroll rounded-lg px-2">
              {userRoutes.data?.map((route) => {
                if (route.status === status) // filter should go here
                  return (
                    <RouteCard
                      key={route.id}
                      id={route.id}
                      name={route.name}
                      style={route.style}
                      grade={route.grade}
                    />
                  );
              })}
            </div>
            <div className="h-[2rem] rounded-b-lg border-t">
              <Link
                className="flex h-full flex-row items-center px-2"
                href={"/climbingRoutes/newRoute"}
              >
                <span>New Route</span>
                <AddIcon />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
