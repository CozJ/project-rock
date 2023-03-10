import { useSession, signIn, signOut } from "next-auth/react";

// props
type AuthButtonProps = {
  className?: string;
}

export const AuthButton = (props: AuthButtonProps) => {
  const { data: session } = useSession();
  if (session)
    return (
      <>
        <button className={`${props.className}`} onClick={() => signOut()}>
          Sign Out
        </button>
      </>
    );
  return (
    <>
      <button className={`${props.className}`} onClick={() => signIn()}>
        Sign In
      </button>
    </>
  );
};
