import { useForm } from "react-hook-form";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import {
  FONT_GRADES,
  STYLES,
  V_GRADES,
  YDS_GRADES,
  BTG_GRADES,
  STATUS,
} from "@/types/types";
import router from "next/router";
import { PromptLogin } from "@/components/auth/promptLogin";
import { useState } from "react";

type FormValues = {
  name: string;
  description: string | undefined;
  grade: string;
  style: string;
  location: string | undefined;
  date_started: Date;
  date_finished: Date | undefined;
  status: string;
};

export default function NewRoute() {
  const { data: session } = useSession();

  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [gradeScheme, setGradeScheme] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const createdRoute = api.climbingRoutes.createRoute.useMutation();

  if (session) {
    const onFormSubmit = (data: FormValues) => {
      if (!session?.user?.id) return;

      if (data.date_started === null || data.date_finished === null) return;

      const formData: FormValues = {
        name: data.name,
        description: data.description,
        grade: data.grade,
        style: data.style,
        location: data.location,
        date_started: new Date(data.date_started),
        date_finished: undefined,
        status: STATUS.new,
      };
      createdRoute.mutateAsync(formData).then(() => router.push("/"));
    };

    const onErrors = (errors: any) => console.error(errors);

    return (
      <>
        <div className="container m-2 mt-10 flex min-h-min flex-col items-center border-b p-2">
          <form
            className="flex w-full flex-col items-end justify-between p-2 text-slate-600"
            onSubmit={handleSubmit(onFormSubmit, onErrors)}
          >
            <div className="flex min-h-fit w-full flex-row justify-between">
              <h1 className="text-2xl font-bold">Create a new route</h1>
            </div>
            <div className="flex w-full flex-col border-t md:flex-row">
              <div className="flex min-h-fit w-full flex-col md:m-4">
                <label className="mb-1 min-h-fit mt-5 h-11 text-lg font-semibold">Name</label>
                <input
                  className="w-full min-h-fit max-w-4xl rounded-lg border p-1"
                  type="text"
                  placeholder="Name"
                  {...register("name", { required: true })}
                ></input>
                {errors.name && (
                  <p className="text-red-500">Name is required</p>
                )}

                <label className="mb-1 min-h-fit mt-5 h-11 text-lg font-semibold">
                  Description
                </label>
                <textarea
                  className="h-40 w-full min-h-fit max-w-4xl resize-none rounded-lg border p-1 md:h-full"
                  placeholder="Description"
                  {...register("description")}
                ></textarea>
              </div>
              <div className="flex w-full flex-col md:m-4">
                <label className="mb-2 min-h-fit mt-5 text-lg font-semibold">Grade</label>
                <div className="flex w-full min-h-fit max-w-4xl flex-row justify-evenly">
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
                {errors.grade && (
                  <p className="text-red-500">Grade is required</p>
                )}

                <label className="mb-2 mt-5 text-lg font-semibold">Style</label>
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
                      onClick={() => setSelectedStyle(STYLES.trad)}
                      {...register("style", { required: true })}
                      className="invisible"
                    />
                    {STYLES.trad}
                  </label>
                </div>
                {errors.style && (
                  <p className="text-red-500">Style is required</p>
                )}

                <label className="mb-2 mt-5 text-lg font-semibold">
                  Location
                </label>
                <input
                  className="w-full max-w-4xl rounded-lg border p-1"
                  type="text"
                  placeholder="Location"
                  {...register("location", { required: true })}
                ></input>
                {errors.location && (
                  <p className="text-red-500">Location is required</p>
                )}

                <label className="mb-2 mt-5 text-lg font-semibold">
                  Date Started
                </label>
                <input
                  className="w-full max-w-4xl rounded-lg border p-1"
                  type="date"
                  placeholder="Date Started"
                  {...register("date_started", { required: true })}
                ></input>
                {errors.date_started && (
                  <p className="text-red-500">Date Started is required</p>
                )}

                {createdRoute.error && (
                  <p className="text-red-500">
                    Error: {createdRoute.error.message}
                  </p>
                )}
              </div>
            </div>
            <button className="w-max rounded-lg bg-slate-600 px-6 py-1 text-lg text-white hover:bg-slate-800 max-md:my-8 md:m-4">
              Submit
            </button>
          </form>
        </div>
      </>
    );
  }
  return <PromptLogin />;
}
