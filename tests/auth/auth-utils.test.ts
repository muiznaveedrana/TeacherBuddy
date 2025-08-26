import { describe, it, expect, beforeEach, vi } from 'vitest'
import { NextRequest } from 'next/server'
import { requireAuth, getAuthenticatedUser, isAuthSuccess } from '@/lib/utils/auth'

// Mock Supabase
vi.mock('@supabase/ssr', () => ({
  createServerClient: vi.fn(() => ({
    auth: {
      getUser: vi.fn(),
    },
  })),
}))

vi.mock('next/headers', () => ({
  cookies: vi.fn(() => ({
    get: vi.fn(),
    set: vi.fn(),
  })),
}))

describe('Auth Utils', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('requireAuth', () => {
    it('should return user when authenticated', async () => {
      const { createServerClient } = await import('@supabase/ssr')
      const mockSupabase = {
        auth: {
          getUser: vi.fn().mockResolvedValue({
            data: { user: { id: 'user-id', email: 'test@example.com' } },
            error: null,
          }),
        },
      }
      ;(createServerClient as any).mockReturnValue(mockSupabase)

      const request = new NextRequest('http://localhost:3000/api/test')
      const result = await requireAuth(request)

      expect(isAuthSuccess(result)).toBe(true)
      if (isAuthSuccess(result)) {
        expect(result.user.id).toBe('user-id')
        expect(result.user.email).toBe('test@example.com')
      }
    })

    it('should return error response when not authenticated', async () => {
      const { createServerClient } = await import('@supabase/ssr')
      const mockSupabase = {
        auth: {
          getUser: vi.fn().mockResolvedValue({
            data: { user: null },
            error: new Error('Not authenticated'),
          }),
        },
      }
      ;(createServerClient as any).mockReturnValue(mockSupabase)

      const request = new NextRequest('http://localhost:3000/api/test')
      const result = await requireAuth(request)

      expect(isAuthSuccess(result)).toBe(false)
      if (!isAuthSuccess(result)) {
        expect(result.status).toBe(401)
      }
    })
  })

  describe('getAuthenticatedUser', () => {
    it('should return user when authenticated', async () => {
      const { createServerClient } = await import('@supabase/ssr')
      const mockSupabase = {
        auth: {
          getUser: vi.fn().mockResolvedValue({
            data: { user: { id: 'user-id', email: 'test@example.com' } },
          }),
        },
      }
      ;(createServerClient as any).mockReturnValue(mockSupabase)

      const user = await getAuthenticatedUser()
      expect(user).toEqual({ id: 'user-id', email: 'test@example.com' })
    })

    it('should return null when not authenticated', async () => {
      const { createServerClient } = await import('@supabase/ssr')
      const mockSupabase = {
        auth: {
          getUser: vi.fn().mockRejectedValue(new Error('Auth error')),
        },
      }
      ;(createServerClient as any).mockReturnValue(mockSupabase)

      const user = await getAuthenticatedUser()
      expect(user).toBeNull()
    })
  })

  describe('isAuthSuccess', () => {
    it('should return true for successful auth result', () => {
      const successResult = { user: { id: 'user-id', email: 'test@example.com' } as any }
      expect(isAuthSuccess(successResult)).toBe(true)
    })

    it('should return false for error response', () => {
      const errorResult = new Response('Unauthorized', { status: 401 }) as any
      expect(isAuthSuccess(errorResult)).toBe(false)
    })
  })
})