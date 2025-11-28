// ============================================================================
// LIBRARY TYPES
// ============================================================================

export interface LibraryWorksheet {
  id: string
  slug: string
  title: string
  html_content: string
  region: 'UK' | 'US' | 'AU' | 'CA' // Future-proof: UK for MVP, US/AU/CA for expansion
  year_group: string
  topic: string
  subtopic: string
  difficulty: 'easy' | 'average' | 'hard' // Stored but not shown in UI
  question_count: number // Stored but not shown in UI
  layout_type: string
  visual_theme: string | null // PRIMARY differentiator
  activity_type: string | null // SECONDARY differentiator
  seasonal_theme: string | null // OPTIONAL differentiator
  worksheet_version: string | null // FALLBACK differentiator
  thumbnail_url: string
  preview_images: string[]
  seo_title: string | null
  seo_description: string | null
  seo_keywords: string[] | null
  // Rich educational content fields
  learning_objectives: string[] | null
  how_to_use: string | null
  educational_benefits: string | null
  skills_developed: string[] | null
  estimated_time_minutes: number | null
  curriculum_standards: string[] | null
  faq: Array<{question: string; answer: string}> | null
  quality_score: number | null // Admin-set quality score
  tags: string[]
  status: 'draft' | 'published' | 'archived'
  published_at: string | null
  published_by: string | null // Admin user ID from Supabase Auth
  view_count: number // Simple analytics, no login needed
  download_count: number // Simple analytics, no login needed
  last_downloaded_at: string | null
  created_at: string
  updated_at: string
}

export interface CreateLibraryWorksheetInput {
  title: string
  html_content: string
  region?: 'UK' | 'US' | 'AU' | 'CA' // Optional, defaults to 'UK' for MVP
  year_group: string
  topic: string
  subtopic: string
  difficulty?: 'easy' | 'average' | 'hard' // Optional, defaults to 'average'
  question_count?: number // Optional, defaults to 5
  layout_type: string
  visual_theme?: string // For differentiation
  activity_type?: string // For differentiation
  seasonal_theme?: string // For differentiation
  worksheet_version?: string // For differentiation
  thumbnail_url: string
  preview_images?: string[]
  seo_title?: string
  seo_description?: string
  seo_keywords?: string[]
  // Rich educational content fields
  learning_objectives?: string[]
  how_to_use?: string
  educational_benefits?: string
  skills_developed?: string[]
  estimated_time_minutes?: number
  curriculum_standards?: string[]
  faq?: Array<{question: string; answer: string}>
  quality_score?: number
  tags?: string[]
  status?: 'draft' | 'published'
}

export interface LibraryFilters {
  year_group?: string
  topic?: string // PRIORITY 2: Core curriculum filter
  subtopic?: string // PRIORITY 3: Specific skill filter
  visual_theme?: string
  activity_type?: string
  seasonal_theme?: string
  tags?: string[]
  search?: string
  sort_by?: 'newest' | 'popular' | 'downloads' // No 'rating'
  limit?: number
  offset?: number
}

export interface LibraryBrowseResponse {
  worksheets: LibraryWorksheet[]
  total_count: number
  has_more: boolean
  filters_applied: LibraryFilters
}

export interface SaveToLibraryMetadata {
  title: string
  year_group: string
  topic: string
  subtopic: string
  layout_type: string
  region?: 'UK' | 'US' | 'AU' | 'CA' // Region for currency/measurement specific content
  difficulty?: 'easy' | 'average' | 'hard'
  question_count?: number
  visual_theme?: string
  activity_type?: string
  seasonal_theme?: string
  worksheet_version?: string
  quality_score?: number
  seo_title?: string
  seo_description?: string
  seo_keywords?: string[]
  tags?: string[]
  slug?: string
}

// Subtopics that require region-specific prompts (different currency, coin images)
export const REGION_SPECIFIC_SUBTOPICS = [
  'money',
  'coins-recognition',
  'word-problems',
  'two-digit-numbers',
] as const

// Check if a subtopic needs region selection
export function isRegionSpecificSubtopic(subtopic: string): boolean {
  return REGION_SPECIFIC_SUBTOPICS.includes(subtopic as typeof REGION_SPECIFIC_SUBTOPICS[number])
}

export type Region = 'UK' | 'US' | 'AU' | 'CA'

export const REGION_CONFIG: Record<Region, { label: string; flag: string; currency: string }> = {
  US: { label: 'United States', flag: '🇺🇸', currency: '$' },
  UK: { label: 'United Kingdom', flag: '🇬🇧', currency: '£' },
  AU: { label: 'Australia', flag: '🇦🇺', currency: 'A$' },
  CA: { label: 'Canada', flag: '🇨🇦', currency: 'C$' },
}
