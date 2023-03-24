import { BTG_GRADES, FONT_GRADES, V_GRADES, YDS_GRADES } from "@/types/types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import BorderColorIcon from "@mui/icons-material/BorderColor";

type InlineGradeEditProps = {
  value: string | undefined;
  onChange: (value: Date | undefined) => void;
  required: boolean;
  defaultStyle: string;
  formStyle: string;
  inputStyle: string;
};

export const InlineUpdateGrade = (props: InlineGradeEditProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [gradeScheme, setGradeScheme] = useState<string | null>(null);
  const [value, setInputValue] = useState(props.value);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onErrors = (errors: any) => console.error(errors);

  const onFormSubmit = (data: any) => {
    setValue("grade", data.grade);
    setInputValue(data.grade);
    props.onChange(data.grade);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setValue("grade", props.value);
    setInputValue(props.value);
    setIsEditing(false);
  };

  return (
    <>
      {isEditing ? (
        <form onSubmit={handleSubmit(onFormSubmit, onErrors)}>
          <div className="m-4 flex w-full flex-col">
            <label className="mt-5 mb-2 text-lg font-semibold">Grade</label>
            <div className="flex w-full max-w-4xl flex-row justify-evenly">
              <button
                className={`h-12 w-1/4 rounded-tl-md bg-slate-600 text-slate-100 hover:bg-slate-700 ${
                  gradeScheme === "V" && "bg-slate-800"
                } `}
                type="button"
                onClick={() => setGradeScheme("V")}
              >
                V
              </button>
              <button
                className={`h-12 w-1/4 bg-slate-600 text-slate-100 hover:bg-slate-700 ${
                  gradeScheme === "FONT" && "bg-slate-800"
                } `}
                type="button"
                onClick={() => setGradeScheme("FONT")}
              >
                Font
              </button>
              <button
                className={`h-12 w-1/4 bg-slate-600 text-slate-100 hover:bg-slate-700 ${
                  gradeScheme === "BTG" && "bg-slate-800"
                } `}
                type="button"
                onClick={() => setGradeScheme("BTG")}
              >
                B.Trad
              </button>
              <button
                className={`h-12 w-1/4 rounded-tr-md bg-slate-600 text-slate-100 hover:bg-slate-700  ${
                  gradeScheme === "YDS" && "bg-slate-800"
                } `}
                type="button"
                onClick={() => setGradeScheme("YDS")}
              >
                USA
              </button>
            </div>
            <select
              className="w-full max-w-4xl rounded-b-md border p-1"
              placeholder="Grade"
              {...register("grade", { required: true })}
            >
              {gradeScheme === "V" &&
                Object.entries(V_GRADES).map(([key, value]) => (
                  <option key={key} value={value}>
                    {value}
                  </option>
                ))}
              {gradeScheme === "FONT" &&
                Object.entries(FONT_GRADES).map(([key, value]) => (
                  <option key={key} value={value}>
                    {value}
                  </option>
                ))}
              {gradeScheme === "BTG" &&
                Object.entries(BTG_GRADES).map(([key, value]) => (
                  <option key={key} value={value}>
                    {value}
                  </option>
                ))}
              {gradeScheme === "YDS" &&
                Object.entries(YDS_GRADES).map(([key, value]) => (
                  <option key={key} value={value}>
                    {value}
                  </option>
                ))}
            </select>
            {errors.grade && <p className="text-red-500">Grade is required</p>}
          </div>
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
