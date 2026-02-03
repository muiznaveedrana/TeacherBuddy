/**
 * SEO Metadata Generator for FreeMathPrintable.com
 *
 * Centralized utility for generating consistent, SEO-optimized metadata
 * across all page types. Includes OpenGraph and Twitter card support.
 */

import type { Metadata } from 'next'

// =============================================================================
// CONSTANTS
// =============================================================================

const SITE_NAME = 'FreeMathPrintable.com'
const BASE_URL = 'https://freemathprintable.com'
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.png`

// US Grade mappings for SEO (US-first targeting)
const YEAR_TO_GRADE: Record<string, string> = {
  Reception: 'Kindergarten',
  'Year 1': 'Grade 1',
  'Year 2': 'Grade 2',
  'Year 3': 'Grade 3',
  'Year 4': 'Grade 4',
  'Year 5': 'Grade 5',
  'Year 6': 'Grade 6',
}

const GRADE_AGE_RANGES: Record<string, string> = {
  Reception: '4-5',
  'Year 1': '5-6',
  'Year 2': '6-7',
  'Year 3': '7-8',
  'Year 4': '8-9',
  'Year 5': '9-10',
  'Year 6': '10-11',
}

// =============================================================================
// TYPES
// =============================================================================

export type PageType = 'homepage' | 'grade' | 'topic' | 'worksheet'

export interface HomepageData {
  worksheetCount?: number
}

export interface GradeData {
  year_group: string
  worksheet_count: number
  age_range?: string
}

export interface TopicData {
  topic_name: string
  year_group: string
  subtopic_count: number
}

export interface WorksheetData {
  title: string
  topic: string
  year_group: string
  skills?: string[]
  slug?: string
}

export type PageData = HomepageData | GradeData | TopicData | WorksheetData

export interface GenerateMetadataOptions {
  pageType: PageType
  data?: PageData
  canonicalPath?: string
  ogImage?: string
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get US grade label from UK year group
 */
function getUSGrade(yearGroup: string): string {
  return YEAR_TO_GRADE[yearGroup] || yearGroup
}

/**
 * Get age range for year group
 */
function getAgeRange(yearGroup: string): string {
  return GRADE_AGE_RANGES[yearGroup] || ''
}

/**
 * Format topic/subtopic for display (kebab-case to Title Case)
 */
function formatLabel(str: string): string {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Truncate description to target length (150-160 chars)
 */
function truncateDescription(text: string, maxLength: number = 160): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength - 3).trim() + '...'
}

// =============================================================================
// DESCRIPTION GENERATORS
// =============================================================================

function generateHomepageDescription(data?: HomepageData): string {
  const count = data?.worksheetCount ? `${data.worksheetCount}+ ` : ''
  // 155 chars: "Download 500+ free printable math worksheets for K-6. PDF format, no signup. Addition, subtraction, counting & more. Print instantly!"
  return truncateDescription(
    `Download ${count}free printable math worksheets for K-6. PDF format, no signup. Addition, subtraction, counting & more. Print instantly!`
  )
}

function generateGradeDescription(data: GradeData): string {
  const grade = getUSGrade(data.year_group)
  const ages = data.age_range || getAgeRange(data.year_group)
  // Target: "Free printable Grade 1 math worksheets (ages 5-6). 50+ PDF worksheets for addition, counting & more. Download instantly!"
  return truncateDescription(
    `Free printable ${grade} math worksheets (ages ${ages}). ${data.worksheet_count}+ PDF worksheets for addition, counting & more. Download instantly!`
  )
}

function generateTopicDescription(data: TopicData): string {
  const grade = getUSGrade(data.year_group)
  const topic = formatLabel(data.topic_name)
  // Target: "Free printable Grade 2 Addition worksheets. 12 subtopics with PDF downloads. Practice math skills at home or school!"
  return truncateDescription(
    `Free printable ${grade} ${topic} worksheets. ${data.subtopic_count} subtopics with PDF downloads. Practice math skills at home or school!`
  )
}

function generateWorksheetDescription(data: WorksheetData): string {
  const grade = getUSGrade(data.year_group)
  const topic = formatLabel(data.topic)
  const skillsText = data.skills?.length ? ` Practice ${data.skills.slice(0, 2).join(', ')}.` : ''
  // Target: "Free printable Counting to 10 worksheet for Kindergarten. Practice number recognition. Download PDF instantly, no signup required!"
  return truncateDescription(
    `Free printable ${data.title} worksheet for ${grade}.${skillsText} Download PDF instantly, no signup required!`
  )
}

// =============================================================================
// TITLE GENERATORS
// =============================================================================

function generateHomepageTitle(): string {
  return `Free Math Worksheets | Printable PDFs K-6 | ${SITE_NAME}`
}

function generateGradeTitle(data: GradeData): string {
  const grade = getUSGrade(data.year_group)
  return `Free ${grade} Math Worksheets | Printable PDFs | ${SITE_NAME}`
}

function generateTopicTitle(data: TopicData): string {
  const grade = getUSGrade(data.year_group)
  const topic = formatLabel(data.topic_name)
  return `Free ${grade} ${topic} Worksheets | Printable PDFs`
}

function generateWorksheetTitle(data: WorksheetData): string {
  const grade = getUSGrade(data.year_group)
  return `${data.title} | Free ${grade} Worksheet PDF`
}

// =============================================================================
// MAIN FUNCTION
// =============================================================================

/**
 * Generate SEO metadata for any page type on FreeMathPrintable.com
 *
 * @param options - Configuration options for metadata generation
 * @returns Next.js Metadata object with OpenGraph and Twitter cards
 *
 * @example
 * // Homepage
 * generateMetadata({ pageType: 'homepage', data: { worksheetCount: 500 } })
 *
 * @example
 * // Grade page
 * generateMetadata({
 *   pageType: 'grade',
 *   data: { year_group: 'Year 1', worksheet_count: 50, age_range: '5-6' }
 * })
 *
 * @example
 * // Topic page
 * generateMetadata({
 *   pageType: 'topic',
 *   data: { topic_name: 'addition', year_group: 'Year 2', subtopic_count: 12 }
 * })
 *
 * @example
 * // Worksheet page
 * generateMetadata({
 *   pageType: 'worksheet',
 *   data: {
 *     title: 'Counting to 10',
 *     topic: 'number-counting',
 *     year_group: 'Reception',
 *     skills: ['number recognition', 'counting']
 *   }
 * })
 */
export function generateMetadata(options: GenerateMetadataOptions): Metadata {
  const { pageType, data, canonicalPath, ogImage } = options

  let title: string
  let description: string

  switch (pageType) {
    case 'homepage':
      title = generateHomepageTitle()
      description = generateHomepageDescription(data as HomepageData)
      break

    case 'grade':
      if (!data) throw new Error('GradeData required for grade page type')
      title = generateGradeTitle(data as GradeData)
      description = generateGradeDescription(data as GradeData)
      break

    case 'topic':
      if (!data) throw new Error('TopicData required for topic page type')
      title = generateTopicTitle(data as TopicData)
      description = generateTopicDescription(data as TopicData)
      break

    case 'worksheet':
      if (!data) throw new Error('WorksheetData required for worksheet page type')
      title = generateWorksheetTitle(data as WorksheetData)
      description = generateWorksheetDescription(data as WorksheetData)
      break

    default:
      throw new Error(`Unknown page type: ${pageType}`)
  }

  const canonicalUrl = canonicalPath ? `${BASE_URL}${canonicalPath}` : BASE_URL
  const imageUrl = ogImage || DEFAULT_OG_IMAGE

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      type: 'website',
      locale: 'en_US',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  }
}

// =============================================================================
// EXAMPLE USAGE
// =============================================================================

/**
 * Example usage for each page type:
 *
 * ```typescript
 * // 1. Homepage
 * export const metadata = generateMetadata({
 *   pageType: 'homepage',
 *   data: { worksheetCount: 500 },
 *   canonicalPath: '/',
 * })
 * // Output:
 * // title: "Free Math Worksheets | Printable PDFs K-6 | FreeMathPrintable.com"
 * // description: "Download 500+ free printable math worksheets for K-6. PDF format, no signup..."
 *
 * // 2. Grade page (e.g., /free-printables/year-1)
 * export async function generateMetadata() {
 *   return generateMetadata({
 *     pageType: 'grade',
 *     data: {
 *       year_group: 'Year 1',
 *       worksheet_count: 50,
 *       age_range: '5-6',
 *     },
 *     canonicalPath: '/free-printables/year-1',
 *   })
 * }
 * // Output:
 * // title: "Free Grade 1 Math Worksheets | Printable PDFs | FreeMathPrintable.com"
 * // description: "Free printable Grade 1 math worksheets (ages 5-6). 50+ PDF worksheets..."
 *
 * // 3. Topic page (e.g., /free-printables/year-2/addition)
 * export async function generateMetadata() {
 *   return generateMetadata({
 *     pageType: 'topic',
 *     data: {
 *       topic_name: 'addition',
 *       year_group: 'Year 2',
 *       subtopic_count: 12,
 *     },
 *     canonicalPath: '/free-printables/year-2/addition',
 *   })
 * }
 * // Output:
 * // title: "Free Grade 2 Addition Worksheets | Printable PDFs"
 * // description: "Free printable Grade 2 Addition worksheets. 12 subtopics with PDF downloads..."
 *
 * // 4. Worksheet page (e.g., /library/counting-to-10-reception)
 * export async function generateMetadata() {
 *   return generateMetadata({
 *     pageType: 'worksheet',
 *     data: {
 *       title: 'Counting to 10',
 *       topic: 'number-counting',
 *       year_group: 'Reception',
 *       skills: ['number recognition', 'counting'],
 *     },
 *     canonicalPath: '/library/counting-to-10-reception',
 *     ogImage: 'https://ik.imagekit.io/path/to/thumbnail.png',
 *   })
 * }
 * // Output:
 * // title: "Counting to 10 | Free Kindergarten Worksheet PDF"
 * // description: "Free printable Counting to 10 worksheet for Kindergarten. Practice number recognition, counting. Download PDF instantly..."
 * ```
 */

// Export constants for use elsewhere
export { BASE_URL, SITE_NAME, YEAR_TO_GRADE, GRADE_AGE_RANGES }
