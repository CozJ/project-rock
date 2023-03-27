import { PromptLogin } from "@/components/auth/promptLogin";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { RouteCard } from "@/components/common/RouteCard";
import { useForm } from "react-hook-form";
import { InlineTextEdit } from "@/components/common/InlineTextEdit";
import { InlineTextAreaEdit } from "@/components/common/InlineTextAreaEdit";
import { InlineDateEdit } from "@/components/common/InlineDateEdit";
import { InlineUpdateGrade } from "@/components/common/InlineUpdateGrade";
import { InlineUpdateStyle } from "@/components/common/InlineUpdateStyle";
import { InlineUpdatStatus } from "@/components/common/InlineUpdateStatus";

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
          <div className="container flex flex-col justify-between text-slate-600">
            <div className="flex w-full flex-row items-center justify-between">
              <InlineTextEdit
                defaultStyle="text-2xl font-bold pr-2"
                formStyle="w-full h-full flex flex-row items-center"
                inputStyle="max-w-full w-full max-w-4xl text-2xl font-bold rounded-lg border mr-4 p-1"
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
            </div>
            <div className="flex w-full flex-col justify-center border-t p-4">
              <div className="min-w-min min-h-min">
                <InlineTextAreaEdit
                  defaultStyle="w-full h-52 overflow-y-auto bg-slate-100 rounded-lg p-2 mt-4 text-xl resize-none rounded-md pr-2"
                  inputStyle="w-full h-52 overflow-y-auto bg-slate-100 rounded-lg p-2 mt-4 text-xl resize-none rounded-md pr-2 resize-none"
                  value={route.data.description as string | undefined}
                  onChange={(value) =>
                    updateRoute
                      .mutateAsync({
                        id: route.data.id,
                        description: value,
                        userId: session.user.id,
                      } as FormValues)
                      .then(() => route.refetch())
                  }
                  required={false}
                />
              </div>
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
              <InlineDateEdit
                defaultStyle="text-xl pr-2"
                formStyle="w-full h-full"
                inputStyle="max-w-ful w-full max-w-4xl rounded-md border p-1"
                value={route.data.date_started as Date | undefined}
                onChange={(value) =>
                  updateRoute
                    .mutateAsync({
                      id: route.data.id,
                      date_started: value,
                      userId: session.user.id,
                    } as FormValues)
                    .then(() => route.refetch())
                }
                required={true}
              />
              <InlineDateEdit
                defaultStyle="text-xl pr-2"
                formStyle="w-full h-full"
                inputStyle="max-w-ful w-full max-w-4xl rounded-md border p-1"
                value={route.data.date_finished as Date | undefined}
                onChange={(value) =>
                  updateRoute
                    .mutateAsync({
                      id: route.data.id,
                      date_finished: value,
                      userId: session.user.id,
                    } as FormValues)
                    .then(() => route.refetch())
                }
                required={false}
              />
              <InlineUpdateGrade
                defaultStyle="text-xl pr-2"
                value={route.data.grade as string | undefined}
                onChange={(value) =>
                  updateRoute
                    .mutateAsync({
                      id: route.data.id,
                      grade: value,
                      userId: session.user.id,
                    } as FormValues)
                    .then(() => route.refetch())
                }
                required={true}
              />
              <InlineUpdateStyle
                defaultStyle="text-xl pr-2"
                value={route.data.style as string | undefined}
                onChange={(value) =>
                  updateRoute
                    .mutateAsync({
                      id: route.data.id,
                      style: value,
                      userId: session.user.id,
                    } as FormValues)
                    .then(() => route.refetch())
                }
                required={true}
              />
              <InlineUpdatStatus
                defaultStyle="text-xl pr-2"
                value={route.data.status as string | undefined}
                onChange={(value) =>
                  updateRoute
                    .mutateAsync({
                      id: route.data.id,
                      status: value,
                      userId: session.user.id,
                    } as FormValues)
                    .then(() => route.refetch())
                }
                required={true}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
  return <PromptLogin />;
}
