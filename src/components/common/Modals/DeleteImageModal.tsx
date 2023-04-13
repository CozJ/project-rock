import { Modal } from "flowbite-react";
import { api } from "@/utils/api";

type DeleteImageModalProps = {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  ImageUuid: string;
  routeId: string;
  refetch: () => void;
};

export const DeleteImageModal = (props: DeleteImageModalProps) => {
  const noteRoute = api.fileManager.deleteImage.useMutation();

  const handleDelete = () => {
    const uuid = getUuidfromUrl(props.ImageUuid);
    noteRoute
      .mutateAsync({
        routeId: props.routeId,
        uuid: uuid,
      })
      .then(() => {
        props.refetch();
        props.setShowModal(false);
      });
  };

  function getUuidfromUrl(ImageUuid: string) {
    const url = ImageUuid.split("?")[0];
    const uuid = url.split("/").pop();
    return uuid as string;
  }

  return (
    <Modal
      title="Delete Image"
      show={props.showModal}
      dismissible={true}
      onClose={() => {
        props.setShowModal(false);
      }}
    >
      <Modal.Header>
        <h1>Delete Image</h1>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this Image?</p>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex h-full w-full justify-between">
          <button
            className="rounded bg-slate-400 px-4 py-2 font-bold text-white hover:bg-gray-600"
            onClick={() => props.setShowModal(false)}
          >
            Close
          </button>
          <button
            className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
            onClick={handleDelete}
          >
            Yes, Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};


