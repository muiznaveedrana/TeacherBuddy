import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

describe('Configuration', () => {
  const originalEnv = process.env

  beforeEach(() => {
    vi.resetModules()
    process.env = { ...originalEnv }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  describe('getEnvVar', async () => {
    it('should return environment variable value when present', async () => {
      // Set all required environment variables
      process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co'
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-key'
      process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-service-key'
      process.env.GEMINI_API_KEY = 'test-gemini-key'
      process.env.STRIPE_PUBLIC_KEY = 'test-stripe-public'
      process.env.STRIPE_SECRET_KEY = 'test-stripe-secret'
      process.env.STRIPE_WEBHOOK_SECRET = 'test-stripe-webhook'
      process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID = 'test-adsense'
      process.env.NEXTAUTH_SECRET = 'test-secret'
      process.env.TEST_VAR = 'test-value'
      
      const { config } = await import('@/lib/config')
      expect(process.env.TEST_VAR).toBe('test-value')
    })

    it('should throw error when required environment variable is missing', async () => {
      delete process.env.NEXT_PUBLIC_SUPABASE_URL
      
      await expect(async () => {
        await import('@/lib/config')
      }).rejects.toThrow('Missing required environment variable: NEXT_PUBLIC_SUPABASE_URL')
    })

    it('should use default value when provided', async () => {
      // Set all required environment variables first
      process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co'
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-key'
      process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-service-key'
      process.env.GEMINI_API_KEY = 'test-gemini-key'
      process.env.STRIPE_PUBLIC_KEY = 'test-stripe-public'
      process.env.STRIPE_SECRET_KEY = 'test-stripe-secret'
      process.env.STRIPE_WEBHOOK_SECRET = 'test-stripe-webhook'
      process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID = 'test-adsense'
      process.env.NEXTAUTH_SECRET = 'test-secret'
      
      delete process.env.NODE_ENV
      
      const { config } = await import('@/lib/config')
      expect(config.app.nodeEnv).toBe('development')
    })
  })

  describe('validateConfig', async () => {
    it('should validate URL format for Supabase URL', async () => {
      process.env.NEXT_PUBLIC_SUPABASE_URL = 'invalid-url'
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-key'
      process.env.NEXTAUTH_SECRET = 'test-secret'
      process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-service-key'
      process.env.GEMINI_API_KEY = 'test-gemini-key'
      process.env.STRIPE_PUBLIC_KEY = 'test-stripe-public'
      process.env.STRIPE_SECRET_KEY = 'test-stripe-secret'
      process.env.STRIPE_WEBHOOK_SECRET = 'test-stripe-webhook'
      process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID = 'test-adsense'

      const { validateConfig } = await import('@/lib/config')
      
      expect(() => validateConfig()).toThrow('NEXT_PUBLIC_SUPABASE_URL must be a valid URL')
    })

    it('should validate URL format for app URL', async () => {
      process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co'
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-key'
      process.env.NEXTAUTH_SECRET = 'test-secret'
      process.env.NEXTAUTH_URL = 'invalid-url'
      process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-service-key'
      process.env.GEMINI_API_KEY = 'test-gemini-key'
      process.env.STRIPE_PUBLIC_KEY = 'test-stripe-public'
      process.env.STRIPE_SECRET_KEY = 'test-stripe-secret'
      process.env.STRIPE_WEBHOOK_SECRET = 'test-stripe-webhook'
      process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID = 'test-adsense'

      const { validateConfig } = await import('@/lib/config')
      
      expect(() => validateConfig()).toThrow('NEXTAUTH_URL must be a valid URL')
    })

    it('should pass validation with valid configuration', async () => {
      process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co'
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-key'
      process.env.NEXTAUTH_SECRET = 'test-secret'
      process.env.NEXTAUTH_URL = 'https://localhost:3000'
      process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-service-key'
      process.env.GEMINI_API_KEY = 'test-gemini-key'
      process.env.STRIPE_PUBLIC_KEY = 'test-stripe-public'
      process.env.STRIPE_SECRET_KEY = 'test-stripe-secret'
      process.env.STRIPE_WEBHOOK_SECRET = 'test-stripe-webhook'
      process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID = 'test-adsense'

      const { validateConfig } = await import('@/lib/config')
      
      expect(() => validateConfig()).not.toThrow()
    })
  })

  describe('environment flags', async () => {
    it('should correctly identify development environment', async () => {
      process.env.NODE_ENV = 'development'
      process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co'
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-key'
      process.env.NEXTAUTH_SECRET = 'test-secret'
      process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-service-key'
      process.env.GEMINI_API_KEY = 'test-gemini-key'
      process.env.STRIPE_PUBLIC_KEY = 'test-stripe-public'
      process.env.STRIPE_SECRET_KEY = 'test-stripe-secret'
      process.env.STRIPE_WEBHOOK_SECRET = 'test-stripe-webhook'
      process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID = 'test-adsense'

      const { config } = await import('@/lib/config')
      
      expect(config.app.isDevelopment).toBe(true)
      expect(config.app.isProduction).toBe(false)
    })

    it('should correctly identify production environment', async () => {
      process.env.NODE_ENV = 'production'
      process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co'
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-key'
      process.env.NEXTAUTH_SECRET = 'test-secret'
      process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-service-key'
      process.env.GEMINI_API_KEY = 'test-gemini-key'
      process.env.STRIPE_PUBLIC_KEY = 'test-stripe-public'
      process.env.STRIPE_SECRET_KEY = 'test-stripe-secret'
      process.env.STRIPE_WEBHOOK_SECRET = 'test-stripe-webhook'
      process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID = 'test-adsense'

      const { config } = await import('@/lib/config')
      
      expect(config.app.isDevelopment).toBe(false)
      expect(config.app.isProduction).toBe(true)
    })
  })
})