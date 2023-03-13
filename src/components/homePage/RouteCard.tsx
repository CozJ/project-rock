import React from "react";

type RouteCardProps = {
  id: string;
  name: string;
  style: string;
  grade: string;
  status: string;
  attempts: number;
};

//props: RouteCardProps

export const RouteCard = () => {
  return (
    <div className="flex max-h-fit max-w-xl flex-row rounded-xl border-2 px-4 py-2 shadow-md hover:shadow-xl">
      <div className="flex w-4/5 flex-col">
        <h1 className="font-bold">
          Lorem ipsum dolor sit amet consectetur adipisicing elit
        </h1>
        <div className="flex flex-row justify-around">
          <p>style: Sport</p>
          <p>grade: 6b+</p>
          <p>status: Unfinished</p>
        </div>
      </div>
      <div className="flex w-1/5 items-center justify-center">
        <button className="rounded-md border px-2 py-1">-</button>
        <p className="px-2 py-1 font-bold">6</p>
        <button className="rounded-md border px-2 py-1">+</button>
      </div>
    </div>
  );
};
