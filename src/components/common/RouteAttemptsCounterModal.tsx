import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { AddIcon } from "@/components/svg/AddIcon";
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
      <div className="my-2 flex flex-row">
        <button
          type="button"
          className="flex w-10 items-center justify-center rounded-full bg-slate-200 text-lg text-slate-200 hover:bg-slate-400"
          onClick={(e) => {
            e.preventDefault();
            setShowModal(true);
          }}
        >
          <AddIcon />
        </button>
        <div className="flex flex-row items-center justify-center p-2 text-slate-800">
          <span className="flex flex-row text-lg">
            {props.attempts} Attempts
          </span>
        </div>
        <AddAttemptModal
          showModal={showModal}
          setShowModal={setShowModal}
          routeId={props.id}
        />
      </div>
    </>
  );
};
