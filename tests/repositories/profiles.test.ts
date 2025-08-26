import { describe, it, expect, beforeEach, vi } from 'vitest'
import { ProfileRepository } from '@/lib/repositories/profiles'
import type { DbProfile } from '@/lib/types'

// Mock Supabase
vi.mock('@/lib/supabase/server', () => ({
  supabaseAdmin: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(),
        })),
      })),
      insert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn(),
        })),
      })),
      update: vi.fn(() => ({
        eq: vi.fn(() => ({
          select: vi.fn(() => ({
            single: vi.fn(),
          })),
        })),
      })),
    })),
  },
}))

describe('ProfileRepository', () => {
  const mockProfile: DbProfile = {
    id: 'user-id',
    email: 'test@example.com',
    name: 'Test User',
    country: 'England',
    curriculum: 'UK National Curriculum',
    year_group: 'Year 3',
    school: 'Test School',
    teaching_subjects: ['Mathematics', 'English'],
    subscription_tier: 'free',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getProfile', () => {
    it('should return profile when user exists', async () => {
      const { supabaseAdmin } = await import('@/lib/supabase/server')
      const mockChain = {
        eq: vi.fn(() => ({
          single: vi.fn().mockResolvedValue({ data: mockProfile, error: null }),
        })),
      }
      ;(supabaseAdmin.from as any).mockReturnValue({
        select: vi.fn(() => mockChain),
      })

      const result = await ProfileRepository.getProfile('user-id')
      expect(result).toEqual(mockProfile)
    })

    it('should return null when profile not found', async () => {
      const { supabaseAdmin } = await import('@/lib/supabase/server')
      const mockChain = {
        eq: vi.fn(() => ({
          single: vi.fn().mockResolvedValue({ data: null, error: new Error('Not found') }),
        })),
      }
      ;(supabaseAdmin.from as any).mockReturnValue({
        select: vi.fn(() => mockChain),
      })

      const result = await ProfileRepository.getProfile('user-id')
      expect(result).toBeNull()
    })
  })

  describe('createProfile', () => {
    it('should create and return new profile', async () => {
      const { supabaseAdmin } = await import('@/lib/supabase/server')
      const newProfile = { ...mockProfile }
      delete (newProfile as any).created_at
      delete (newProfile as any).updated_at

      const mockChain = {
        select: vi.fn(() => ({
          single: vi.fn().mockResolvedValue({ data: mockProfile, error: null }),
        })),
      }
      ;(supabaseAdmin.from as any).mockReturnValue({
        insert: vi.fn(() => mockChain),
      })

      const result = await ProfileRepository.createProfile(newProfile)
      expect(result).toEqual(mockProfile)
    })
  })

  describe('updateProfile', () => {
    it('should update and return profile', async () => {
      const { supabaseAdmin } = await import('@/lib/supabase/server')
      const updates = { school: 'Updated School' }
      const updatedProfile = { ...mockProfile, ...updates }

      const mockChain = {
        eq: vi.fn(() => ({
          select: vi.fn(() => ({
            single: vi.fn().mockResolvedValue({ data: updatedProfile, error: null }),
          })),
        })),
      }
      ;(supabaseAdmin.from as any).mockReturnValue({
        update: vi.fn(() => mockChain),
      })

      const result = await ProfileRepository.updateProfile('user-id', updates)
      expect(result).toEqual(updatedProfile)
    })
  })

  describe('profileExists', () => {
    it('should return true when profile exists', async () => {
      const { supabaseAdmin } = await import('@/lib/supabase/server')
      const mockChain = {
        eq: vi.fn(() => ({
          single: vi.fn().mockResolvedValue({ data: { id: 'user-id' }, error: null }),
        })),
      }
      ;(supabaseAdmin.from as any).mockReturnValue({
        select: vi.fn(() => mockChain),
      })

      const result = await ProfileRepository.profileExists('user-id')
      expect(result).toBe(true)
    })

    it('should return false when profile does not exist', async () => {
      const { supabaseAdmin } = await import('@/lib/supabase/server')
      const mockChain = {
        eq: vi.fn(() => ({
          single: vi.fn().mockResolvedValue({ data: null, error: new Error('Not found') }),
        })),
      }
      ;(supabaseAdmin.from as any).mockReturnValue({
        select: vi.fn(() => mockChain),
      })

      const result = await ProfileRepository.profileExists('user-id')
      expect(result).toBe(false)
    })
  })
})