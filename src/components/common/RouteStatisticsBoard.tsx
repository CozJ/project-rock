import { api, RouterOutputs } from "@/utils/api";
import { useSession } from "next-auth/react";
import { UserStatusDistributionBarChart } from "../Graphs/UserStatusDistributionBarChart";
import { UserAttemptsScatterChart } from "../Graphs/UserAttemptsScatterChart";
import { ClimbingRoutes, ClimbingRoutesAttempts } from "@prisma/client";
import { AttemptsDistributionBarChart } from "../Graphs/AttemptsDistributionBarChart";
import { AttemptsDateTypeScatterChart } from "../Graphs/AttemptsDateTypeScatterChart";

type RouteStatisticsBoardProps = {
  routeId: string;
};

export const RouteStatisticsBoard = (
  props: RouteStatisticsBoardProps
) => {
  const { data: session } = useSession();

  const queryEnabled = session ? true : false;

  const route = api.climbingRoutes.getRoute.useQuery({id: props.routeId}, {
    enabled: queryEnabled,
  });

  if (route.isLoading) return <div>Loading...</div>;

  if (route.error) return <div>Error: {route.error.message}</div>;

  return (
    <div className="flex h-[650px] flex-col items-center justify-center">
      <div className="h-1/2 w-full">
        <AttemptsDistributionBarChart attempts={route.data.ClimbingRoutesAttempts}  />
      </div>
      <div className="h-1/2 w-full">
        <AttemptsDateTypeScatterChart attempts={route.data.ClimbingRoutesAttempts}  />
      </div>
    </div>
  );
};
