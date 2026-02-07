'use server';

import { PrismaClient, User, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export type AuthResponse = {
    success: boolean;
    user?: User;
    error?: string;
};

export async function registerUser(formData: FormData): Promise<AuthResponse> {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const role = formData.get('role') as UserRole || 'CUSTOMER';

    if (!name || !email || !password) {
        return { success: false, error: 'All fields are required' };
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return { success: false, error: 'User with this email already exists' };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                role,
                profile: {
                    create: {
                        name,
                        // Default mock avatar
                        avatar: `https://ui-avatars.com/api/?name=${name.replace(' ', '+')}&background=random`
                    }
                }
            }
        });

        return { success: true, user: newUser };

    } catch (error) {
        console.error("Registration Error:", error);
        return { success: false, error: 'Registration failed. Please try again.' };
    }
}

export async function loginUser(formData: FormData): Promise<AuthResponse> {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
        return { success: false, error: 'Email and password are required' };
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email },
            include: { profile: true } // Include profile to get name/avatar
        });

        if (!user) {
            return { success: false, error: 'Invalid email or password' };
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return { success: false, error: 'Invalid email or password' };
        }

        return { success: true, user };

    } catch (error) {
        console.error("Login Error:", error);
        return { success: false, error: 'Login failed. Please try again.' };
    }
}
