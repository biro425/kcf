import { PrismaClient } from '../../generated/prisma'

// PrismaClient 인스턴스를 개발환경에서 중복 생성하지 않도록 전역으로 재사용합니다.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
