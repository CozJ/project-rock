import { PromptLogin } from "@/components/auth/promptLogin";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { InlineTextEdit } from "@/components/common/InlineEdit/InlineTextEdit";
import { InlineTextAreaEdit } from "@/components/common/InlineEdit/InlineTextAreaEdit";
import { InlineDateEdit } from "@/components/common/InlineEdit/InlineDateEdit";
import { InlineUpdateGrade } from "@/components/common/InlineEdit/InlineUpdateGrade";
import { InlineUpdateStyle } from "@/components/common/InlineEdit/InlineUpdateStyle";
import { InlineUpdatStatus } from "@/components/common/InlineEdit/InlineUpdateStatus";
import { RouteNotes } from "@/components/common/RouteNotes/RouteNotes";
import { RouteAttemptsCounterModal } from "@/components/common/RouteAttemptsCounterModal";
import { RouteImages } from "@/components/common/ImageManager/RouteImages";
import { Tabs } from "flowbite-react";
import { Image } from "@/components/svg/Image";
import { Description } from "@/components/svg/Description";
import { Analytics } from "@/components/svg/Analytics";
import { RouteStatisticsBoard } from "@/components/common/RouteStatisticsBoard";
import { DeleteRouteModal } from "@/components/common/Modals/DeleteRouteModal";
import { useState } from "react";

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

  const [showModal, setShowModal] = useState<boolean>(false);

  if (session) {
    if (route.isLoading) return <div>Loading...</div>;

    if (route.error) return <div>Error: {route.error.message}</div>;

    return (
      <>
        <div className="container m-2 mb-16 mt-10 flex flex-col items-center border-b">
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
            <div className="flex w-full flex-col justify-center border-t pt-6">
              <div className="min-h-min w-full rounded-lg bg-slate-100 px-4 py-2">
                <InlineTextAreaEdit
                  defaultStyle="w-full h-24 overflow-y-auto bg-slate-100 resize-none rounded-lg pr-2"
                  inputStyle="w-full h-24 overflow-y-auto bg-slate-100 rounded-lg pr-2 resize-none"
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
              <RouteAttemptsCounterModal
                id={route.data.id}
                attempts={route.data.ClimbingRoutesAttempts.length}
              />
              <div className="min-h-min w-full">
                <div className="flex w-full flex-col md:flex-row">
                  <div className="m-2 w-full md:w-1/2">
                    <InlineUpdateGrade
                      defaultStyle="text-lg pr-2"
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
                      defaultStyle="text-lg pr-2"
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
                      defaultStyle="text-lg pr-2"
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
                      defaultStyle="text-lg"
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
                      defaultStyle="text-lg pr-2"
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
                      defaultStyle="text-lg pr-2"
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
            </div>
          </div>
          <div className="flex w-full flex-col justify-center border-t pt-6">
            <Tabs.Group aria-label="Route Tabs" style="underline">
              <Tabs.Item title="Images" icon={Image}>
                <RouteImages routeId={id} />
              </Tabs.Item>
              <Tabs.Item title="Notes" icon={Description}>
                <RouteNotes routeId={id} />
              </Tabs.Item>
              <Tabs.Item title="Stats" icon={Analytics}>
                <RouteStatisticsBoard routeId={id} />
              </Tabs.Item>
            </Tabs.Group>
            <div className="flex w-full items-end justify-end">
              <button className="m-4 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
                onClick={() => setShowModal(true)}
                >
                Delete Route
              </button>
            </div>
          </div>
        </div>
        <DeleteRouteModal routeId={id} showModal={showModal} setShowModal={setShowModal} />
      </>
    );
  }
  return <PromptLogin />;
}
