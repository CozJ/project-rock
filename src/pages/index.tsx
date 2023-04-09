import { useSession } from "next-auth/react";
import { api } from "@/utils/api";
import { PromptLogin } from "@/components/auth/promptLogin";
import Link from "next/link";
import { RouteCard } from "@/components/common/RouteCard";
import { AddIcon } from "@/components/svg/AddIcon";
import TerrainIcon from '@mui/icons-material/Terrain';
import { UserStatusDistributionBarChart } from "@/components/Graphs/UserStatusDistributionBarChart";
import { Tabs } from "flowbite-react";
import { Terrain } from "@/components/svg/Terrain";
import { Analytics } from "@/components/svg/Analytics";

export default function Home() {
  const { data: session } = useSession();

  const queryEnabled = session ? true : false;

  const userRoutes = api.climbingRoutes.getRecentRoutes.useQuery(undefined, {
    enabled: queryEnabled,
  });

  if (session) {
    if (userRoutes.isLoading) return <div>Loading...</div>;

    if (userRoutes.error) return <div>Error: {userRoutes.error.message}</div>;

    return (
      <>
        <div className="m-2 p-2">
          <Tabs.Group
            aria-label="Main Page Tabs"
            style="underline"
            >
              <Tabs.Item 
                title="Project"
                icon={Terrain}
                >
                <div className="w-full h-full">
                  Projects
                </div>
              </Tabs.Item>
              <Tabs.Item 
                title="Stats"
                icon={Analytics}
              >
                <div className="w-full h-full">
                  Stats
                </div>
              </Tabs.Item>
          </Tabs.Group>
        </div>
      </>
    );
  }
  return <PromptLogin />;
}

// return (
//   <>
//     <div className="m-2 flex flex-col items-center p-2">
//       <div className="container flex flex-col items-end justify-between p-2 text-slate-600">
//         <div className="flex w-full flex-row justify-between">
//           <h1 className="text-2xl font-bold">Projects</h1>
//           <Link href={"/"} className="text-lg">
//             All Routes <ArrowCircleRightIcon />
//           </Link>
//         </div>
//         <div className="flex max-h-96 w-full flex-row flex-wrap justify-start overflow-y-scroll border-b border-t sm:overflow-hidden">
//           {userRoutes.data?.map((route) => (
//             <div key={route.id} className="w-full p-2 sm:w-1/2 md:w-1/3">
//               <RouteCard
//                 key={route.id}
//                 id={route.id}
//                 name={route.name}
//                 style={route.style}
//                 grade={route.grade}
//                 status={route.status}
//                 attempts={route.ClimbingRoutesAttempts.length}
//               />
//             </div>
//           ))}
//         </div>
//         <Link type="button" href={"/climbingRoutes/newRoute"}>
//           <div className="my-5 flex max-h-fit max-w-fit flex-row items-center justify-center rounded-lg bg-slate-600 p-2 px-4 font-semibold text-slate-100">
//             <span>New Route</span>
//             <AddIcon />
//           </div>
//         </Link>
//         <div className="flex w-full flex-row justify-between">
//           <h1 className="text-2xl font-bold">Stats</h1>
//           <Link href={"/"} className="text-lg">
//             All Stats <ArrowCircleRightIcon />
//           </Link>
//         </div>
//         <div className="w-full border-t">
//           <UserStatusDistributionBarChart routes={userRoutes.data} />
//         </div>
//       </div>
//     </div>
//   </>
// );