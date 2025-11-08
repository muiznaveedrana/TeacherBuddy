/**
 * RELATED WORKSHEET RECOMMENDATION SERVICE
 *
 * Provides intelligent worksheet recommendations using multiple strategies:
 * 1. Same topic, different difficulty
 * 2. Same year group, related topics
 * 3. Most downloaded in category
 */

import { createClient } from '@supabase/supabase-js'
import type { LibraryWorksheet } from '@/lib/types/library'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export async function getRelatedWorksheets(
  worksheet: LibraryWorksheet,
  limit: number = 8
): Promise<LibraryWorksheet[]> {
  const supabase = createClient(supabaseUrl, supabaseAnonKey)

  const recommendations: LibraryWorksheet[] = []
  const seenIds = new Set<string>([worksheet.id])

  // Strategy 1: Same topic, different difficulty (3 worksheets)
  // This helps teachers find easier/harder versions
  if (recommendations.length < limit) {
    const { data: sameTopic } = await supabase
      .from('library_worksheets')
      .select('*')
      .eq('status', 'published')
      .eq('year_group', worksheet.year_group)
      .eq('topic', worksheet.topic)
      .neq('id', worksheet.id)
      .neq('difficulty', worksheet.difficulty || 'average')
      .order('view_count', { ascending: false })
      .limit(3)

    if (sameTopic) {
      sameTopic.forEach(w => {
        if (!seenIds.has(w.id)) {
          recommendations.push(w)
          seenIds.add(w.id)
        }
      })
    }
  }

  // Strategy 2: Same year group, related topics (3 worksheets)
  // Help teachers find variety within the same year
  if (recommendations.length < limit) {
    const { data: relatedTopics } = await supabase
      .from('library_worksheets')
      .select('*')
      .eq('status', 'published')
      .eq('year_group', worksheet.year_group)
      .neq('id', worksheet.id)
      .neq('topic', worksheet.topic)
      .order('download_count', { ascending: false })
      .limit(3)

    if (relatedTopics) {
      relatedTopics.forEach(w => {
        if (!seenIds.has(w.id) && recommendations.length < limit) {
          recommendations.push(w)
          seenIds.add(w.id)
        }
      })
    }
  }

  // Strategy 3: Most popular in category (fill remaining slots)
  // Show what other teachers are using
  if (recommendations.length < limit) {
    const { data: popular } = await supabase
      .from('library_worksheets')
      .select('*')
      .eq('status', 'published')
      .eq('topic', worksheet.topic)
      .neq('id', worksheet.id)
      .order('download_count', { ascending: false })
      .limit(limit - recommendations.length)

    if (popular) {
      popular.forEach(w => {
        if (!seenIds.has(w.id) && recommendations.length < limit) {
          recommendations.push(w)
          seenIds.add(w.id)
        }
      })
    }
  }

  // Strategy 4: Fallback - any published worksheets if we still need more
  if (recommendations.length < limit) {
    const { data: fallback } = await supabase
      .from('library_worksheets')
      .select('*')
      .eq('status', 'published')
      .neq('id', worksheet.id)
      .order('view_count', { ascending: false })
      .limit(limit - recommendations.length)

    if (fallback) {
      fallback.forEach(w => {
        if (!seenIds.has(w.id) && recommendations.length < limit) {
          recommendations.push(w)
          seenIds.add(w.id)
        }
      })
    }
  }

  console.log(`🔗 Generated ${recommendations.length} related worksheets for "${worksheet.title}"`)

  return recommendations
}

/**
 * Get related worksheets by worksheet ID (convenience function)
 */
export async function getRelatedWorksheetsById(
  worksheetId: string,
  limit: number = 8
): Promise<LibraryWorksheet[]> {
  const supabase = createClient(supabaseUrl, supabaseAnonKey)

  // First get the worksheet
  const { data: worksheet } = await supabase
    .from('library_worksheets')
    .select('*')
    .eq('id', worksheetId)
    .eq('status', 'published')
    .single()

  if (!worksheet) {
    return []
  }

  return getRelatedWorksheets(worksheet, limit)
}
