import { BTG_GRADES, FONT_GRADES, V_GRADES, YDS_GRADES } from "@/types/types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import getGradeSchemeFromValue from "@/utils/getGradeSchemeFromValue";

type InlineGradeEditProps = {
  value: string | undefined;
  onChange: (value: Date | undefined) => void;
  required: boolean;
  defaultStyle: string;
};

export const InlineUpdateGrade = (props: InlineGradeEditProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [gradeScheme, setGradeScheme] = useState<string | undefined>(
    getGradeSchemeFromValue(props.value) || undefined
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
          <div className="flex max-w-4xl flex-col text-slate-100 items-end">
            <div className="flex w-full max-w-4xl flex-row justify-evenly">
              <button
                className={`h-12 w-1/4 rounded-tl-md bg-slate-600 hover:bg-slate-700 ${
                  gradeScheme === "V" && "bg-slate-800"
                } `}
                type="button"
                onClick={() => {
                  setGradeScheme("V");
                  setInputValue(V_GRADES.V0);
                }}
              >
                V
              </button>
              <button
                className={`h-12 w-1/4 bg-slate-600  hover:bg-slate-700 ${
                  gradeScheme === "FONT" && "bg-slate-800"
                } `}
                type="button"
                onClick={() => {
                  setGradeScheme("FONT");
                  setInputValue(FONT_GRADES.f1);
                }}
              >
                Font
              </button>
              <button
                className={`h-12 w-1/4 bg-slate-600 text-slate-100 hover:bg-slate-700 ${
                  gradeScheme === "BTG" && "bg-slate-800"
                } `}
                type="button"
                onClick={() => {
                  setGradeScheme("BTG");
                  setInputValue(BTG_GRADES.MOD);
                }}
              >
                B.Trad
              </button>
              <button
                className={`h-12 w-1/4 rounded-tr-md bg-slate-600 text-slate-100 hover:bg-slate-700  ${
                  gradeScheme === "YDS" && "bg-slate-800"
                } `}
                type="button"
                onClick={() => {
                  setGradeScheme("YDS");
                  setInputValue(YDS_GRADES.YSD5_1);
                }}
              >
                USA
              </button>
            </div>
            <select
              className="w-full max-w-4xl rounded-b-md border p-1 text-slate-600"
              placeholder="Grade"
              defaultValue={value}
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
