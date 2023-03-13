import { useSession } from "next-auth/react";
import { api } from "@/utils/api";
import { PromptLogin } from "@/components/auth/promptLogin";
import Link from "next/link";
import { ClimbingRoutes } from "@prisma/client";
import { RouteCard } from "@/components/homePage/RouteCard";

export default function Home() {
  const { data: session } = useSession();

  const queryEnabled = session ? true : false;
  
  const userRoutes = api.climbingRoutes.getUserRoutes.useQuery(undefined, {enabled: queryEnabled});
  
  if (session) {
    
    if (userRoutes.isLoading) return <div>Loading...</div>;

    if (userRoutes.error) return <div>Error: {userRoutes.error.message}</div>;

    return (
      <>
        <div className="m-2 p-2">
          <h1 className="m-4 py-2 text-2xl font-bold">
            Welcome to Project-Rock, {session.user?.name}
          </h1>
              {userRoutes.data?.map((route: ClimbingRoutes) => (
                <RouteCard
                  key={route.id}
                  id={route.id}
                  name={route.name}
                  style={route.style}
                  grade={route.grade}
                  status={"Unfinished"}
                  attempts={route.attempts}
                />
              ))}
          <Link href={"/climbingRoutes/newRoute"}>
            <div className="m-4 my-8 max-h-fit max-w-fit rounded-md bg-blue-400 p-2 px-4 font-semibold">
              Add New Route
            </div>
          </Link>
        </div>
      </>
    );
  }
  return (<PromptLogin />);
}
