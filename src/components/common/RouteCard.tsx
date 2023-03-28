import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect } from "react";

type RouteCardProps = {
  id: string;
  name: string;
  style: string | null;
  grade: string | null;
  status: string | null;
  attempts: number;
};

export const RouteCard = (props: RouteCardProps) => {
  const { data: session } = useSession();

  const updateRoute = api.climbingRoutes.setUserRouteAttempts.useMutation();
  const [attempts, setAttempts] = React.useState(props.attempts);

  useEffect(() => {
    if (session) {
        updateRoute.mutateAsync({
          id: props.id,
          attempts: attempts,
        });
      }
  }, [attempts]);

  return (
    <Link href={`climbingRoutes/${props.id}`}>
      <div className="h-32 w-full rounded-xl border border-slate-200 p-3 font-semibold text-slate-800 hover:shadow-xl">
        <div className="h-1/2 break-words text-lg">
          <h1>
            {props.name}
            <strong className="pl-1 font-bold">{props.grade}</strong>
          </h1>
        </div>
        <div className="flex h-1/2 items-end justify-center">
          <div className="w-1/2">
            <p>{props.style}</p>
            <p>{props.status}</p>
          </div>
          <div className="flex w-1/2 flex-row justify-end">
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
        </div>
      </div>
    </Link>
  );
};
