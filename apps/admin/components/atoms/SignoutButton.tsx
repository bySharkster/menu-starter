"use client"
import { signOut } from 'next-auth/react'
import React from 'react'


const SignoutButton = () => {
  return (
      <button type="button" onClick={() => {signOut()}}>Sign out</button>
  )
}

export default SignoutButton