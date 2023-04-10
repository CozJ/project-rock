import { api, RouterOutputs } from "@/utils/api";
import { useSession } from "next-auth/react";
import { UserStatusDistributionBarChart } from "../Graphs/UserStatusDistributionBarChart";
import { UserAttemptsScatterChart } from "../Graphs/UserAttemptsScatterChart";
import { ClimbingRoutes, ClimbingRoutesAttempts } from "@prisma/client";

export const StatisticsBoard = () => {
  const { data: session } = useSession();

  const queryEnabled = session ? true : false;

  const userRoutes = api.climbingRoutes.getUserRoutes.useQuery(undefined, {
    enabled: queryEnabled,
  });

  if (userRoutes.isLoading) return <div>Loading...</div>;

  if (userRoutes.error) return <div>Error: {userRoutes.error.message}</div>;

  const getAttemptsFromRoutes = (routes: typeof userRoutes.data): ClimbingRoutesAttempts[] => {
    const attempts: ClimbingRoutesAttempts[] = [];
    routes.forEach((route) => {
        attempts.push(...route.ClimbingRoutesAttempts);
    });
    return attempts;
  };

  console.log(getAttemptsFromRoutes(userRoutes.data));

  return (
    <div className="flex h-[650px] w-full flex-col items-center justify-center">
      <div className="h-1/2 w-full">
        <UserStatusDistributionBarChart routes={userRoutes.data} />
      </div>
      <div className="h-1/2 w-full">
        <UserAttemptsScatterChart attempts={getAttemptsFromRoutes(userRoutes.data)} />
      </div>
    </div>
  );
};
