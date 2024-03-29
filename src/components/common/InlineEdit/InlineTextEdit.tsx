import { useState } from "react";
import { useForm } from "react-hook-form";
import { EditIcon } from "@/components/svg/EditIcon";

type InlineTextEditProps = {
  value: string | undefined;
  onChange: (value: string) => void;
  required: boolean;
  defaultStyle: string;
  inputStyle: string;
};

export const InlineTextEdit = (props: InlineTextEditProps) => {
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
    console.log(data);
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
            className={`w-full ${props.inputStyle}`}
            type="text"
            defaultValue={value}
            {...register("value", { required: props.required })}
          />
          {errors.value && <span className="m-1 text-red-700">This field is required</span>}
          <div className="m-2 flex flex-row w-auto font-semibold text-slate-100">
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
          <span className={props.defaultStyle}>{value}</span>
        </div>
      )}
    </>
  );
};
