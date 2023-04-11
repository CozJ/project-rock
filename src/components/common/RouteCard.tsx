import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect } from "react";
import { RouteAttemptsCounterModal } from "./RouteAttemptsCounterModal";

type RouteCardProps = {
  id: string;
  name: string;
  style: string | null;
  grade: string | null;
};

export const RouteCard = (props: RouteCardProps) => {
  return (
    <Link href={`climbingRoutes/${props.id}`}>
        <div className="flex h-auto w-64 flex-col hover:shadow-lg rounded-lg border my-2 px-2 py-1 text-slate-600 bg-slate-300 hover:text-slate-700">
          <span>{}</span>
          <span className="text-sm">{`${props.style} - ${props.grade}`}</span>
          <div className="flex w-full flex-row items-center">
            <h1 className="text-sm font-semibold">{props.name}</h1>
          </div>
        </div>
    </Link>
  );
};
