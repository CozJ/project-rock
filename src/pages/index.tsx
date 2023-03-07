import { useSession } from 'next-auth/react'
import { trpc } from '@/utils/trpc'
import { AuthButton } from '@/components/auth/AuthButton';
import Link from 'next/link';

export default function Home() {
  const { data: session } = useSession()
  const userRoutes = trpc.getUsersRoutes.useQuery({userEmail: session?.user?.email});

  if (userRoutes.isLoading) return <div>Loading...</div>

  if (userRoutes.error) return <div>{userRoutes.error.message}</div>

  if (session) {
    return (
      <>
        <div className='m-2 p-2'>
          <h1 className='m-4 py-2 font-bold text-2xl'>Welcome to Project-Rock, {session.user?.name}</h1>
          <table className='w-1/2 p-8 m-4 text-left text-bold border-b-2'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Grade</th>
                <th>Style</th>
              </tr>
            </thead>
            <tbody>
              {userRoutes.data?.map((route) => (
                <tr key={route.id}>
                  <td>{route.name}</td>
                  <td>{route.description}</td>
                  <td>{route.grade}</td>
                  <td>{route.style}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link href={'/newRoute'}>
            <div className='m-4 my-8 p-2 px-4 bg-blue-400 rounded-md font-semibold max-h-fit max-w-fit'>Add New Route</div>
          </Link>
        </div>
      </>
    )
  }
  return (
      <div className='w-full text-2xl h-72 flex justify-center items-center flex-row'>
        <h1>Welcome to Project-Rock, Please&nbsp;</h1><AuthButton className='hover:underline'/>
      </div>
  )
}
