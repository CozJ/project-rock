import { Avatar } from "flowbite-react";
import { Dropdown } from "flowbite-react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { SignInButton } from "./SignInButton";

export const ProfileComponent = () => {
  const { data: session } = useSession();

  if (session) {
    console.log(session.user.image);

    return (
      <Dropdown
        label={
          <Avatar
            alt="User settings"
            img={session.user.image as string}
            rounded={true}
          />
        }
        arrowIcon={false}
        inline={true}
      >
        <Dropdown.Header>
          <span className="block text-sm">{session.user.name}</span>
          <span className="block truncate text-sm font-medium">
            {session.user.email}
          </span>
        </Dropdown.Header>
        <Dropdown.Item onClick={() => signOut()}>Sign out</Dropdown.Item>
      </Dropdown>
    );
  }

  return <SignInButton />;
};
