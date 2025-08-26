import { supabase } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'
import type { DbProfile } from '@/lib/types'

export interface AuthResult {
  user?: User
  error?: string
  requiresProfileSetup?: boolean
  success?: boolean
}

export interface ProfileSetupData {
  name?: string
  country?: string
  curriculum?: string
  year_group?: string
  school?: string
  teaching_subjects?: string[]
}

export class AuthService {
  /**
   * Sign in with Google OAuth
   */
  static async signInWithGoogle(redirectTo?: string): Promise<AuthResult> {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectTo || `${window.location.origin}/login`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      })

      if (error) {
        console.error('Google sign-in error:', error)
        return { error: error.message }
      }

      // OAuth redirect initiated successfully
      return { success: true }
    } catch (error) {
      console.error('Authentication service error:', error)
      return { error: 'Authentication failed' }
    }
  }

  /**
   * Sign out user
   */
  static async signOut(): Promise<{ error?: string }> {
    try {
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        console.error('Sign out error:', error)
        return { error: error.message }
      }

      return {}
    } catch (error) {
      console.error('Authentication service error:', error)
      return { error: 'Sign out failed' }
    }
  }

  /**
   * Get current user session
   */
  static async getCurrentUser(): Promise<User | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      return user
    } catch (error) {
      console.error('Error getting current user:', error)
      return null
    }
  }

  /**
   * Get user profile and check if setup is required
   */
  static async getUserProfile(userId: string): Promise<{
    profile: DbProfile | null
    requiresSetup: boolean
  }> {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error fetching profile:', error)
        return { profile: null, requiresSetup: true }
      }
      
      // Check if profile setup is required (missing required fields)
      const requiresSetup = !profile || 
        !profile.year_group || 
        !profile.curriculum ||
        !profile.country

      return { profile, requiresSetup }
    } catch (error) {
      console.error('Error getting user profile:', error)
      return { profile: null, requiresSetup: true }
    }
  }

  /**
   * Complete profile setup for new users
   */
  static async completeProfileSetup(
    userId: string, 
    setupData: ProfileSetupData
  ): Promise<{ profile?: DbProfile; error?: string }> {
    try {
      // Get current user data
      const user = await this.getCurrentUser()
      if (!user) {
        return { error: 'User not authenticated' }
      }

      // Update profile with setup data
      const profileUpdate = {
        name: setupData.name || user.user_metadata?.name || user.email,
        country: setupData.country || 'England',
        curriculum: setupData.curriculum || 'UK National Curriculum',
        year_group: setupData.year_group,
        school: setupData.school,
        teaching_subjects: setupData.teaching_subjects || [],
        updated_at: new Date().toISOString()
      }

      const { data: profile, error } = await supabase
        .from('profiles')
        .update(profileUpdate)
        .eq('id', userId)
        .select()
        .single()
      
      if (error) {
        console.error('Error updating profile:', error)
        return { error: 'Failed to update profile' }
      }

      return { profile }
    } catch (error) {
      console.error('Profile setup error:', error)
      return { error: 'Profile setup failed' }
    }
  }

  /**
   * Update user profile
   */
  static async updateProfile(
    userId: string, 
    updates: Partial<ProfileSetupData>
  ): Promise<{ profile?: DbProfile; error?: string }> {
    try {
      const profileUpdate = {
        ...updates,
        updated_at: new Date().toISOString()
      }

      const { data: profile, error } = await supabase
        .from('profiles')
        .update(profileUpdate)
        .eq('id', userId)
        .select()
        .single()
      
      if (error) {
        console.error('Error updating profile:', error)
        return { error: 'Failed to update profile' }
      }

      return { profile }
    } catch (error) {
      console.error('Profile update error:', error)
      return { error: 'Profile update failed' }
    }
  }

  /**
   * Listen to authentication state changes
   */
  static onAuthStateChange(callback: (user: User | null) => void) {
    return supabase.auth.onAuthStateChange((event, session) => {
      callback(session?.user || null)
    })
  }

  /**
   * Check if user has completed profile setup
   */
  static async checkProfileSetupStatus(userId: string): Promise<boolean> {
    try {
      const { requiresSetup } = await this.getUserProfile(userId)
      return !requiresSetup
    } catch (error) {
      console.error('Error checking profile setup status:', error)
      return false
    }
  }
}