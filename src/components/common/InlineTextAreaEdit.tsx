import { useState } from "react";
import { useForm } from "react-hook-form";
import BorderColorIcon from "@mui/icons-material/BorderColor";

type InlineTextAreaEditProps = {
  value: string | undefined;
  onChange: (value: string) => void;
  required: boolean;
  defaultStyle: string;
  inputStyle: string;
};

export const InlineTextAreaEdit = (props: InlineTextAreaEditProps) => {
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
          className="flex flex-col items-end"
        >
          <textarea
            className={props.inputStyle}
            defaultValue={value}
            {...register("value", { required: props.required })}
          />
          {errors.value && <span>This field is required</span>}
          <div className="my-1 w-36 font-semibold text-slate-100">
            <button
              type="button"
              onClick={handleCancel}
              className=" max-h-fit w-1/2 rounded-l-md  bg-slate-300 p-2 px-2 font-semibold hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="max-h-fit w-1/2 rounded-r-md  bg-slate-600 p-2 px-2 hover:bg-slate-800"
            >
              Save
            </button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col items-end">
          <span className={props.defaultStyle}>{value}</span>
          <button onClick={() => setIsEditing(true)}>
            <BorderColorIcon
              className="m-2 text-center text-slate-300"
              fontSize="small"
            />
          </button>
        </div>
      )}
    </>
  );
};
