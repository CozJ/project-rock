import React from "react";
import { SignInButton } from "./SignInButton";

export const PromptLogin = () => {
  return (
    <>
      <div className="flex h-full w-full flex-row items-center justify-center text-2xl">
        <div className="m-4 flex h-96 w-full max-w-4xl flex-col rounded-lg border shadow-lg md:flex-row">
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
                <SignInButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
