import { getServerSession } from "next-auth"
import { authOptions } from "@/utils/authOptions"
import { redirect } from "next/navigation"
import { Suspense } from "react"
import SignoutButton from "@/components/atoms/SignoutButton"

export default async function Page() {

  const session = await getServerSession(authOptions)

 const userEmail = session?.user?.email
 const userName = session?.user?.name
 const isAdmin = session?.user?.isAdmin === true

 if (!userEmail) {
   return redirect('/signin')
 }


  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello {isAdmin ? 'Admin' : 'User'} {userName}</h1>
        {session?.user?.image && (
          <img
            src={session?.user?.image}
            alt={session?.user?.name || ''}
            width={100}
            height={100}
            className="rounded-full"
          />
        )}
        <SignoutButton/>
      </div>
    </div>
  )
}
