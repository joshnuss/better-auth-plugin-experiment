import { PrismaClient } from '../../../prisma/src/generated/prisma/client.js'
import { DATABASE_URL } from '$env/static/private'
import { PrismaPg } from '@prisma/adapter-pg'

export * from '../../../prisma/src/generated/prisma/client.js'

const adapter = new PrismaPg({
  connectionString: DATABASE_URL
})

export const db = new PrismaClient({ adapter })
