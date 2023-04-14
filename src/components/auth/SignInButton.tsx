import { useSession, signIn, signOut } from "next-auth/react";

export const SignInButton = () => {
    return (
      <>
        <button id="sign-in" className="hover:underline text-slate-200 bg-slate-600 p-1 text-lg px-2 rounded-lg hover:bg-slate-800" onClick={() => signIn()}>
          Sign In
        </button>
      </>
    );
};
