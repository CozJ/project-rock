import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { AddAttemptModal } from "./AddAttemptModal";

type RouteAttemptsCounterModalProps = {
  attempts: number;
  id: string;
};

export const RouteAttemptsCounterModal = (
  props: RouteAttemptsCounterModalProps
) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="flex flex-row">
        <div
          className="flex w-12 items-center justify-center rounded-l-lg bg-slate-300 p-2 text-slate-800"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          {props.attempts}
        </div>
        <button
          type="button"
          className="flex w-12 items-center justify-center rounded-r-lg bg-slate-600 text-lg text-slate-200"
          onClick={(e) => {
            e.preventDefault();
            setShowModal(true);
          }}
        >
          <AddIcon />
        </button>
        <AddAttemptModal showModal={showModal} setShowModal={setShowModal} routeId={props.id} />
      </div>
    </>
  );
};
