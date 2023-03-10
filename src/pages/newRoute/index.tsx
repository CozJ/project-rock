import { useForm } from "react-hook-form";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { STYLES, V_GRADES } from "@/types/types";
import router from "next/router";

type FormValues = {
  name: string;
  description: string | null;
  grade: string | null;
  style: string | null;
  location: string | null;
  date_started: Date | null;
  date_finished: Date | null;
  attempts: number;
  userEmail: string;
}

export default function NewRoute() {
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const createdRoute = trpc.createRoute.useMutation();

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
      date_finished: new Date(data.date_finished),
      attempts: 0,
      userEmail: session.user.email,
    };
    createdRoute.mutateAsync(formData).then(() => router.push("/"));
  };

  const onErrors = (errors: any) => console.error(errors);

  return (
    <div className="m-4 p-4">
      <h1 className="text-xl font-bold">New Route</h1>
      <form
        className="m-4 flex flex-col p-4"
        onSubmit={handleSubmit(onFormSubmit, onErrors)}
      >
        <label className="p-1 text-lg font-semibold">Name</label>
        <input
          className="w-72 rounded-md border p-1"
          type="text"
          placeholder="Name"
          {...register("name", { required: true })}
        ></input>
        {errors.name && <p className="text-red-500">Name is required</p>}

        <label className="p-1 text-lg font-semibold">Description</label>
        <textarea
          className="h-52 w-72 resize-none rounded-md border p-1"
          placeholder="Description"
          {...register("description", { required: true })}
        ></textarea>
        {errors.description && (
          <p className="text-red-500">Description is required</p>
        )}

        <label className="p-1 text-lg font-semibold">Grade</label>
        <select
          className="w-72 rounded-md border p-1"
          placeholder="Grade"
          {...register("grade", { required: true })}
        >
          {Object.entries(V_GRADES).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
        {errors.grade && <p className="text-red-500">Grade is required</p>}

        <label className="p-1 text-lg font-semibold">Style</label>
        <select
          className="w-72 rounded-md border p-1"
          placeholder="Style"
          {...register("style", { required: true })}
        >
          {Object.entries(STYLES).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
        {errors.style && <p className="text-red-500">Style is required</p>}

        <label className="p-1 text-lg font-semibold">Location</label>
        <input
          className="w-72 rounded-md border p-1"
          type="text"
          placeholder="Style"
          {...register("location", { required: true })}
        ></input>
        {errors.location && (
          <p className="text-red-500">Location is required</p>
        )}

        <label className="p-1 text-lg font-semibold">Date Started</label>
        <input
          className="w-72 rounded-md border p-1"
          type="date"
          placeholder="Date Started"
          {...register("date_started", { required: true })}
        ></input>
        {errors.date_started && (
          <p className="text-red-500">Date Started is required</p>
        )}

        <label className="p-1 text-lg font-semibold">Date Finished</label>
        <input
          className="w-72 rounded-md border p-1"
          type="date"
          placeholder="Date Finished"
          {...register("date_finished", { required: true })}
        ></input>
        {errors.date_finished && (
          <p className="text-red-500">Date Finished is required</p>
        )}

        <label className="p-1 text-lg font-semibold">Attempts</label>
        <input
          className="w-72 rounded-md border p-1"
          type="number"
          placeholder="Attempts"
          {...register("attempts", { required: true })}
        ></input>
        {errors.attempts && (
          <p className="text-red-500">Attempts is required</p>
        )}

        <button className="my-4 w-max rounded-md bg-blue-400 py-1 px-6 text-lg font-semibold">
          Submit
        </button>
        {createdRoute.error && (
          <p className="text-red-500">Error: {createdRoute.error.message}</p>
        )}
      </form>
    </div>
  );
}
