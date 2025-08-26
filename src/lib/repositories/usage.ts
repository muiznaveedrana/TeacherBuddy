import { supabaseAdmin } from '@/lib/supabase/server'
import type { DbUsageTracking } from '@/lib/types'

export class UsageRepository {
  /**
   * Get user usage tracking data
   */
  static async getUserUsage(userId: string): Promise<DbUsageTracking | null> {
    try {
      const { data, error } = await supabaseAdmin
        .from('usage_tracking')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (error) {
        console.error('Error fetching usage data:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Usage repository error:', error)
      return null
    }
  }

  /**
   * Create initial usage tracking record
   */
  static async createUsageRecord(userId: string): Promise<DbUsageTracking | null> {
    try {
      const { data, error } = await supabaseAdmin
        .from('usage_tracking')
        .insert({ user_id: userId })
        .select()
        .single()

      if (error) {
        console.error('Error creating usage record:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Usage repository error:', error)
      return null
    }
  }

  /**
   * Increment worksheet generation counter
   */
  static async incrementWorksheetCount(userId: string): Promise<boolean> {
    try {
      const { error } = await supabaseAdmin
        .rpc('increment_usage_counter', { p_user_id: userId })

      if (error) {
        console.error('Error incrementing usage counter:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('Usage repository error:', error)
      return false
    }
  }

  /**
   * Reset daily usage counters (called by cron job)
   */
  static async resetDailyCounters(): Promise<boolean> {
    try {
      const { error } = await supabaseAdmin
        .rpc('reset_daily_usage')

      if (error) {
        console.error('Error resetting daily counters:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('Usage repository error:', error)
      return false
    }
  }

  /**
   * Reset monthly usage counters (called by cron job)
   */
  static async resetMonthlyCounters(): Promise<boolean> {
    try {
      const { error } = await supabaseAdmin
        .rpc('reset_monthly_usage')

      if (error) {
        console.error('Error resetting monthly counters:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('Usage repository error:', error)
      return false
    }
  }

  /**
   * Get usage statistics for admin dashboard
   */
  static async getUsageStatistics(): Promise<{
    totalUsers: number
    totalWorksheets: number
    activeUsers: number
  } | null> {
    try {
      const { data: totalUsersData, error: totalUsersError } = await supabaseAdmin
        .from('usage_tracking')
        .select('user_id', { count: 'exact' })

      const { data: totalWorksheetsData, error: totalWorksheetsError } = await supabaseAdmin
        .from('usage_tracking')
        .select('worksheets_generated_total')

      const { data: activeUsersData, error: activeUsersError } = await supabaseAdmin
        .from('usage_tracking')
        .select('user_id', { count: 'exact' })
        .gt('worksheets_generated_monthly', 0)

      if (totalUsersError || totalWorksheetsError || activeUsersError) {
        console.error('Error fetching usage statistics')
        return null
      }

      const totalWorksheets = totalWorksheetsData?.reduce(
        (sum, record) => sum + (record.worksheets_generated_total || 0), 
        0
      ) || 0

      return {
        totalUsers: totalUsersData?.length || 0,
        totalWorksheets,
        activeUsers: activeUsersData?.length || 0
      }
    } catch (error) {
      console.error('Usage repository error:', error)
      return null
    }
  }
}