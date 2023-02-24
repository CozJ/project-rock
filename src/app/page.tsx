'use client'

import { useSession } from 'next-auth/react'

export default function Home() {
  const { data: session } = useSession()

  if (session) {
    return (
      <main>
        <h1>Welcome {session.user?.name}</h1>
      </main>
    )
  }
  return (
    <main>
      <h1>Welcome to Project-Rock</h1>
    </main>
  )
}
