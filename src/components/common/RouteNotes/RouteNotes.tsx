import { api } from "@/utils/api";
import AddIcon from "@mui/icons-material/Add";
import { NoteAccordionSection } from "./components/NoteAccordionSection";

type RouteNotesProps = {
  routeId: string;
};

export const RouteNotes = (props: RouteNotesProps) => {
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
          <AddIcon fontSize="medium" />
        </button>
      </div>
      <div className="min-h-min w-full">
      {Notes.data?.map((note) => (
        <NoteAccordionSection key={note.id} note={note} />
      ))}
      </div>
    </>
  );
};
