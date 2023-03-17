import { PromptLogin } from "@/components/auth/promptLogin";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { RouteCard } from "@/components/common/RouteCard";
import { useForm } from "react-hook-form";
import { InlineEditInput } from "@/components/common/InlineEditInput";

export default function ClimbingRoute() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data: session } = useSession();

  const route = api.climbingRoutes.getRoute.useQuery({ id: id });

  if (session) {
    if (route.isLoading) return <div>Loading...</div>;

    if (route.error) return <div>Error: {route.error.message}</div>;


    return (
      <>
        <div className="m-2 flex flex-col items-center p-2">
          <div className="container flex flex-col items-end justify-between p-2 text-slate-600">
            <div className="flex w-full flex-row justify-between">
              <h1 className="text-2xl font-bold">{route.data.name}</h1>
            </div>
            <div className="flex w-full flex-col justify-center border-t p-4 md:flex-row">
              <div className="m-4 flex w-full flex-col">
                <InlineEditInput fieldValue="Name" value={route.data.name} onChange={(value) => console.log(value)} required={true} />
              </div>
              <div className="m-4 flex w-full flex-col"></div>
            </div>
          </div>
        </div>
      </>
    );
  }
  return <PromptLogin />;
}
