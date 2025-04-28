"use client"
import { Button } from '@workspace/ui/components/button'
import { signOut } from 'next-auth/react'
import React from 'react'

const SignoutButton = () => {
  return (
            <Button onClick={() => signOut()}>Sign out</Button>
  )
}

export default SignoutButton