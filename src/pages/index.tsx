import { useSession } from 'next-auth/react'
import { trpc } from '@/utils/trpc'

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
        <h1>Welcome {session.user?.name}</h1>
        {userList.data.map((user) =>
          <h2>{user.name}</h2>)}
      </>
    )
  }
  return (
      <h1>Welcome to Project-Rock</h1>
  )
}
