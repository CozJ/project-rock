import { Modal } from "flowbite-react";
import { api } from "@/utils/api";
import router from "next/router";

type AddAttemptModalProps = {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  noteId: string;
  refetch: () => void;
};

export const DeleteNoteModal = (props: AddAttemptModalProps) => {
  const noteRoute = api.climbingRoutesNotes.deleteNote.useMutation();

  const handleDelete = () => {
    noteRoute.mutateAsync({ id: props.noteId }).then(() => {
      props.setShowModal(false);
    }).then(() => {
      props.refetch();
    });
  };

  return (
    <Modal
      title="Delete Note"
      show={props.showModal}
      dismissible={true}
      onClose={() => {
        props.setShowModal(false);
      }}
    >
      <Modal.Header>
        <h1>Delete Note</h1>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this Note?</p>
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
