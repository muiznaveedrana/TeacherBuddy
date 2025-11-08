/**
 * AUTH HELPERS - Supabase Auth Integration
 *
 * Server-side authentication utilities for checking user roles
 * and protecting admin routes.
 */

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { SupabaseClient } from '@supabase/supabase-js'

/**
 * Create Supabase server client for server-side auth
 */
export function createServerSupabaseClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Cookie setting can fail in server components
            // This is expected during initial render
          }
        },
        remove(name: string, options: any) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // Cookie removal can fail in server components
          }
        },
      },
    }
  )
}

/**
 * Get current authenticated user (server-side)
 */
export async function getUser() {
  const supabase = createServerSupabaseClient()

  const { data: { user }, error } = await supabase.auth.getUser()

  if (error) {
    console.error('❌ Auth error:', error)
    return null
  }

  return user
}

/**
 * Get user's profile including role (server-side)
 */
export async function getUserProfile(userId?: string) {
  const supabase = createServerSupabaseClient()

  // If no userId provided, get current user
  const targetUserId = userId || (await getUser())?.id

  if (!targetUserId) {
    return null
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', targetUserId)
    .single()

  if (error) {
    console.error('❌ Profile fetch error:', error)
    return null
  }

  return profile
}

/**
 * Check if current user is an admin (server-side)
 */
export async function isAdmin(): Promise<boolean> {
  const user = await getUser()

  if (!user) {
    return false
  }

  const profile = await getUserProfile(user.id)

  return profile?.role === 'admin'
}

/**
 * Require admin role - throws error if not admin (for API routes)
 */
export async function requireAdmin() {
  const admin = await isAdmin()

  if (!admin) {
    throw new Error('Unauthorized: Admin access required')
  }

  return true
}

/**
 * Get current session (server-side)
 */
export async function getSession() {
  const supabase = createServerSupabaseClient()

  const { data: { session }, error } = await supabase.auth.getSession()

  if (error) {
    console.error('❌ Session error:', error)
    return null
  }

  return session
}
