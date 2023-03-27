import { useState } from "react";
import { useForm } from "react-hook-form";
import BorderColorIcon from "@mui/icons-material/BorderColor";

type InlineDateEditProps = {
  value: Date | undefined;
  onChange: (value: Date | undefined) => void;
  required: boolean;
  defaultStyle: string;
  formStyle: string;
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
          className={props.formStyle}
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
        </form>
      ) : (
        <div className="flex flex-row items-center">
          <span className={props.defaultStyle}>
            {value ? value.toDateString() : "Not Completed"}
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
