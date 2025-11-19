import { cookies } from "next/headers"
import { prisma } from "./prisma"
import bcrypt from "bcrypt"

const SESSION_COOKIE_NAME = "auth-session"
const SESSION_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

export interface SessionUser {
  id: string
  email: string
  name: string | null
  role: "USER" | "ADMIN"
}

export async function createSession(userId: string): Promise<string> {
  const sessionToken = `${userId}-${Date.now()}-${Math.random().toString(36).substring(7)}`
  
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  })

  return sessionToken
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}

export async function getSessionUser(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value

    if (!sessionToken) {
      return null
    }

    // Extract user ID from session token (format: userId-timestamp-random)
    const userId = sessionToken.split("-")[0]

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    })

    if (!user) {
      return null
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    }
  } catch {
    return null
  }
}

export async function verifyCredentials(
  email: string,
  password: string
): Promise<SessionUser | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return null
    }

    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) {
      return null
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    }
  } catch {
    return null
  }
}

