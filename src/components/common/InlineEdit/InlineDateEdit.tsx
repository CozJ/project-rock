import { useState } from "react";
import { useForm } from "react-hook-form";
import { EditIcon } from "@/components/svg/EditIcon";

type InlineDateEditProps = {
  value: Date | undefined;
  onChange: (value: Date | undefined) => void;
  required: boolean;
  defaultStyle: string;
  inputStyle: string;
};

export const InlineDateEdit = (props: InlineDateEditProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setInputValue] = useState(props.value);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleCancel = () => {
    setValue("value", props.value);
    setInputValue(props.value);
    setIsEditing(false);
  };

  const onErrors = (errors: any) => console.error(errors);

  const onFormSubmit = (data: any) => {
    if (data.value == "Invalid Date") {
      setValue("value", undefined);
      setInputValue(undefined);
      props.onChange(undefined);
      setIsEditing(false);
      return;
    }

    console.log(data.value);
    setValue("value", data.value);
    setInputValue(data.value);
    props.onChange(data.value);
    setIsEditing(false);
  };

  return (
    <>
      {isEditing ? (
        <form
          onSubmit={handleSubmit(onFormSubmit, onErrors)}
          className="w-full h-full flex flex-col justify-between items-end"
        >
          <input
            className={props.inputStyle}
            type="date"
            defaultValue={value ? value.toISOString().substring(0, 10) : ""}
            {...register("value", {
              required: props.required,
              valueAsDate: true,
            })}
          />
          {errors.value && <span>This field is required</span>}
          <div className="mx-2 py-1 flex flex-row w-auto font-semibold text-slate-100">
            <button
              type="button"
              onClick={handleCancel}
              className=" max-h-fit w-16 rounded-l-lg  bg-slate-300 p-1 px-1 hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="max-h-fit w-16 rounded-r-lg  bg-slate-600 p-1 px-1 hover:bg-slate-800"
            >
              Save
            </button>
          </div>
        </form>
      ) : (
        <div className="w-full h-full flex flex-row items-center">
          <button className="pr-2" onClick={() => setIsEditing(true)}>
            <EditIcon />
          </button>
          <span className={props.defaultStyle}>
            {value ? value.toDateString() : "Not Completed"}
          </span>
        </div>
      )}
    </>
  );
};
