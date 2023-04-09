import { api } from "@/utils/api";
import Image from "next/image";

type routeFileTrayProps = {
  routeId: string;
};

export const RouteFileTray = (props: routeFileTrayProps) => {
  const enabled = !!props.routeId;

  const files = api.fileManager.getDownloadUrl.useQuery(
    { routeId: props.routeId },
    { enabled: enabled }
  );

  if (files.isLoading) return <div>Loading...</div>;

  if (files.error) return <div>Error: {files.error.message}</div>;

  console.log(files.data);

  return (
    <div className="flex flex-row items-center">
      {files.data.map((file: string) => {
        return <Image key={file} width={200} height={200} src={file} alt=""/>;
      })}
    </div>
  );
};
