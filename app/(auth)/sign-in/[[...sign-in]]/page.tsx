import { SignIn } from "@clerk/nextjs";
import React from 'react'

const SignInPage = () => {
  return (
    <main className="flex justify-center items-center h-screen w-full">
        <SignIn />
    </main>
  )
}

export default SignInPage
