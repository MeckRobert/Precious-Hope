// lib/session-types.ts
import { UserRole } from '@prisma/client'

export type SessionUser = {
  id: string
  email: string
  name: string
  role: UserRole
}