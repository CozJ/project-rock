import { useForm } from 'react-hook-form'
import { ClimbingRoutes } from '@prisma/client';
import { trpc } from '@/utils/trpc';
import { useSession } from 'next-auth/react';


interface formData {
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

  const { data: session } = useSession()

  const { register, handleSubmit, formState: {errors} } = useForm<formData>();

  const createdRoute = trpc.addRoute.useMutation();

  const onFormSubmit = (data: formData) => {
    
    if (!session?.user?.email) return;

    if (data.date_started === null || data.date_finished === null) return;

    const formData: formData = {
      name: data.name,
      description: data.description,
      grade: data.grade,
      style: data.style,
      location: data.location,
      date_started: new Date(data.date_started),
      date_finished: new Date(data.date_finished),
      attempts: 0,
      userEmail: session.user.email,
    }
    createdRoute.mutateAsync(formData);
  };

  const onErrors = (errors: any) => console.error(errors);

  
  return (
    <div className='m-4 p-4'>
      <h1 className='font-bold text-xl'>New Route</h1>
      <form className='m-4 p-4 flex flex-col' onSubmit={handleSubmit(onFormSubmit, onErrors)}>
        <label className='p-1 text-lg font-semibold'>Name</label>
        <input className='p-1 border rounded-md w-72' type='text' placeholder='Name' {...register('name', { required: true },)}></input>
        {errors.name && <p className='text-red-500'>Name is required</p>}
        <label className='p-1 text-lg font-semibold'>Description</label>
        <input className='p-1 border rounded-md w-72' type='text' placeholder='Description' {...register('description', { required: true })}></input>
        {errors.description && <p className='text-red-500'>Description is required</p>}
        <label className='p-1 text-lg font-semibold'>Grade</label>
        <input className='p-1 border rounded-md w-72' type='text' placeholder='Grade' {...register('grade', { required: true })}></input>
        {errors.grade && <p className='text-red-500'>Grade is required</p>}
        <label className='p-1 text-lg font-semibold'>Style</label>
        <input className='p-1 border rounded-md w-72' type='text' placeholder='Style' {...register('style', { required: true })}></input>
        {errors.style && <p className='text-red-500'>Style is required</p>}
        <label className='p-1 text-lg font-semibold'>Location</label>
        <input className='p-1 border rounded-md w-72' type='text' placeholder='Style' {...register('location', { required: true })}></input>
        <label className='p-1 text-lg font-semibold'>Date Started</label>
        <input className='p-1 border rounded-md w-72' type='date' placeholder='Date Started' {...register('date_started', { required: true })}></input>
        {errors.date_started && <p className='text-red-500'>Date Started is required</p>}
        <label className='p-1 text-lg font-semibold'>Date Finished</label>
        <input className='p-1 border rounded-md w-72' type='date' placeholder='Date Finished' {...register('date_finished', { required: true })}></input>
        {errors.date_finished && <p className='text-red-500'>Date Finished is required</p>}
        <label className='p-1 text-lg font-semibold'>Attempts</label>
        <input className='p-1 border rounded-md w-72' type='number' placeholder='Attempts' {...register('attempts', { required: true })}></input>
        {errors.attempts && <p className='text-red-500'>Attempts is required</p>}
        <button className='py-1 px-6 my-4 text-lg font-semibold bg-blue-400 rounded-md w-max'>Submit</button>
        {createdRoute.error && <p className='text-red-500'>Error: {createdRoute.error.message}</p>}
      </form>
    </div>
  )
}
