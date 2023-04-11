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
import { RouteNotes } from "@/components/common/RouteNotes/RouteNotes";
import { RouteAttemptsCounterModal } from "@/components/common/RouteAttemptsCounterModal";
import { AttemptsDistributionBarChart } from "@/components/Graphs/AttemptsDistributionBarChart";
import { AttemptsDateTypeScatterChart } from "@/components/Graphs/AttemptsDateTypeScatterChart";
import { FileUploader } from "@/components/files/FileUploader";
import { RouteFileTray } from "@/components/files/RouteFileTray";

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

  const route = api.climbingRoutes.getRoute.useQuery(
    { id: id },
    { enabled: !!id }
  );
  const updateRoute = api.climbingRoutes.updateRoute.useMutation();

  if (session) {
    if (route.isLoading) return <div>Loading...</div>;

    if (route.error) return <div>Error: {route.error.message}</div>;

    return (
      <>
        <div className="container m-2 flex h-[650px] flex-col items-center border-b p-2">
          <div className="flex w-full flex-col items-end justify-between p-2 text-slate-600">
         
            <div className="flex w-full flex-row items-center justify-between">
              <InlineTextEdit
                defaultStyle="text-2xl font-bold"
                inputStyle="text-2xl p-px font-bold rounded-lg border"
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
              <div className="min-h-min w-full">
                <InlineTextAreaEdit
                  defaultStyle="w-full h-52 overflow-y-auto bg-slate-100 rounded-lg p-2 mt-4 text-xl resize-none rounded-lg pr-2"
                  inputStyle="w-full h-52 overflow-y-auto bg-slate-100 rounded-lg p-2 mt-4 text-xl rounded-lg pr-2 resize-none"
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
              <div className="min-h-min w-full">
                <div className="flex w-full flex-col md:flex-row">
                  <div className="m-2 w-full md:w-1/2">
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
                  </div>
                  <div className="m-2 w-full md:w-1/2">
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
                  </div>
                </div>
                <div className="flex w-full flex-col md:flex-row">
                  <div className="m-2 w-full md:w-1/2">
                    <InlineDateEdit
                      defaultStyle="text-xl pr-2"
                      formStyle="w-full max-w-4xl h-full flex flex-col items-end"
                      inputStyle="max-w-ful w-full max-w-4xl rounded-lg border p-1"
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
                  </div>
                  <div className="m-2 w-full md:w-1/2">
                    <InlineDateEdit
                      defaultStyle="text-xl pr-2"
                      formStyle="w-full max-w-4xl h-full flex flex-col items-end"
                      inputStyle="max-w-ful w-full max-w-4xl rounded-lg border p-1"
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
                  </div>
                </div>
                <div className="flex w-full flex-col md:flex-row">
                  <div className="m-2 w-full md:w-1/2">
                    <InlineTextEdit
                      defaultStyle="text-xl pr-2"
                      inputStyle="max-w-ful w-full max-w-4xl rounded-lg border p-1"
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
                  </div>
                  <div className="m-2 w-full md:w-1/2">
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
              <div className="m-2 flex w-full flex-col">
                <RouteAttemptsCounterModal
                  id={route.data.id}
                  attempts={route.data.ClimbingRoutesAttempts.length}
                />
              </div>
              <div className="flex w-full flex-col">
                <RouteNotes routeId={id} />
              </div>
              <div className="m-2 flex w-full flex-col items-center justify-center">
                <div className="h-96 max-w-screen-lg">
                  <AttemptsDistributionBarChart
                    attempts={route.data.ClimbingRoutesAttempts}
                  />
                </div>
                <div className="h-96 max-w-screen-lg">
                  <AttemptsDateTypeScatterChart
                    attempts={route.data.ClimbingRoutesAttempts}
                  />
                </div>
              </div>
            </div>
          </div>
          <RouteFileTray routeId={id} />
        </div>
      </>
    );
  }
  return <PromptLogin />;
}

// <FileUploader routeId={id}/>
