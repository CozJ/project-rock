import { PromptLogin } from "@/components/auth/promptLogin";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { RouteCard } from "@/components/common/RouteCard";
import { useForm } from "react-hook-form";
import { InlineTextEdit } from "@/components/common/InlineTextEdit";
import { InlineTextAreaEdit } from "@/components/common/InlineTextAreaEdit";

type FormValues = {
  id: string;
  name: string | undefined;
  description: string | undefined;
  grade: string | undefined;
  style: string | undefined;
  location: string | undefined;
  date_started: Date | undefined;
  date_finished: Date | undefined;
  status: string | undefined;
  attempts: number | undefined;
  userId: string;
};

export default function ClimbingRoute() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data: session } = useSession();

  const route = api.climbingRoutes.getRoute.useQuery({ id: id });
  const updateRoute = api.climbingRoutes.updateRoute.useMutation();

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
                <InlineTextEdit
                  defaultStyle="text-xl pr-2"
                  formStyle="w-full h-full"
                  inputStyle="max-w-ful w-full max-w-4xl rounded-md border p-1"
                  value={route.data.name}
                  onChange={(value) =>
                    updateRoute
                      .mutateAsync({
                        id: route.data.id,
                        name: value,
                        userId: session.user.id,
                      } as FormValues)
                      .then(() => route.refetch())
                  }
                  required={true}
                />
                <InlineTextEdit
                  defaultStyle="text-xl pr-2"
                  formStyle="w-full h-full"
                  inputStyle="max-w-ful w-full max-w-4xl rounded-md border p-1"
                  value={route.data.location as string | undefined}
                  onChange={(value) =>
                    updateRoute
                      .mutateAsync({
                        id: route.data.id,
                        location: value,
                        userId: session.user.id,
                      } as FormValues)
                      .then(() => route.refetch())
                  }
                  required={true}
                />
                <InlineTextAreaEdit
                  defaultStyle="h-52 w-full max-w-4xl resize-none rounded-md p-1"
                  inputStyle="h-52 w-full max-w-4xl resize-none rounded-md border p-1"
                  formStyle="w-full h-full border-none"
                  value={route.data.description as string | undefined}
                  onChange={(value) => console.log(value)}
                  required={true}
                />
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
