"use client"

import type * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import SessionProvider from '@/context/SessionProvider'
import type { Session } from "next-auth"

export function Providers({ children, session }: { children: React.ReactNode, session: Session | null }) {
  return (
    <SessionProvider session={session}>
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      {children}
    </NextThemesProvider>
    </SessionProvider>
  )
}
