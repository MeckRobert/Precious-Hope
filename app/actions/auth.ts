'use server'


import { prisma } from '@/lib/prisma'
import { compare, hash } from 'bcryptjs'
import { z } from 'zod'
import { UserRole } from '@prisma/client'
import { setSession, clearSession, getSession as getServerSession } from '@/lib/session-server'
import { getUserRoleRedirectedPath } from '@/lib/session-client' // Import from client file
import { redirect } from 'next/navigation'

// Validation schemas
const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['CUSTOMER', 'ADMIN', 'SELLER']).default('CUSTOMER'), // Fixed: Added VENDOR
})

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

// ============ REGISTER FUNCTION ============
export async function registerUser(formData: FormData) {
  try {
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const role = formData.get('role') as UserRole || 'CUSTOMER'

    const validated = registerSchema.parse({ name, email, password, role })
    
    const existingUser = await prisma.user.findUnique({
      where: { email: validated.email }
    })
    
    if (existingUser) {
      return { success: false, error: 'User with this email already exists' }
    }
    
    const hashedPassword = await hash(validated.password, 10)
    
    const user = await prisma.user.create({
      data: {
        name: validated.name,
        email: validated.email,
        password: hashedPassword,
        role: validated.role,
      }
    })
    
    // Auto-login after registration
    await setSession({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }, false)
    
    // Return success with redirect path
    return { 
      success: true, 
      redirectTo: getUserRoleRedirectedPath(user.role),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    }
    
  } catch (error) {
    console.error('Registration error:', error)
    
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0]?.message || 'Validation failed' }
    }
    
    return { success: false, error: 'An unexpected error occurred. Please try again.' }
  }
}


// ============ LOGIN FUNCTION ============
export async function loginUser(formData: FormData) {
  try {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const rememberMe = formData.get('rememberMe') === 'on'

    const validated = loginSchema.parse({ email, password })
    
    const user = await prisma.user.findUnique({
      where: { email: validated.email }
    })
    
    if (!user) {
      return { success: false, error: 'Invalid email or password' }
    }
    
    const passwordValid = await compare(validated.password, user.password)
    
    if (!passwordValid) {
      return { success: false, error: 'Invalid email or password' }
    }
    
    // Set session
    await setSession({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }, rememberMe)
    
    // Return success with redirect path instead of calling redirect()
    return { 
      success: true, 
      redirectTo: getUserRoleRedirectedPath(user.role),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    }
    
  } catch (error) {
    console.error('Login error:', error)
    
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        error: error.issues[0]?.message || 'Validation failed' 
      }
    }
    
    return { 
      success: false, 
      error: 'An unexpected error occurred. Please try again.' 
    }
  }
}

// ============ LOGOUT FUNCTION ============
export async function logoutUser() {
  await clearSession()
  redirect('/')
}

// ============ GET CURRENT USER ============
export async function getCurrentUser() {
  const { getSession } = await import('@/lib/session-server')
  return await getSession()
}