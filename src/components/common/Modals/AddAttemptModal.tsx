import React from "react";
import { Modal } from "flowbite-react";
import { useForm } from "react-hook-form";
import { ATTEMPT_TYPES } from "@/types/types";
import { api } from "@/utils/api";

type AddAttemptModalProps = {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  routeId: string;
};

type FormValues = {
  type: string;
  section?: string;
  date: Date;
};

export const AddAttemptModal = (props: AddAttemptModalProps) => {
  const [selectedStyle, setSelectedAttempt] = React.useState<string>();
  const utils = api.useContext();

  const onFormSubmit = (data: FormValues) => {
    updateAddAttempt
      .mutateAsync({
        routeId: props.routeId,
        type: data.type,
      })
      .then(() => utils.climbingRoutes.getRoute.refetch({ id: props.routeId }));
  };

  const onErrors = (errors: any) => console.log(errors);

  const updateAddAttempt =
    api.climbingRoutesAttempts.createAttempt.useMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  return (
    <Modal
      title="Add attempt"
      show={props.showModal}
      dismissible={true}
      onClose={() => {
        props.setShowModal(false);
      }}
    >
      <form onSubmit={handleSubmit(onFormSubmit, onErrors)}>
        <Modal.Header>Add Attempt</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div className="flex max-w-4xl flex-col items-end text-slate-100">
              <div className="flex w-full max-w-4xl flex-row justify-evenly">
                <label
                  htmlFor={ATTEMPT_TYPES.working}
                  className={`flex h-12 w-1/3 flex-col rounded-l-lg bg-slate-600 text-center text-slate-100 hover:bg-slate-700 ${
                    selectedStyle === ATTEMPT_TYPES.working && `bg-slate-800`
                  }`}
                >
                  <input
                    type="radio"
                    id={ATTEMPT_TYPES.working}
                    value={ATTEMPT_TYPES.working}
                    checked={selectedStyle == ATTEMPT_TYPES.working}
                    onClick={() => setSelectedAttempt(ATTEMPT_TYPES.working)}
                    {...register("type", { required: true })}
                    className="invisible"
                  />
                  {ATTEMPT_TYPES.working}
                </label>
                <label
                  htmlFor={ATTEMPT_TYPES.crux}
                  className={`flex h-12 w-1/3 flex-col bg-slate-600 text-center text-slate-100 hover:bg-slate-700 ${
                    selectedStyle === ATTEMPT_TYPES.crux && `bg-slate-800`
                  }`}
                >
                  <input
                    type="radio"
                    id={ATTEMPT_TYPES.crux}
                    value={ATTEMPT_TYPES.crux}
                    checked={selectedStyle == ATTEMPT_TYPES.crux}
                    onClick={() => setSelectedAttempt(ATTEMPT_TYPES.crux)}
                    {...register("type", { required: true })}
                    className="invisible"
                  />
                  {ATTEMPT_TYPES.crux}
                </label>
                <label
                  htmlFor={ATTEMPT_TYPES.linking}
                  className={`flex h-12 w-1/3 flex-col bg-slate-600 text-center text-slate-100 hover:bg-slate-700 ${
                    selectedStyle === ATTEMPT_TYPES.linking && `bg-slate-800`
                  }`}
                >
                  <input
                    type="radio"
                    id={ATTEMPT_TYPES.linking}
                    value={ATTEMPT_TYPES.linking}
                    checked={selectedStyle == ATTEMPT_TYPES.linking}
                    onClick={() => setSelectedAttempt(ATTEMPT_TYPES.linking)}
                    {...register("type", { required: true })}
                    className="invisible"
                  />
                  {ATTEMPT_TYPES.linking}
                </label>
                <label
                  htmlFor={ATTEMPT_TYPES.redpoint}
                  className={`flex h-12 w-1/3 flex-col rounded-r-lg bg-slate-600 text-center text-slate-100 hover:bg-slate-700 ${
                    selectedStyle === ATTEMPT_TYPES.redpoint && `bg-slate-800`
                  }`}
                >
                  <input
                    type="radio"
                    id={ATTEMPT_TYPES.redpoint}
                    value={ATTEMPT_TYPES.redpoint}
                    checked={selectedStyle == ATTEMPT_TYPES.redpoint}
                    onClick={() => setSelectedAttempt(ATTEMPT_TYPES.redpoint)}
                    {...register("type", { required: true })}
                    className="invisible"
                  />
                  {ATTEMPT_TYPES.redpoint}
                </label>
                {updateAddAttempt.error && (
                  <p className="text-red-500">
                    Error: {updateAddAttempt.error.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="submit"
            className="flex max-h-fit max-w-fit flex-row items-center justify-center rounded-lg bg-slate-600 p-2 px-4 font-semibold text-slate-100"
            onClick={() => {
              props.setShowModal(false);
            }}
          >
            Save
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
