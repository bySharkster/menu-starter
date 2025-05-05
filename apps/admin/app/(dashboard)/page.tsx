import { getServerSession } from "next-auth"
import { authOptions } from "@/utils/authOptions"
import { redirect } from "next/navigation"
import { Bell } from "lucide-react";
import { Input } from "@workspace/ui/components/input";
import { Separator } from "@workspace/ui/components/separator";
import UserMenu from "@/components/organisms/UserMenu";
import StatCards from "@/components/organisms/StatCards";
import QuickActions from "@/components/organisms/QuickActions";


export default async function HomePage() {

const session = await getServerSession(authOptions)

const user = session?.user 

 if (!user?.email || !user) {
  redirect('/signin')
 }

//  if (!session?.user?.isAdmin) {
//   redirect('https://digital-sunsets.com/contact')
//  }
 
  return (
<>
  <div className="flex items-center justify-between">
    <div>
        <h1 className="text-3xl font-bold">Welcome{user?.name ? `, ${user.name}` : "!"}</h1>
        <p className="text-muted-foreground">Here&apos;s what&apos;s happening today.</p>
    </div>
    <div className="flex items-center gap-4">
        <Input className="w-64" placeholder="Search..." />
        <Bell className="w-6 h-6" />
        <UserMenu user={user as { name: string; image?: string }} />
    </div>
  </div>
  <Separator />
  <StatCards />
  <QuickActions />
</>
  )
}
