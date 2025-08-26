import { supabaseAdmin } from '@/lib/supabase/server'
import type { DbProfile } from '@/lib/types'

export class ProfileRepository {
  /**
   * Get user profile by user ID
   */
  static async getProfile(userId: string): Promise<DbProfile | null> {
    try {
      const { data, error } = await supabaseAdmin
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error fetching profile:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Profile repository error:', error)
      return null
    }
  }

  /**
   * Create a new user profile
   */
  static async createProfile(profile: Omit<DbProfile, 'created_at' | 'updated_at'>): Promise<DbProfile | null> {
    try {
      const { data, error } = await supabaseAdmin
        .from('profiles')
        .insert(profile)
        .select()
        .single()

      if (error) {
        console.error('Error creating profile:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Profile repository error:', error)
      return null
    }
  }

  /**
   * Update user profile
   */
  static async updateProfile(
    userId: string, 
    updates: Partial<Omit<DbProfile, 'id' | 'created_at' | 'updated_at'>>
  ): Promise<DbProfile | null> {
    try {
      const { data, error } = await supabaseAdmin
        .from('profiles')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', userId)
        .select()
        .single()

      if (error) {
        console.error('Error updating profile:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Profile repository error:', error)
      return null
    }
  }

  /**
   * Update user's last configuration
   */
  static async updateLastConfiguration(
    userId: string, 
    configuration: Record<string, unknown>
  ): Promise<boolean> {
    try {
      const { error } = await supabaseAdmin
        .from('profiles')
        .update({ 
          last_configuration: configuration, 
          updated_at: new Date().toISOString() 
        })
        .eq('id', userId)

      if (error) {
        console.error('Error updating last configuration:', error)
        return false
      }

      return true
    } catch (err) {
      console.error('Profile repository error:', err)
      return false
    }
  }

  /**
   * Check if profile exists
   */
  static async profileExists(userId: string): Promise<boolean> {
    try {
      const { data, error } = await supabaseAdmin
        .from('profiles')
        .select('id')
        .eq('id', userId)
        .single()

      return !error && !!data
    } catch {
      return false
    }
  }
}