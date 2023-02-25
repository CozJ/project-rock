import { useSession } from 'next-auth/react'
import { trpc } from '@/utils/trpc'
import { AuthButton } from '@/components/auth/AuthButton';

export default function Home() {
  const { data: session } = useSession()
  const userList = trpc.userList.useQuery();

  if (!userList.data){
    return (
      <h1>Loading...</h1>
    )
  }
  if (session) {
    return (
      <>
        <div>
          <h1>Welcome to Project-Rock, {session.user?.name}</h1>
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
