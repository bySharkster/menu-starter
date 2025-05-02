import { getServerSession } from "next-auth"
import { authOptions } from "@/utils/authOptions"
import { redirect } from "next/navigation"
import SignoutButton from "@/components/atoms/SignoutButton"
import MenuDashboard from "@/components/organisms/MenuDashboard"
import { Suspense } from "react"
import { menuCategoriesOperations, menuItemsOperations } from "@workspace/db/crud/menu"
import { MenuStoreProvider } from "@/components/templates/MenuStoreProvider"

export default async function Page() {

const session = await getServerSession(authOptions)

 const userEmail = session?.user?.email
 const userName = session?.user?.name
 const isAdmin = session?.user?.isAdmin === true

 const initialCategories = await menuCategoriesOperations.findMany()
 const initialMenuItems = await menuItemsOperations.findMany()

 if (!userEmail) {
  redirect('/signin')
 }

//  if (!isAdmin) {
//   redirect('https://digital-sunsets.com/contact')
//  }
 
  return (
    <main className="flex items-center justify-center min-h-svh">
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
        <div className="w-full max-w-[90vw]">
           <Suspense fallback={<div>Loading...</div>}>
              <MenuStoreProvider initialCategories={initialCategories} initialMenuItems={initialMenuItems}>
                <MenuDashboard />
              </MenuStoreProvider>
           </Suspense>
        </div>
      </div>
    </main>
  )
}
