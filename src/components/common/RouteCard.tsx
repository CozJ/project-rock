import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect } from "react";
import { RouteAttemptsCounter } from "./RouteAttemptsCounter";

type RouteCardProps = {
  id: string;
  name: string;
  style: string | null;
  grade: string | null;
  status: string | null;
  attempts: number;
};

export const RouteCard = (props: RouteCardProps) => {
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
            <RouteAttemptsCounter attempts={props.attempts} id={props.id} />
          </div>
        </div>
      </div>
    </Link>
  );
};
