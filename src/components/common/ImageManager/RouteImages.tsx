import { AddIcon } from "@/components/svg/AddIcon";
import { api } from "@/utils/api";
import { Carousel } from "flowbite-react";
import Image from "next/image";
import { useState } from "react";
import { FileUploadModal } from "./FileUploadModal";

type routeImagesProps = {
  routeId: string;
};

export const RouteImages = (props: routeImagesProps) => {
  const enabled = !!props.routeId;

  const files = api.fileManager.getDownloadUrl.useQuery(
    { routeId: props.routeId },
    {
      enabled: enabled,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    }
  );

  const [isOpen, setIsOpen] = useState<boolean>(false);

  if (files.isLoading) return <div>Loading...</div>;

  if (files.error) return <div>Error: {files.error.message}</div>;

  return (
    <>
      <div className="h-30 mb-1 flex w-full flex-row items-center justify-between rounded-lg bg-slate-100 p-2">
        <span className="text-xl font-bold">Images</span>
        <button
          type="button"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <AddIcon />
        </button>
      </div>
      <div className="flex h-[80vh] w-full flex-col items-center">
        {files.data.length === 0 && (
          <span className="text-xl font-bold m-4">No images</span>
        )}
        {files.data.length > 0 && (
          <Carousel slide={false} className="rounded-lg bg-slate-800">
            {files.data.map((file: string) => {
              return (
                <div className="h-full w-full">
                  <Image
                    key={file}
                    fill
                    src={file}
                    alt={file}
                    style={{ objectFit: "contain" }}
                  />
                </div>
              );
            })}
          </Carousel>
        )}
      </div>
      <FileUploadModal
        showModal={isOpen}
        setShowModal={() => setIsOpen(false)}
        routeId={props.routeId}
        refetch={() => files.refetch()}
      />
    </>
  );
};
