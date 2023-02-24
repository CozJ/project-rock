import { useSession } from 'next-auth/react'
import { trpc } from '@/utils/trpc'

export default function Home() {
  const { data: session } = useSession()
  const hello = trpc.hello.useQuery({ name: 'world' });

  if (!hello.data){
    return (
      <h1>Loading...</h1>
    )
  }
  if (session) {
    return (
      <>
        <h1>Welcome {session.user?.name}</h1>
        <h2>{hello.data.message}</h2>
      </>
    )
  }
  return (
      <h1>Welcome to Project-Rock</h1>
  )
}
