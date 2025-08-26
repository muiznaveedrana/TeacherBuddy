import { describe, it, expect, beforeEach, vi } from 'vitest'
import { NextRequest } from 'next/server'
import { middleware } from '../../middleware'

// Mock Supabase
vi.mock('@supabase/ssr', () => ({
  createServerClient: vi.fn(() => ({
    auth: {
      getUser: vi.fn(),
    },
  })),
}))

describe('Authentication Middleware', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should redirect unauthenticated users from protected routes to login', async () => {
    const { createServerClient } = await import('@supabase/ssr')
    const mockSupabase = {
      auth: {
        getUser: vi.fn().mockResolvedValue({ data: { user: null } }),
      },
    }
    ;(createServerClient as any).mockReturnValue(mockSupabase)

    const url = new URL('http://localhost:3000/dashboard')
    const request = new NextRequest(url)

    const response = await middleware(request)

    expect(response.status).toBe(307) // Redirect
    expect(response.headers.get('location')).toContain('/login')
  })

  it('should allow authenticated users to access protected routes', async () => {
    const { createServerClient } = await import('@supabase/ssr')
    const mockSupabase = {
      auth: {
        getUser: vi.fn().mockResolvedValue({
          data: { user: { id: 'user-id', email: 'test@example.com' } },
        }),
      },
    }
    ;(createServerClient as any).mockReturnValue(mockSupabase)

    const url = new URL('http://localhost:3000/dashboard')
    const request = new NextRequest(url)
    const response = await middleware(request)

    expect(response.status).toBe(200)
  })

  it('should redirect authenticated users from auth routes to dashboard', async () => {
    const { createServerClient } = await import('@supabase/ssr')
    const mockSupabase = {
      auth: {
        getUser: vi.fn().mockResolvedValue({
          data: { user: { id: 'user-id', email: 'test@example.com' } },
        }),
      },
    }
    ;(createServerClient as any).mockReturnValue(mockSupabase)

    const url = new URL('http://localhost:3000/login')
    const request = new NextRequest(url)
    const response = await middleware(request)

    expect(response.status).toBe(307) // Redirect
    expect(response.headers.get('location')).toContain('/dashboard')
  })

  it('should allow public routes without authentication', async () => {
    const { createServerClient } = await import('@supabase/ssr')
    const mockSupabase = {
      auth: {
        getUser: vi.fn().mockResolvedValue({ data: { user: null } }),
      },
    }
    ;(createServerClient as any).mockReturnValue(mockSupabase)

    const url = new URL('http://localhost:3000/')
    const request = new NextRequest(url)
    const response = await middleware(request)

    expect(response.status).toBe(200)
  })
})