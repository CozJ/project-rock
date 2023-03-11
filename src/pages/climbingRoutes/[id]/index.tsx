import { PromptLogin } from "@/components/auth/promptLogin";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function ClimbingRoute() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data: session } = useSession();

  const route = api.climbingRoutes.getRoute.useQuery({ id: id });

  if (session) {
    if (route.isLoading) return <div>Loading...</div>;

    if (route.error) return <div>Error: {route.error.message}</div>;

    return (
      <div className="m-4 p-4">
        <h1 className="text-xl font-bold">{route.data?.name}</h1>
        <p className="text-lg font-semibold">Description</p>
        <p>{route.data?.description}</p>
        <p className="text-lg font-semibold">Grade</p>
        <p>{route.data?.grade}</p>
        <p className="text-lg font-semibold">Style</p>
        <p>{route.data?.style}</p>
        <p className="text-lg font-semibold">Location</p>
        <p>{route.data?.location}</p>
        <p className="text-lg font-semibold">Date Added</p>
        <p>{route.data?.date_started?.toDateString()}</p>
        <p className="text-lg font-semibold">Date Finished</p>
        <p>{route.data?.date_finished?.toDateString()}</p>
        <p className="text-lg font-semibold">Attempts</p>
        <p>{route.data?.attempts}</p>
      </div>
    );
  }
  return <PromptLogin />;
}
