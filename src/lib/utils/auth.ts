import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import type { User } from '@supabase/supabase-js'

export interface AuthenticatedRequest extends NextRequest {
  user: User
}

/**
 * Create Supabase client for server-side usage in API routes
 */
async function createSupabaseServerClient() {
  const cookieStore = await cookies()
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set(name, value, options)
          } catch {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set(name, '', { ...options, maxAge: 0 })
          } catch {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}

/**
 * Middleware to require authentication for API routes
 * Returns authenticated user or error response
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function requireAuth(
  _request: NextRequest
): Promise<{ user: User } | NextResponse> {
  try {
    const supabase = await createSupabaseServerClient()
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error || !user) {
      return NextResponse.json(
        { 
          error: 'Unauthorized', 
          message: 'Authentication required',
          code: 'AUTH_REQUIRED'
        },
        { status: 401 }
      )
    }

    return { user }
  } catch (error) {
    console.error('Authentication error:', error)
    return NextResponse.json(
      { 
        error: 'Authentication failed', 
        message: 'Unable to verify authentication',
        code: 'AUTH_ERROR'
      },
      { status: 401 }
    )
  }
}

/**
 * Helper function to get authenticated user from request
 * For use in API route handlers after requireAuth
 */
export async function getAuthenticatedUser(): Promise<User | null> {
  try {
    const supabase = await createSupabaseServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    return user
  } catch (error) {
    console.error('Error getting authenticated user:', error)
    return null
  }
}

/**
 * Type guard to check if auth result contains user
 */
export function isAuthSuccess(
  authResult: { user: User } | NextResponse
): authResult is { user: User } {
  return 'user' in authResult
}