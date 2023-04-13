import { DeleteIcon } from "@/components/svg/DeleteIcon";
import { api } from "@/utils/api";
import { ClimbingRoutesNotes } from "@prisma/client";
import { InlineTextAreaEdit } from "../../InlineEdit/InlineTextAreaEdit";
import { InlineTextEdit } from "../../InlineEdit/InlineTextEdit";

type NoteAccordionSectionProps = {
  note: ClimbingRoutesNotes;
  setSelectNote: (note: ClimbingRoutesNotes) => void;
  openDeleteModal: (bool: boolean) => void;
};

export const NoteAccordionSection = (props: NoteAccordionSectionProps) => {
  const updateNote = api.climbingRoutesNotes.updateNote.useMutation();

  return (
    <div className="my-2 min-h-min w-full rounded-lg bg-slate-100 px-4 py-2">
      <div className="flex h-1/2 w-full flex-col items-start justify-start">
        <div className="flex min-w-full flex-col md:flex-row justify-between">
            <button
              type="button"
              className="text-lg font-bold mr-2"
              onClick={() => {
                props.setSelectNote(props.note);
                props.openDeleteModal(true);
              }}
            >
              <DeleteIcon />
            </button>
            <InlineTextEdit
              defaultStyle="text-lg font-bold"
              inputStyle="h-10 text-lg font-bold rounded-lg border p-1"
              value={props.note.title}
              onChange={(value) =>
                updateNote.mutateAsync({
                  id: props.note.id,
                  title: value,
                })
              }
              required={true}
            />
            <span className="text-lg whitespace-nowrap min-w-min">
              {props.note.date.toDateString()}
            </span>
        </div>
        <div className="min-w-full">
          <InlineTextAreaEdit
            defaultStyle="w-full overflow-y-auto bg-slate-100 resize-none rounded-lg pr-2"
            inputStyle="w-full h-32 overflow-y-auto bg-slate-100 rounded-lg pr-2 resize-none"
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
