// lib/session-server.ts
import 'server-only'
import { UserRole } from '@prisma/client'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { SessionUser } from './session-types'  // Import type from shared file

const secretKey = process.env.JWT_SECRET;

if (!secretKey && process.env.NODE_ENV === 'production') {
  throw new Error('JWT_SECRET missing in production');
}
const key = new TextEncoder().encode(secretKey || '');

export async function encrypt(payload: SessionUser & { expires: Date }) {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(payload.expires)
    .sign(key)
}

export async function decrypt(input: string): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ['HS256']
    })
    return payload as unknown as SessionUser
  } catch (error) {
    return null
  }
}

export async function getSession() {
  const cookieStore = await cookies()
  const session = cookieStore.get('session')?.value
  if (!session) return null
  return await decrypt(session)
}

export async function setSession(user: SessionUser, rememberMe: boolean = false) {
  const expires = new Date()
  expires.setDate(expires.getDate() + (rememberMe ? 30 : 1))

  const session = await encrypt({ ...user, expires })
  const cookieStore = await cookies()
  
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires,
    sameSite: 'lax',
    path: '/',
  })
}

export async function clearSession() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}

export function getUserRoleRedirectedPath(role: UserRole) {
  switch (role) {
    case 'ADMIN':
      return '/dashboard/admin'
    case 'SELLER':
      return '/dashboard/seller'
    case 'CUSTOMER':
      return '/dashboard/customer'
    default:
      return '/'
  }
}