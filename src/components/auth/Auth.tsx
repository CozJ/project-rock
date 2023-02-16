import React from 'react'
import pb from '@/lib/pocketbase'

export const Auth = () => {
  return (
    <div>Authstate = {pb.authStore.isValid.toString()}</div>
  )
}
