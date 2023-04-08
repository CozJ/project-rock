import { api } from "@/utils/api";

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

  return (
    <div className="flex flex-row items-center">
      {files.data.map((file) => {
        return <img className=" max-w-sm" src={file}/>;
      })}
    </div>
  );
};
