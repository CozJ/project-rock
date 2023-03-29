import { api } from "@/utils/api";
import { ClimbingRoutesNotes } from "@prisma/client";
import { InlineTextAreaEdit } from "../../InlineTextAreaEdit";
import { InlineTextEdit } from "../../InlineTextEdit";

type NoteAccordionSectionProps = {
  note: ClimbingRoutesNotes;
};

export const NoteAccordionSection = (props: NoteAccordionSectionProps) => {
  const updateNote = api.climbingRoutesNotes.updateNote.useMutation();

  return (
    <div className="m-2 min-h-min w-auto rounded-lg bg-slate-100 p-2">
      <div className="flex h-1/2 w-full flex-col items-start justify-start">
        <div className="flex min-w-full flex-col md:flex-row">
          <InlineTextEdit
            defaultStyle="text-lg font-bold pr-2 items-center"
            formStyle="w-full h-full flex flex-col md:flex-row pr-2 max-w-2xl"
            inputStyle="w-full md:w-3/4 text-lg font-bold rounded-lg border p-1 mr-4"
            value={props.note.title}
            onChange={(value) =>
              updateNote.mutateAsync({
                id: props.note.id,
                title: value,
              })
            }
            required={true}
          />
          <span className="text-lg">&nbsp;-&nbsp;{props.note.date.toDateString()}</span>
        </div>
        <div className="min-w-full">
          <InlineTextAreaEdit
            defaultStyle="w-full h-min overflow-y-auto bg-slate-100 rounded-lg p-1 text-lg resize-none rounded-lg"
            inputStyle="w-full h-52 overflow-y-auto rounded-lg p-1 mt-4 text-lg rounded-lg  resize-none"
            value={props.note.note}
            onChange={(value) =>
              updateNote.mutateAsync({
                id: props.note.id,
                note: value,
              })
            }
            required={false}
          />
        </div>
      </div>
    </div>
  );
};
