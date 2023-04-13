import { useState } from "react";
import { useForm } from "react-hook-form";
import { EditIcon } from "@/components/svg/EditIcon";
import { STATUS } from "@/types/types";

type InlineStatusEditProps = {
  value: string | undefined;
  onChange: (value: Date | undefined) => void;
  required: boolean;
  defaultStyle: string;
};

export const InlineUpdatStatus = (props: InlineStatusEditProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<string | undefined>(
    props.value
  );
  const [value, setInputValue] = useState(props.value);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onErrors = (errors: any) => console.error(errors);

  const onFormSubmit = (data: any) => {
    setValue("status", data.style);
    setInputValue(data.style);
    props.onChange(data.style);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setValue("status", props.value);
    setInputValue(props.value);
    setIsEditing(false);
  };

  return (
    <>
      {isEditing ? (
        <form onSubmit={handleSubmit(onFormSubmit, onErrors)}>
          <div className="flex h-full w-full flex-col items-end text-slate-100">
            <div className="flex w-full max-w-4xl flex-row justify-evenly">
              <div className="flex w-full flex-col">
                <label
                  htmlFor={STATUS.new}
                  className={`flex h-12 flex-col whitespace-nowrap rounded-tl-lg bg-slate-600 text-center text-slate-100 hover:bg-slate-700 ${
                    selectedStyle === STATUS.new && `bg-slate-800`
                  }`}
                >
                  <input
                    type="radio"
                    id={STATUS.new}
                    value={STATUS.new}
                    onClick={() => setSelectedStyle(STATUS.new)}
                    {...register("style", { required: true })}
                    className="invisible"
                  />
                  {STATUS.new}
                </label>
                <label
                  htmlFor={STATUS.inProgress}
                  className={`flex h-12 flex-col whitespace-nowrap rounded-bl-lg bg-slate-600 text-center text-slate-100 hover:bg-slate-700 ${
                    selectedStyle === STATUS.inProgress && `bg-slate-800`
                  }`}
                >
                  <input
                    type="radio"
                    id={STATUS.inProgress}
                    value={STATUS.inProgress}
                    onClick={() => setSelectedStyle(STATUS.inProgress)}
                    {...register("style", { required: true })}
                    className="invisible"
                  />
                  {STATUS.inProgress}
                </label>
              </div>
              <div className="flex w-full flex-col">
                <label
                  htmlFor={STATUS.backlog}
                  className={`flex h-12 flex-col  whitespace-nowrap rounded-tr-lg bg-slate-600 text-center text-slate-100 hover:bg-slate-700 ${
                    selectedStyle === STATUS.backlog && `bg-slate-800`
                  }`}
                >
                  <input
                    type="radio"
                    id={STATUS.backlog}
                    value={STATUS.backlog}
                    onClick={() => setSelectedStyle(STATUS.backlog)}
                    {...register("style", { required: true })}
                    className="invisible"
                  />
                  {STATUS.backlog}
                </label>
                <label
                  htmlFor={STATUS.completed}
                  className={`flex h-12 flex-col whitespace-nowrap  rounded-br-lg bg-slate-600 text-center text-slate-100 hover:bg-slate-700 ${
                    selectedStyle === STATUS.completed && `bg-slate-800`
                  }`}
                >
                  <input
                    type="radio"
                    id={STATUS.completed}
                    value={STATUS.completed}
                    onClick={() => setSelectedStyle(STATUS.completed)}
                    {...register("style", { required: true })}
                    className="invisible"
                  />
                  {STATUS.completed}
                </label>
              </div>
            </div>
            {errors.style && <p className="text-red-500">Style is required</p>}
            <div className="mx-2 flex w-auto flex-row py-1 font-semibold text-slate-100">
              <button
                type="button"
                onClick={handleCancel}
                className=" max-h-fit w-16 rounded-l-lg  bg-slate-300 p-1 px-1 hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="max-h-fit w-16 rounded-r-lg bg-slate-600 p-1 px-1 hover:bg-slate-800"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="flex flex-row items-center">
          <button className="pr-2" onClick={() => setIsEditing(true)}>
            <EditIcon />
          </button>
          <span className={props.defaultStyle}>
            {value ? value : "Not Set"}
          </span>
        </div>
      )}
    </>
  );
};
