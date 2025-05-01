import { Geist, Geist_Mono } from "next/font/google"

import "@workspace/ui/globals.css"
import { Providers } from "@/components/providers"
import type { Metadata } from "next"
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
  metadataBase: new URL('https://menu.digital-sunsets.vercel.app'),
  title: 'Menu Starter',
  openGraph: {
    images: '/opengraph-image.png',
    title: 'Menu Starter',
    description:
      'Menu Starter: A simple menu dashboard template.',
    url: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}`,
  },
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}
      >
        <Providers>{children}</Providers>
        
        <Toaster />
      </body>
    </html>
  )
}
