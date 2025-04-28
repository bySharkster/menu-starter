import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

// Plain client for NextAuth
export const plainPrisma = new PrismaClient()

// Extended client for your app
const prisma = plainPrisma.$extends(withAccelerate())

const globalForPrisma = global as unknown as { prisma: typeof prisma }
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma