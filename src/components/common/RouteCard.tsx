import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

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

  const updateRoute = api.climbingRoutes.updateRoute.useMutation();
  const [attempts, setAttempts] = React.useState(props.attempts);

  const removeAttempt = () => {
    if (session) {
      if (props.attempts > 0) {
        updateRoute.mutateAsync({
          id: props.id,
          attempts: props.attempts - 1,
          userId: session.user.id,
        });
        setAttempts(attempts - 1);
      }
    }
  };

  const addAttempt = () => {
    if (session) {
      updateRoute.mutateAsync({
        id: props.id,
        attempts: props.attempts + 1,
        userId: session.user.id,
      });
      setAttempts(attempts + 1);
    }
  };

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
              className="w-8 rounded-l bg-slate-600 p-2 text-slate-100 hover:bg-slate-800"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                removeAttempt();
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
              className="w-8 rounded-r bg-slate-600 p-2 text-slate-100 hover:bg-slate-800"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                addAttempt();
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
