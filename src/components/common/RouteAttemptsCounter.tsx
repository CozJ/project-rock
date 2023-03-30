import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type RouteAttemptsCounterProps = {
  attempts: number;
  id: string;
};

export const RouteAttemptsCounter = (props: RouteAttemptsCounterProps) => {
  const { data: session } = useSession();

  const updateRoute = api.climbingRoutes.setUserRouteAttempts.useMutation();

  const [attempts, setAttempts] = useState(props.attempts);

  useEffect(() => {
    if (session) {
      updateRoute.mutateAsync({
        id: props.id,
        attempts: attempts,
      });
    }
  }, [attempts]);

  return (
    <>
      <div className="flex flex-row">
        <button
          className="w-8 rounded-l-lg bg-slate-600 p-2 text-slate-100 hover:bg-slate-800"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            if (attempts > 0) setAttempts(attempts - 1);
          }}
        >
          -
        </button>
        <div
          className="flex w-12 items-center justify-center bg-slate-600 p-2 text-slate-100"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          {attempts}
        </div>
        <button
          className="w-8 rounded-r-lg bg-slate-600 p-2 text-slate-100 hover:bg-slate-800"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setAttempts(attempts + 1);
          }}
        >
          +
        </button>
      </div>
    </>
  );
};
