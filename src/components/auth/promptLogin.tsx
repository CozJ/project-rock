import { SignInButton } from "./SignInButton";
import Image from "next/image";

export const PromptLogin = () => {
  return (
    <>
      <div className="flex w-full flex-col md:flex-row">
        <div className="h-1/3 max-w-full bg-slate-400 bg-[url('/login-page-hero.jpg')] bg-cover md:h-full md:w-1/3"></div>
        <div className="h-2/3 w-full md:h-full md:w-2/3 ">
          <div className="flex h-full flex-col items-center justify-center">
            <div className="text-slate-800">
              <h1 className="flex flex-row border-b pb-2 text-6xl">
                PROJECT-ROCK
              </h1>
              <h2 className="mt-8 text-2xl">
                The best way to track your climbing progress
              </h2>
              <p className="p-1 text-lg">Track your climbing progress</p>
              <p className="p-1 text-lg">Store information about your routes</p>
              <p className="p-1 text-lg">Analyse your progress</p>
              <div className="w-full flex justify-end">
                <SignInButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
