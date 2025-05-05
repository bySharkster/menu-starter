import "@workspace/ui/globals.css"
import type { Metadata } from "next"
import Sidebar from "@/components/organisms/Sidebar"
import RequireAuth from "@/components/templates/RequireAuth"


export const metadata: Metadata = {
  metadataBase: new URL('https://admin.digital-sunsets.vercel.app'),
  title: 'Dashboard | Admin Starter',
  openGraph: {
    images: '/opengraph-image.png',
    title: 'Dashboard | Admin Starter',
    description:
      'Dashboard | Admin Starter: A simple admin dashboard template.',
    url: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}`,
  },
}

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <RequireAuth>
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-6 flex flex-col gap-6">
        <div className="z-10">{children}</div>
      </main>
    </div>
    </RequireAuth>
  )
}
