import { useState } from "react";
import { useForm } from "react-hook-form";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { STATUS } from "@/types/types";

type InlineStatusEditProps = {
  value: string | undefined;
  onChange: (value: Date | undefined) => void;
  required: boolean;
  defaultStyle: string;
  formStyle: string;
  inputStyle: string;
};

export const InlineUpdatStatus = (props: InlineStatusEditProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
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
          <label className="mt-5 mb-2 text-lg font-semibold">Style</label>
          <div className="flex w-full max-w-4xl flex-row justify-evenly">
            <label
              htmlFor={STATUS.new}
              className={`flex h-12 w-1/3 flex-col rounded-l-md bg-slate-600 text-center text-slate-100 hover:bg-slate-700 ${
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
              htmlFor={STATUS.learning}
              className={`flex h-12 w-1/3 flex-col bg-slate-600 text-center text-slate-100 hover:bg-slate-700 ${
                selectedStyle === STATUS.learning && `bg-slate-800`
              }`}
            >
              <input
                type="radio"
                id={STATUS.learning}
                value={STATUS.learning}
                onClick={() => setSelectedStyle(STATUS.learning)}
                {...register("style", { required: true })}
                className="invisible"
              />
              {STATUS.learning}
            </label>
            <label
              htmlFor={STATUS.linking}
              className={`flex h-12 w-1/3 flex-col bg-slate-600 text-center text-slate-100 hover:bg-slate-700 ${
                selectedStyle === STATUS.linking && `bg-slate-800`
              }`}
            >
              <input
                type="radio"
                id={STATUS.linking}
                value={STATUS.linking}
                onClick={() => setSelectedStyle(STATUS.linking)}
                {...register("style", { required: true })}
                className="invisible"
              />
              {STATUS.linking}
            </label>
            <label
              htmlFor={STATUS.redpoint}
              className={`flex h-12 w-1/3 flex-col bg-slate-600 text-center text-slate-100 hover:bg-slate-700 ${
                selectedStyle === STATUS.linking && `bg-slate-800`
              }`}
            >
              <input
                type="radio"
                id={STATUS.redpoint}
                value={STATUS.redpoint}
                onClick={() => setSelectedStyle(STATUS.redpoint)}
                {...register("style", { required: true })}
                className="invisible"
              />
              {STATUS.redpoint}
            </label>
            <label
              htmlFor={STATUS.backlog}
              className={`flex h-12 w-1/3 flex-col bg-slate-600 text-center text-slate-100 hover:bg-slate-700 ${
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
              className={`flex h-12 w-1/3 flex-col rounded-r-md bg-slate-600 text-center text-slate-100 hover:bg-slate-700 ${
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
          {errors.style && <p className="text-red-500">Style is required</p>}
          <button
            type="submit"
            className="max-h-fit w-1/2 rounded-md  bg-green-500 p-2 px-2 hover:bg-green-600"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className=" max-h-fit w-1/2 rounded-md  bg-red-500 p-2 px-2 font-semibold hover:bg-red-600"
          >
            Cancel
          </button>
        </form>
      ) : (
        <div className="flex flex-row items-center">
          <span className={props.defaultStyle}>
            {value ? value : "Not Set"}
          </span>
          <button onClick={() => setIsEditing(true)}>
            <BorderColorIcon
              className="text-center text-slate-300"
              fontSize="small"
            />
          </button>
        </div>
      )}
    </>
  );
};