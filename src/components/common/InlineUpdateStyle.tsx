import { useState } from "react";
import { useForm } from "react-hook-form";
import { EditIcon } from "@/components/svg/EditIcon";
import { STYLES } from "@/types/types";

type InlineStyleEditProps = {
  value: string | undefined;
  onChange: (value: Date | undefined) => void;
  required: boolean;
  defaultStyle: string;
};

export const InlineUpdateStyle = (props: InlineStyleEditProps) => {
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
    setValue("style", data.style);
    setInputValue(data.style);
    props.onChange(data.style);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setValue("style", props.value);
    setInputValue(props.value);
    setIsEditing(false);
  };

  return (
    <>
      {isEditing ? (
        <form onSubmit={handleSubmit(onFormSubmit, onErrors)}>
          <div className="flex max-w-4xl flex-col items-end text-slate-100">
            <div className="flex w-full max-w-4xl flex-row justify-evenly">
              <label
                htmlFor={STYLES.sport}
                className={`flex h-12 w-1/3 flex-col rounded-l-lg bg-slate-600 text-center text-slate-100 hover:bg-slate-700 ${
                  selectedStyle === STYLES.sport && `bg-slate-800`
                }`}
              >
                <input
                  type="radio"
                  id={STYLES.sport}
                  value={STYLES.sport}
                  checked={props.value == STYLES.sport}
                  onClick={() => setSelectedStyle(STYLES.sport)}
                  {...register("style", { required: true })}
                  className="invisible"
                />
                {STYLES.sport}
              </label>
              <label
                htmlFor={STYLES.boulder}
                className={`flex h-12 w-1/3 flex-col bg-slate-600 text-center text-slate-100 hover:bg-slate-700 ${
                  selectedStyle === STYLES.boulder && `bg-slate-800`
                }`}
              >
                <input
                  type="radio"
                  id={STYLES.boulder}
                  value={STYLES.boulder}
                  checked={props.value === STYLES.boulder}
                  onClick={() => setSelectedStyle(STYLES.boulder)}
                  {...register("style", { required: true })}
                  className="invisible"
                />
                {STYLES.boulder}
              </label>
              <label
                htmlFor={STYLES.trad}
                className={`flex h-12 w-1/3 flex-col rounded-r-lg bg-slate-600 text-center text-slate-100 hover:bg-slate-700 ${
                  selectedStyle === STYLES.trad && `bg-slate-800`
                }`}
              >
                <input
                  type="radio"
                  id={STYLES.trad}
                  value={STYLES.trad}
                  checked={props.value === STYLES.trad}
                  onClick={() => setSelectedStyle(STYLES.trad)}
                  {...register("style", { required: true })}
                  className="invisible"
                />
                {STYLES.trad}
              </label>
            </div>
            {errors.style && <p className="text-red-500">Style is required</p>}
            <div className="my-1 w-36 font-semibold text-slate-100">
              <button
                type="button"
                onClick={handleCancel}
                className=" max-h-fit w-1/2 rounded-l-lg  bg-slate-300 p-2 px-2 font-semibold hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="max-h-fit w-1/2 rounded-r-lg  bg-slate-600 p-2 px-2 hover:bg-slate-800"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="flex flex-row items-center">
          <span className={props.defaultStyle}>
            {value ? value : "Not Set"}
          </span>
          <button onClick={() => setIsEditing(true)}>
            <EditIcon />
          </button>
        </div>
      )}
    </>
  );
};
