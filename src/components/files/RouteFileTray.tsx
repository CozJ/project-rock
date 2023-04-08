import { api } from "@/utils/api";

type routeFileTrayProps = {
    routeId: string;
}

export const RouteFileTray = (props: routeFileTrayProps) => {

    const enabled = !!props.routeId;

    const files = api.fileManager.getDownloadUrl.useQuery({ routeId: props.routeId }, { enabled: enabled });

    console.log(files.data);

  return (
    <img src={files.data} />
  )
}
