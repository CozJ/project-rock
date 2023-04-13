import { AddIcon } from "@/components/svg/AddIcon";
import { DeleteIcon } from "@/components/svg/DeleteIcon";
import { api } from "@/utils/api";
import { Carousel } from "flowbite-react";
import Image from "next/image";
import { useState } from "react";
import { FileUploadModal } from "./FileUploadModal";
import { DeleteImageModal } from "@/components/common/Modals/DeleteImageModal";

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

  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [imageUuid, setImageUuid] = useState<string>("");

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
      <div className="flex h-[80vh] w-full flex-col items-center rounded-lg bg-slate-300 shadow-lg">
        {files.data.length === 0 && (
          <span className="m-4 text-xl font-bold">No images</span>
        )}
        {files.data.length > 0 && (
          <Carousel slide={false}>
            {files.data.map((file: string) => {
              return (
                <div key={file} className=" h-full w-full rounded-lg relative">
                  <div className=" h-full absolute w-full">
                    <Image
                      key={file}
                      fill
                      src={file}
                      alt={file}
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <div className="h-full w-full absolute flex justify-center items-end">
                    <button
                      className="m-4 mb-10 relative rounded cursor-grab z-50 bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
                      onClick={() => {
                        setDeleteModal(true);
                        setImageUuid(file);
                      }}
                    >
                      <DeleteIcon />
                    </button>
                  </div>
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
      <DeleteImageModal
        showModal={deleteModal}
        setShowModal={() => setDeleteModal(false)}
        ImageUuid={imageUuid}
        routeId={props.routeId}
        refetch={() => files.refetch()}
      />
    </>
  );
};
