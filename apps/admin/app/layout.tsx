import { Geist, Geist_Mono } from "next/font/google"
import "@workspace/ui/globals.css"
import { Providers } from "@/components/templates/Wrappers/providers"
import type { Metadata } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "@/utils/authOptions"
import { Toaster } from "@workspace/ui/components/sonner"

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL('https://admin.digital-sunsets.vercel.app'),
  title: 'Admin Starter',
  openGraph: {
    images: '/opengraph-image.png',
    title: 'Admin Starter',
    description:
      'Admin Starter: A simple admin dashboard template.',
    url: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}`,
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession(authOptions)


  return (
    <html lang="en" suppressHydrationWarning >
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}
      >
        <Providers session={session}>{children}</Providers>
        <Toaster/>
      </body>
    </html>
  )
}
