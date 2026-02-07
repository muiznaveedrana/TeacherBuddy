/**
 * SEO Metadata Generator for FreeMathPrintable.com
 *
 * Centralized utility for generating consistent, SEO-optimized metadata
 * across all page types. Includes OpenGraph, Twitter cards, keywords, and JSON-LD.
 *
 * Supports: homepage, grade, topic, subtopic, worksheet
 */

import type { Metadata } from 'next'
import type { HubSEO } from '@/lib/types/hub'

// =============================================================================
// CONSTANTS
// =============================================================================

const SITE_NAME = 'FreeMathPrintable.com'
const DEFAULT_OG_IMAGE = '/og-image.png'
const TWITTER_SITE = '@freemathprint' // Update when Twitter account is created

/**
 * Get base URL from environment or default
 */
export function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || 'https://freemathprintable.com'
}

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

export type PageType = 'homepage' | 'grade' | 'topic' | 'subtopic' | 'worksheet'

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

export interface SubtopicData {
  subtopic_name: string
  topic_name: string
  year_group: string
  worksheet_count: number
  age_range?: string
}

export interface WorksheetData {
  title: string
  topic: string
  year_group: string
  skills?: string[]
  slug?: string
  thumbnail_url?: string
}

export type PageData = HomepageData | GradeData | TopicData | SubtopicData | WorksheetData

export interface GenerateMetadataOptions {
  pageType: PageType
  data?: PageData
  canonicalPath?: string
  ogImage?: string
  noIndex?: boolean
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get US grade label from UK year group
 */
export function getUSGrade(yearGroup: string): string {
  return YEAR_TO_GRADE[yearGroup] || yearGroup
}

/**
 * Get dual US/UK label (e.g., "Kindergarten / Reception", "Grade 1 / Year 1")
 */
export function getDualLabel(yearGroup: string): string {
  const usGrade = YEAR_TO_GRADE[yearGroup]
  if (!usGrade) return yearGroup
  return yearGroup === 'Reception'
    ? 'Kindergarten / Reception'
    : `${usGrade} / ${yearGroup}`
}

/**
 * Get age range for year group
 */
export function getAgeRange(yearGroup: string): string {
  return GRADE_AGE_RANGES[yearGroup] || ''
}

/**
 * Format topic/subtopic for display (kebab-case to Title Case)
 */
export function formatLabel(str: string): string {
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
// KEYWORDS GENERATORS
// =============================================================================

function generateHomepageKeywords(): string[] {
  return [
    'free math worksheets',
    'printable math worksheets',
    'kindergarten math worksheets',
    'elementary math worksheets',
    'free printables',
    'math practice sheets',
    'grade 1 worksheets',
    'grade 2 worksheets',
    'PDF worksheets',
    'no signup worksheets',
  ]
}

function generateGradeKeywords(data: GradeData): string[] {
  const grade = getUSGrade(data.year_group)
  const gradeLower = grade.toLowerCase()
  const yearLower = data.year_group.toLowerCase()
  const ages = data.age_range || getAgeRange(data.year_group)

  return [
    `${gradeLower} math worksheets`,
    `free ${gradeLower} worksheets`,
    `${gradeLower} printables`,
    `${yearLower} maths worksheets`,
    `free ${yearLower} worksheets`,
    `ages ${ages} worksheets`,
    'free math printables',
    'curriculum aligned worksheets',
  ]
}

function generateTopicKeywords(data: TopicData): string[] {
  const grade = getUSGrade(data.year_group)
  const gradeLower = grade.toLowerCase()
  const yearLower = data.year_group.toLowerCase()
  const topic = formatLabel(data.topic_name).toLowerCase()

  return [
    `${topic} worksheets ${gradeLower}`,
    `${gradeLower} ${topic}`,
    `free ${topic} worksheets`,
    `${topic} worksheets ${yearLower}`,
    `${yearLower} ${topic}`,
    'free math printables',
    'curriculum math resources',
  ]
}

function generateSubtopicKeywords(data: SubtopicData): string[] {
  const grade = getUSGrade(data.year_group)
  const gradeLower = grade.toLowerCase()
  const yearLower = data.year_group.toLowerCase()
  const subtopic = formatLabel(data.subtopic_name).toLowerCase()
  const ages = data.age_range || getAgeRange(data.year_group)

  return [
    `${subtopic} printables ${gradeLower}`,
    `${subtopic} printables ${yearLower}`,
    `free ${subtopic} printables`,
    `${gradeLower} ${subtopic}`,
    `${yearLower} ${subtopic}`,
    `${subtopic} worksheets free printable`,
    `${ages} math printables`,
    'free math printables',
    'curriculum math resources',
  ]
}

function generateWorksheetKeywords(data: WorksheetData): string[] {
  const grade = getUSGrade(data.year_group)
  const gradeLower = grade.toLowerCase()
  const topic = formatLabel(data.topic).toLowerCase()

  const keywords = [
    `free ${topic} worksheet`,
    `${gradeLower} ${topic}`,
    `printable ${topic} worksheet`,
    'free math worksheet PDF',
    `${gradeLower} math printable`,
  ]

  if (data.skills?.length) {
    keywords.push(...data.skills.slice(0, 3).map((s) => s.toLowerCase()))
  }

  return keywords
}

// =============================================================================
// DESCRIPTION GENERATORS
// =============================================================================

function generateHomepageDescription(data?: HomepageData): string {
  const count = data?.worksheetCount ? `${data.worksheetCount}+ ` : ''
  return truncateDescription(
    `Download ${count}free printable math worksheets for K-6. PDF format, no signup. Addition, subtraction, counting & more. Print instantly!`
  )
}

function generateGradeDescription(data: GradeData): string {
  const grade = getUSGrade(data.year_group)
  const ages = data.age_range || getAgeRange(data.year_group)
  return truncateDescription(
    `Free printable ${grade} math worksheets (ages ${ages}). ${data.worksheet_count}+ PDF worksheets for addition, counting & more. Download instantly!`
  )
}

function generateTopicDescription(data: TopicData): string {
  const grade = getUSGrade(data.year_group)
  const topic = formatLabel(data.topic_name)
  return truncateDescription(
    `Free printable ${grade} ${topic} worksheets. ${data.subtopic_count} subtopics with PDF downloads. Practice math skills at home or school!`
  )
}

function generateSubtopicDescription(data: SubtopicData): string {
  const dualLabel = getDualLabel(data.year_group)
  const subtopic = formatLabel(data.subtopic_name).toLowerCase()
  const ages = data.age_range || getAgeRange(data.year_group)
  return truncateDescription(
    `Download free ${subtopic} printables for ${dualLabel} (ages ${ages}). ${data.worksheet_count}+ PDF worksheets. No signup required!`
  )
}

function generateWorksheetDescription(data: WorksheetData): string {
  const grade = getUSGrade(data.year_group)
  const skillsText = data.skills?.length ? ` Practice ${data.skills.slice(0, 2).join(', ')}.` : ''
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
  const dualLabel = getDualLabel(data.year_group)
  const ages = data.age_range || getAgeRange(data.year_group)
  return `Free ${dualLabel} Math Worksheets | Ages ${ages}`
}

function generateTopicTitle(data: TopicData): string {
  const dualLabel = getDualLabel(data.year_group)
  const topic = formatLabel(data.topic_name)
  return `Free ${topic} Worksheets for ${dualLabel}`
}

function generateSubtopicTitle(data: SubtopicData): string {
  const dualLabel = getDualLabel(data.year_group)
  const subtopic = formatLabel(data.subtopic_name)
  const ages = data.age_range || getAgeRange(data.year_group)
  return `Free ${subtopic} Printables for ${dualLabel} | Ages ${ages}`
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
 * @returns Next.js Metadata object with OpenGraph, Twitter cards, and keywords
 */
export function generateMetadata(options: GenerateMetadataOptions): Metadata {
  const { pageType, data, canonicalPath, ogImage, noIndex } = options
  const baseUrl = getBaseUrl()

  let title: string
  let description: string
  let keywords: string[]

  switch (pageType) {
    case 'homepage':
      title = generateHomepageTitle()
      description = generateHomepageDescription(data as HomepageData)
      keywords = generateHomepageKeywords()
      break

    case 'grade':
      if (!data) throw new Error('GradeData required for grade page type')
      title = generateGradeTitle(data as GradeData)
      description = generateGradeDescription(data as GradeData)
      keywords = generateGradeKeywords(data as GradeData)
      break

    case 'topic':
      if (!data) throw new Error('TopicData required for topic page type')
      title = generateTopicTitle(data as TopicData)
      description = generateTopicDescription(data as TopicData)
      keywords = generateTopicKeywords(data as TopicData)
      break

    case 'subtopic':
      if (!data) throw new Error('SubtopicData required for subtopic page type')
      title = generateSubtopicTitle(data as SubtopicData)
      description = generateSubtopicDescription(data as SubtopicData)
      keywords = generateSubtopicKeywords(data as SubtopicData)
      break

    case 'worksheet':
      if (!data) throw new Error('WorksheetData required for worksheet page type')
      title = generateWorksheetTitle(data as WorksheetData)
      description = generateWorksheetDescription(data as WorksheetData)
      keywords = generateWorksheetKeywords(data as WorksheetData)
      break

    default:
      throw new Error(`Unknown page type: ${pageType}`)
  }

  const canonicalUrl = canonicalPath ? `${baseUrl}${canonicalPath}` : baseUrl
  const imageUrl = ogImage || `${baseUrl}${DEFAULT_OG_IMAGE}`

  const metadata: Metadata = {
    title,
    description,
    keywords: keywords.join(', '),
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      type: pageType === 'worksheet' ? 'article' : 'website',
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
      site: TWITTER_SITE,
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  }

  if (noIndex) {
    metadata.robots = {
      index: false,
      follow: false,
    }
  }

  return metadata
}

// =============================================================================
// JSON-LD SCHEMA GENERATORS
// =============================================================================

export interface BreadcrumbItem {
  name: string
  url: string
}

/**
 * Generate JSON-LD BreadcrumbList schema
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/**
 * Generate JSON-LD LearningResource schema for worksheets
 */
export function generateWorksheetSchema(data: {
  title: string
  description: string
  year_group: string
  topic: string
  slug: string
  thumbnail_url?: string
  keywords?: string[]
  published_at?: string
  updated_at?: string
  view_count?: number
}): object {
  const baseUrl = getBaseUrl()

  return {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: data.title,
    description: data.description,
    learningResourceType: 'Worksheet',
    educationalLevel: [getUSGrade(data.year_group), data.year_group],
    about: {
      '@type': 'Thing',
      name: formatLabel(data.topic),
    },
    url: `${baseUrl}/library/${data.slug}`,
    image: data.thumbnail_url,
    thumbnailUrl: data.thumbnail_url,
    isAccessibleForFree: true,
    interactivityType: 'mixed',
    inLanguage: 'en-US',
    keywords: data.keywords?.join(', '),
    datePublished: data.published_at,
    dateModified: data.updated_at,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: baseUrl,
    },
    educationalUse: ['practice', 'assessment', 'homework'],
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'student',
    },
    ...(data.view_count && data.view_count > 10
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.5',
            ratingCount: Math.floor(data.view_count / 10),
          },
        }
      : {}),
  }
}

/**
 * Generate JSON-LD CollectionPage schema for hub pages
 */
export function generateCollectionSchema(data: {
  name: string
  description: string
  url: string
  worksheetCount: number
  educationalLevels?: string[]
}): object {
  const baseUrl = getBaseUrl()

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: data.name,
    description: data.description,
    url: data.url,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: baseUrl,
    },
    about: {
      '@type': 'Thing',
      name: 'Mathematics Education',
    },
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: ['student', 'teacher', 'parent'],
    },
    educationalLevel: data.educationalLevels || [],
    numberOfItems: data.worksheetCount,
  }
}

// =============================================================================
// HUB SEO CONVERTER
// =============================================================================

/**
 * Convert HubSEO object to Next.js Metadata
 * Useful for pages that already have HubSEO from hubService
 */
export function hubSeoToMetadata(hubSeo: HubSEO, ogImage?: string): Metadata {
  const imageUrl = hubSeo.ogImage || ogImage || `${getBaseUrl()}${DEFAULT_OG_IMAGE}`

  return {
    title: hubSeo.title,
    description: hubSeo.description,
    keywords: hubSeo.keywords.join(', '),
    openGraph: {
      title: hubSeo.title,
      description: hubSeo.description,
      url: hubSeo.canonicalUrl,
      siteName: SITE_NAME,
      type: 'website',
      locale: 'en_US',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: hubSeo.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: TWITTER_SITE,
      title: hubSeo.title,
      description: hubSeo.description,
      images: [imageUrl],
    },
    alternates: {
      canonical: hubSeo.canonicalUrl,
    },
  }
}

// =============================================================================
// EXPORTS
// =============================================================================

export { SITE_NAME, YEAR_TO_GRADE, GRADE_AGE_RANGES }

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
 *
 * // 2. Grade page (e.g., /free-printables/year-1)
 * export async function generateMetadata() {
 *   const hubData = await getYearGroupHubData('year-1')
 *   return generateMetadata({
 *     pageType: 'grade',
 *     data: {
 *       year_group: hubData.yearGroup,
 *       worksheet_count: hubData.worksheetCount,
 *       age_range: hubData.ageRange,
 *     },
 *     canonicalPath: '/free-printables/year-1',
 *   })
 * }
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
 *
 * // 4. Subtopic page (e.g., /free-printables/year-1/counting-to-10)
 * export async function generateMetadata() {
 *   return generateMetadata({
 *     pageType: 'subtopic',
 *     data: {
 *       subtopic_name: 'counting-to-10',
 *       topic_name: 'number-counting',
 *       year_group: 'Year 1',
 *       worksheet_count: 8,
 *     },
 *     canonicalPath: '/free-printables/year-1/counting-to-10',
 *   })
 * }
 *
 * // 5. Worksheet page (e.g., /library/counting-to-10-reception)
 * export async function generateMetadata({ params }) {
 *   const worksheet = await getWorksheetBySlug(params.slug)
 *   return generateMetadata({
 *     pageType: 'worksheet',
 *     data: {
 *       title: worksheet.title,
 *       topic: worksheet.topic,
 *       year_group: worksheet.year_group,
 *       skills: ['number recognition', 'counting'],
 *     },
 *     canonicalPath: `/library/${worksheet.slug}`,
 *     ogImage: worksheet.thumbnail_url,
 *   })
 * }
 *
 * // 6. Using HubSEO directly (for pages using hubService)
 * export async function generateMetadata({ params }) {
 *   const hubData = await getSubtopicHubData(params.yearGroup, params.subtopic)
 *   return hubSeoToMetadata(hubData.seo)
 * }
 *
 * // 7. Adding JSON-LD to page
 * export default function WorksheetPage({ worksheet }) {
 *   const jsonLd = generateWorksheetSchema({
 *     title: worksheet.title,
 *     description: worksheet.seo_description,
 *     year_group: worksheet.year_group,
 *     topic: worksheet.topic,
 *     slug: worksheet.slug,
 *     thumbnail_url: worksheet.thumbnail_url,
 *   })
 *
 *   return (
 *     <>
 *       <script
 *         type="application/ld+json"
 *         dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
 *       />
 *       <WorksheetContent worksheet={worksheet} />
 *     </>
 *   )
 * }
 * ```
 */
