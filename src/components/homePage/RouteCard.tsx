import React from "react";

type RouteCardProps = {
  id: string;
  name: string;
  style: string | null;
  grade: string | null;
  status: string | null;
  attempts: number | null;
};

export const RouteCard = (props: RouteCardProps) => {
  return (
    <div className="m-1 flex max-w-xl flex-col rounded-lg border-2 p-1 shadow-lg">
      <h1 className="h-12 max-w-full break-words font-semibold">
        {props.name} - {props.grade}
      </h1>
      <div className="flex h-12 max-w-full flex-row justify-between">
        <div className="">
          <p className="">style: {props.style}</p>
          <p className="">status: {props.status}</p>
        </div>
        <div className="flex items-center justify-center">
          <div className="inline-flex">
            <button className="rounded-l bg-gray-300 py-2 px-4 font-bold text-gray-800 hover:bg-gray-400">
              -
            </button>
            <div className="bg-gray-300 py-2 px-4 font-bold">
              {props.attempts}
            </div>
            <button className="rounded-r bg-gray-300 py-2 px-4 font-bold text-gray-800 hover:bg-gray-400">
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
