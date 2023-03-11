import React from 'react'
import { AuthButton } from './AuthButton'

export const PromptLogin = () => {
  return (
    <>
      <div className="flex h-72 w-full flex-row items-center justify-center text-2xl">
        <h1>Welcome to Project-Rock, Please&nbsp;</h1>
        <AuthButton className="hover:underline" />
      </div>
    </>
  )
}
