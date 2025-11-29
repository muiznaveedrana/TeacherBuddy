// ============================================================================
// HUB PAGES TYPES - Free Printables Hub Feature
// ============================================================================

import type { LibraryWorksheet } from './library'

/**
 * Year group hub page data
 * URL: /free-printables/[yearGroup]/
 */
export interface YearGroupHub {
  yearGroup: string
  yearGroupSlug: string
  label: string
  ageRange: string
  description: string
  topics: TopicSummary[]
  worksheetCount: number
  popularWorksheets: LibraryWorksheet[]
  seo: HubSEO
}

/**
 * Topic hub page data
 * URL: /free-printables/[yearGroup]/[topic]/
 */
export interface TopicHub {
  yearGroup: string
  yearGroupSlug: string
  topic: string
  topicSlug: string
  label: string
  description: string
  subtopics: SubtopicSummary[]
  worksheetCount: number
  popularWorksheets: LibraryWorksheet[]
  learningObjectives: string[]
  complexity: string
  seo: HubSEO
}

/**
 * Subtopic hub page data (THE MAIN BLOG PAGE)
 * URL: /free-printables/[yearGroup]/[subtopic]/
 */
export interface SubtopicHub {
  yearGroup: string
  yearGroupSlug: string
  topic: string
  topicSlug: string
  subtopic: string
  subtopicSlug: string
  label: string
  description: string
  worksheets: LibraryWorksheet[]
  worksheetCount: number
  learningObjectives: string[]
  educationalContent: HubEducationalContent
  relatedSubtopics: SubtopicSummary[]
  faq: HubFAQ[]
  seo: HubSEO
  breadcrumbs: HubBreadcrumb[]
}

/**
 * Summary of a topic for listing on year group hub
 */
export interface TopicSummary {
  topic: string
  topicSlug: string
  label: string
  subtopicCount: number
  worksheetCount: number
  href: string
}

/**
 * Summary of a subtopic for listing on topic hub
 */
export interface SubtopicSummary {
  subtopic: string
  subtopicSlug: string
  label: string
  worksheetCount: number
  href: string
  yearGroup?: string
  topic?: string
}

/**
 * Educational content for subtopic hub pages
 */
export interface HubEducationalContent {
  introduction: string
  whyImportant: string
  howToUse: string
  teachingTips: string[]
  skillsDeveloped: string[]
  curriculumAlignment: string
  ageAppropriate: string
}

/**
 * FAQ item for hub pages
 */
export interface HubFAQ {
  question: string
  answer: string
}

/**
 * SEO metadata for hub pages
 */
export interface HubSEO {
  title: string
  description: string
  keywords: string[]
  canonicalUrl: string
  ogImage?: string
}

/**
 * Breadcrumb item for navigation
 */
export interface HubBreadcrumb {
  label: string
  href: string
  current?: boolean
}

/**
 * Main hub page data (landing page)
 * URL: /free-printables/
 */
export interface MainHub {
  yearGroups: YearGroupSummary[]
  totalWorksheetCount: number
  popularWorksheets: LibraryWorksheet[]
  seo: HubSEO
}

/**
 * Summary of a year group for main hub listing
 */
export interface YearGroupSummary {
  yearGroup: string
  yearGroupSlug: string
  label: string
  ageRange: string
  topicCount: number
  worksheetCount: number
  href: string
}

/**
 * Helper type for URL slug conversion
 */
export interface SlugMapping {
  original: string
  slug: string
}

// ============================================================================
// UTILITY FUNCTIONS FOR SLUG HANDLING
// ============================================================================

/**
 * Convert year group to URL-friendly slug
 * "Reception" -> "reception"
 * "Year 1" -> "year-1"
 */
export function yearGroupToSlug(yearGroup: string): string {
  return yearGroup.toLowerCase().replace(/\s+/g, '-')
}

/**
 * Get US-first dual display label for year group
 * "Reception" -> "Kindergarten / Reception"
 * "Year 1" -> "Grade 1 / Year 1"
 */
export function yearGroupToDualLabel(yearGroup: string): string {
  const dualLabels: Record<string, string> = {
    Reception: 'Kindergarten / Reception',
    'Year 1': 'Grade 1 / Year 1',
    'Year 2': 'Grade 2 / Year 2',
    'Year 3': 'Grade 3 / Year 3',
    'Year 4': 'Grade 4 / Year 4',
    'Year 5': 'Grade 5 / Year 5',
    'Year 6': 'Grade 6 / Year 6',
  }
  return dualLabels[yearGroup] || yearGroup
}

/**
 * Get US label only for year group
 * "Reception" -> "Kindergarten"
 * "Year 1" -> "Grade 1"
 */
export function yearGroupToUSLabel(yearGroup: string): string {
  const usLabels: Record<string, string> = {
    Reception: 'Kindergarten / Reception',
    'Year 1': 'Grade 1',
    'Year 2': 'Grade 2',
    'Year 3': 'Grade 3',
    'Year 4': 'Grade 4',
    'Year 5': 'Grade 5',
    'Year 6': 'Grade 6',
  }
  return usLabels[yearGroup] || yearGroup
}

/**
 * Convert URL slug back to year group
 * "reception" -> "Reception"
 * "year-1" -> "Year 1"
 */
export function slugToYearGroup(slug: string): string {
  if (slug === 'reception') return 'Reception'
  // Handle "year-1", "year-2", etc.
  const match = slug.match(/^year-(\d+)$/)
  if (match) return `Year ${match[1]}`
  // Fallback: capitalize first letter of each word
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Convert subtopic value to URL-friendly slug
 * "counting-to-10" stays as "counting-to-10"
 * Already kebab-case in curriculum data
 */
export function subtopicToSlug(subtopic: string): string {
  return subtopic.toLowerCase().replace(/\s+/g, '-')
}

/**
 * Convert topic ID to URL-friendly slug
 * "number-counting" stays as "number-counting"
 */
export function topicToSlug(topic: string): string {
  return topic.toLowerCase().replace(/\s+/g, '-')
}

// ============================================================================
// STATIC PARAMS TYPES (for Next.js generateStaticParams)
// ============================================================================

export interface YearGroupParams {
  yearGroup: string
}

export interface SubtopicParams {
  yearGroup: string
  subtopic: string
}
