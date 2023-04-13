import { Modal } from "flowbite-react";
import { api } from "@/utils/api";
import router from "next/router";

type AddAttemptModalProps = {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  routeId: string;
};

export const DeleteRouteModal = (props: AddAttemptModalProps) => {
  const deleteRoute = api.climbingRoutes.deleteRoute.useMutation();

  const handleDelete = () => {
    deleteRoute.mutateAsync({ id: props.routeId }).then(() => {
      props.setShowModal(false);
      router.push("/");
    });
  };

  return (
    <Modal
      title="Delete Route"
      show={props.showModal}
      dismissible={true}
      onClose={() => {
        props.setShowModal(false);
      }}
    >
      <Modal.Header>
        <h1>Delete Route</h1>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this route?</p>
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
