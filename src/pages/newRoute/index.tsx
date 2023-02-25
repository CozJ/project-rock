//date_started  DateTime  @db.Date
// date_finished DateTime  @db.Date
// attempts      Int

export default function NewRoute() {

  return (
    <div className='m-4 p-4'>
        <h1 className="font-bold text-xl">New Route</h1>
        <form className='m-4 p-4 flex flex-col'>
          <label className='p-1 text-lg font-semibold'>Name</label>
          <input className='p-1 border rounded-md w-72' type='text' placeholder='Name'></input>
          <label className='p-1 text-lg font-semibold'>Description</label>
          <input className='p-1 border rounded-md w-72' type='text' placeholder='Description'></input>
          <label className='p-1 text-lg font-semibold'>Grade</label>
          <input className='p-1 border rounded-md w-72' type='text' placeholder='Grade'></input>
          <label className='p-1 text-lg font-semibold'>Style</label>
          <input className='p-1 border rounded-md w-72' type='text' placeholder='Style'></input>
          <label className='p-1 text-lg font-semibold'>Date Started</label>
          <input className='p-1 border rounded-md w-72' type='date' placeholder='Date Started'></input>
          <label className='p-1 text-lg font-semibold'>Date Finished</label>
          <input className='p-1 border rounded-md w-72' type='date' placeholder='Date Finished'></input>
          <label className='p-1 text-lg font-semibold'>Attempts</label>
          <input className='p-1 border rounded-md w-72' type='number' placeholder='Attempts'></input>
          <button className='py-1 px-6 my-4 text-lg font-semibold bg-blue-400 rounded-md w-max'>Submit</button>
        </form>
    </div>
  )
}
