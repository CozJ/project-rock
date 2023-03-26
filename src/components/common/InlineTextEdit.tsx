import { useState } from "react";
import { useForm } from "react-hook-form";
import BorderColorIcon from "@mui/icons-material/BorderColor";

type InlineTextEditProps = {
  value: string | undefined;
  onChange: (value: string) => void;
  required: boolean;
  defaultStyle: string;
  formStyle: string;
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
          className={props.formStyle}
        >
          <input
            className={props.inputStyle}
            type="text"
            defaultValue={value}
            {...register("value", { required: props.required })}
          />
          {errors.value && <span>This field is required</span>}
          <div className="my-1 w-36 font-semibold text-slate-100">
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
          </div>
        </form>
      ) : (
        <div className="flex flex-row items-center">
          <span className={props.defaultStyle}>{value}</span>
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