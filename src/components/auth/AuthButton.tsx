'use client'

import { useSession, signIn, signOut } from "next-auth/react"

export const AuthButton = () => {
    const { data: session } = useSession()
    if (session) return (
        <>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => signOut()}
            >
                SignOut
            </button>
        </>
    )
    return (
        <>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => signIn()}
            >
                SignIn
            </button>
        </>
    )
}
