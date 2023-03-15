import { useForm } from "react-hook-form";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import {
  FONT_GRADES,
  STYLES,
  V_GRADES,
  YDS_GRADES,
  BTG_GRADES,
} from "@/types/types";
import router from "next/router";
import { PromptLogin } from "@/components/auth/promptLogin";
import { useState } from "react";

type FormValues = {
  name: string;
  description: string | null;
  grade: string;
  style: string;
  location: string | null;
  date_started: Date;
  date_finished: Date | null;
  attempts: number;
  userId: string;
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
      if (!session?.user?.email) return;

      if (data.date_started === null || data.date_finished === null) return;

      const formData: FormValues = {
        name: data.name,
        description: data.description,
        grade: data.grade,
        style: data.style,
        location: data.location,
        date_started: new Date(data.date_started),
        date_finished: null,
        attempts: 0,
        userId: session.user.id,
      };
      createdRoute.mutateAsync(formData).then(() => router.push("/"));
    };

    const onErrors = (errors: any) => console.error(errors);

    return (
      <>
        <div className="m-2 flex flex-col items-center p-2">
          <form
            className="container flex flex-col items-end justify-between p-2 text-slate-600"
            onSubmit={handleSubmit(onFormSubmit, onErrors)}
          >
            <div className="flex w-full flex-row justify-between">
              <h1 className="text-2xl font-bold">Create a new route</h1>
            </div>
            <div className="flex w-full flex-col justify-center border-t p-4 md:flex-row">
              <div className="m-4 flex flex-col">
                <label className="mt-5 mb-2 text-lg font-semibold">Name</label>
                <input
                  className="w-80 rounded-md border p-1"
                  type="text"
                  placeholder="Name"
                  {...register("name", { required: true })}
                ></input>
                {errors.name && (
                  <p className="text-red-500">Name is required</p>
                )}

                <label className="mt-5 mb-2 text-lg font-semibold">
                  Description
                </label>
                <textarea
                  className="h-52 w-80 resize-none rounded-md border p-1"
                  placeholder="Description"
                  {...register("description")}
                ></textarea>
              </div>
              <div className="m-4 flex flex-col">
                <label className="mt-5 mb-2 text-lg font-semibold">Grade</label>
                <div className="flex flex-row justify-evenly w-80">
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
                  className="w-80 rounded-b-md border p-1"
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
                <label className="mt-5 mb-2 text-lg font-semibold">Style</label>
                <div className="flex w-80 flex-row justify-evenly">
                  <input
                    type="button"
                    onClick={() => setSelectedStyle(STYLES.sport)}
                    value={STYLES.sport}
                    key={STYLES.sport}
                    {...register("style", { required: true })}
                    className={`h-12 w-1/3 rounded-l-md bg-slate-600 text-center text-slate-100 hover:bg-slate-700 ${
                      selectedStyle === STYLES.sport && `bg-slate-800`
                    }`}
                  />
                  <input
                    type="button"
                    onClick={() => setSelectedStyle(STYLES.boulder)}
                    value={STYLES.boulder}
                    key={STYLES.boulder}
                    {...register("style", { required: true })}
                    className={`h-12 w-1/3 bg-slate-600 text-center text-slate-100 hover:bg-slate-700 ${
                      selectedStyle === STYLES.boulder && `bg-slate-800`
                    }`}
                  />
                  <input
                    type="button"
                    onClick={() => setSelectedStyle(STYLES.trad)}
                    value={STYLES.trad}
                    key={STYLES.trad}
                    {...register("style", { required: true })}
                    className={`h-12 w-1/3 rounded-r-md bg-slate-600 text-center text-slate-100 hover:bg-slate-700 ${
                      selectedStyle === STYLES.trad && `bg-slate-800`
                    }`}
                  />
                </div>
                {errors.style && (
                  <p className="text-red-500">Style is required</p>
                )}

                <label className="mt-5 mb-2 text-lg font-semibold">
                  Location
                </label>
                <input
                  className="w-80 rounded-md border p-1"
                  type="text"
                  placeholder="Style"
                  {...register("location", { required: true })}
                ></input>
                {errors.location && (
                  <p className="text-red-500">Location is required</p>
                )}

                <label className="mt-5 mb-2 text-lg font-semibold">
                  Date Started
                </label>
                <input
                  className="w-80 rounded-md border p-1 w-"
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
            <button className="hover:bg-green-mt-5 my-4 mb-2 w-max rounded-md bg-green-500 py-1 px-6 text-lg font-semibold text-white hover:bg-green-600">
              Submit
            </button>
          </form>
        </div>
      </>
    );
  }
  return <PromptLogin />;
}
