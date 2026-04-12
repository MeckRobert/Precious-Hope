import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

// Check if DATABASE_URL exists
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in .env file')
}

// Create a connection pool with proper configuration
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Add these for better connection handling
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
})

// Test the database connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to database:', err.message)
    console.error('Please check:')
    console.error('1. Your database is running')
    console.error('2. DATABASE_URL in .env is correct')
    console.error('3. Network/firewall settings allow the connection')
  } else {
    console.log('Successfully connected to database')
    release()
  }
})

// Initialize the Prisma adapter
const adapter = new PrismaPg(pool)

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' 
      ? ['query', 'error', 'warn'] 
      : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma