
import { PrismaClient, UserRole } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    const password = await bcrypt.hash('password123', 10)

    // Admin
    const adminEmail = 'admin@example.com'
    const admin = await prisma.user.upsert({
        where: { email: adminEmail },
        update: {},
        create: {
            email: adminEmail,
            password,
            role: UserRole.ADMIN,
            profile: {
                create: {
                    name: 'Admin User',
                    bio: 'System Administrator',
                }
            }
        },
    })
    console.log({ admin })

    // Seller
    const sellerEmail = 'seller@example.com'
    const seller = await prisma.user.upsert({
        where: { email: sellerEmail },
        update: {},
        create: {
            email: sellerEmail,
            password,
            role: UserRole.SELLER,
            profile: {
                create: {
                    name: 'Seller User',
                    bio: 'Verified Seller',
                }
            }
        },
    })
    console.log({ seller })

    // Customer
    const customerEmail = 'customer@example.com'
    const customer = await prisma.user.upsert({
        where: { email: customerEmail },
        update: {},
        create: {
            email: customerEmail,
            password,
            role: UserRole.CUSTOMER,
            profile: {
                create: {
                    name: 'Customer User',
                    bio: 'Valued Customer',
                }
            }
        },
    })
    console.log({ customer })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })