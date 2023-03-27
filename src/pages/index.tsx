import { useSession } from "next-auth/react";
import { api } from "@/utils/api";
import { PromptLogin } from "@/components/auth/promptLogin";
import Link from "next/link";
import { ClimbingRoutes } from "@prisma/client";
import { RouteCard } from "@/components/common/RouteCard";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

export default function Home() {
  const { data: session } = useSession();

  const queryEnabled = session ? true : false;

  const userRoutes = api.climbingRoutes.getRecentRoutes.useQuery(undefined, {
    enabled: queryEnabled,
  });

  if (session) {
    if (userRoutes.isLoading) return <div>Loading...</div>;

    if (userRoutes.error) return <div>Error: {userRoutes.error.message}</div>;

    console.log(userRoutes.data);

    return (
      <>
        <div className="m-2 flex flex-col items-center p-2">
          <div className="container flex flex-col items-end justify-between p-2 text-slate-600">
            <div className="flex w-full flex-row justify-between">
              <h1 className="text-2xl font-bold">Projects</h1>
              <Link href={"/"} className="text-lg">
                All Routes <ArrowCircleRightIcon />
              </Link>
            </div>
            <div className="flex max-h-96 w-full flex-row flex-wrap justify-start overflow-y-scroll border-t border-b sm:overflow-hidden">
              {userRoutes.data?.map((route: ClimbingRoutes) => (
                <div key={route.id} className="w-full p-2 sm:w-1/2 md:w-1/3">
                  <RouteCard
                    key={route.id}
                    id={route.id}
                    name={route.name}
                    style={route.style}
                    grade={route.grade}
                    status={route.status}
                    attempts={route.attempts}
                  />
                </div>
              ))}
            </div>
            <Link href={"/climbingRoutes/newRoute"}>
              <div className="my-5 max-h-fit max-w-fit rounded-md bg-slate-600 p-2 px-4 font-semibold text-slate-100">
                Add New Route
              </div>
            </Link>
            <div className="flex w-full flex-row justify-between">
              <h1 className="text-2xl font-bold">Stats</h1>
              <Link href={"/"} className="text-lg">
                All Stats <ArrowCircleRightIcon />
              </Link>
            </div>
            <div className="w-full border-t"></div>
          </div>
        </div>
      </>
    );
  }
  return <PromptLogin />;
}
