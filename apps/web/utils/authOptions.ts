import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

import { type NextAuthOptions, getServerSession, type User } from 'next-auth'
import { plainPrisma } from '@workspace/prisma/utils/prismaClient'

declare module 'next-auth/jwt' {

  interface JWT {
    isAdmin: boolean
  }
}

declare module 'next-auth' {
  interface Session {
    user: User & {
      isAdmin: boolean
    }
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(plainPrisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async jwt({ token }) {
      const prismaUser = await plainPrisma.user.findUnique({
        where: {
          email: token.email as string,
        },
      })
      return {
        ...token,
        isAdmin: prismaUser?.isAdmin || false,
      }
    },

    async session({ session, token, user, newSession, trigger }) {
      if (token) {
        session.user.isAdmin = token.isAdmin
      }
      return session
    },
  },
}