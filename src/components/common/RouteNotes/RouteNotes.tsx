import { api } from "@/utils/api";
import { AddIcon } from "@/components/svg/AddIcon";
import { NoteAccordionSection } from "./components/NoteAccordionSection";
import { ClimbingRoutesNotes } from "@prisma/client";
import { useState } from "react";
import { DeleteNoteModal } from "../Modals/DeleteNoteModal";

type RouteNotesProps = {
  routeId: string;
};

export const RouteNotes = (props: RouteNotesProps) => {

  const [selectedNote, setSelectedNote] = useState<ClimbingRoutesNotes | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const Notes = api.climbingRoutesNotes.getNotes.useQuery(
    {
      routeId: props.routeId,
    },
    { enabled: !!props.routeId }
  );

  const newNote = api.climbingRoutesNotes.createNote.useMutation();

  if (Notes.isLoading) {
    return <p>Loading...</p>;
  }

  if (Notes.error) {
    return <p>Error: {Notes.error.message}</p>;
  }

  return (
    <>
      <div className="h-30 mb-1 flex w-full flex-row items-center justify-between rounded-lg bg-slate-100 p-2">
        <span className="text-xl font-bold">Notes</span>
        <button
          type="button"
          onClick={() => {
            newNote
              .mutateAsync({
                routeId: props.routeId,
                title: "New Note",
                note: "This is a new note",
              })
              .then(() => {
                Notes.refetch();
              });
          }}
        >
          <AddIcon />
        </button>
      </div>
      <div className="min-h-min w-full">
      {Notes.data?.map((note) => (
        <NoteAccordionSection key={note.id} note={note} setSelectNote={setSelectedNote} openDeleteModal={setShowDeleteModal}/>
      ))}
      </div>
      {selectedNote && <DeleteNoteModal showModal={showDeleteModal} setShowModal={setShowDeleteModal} noteId={selectedNote?.id} refetch={Notes.refetch} />}
    </>
  );
};
