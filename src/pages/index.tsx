import { useSession } from "next-auth/react";
import { api } from "@/utils/api";
import { PromptLogin } from "@/components/auth/promptLogin";
import Link from "next/link";
import { RouteCard } from "@/components/common/RouteCard";
import { AddIcon } from "@/components/svg/AddIcon";
import TerrainIcon from "@mui/icons-material/Terrain";
import { UserStatusDistributionBarChart } from "@/components/Graphs/UserStatusDistributionBarChart";
import { Tabs } from "flowbite-react";
import { Terrain } from "@/components/svg/Terrain";
import { Analytics } from "@/components/svg/Analytics";
import { ProjectBoard } from "@/components/common/ProjectBoard";
import { MainPageStatisticsBoard } from "@/components/common/MainPageStatisticsBoard";

export default function Home() {
  const { data: session } = useSession();

  if (session) {

    return (
      <>
        <div className="m-2 p-2 h-full container">
          <Tabs.Group aria-label="Main Page Tabs" style="underline">
            <Tabs.Item title="Project" icon={Terrain}>
              <ProjectBoard />
            </Tabs.Item>
            <Tabs.Item title="Stats" icon={Analytics}>
              <MainPageStatisticsBoard />
            </Tabs.Item>
          </Tabs.Group>
          <div className="border-t w-full" />
        </div>
      </>
    );
  }
  return <PromptLogin />;
}