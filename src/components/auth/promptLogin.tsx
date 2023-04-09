import React from "react";
import { AuthButton } from "./AuthButton";

export const PromptLogin = () => {
  return (
    <>
      <div className="flex h-full w-full flex-row items-center justify-center text-2xl">
        <div className="m-4 flex h-96 w-full max-w-3xl flex-col rounded-lg border shadow-lg md:flex-row">
          <div className="h-1/4 w-full max-md:rounded-t-lg bg-gradient-to-b from-slate-800 via-slate-700 to-slate-600 md:h-full md:w-1/4 md:rounded-l-lg"></div>
          <div className="h-3/4 w-full p-4 md:h-full md:w-3/4">
            <div className="flex h-full flex-col justify-between">
              <div>
                <h1 className="text-4xl text-slate-800">
                  Welcome to Project-Rock
                </h1>
                <p className="text-slate-800">
                  Please login to continue to the site.
                </p>
              </div>
              <div className="flex justify-end">
                <AuthButton className="hover:underline text-slate-200 bg-slate-600 p-1 px-2 rounded-lg hover:bg-slate-800" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
