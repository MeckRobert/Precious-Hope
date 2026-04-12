// lib/session-client.ts
import { UserRole } from '@prisma/client'

// Client-safe function to get redirect path from role
export function getRedirectPathFromRole(role: string): string {
  switch (role) {
    case 'ADMIN':
      return '/components/dashboard/admin'
    case 'SELLER':
      return '/components/dashboard/seller'
    case 'CUSTOMER':
      return '/components/dashboard/customer'
    default:
      return '/profile'
  }
}

// Also add getUserRoleRedirectedPath here for client components
export function getUserRoleRedirectedPath(role: UserRole): string {
  switch (role) {
    case 'ADMIN':
      return '/components/dashboard/admin'
    case 'SELLER':
      return '/components/dashboard/seller'
    case 'CUSTOMER':
      return '/components/dashboard/customer'
    default:
      return '/'
  }
}