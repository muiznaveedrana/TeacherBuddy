// ============================================================================
// HUB SERVICE - Fetches data for Free Printables hub pages
// ============================================================================

import { getSupabase, getSupabaseAdmin } from './libraryService'
import { CURRICULUM_MAPPING, YEAR_GROUPS } from '@/lib/data/curriculum'
import { generateHubContent, generateHubFAQ, generateHubSEO } from '@/lib/data/hubContent'
import type { LibraryWorksheet } from '@/lib/types/library'
import type {
  MainHub,
  YearGroupHub,
  TopicHub,
  SubtopicHub,
  YearGroupSummary,
  TopicSummary,
  SubtopicSummary,
  HubBreadcrumb,
  yearGroupToSlug,
  slugToYearGroup,
} from '@/lib/types/hub'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://freemathprintable.com'

// ============================================================================
// MAIN HUB PAGE - /free-printables/
// ============================================================================

export async function getMainHubData(): Promise<MainHub> {
  const supabase = getSupabase()

  // Get worksheet counts per year group
  const yearGroupSummaries: YearGroupSummary[] = []

  for (const yg of YEAR_GROUPS.filter((y) => !y.disabled)) {
    const { count } = await supabase
      .from('library_worksheets')
      .select('*', { count: 'exact', head: true })
      .eq('year_group', yg.value)
      .eq('status', 'published')
      .eq('region', 'UK')

    const curriculum = CURRICULUM_MAPPING[yg.value]
    const topicCount = curriculum ? Object.keys(curriculum.topics).length : 0

    yearGroupSummaries.push({
      yearGroup: yg.value,
      yearGroupSlug: yearGroupToSlugFn(yg.value),
      label: yg.label,
      ageRange: curriculum?.ageRange || '',
      topicCount,
      worksheetCount: count || 0,
      href: `/free-printables/${yearGroupToSlugFn(yg.value)}`,
    })
  }

  // Get popular worksheets (top 6 by downloads)
  const { data: popularWorksheets } = await supabase
    .from('library_worksheets')
    .select('*')
    .eq('status', 'published')
    .eq('region', 'UK')
    .order('download_count', { ascending: false })
    .limit(6)

  const totalWorksheetCount = yearGroupSummaries.reduce((sum, yg) => sum + yg.worksheetCount, 0)

  return {
    yearGroups: yearGroupSummaries,
    totalWorksheetCount,
    popularWorksheets: (popularWorksheets as LibraryWorksheet[]) || [],
    seo: {
      title: 'Free Math Printables | Kindergarten to Grade 6 / Reception to Year 6',
      description:
        'Download free printable math worksheets for Kindergarten to Grade 6 (Reception to Year 6). Ages 4-11. Curriculum-aligned, ready to print. Perfect for home learning and classroom use.',
      keywords: [
        // US-first keywords
        'free math printables',
        'kindergarten math printables',
        'grade 1 math printables',
        'grade 2 math printables',
        'elementary math printables',
        // UK keywords
        'free maths printables',
        'reception worksheets',
        'year 1 maths worksheets',
        'year 2 maths worksheets',
        'KS1 printables',
        'primary maths resources',
      ],
      canonicalUrl: `${BASE_URL}/free-printables`,
    },
  }
}

// ============================================================================
// YEAR GROUP HUB PAGE - /free-printables/[yearGroup]/
// ============================================================================

export async function getYearGroupHubData(yearGroupSlug: string): Promise<YearGroupHub | null> {
  const yearGroup = slugToYearGroupFn(yearGroupSlug)
  const curriculum = CURRICULUM_MAPPING[yearGroup]

  if (!curriculum) {
    return null
  }

  const supabase = getSupabase()

  // Get topic summaries with worksheet counts
  const topicSummaries: TopicSummary[] = []

  for (const [topicId, topicData] of Object.entries(curriculum.topics)) {
    const { count } = await supabase
      .from('library_worksheets')
      .select('*', { count: 'exact', head: true })
      .eq('year_group', yearGroup)
      .eq('topic', topicId)
      .eq('status', 'published')
      .eq('region', 'UK')

    topicSummaries.push({
      topic: topicId,
      topicSlug: topicId, // Already kebab-case
      label: topicData.label,
      subtopicCount: topicData.subtopics.length,
      worksheetCount: count || 0,
      href: `/free-printables/${yearGroupSlug}/${topicId}`,
    })
  }

  const totalWorksheetCount = topicSummaries.reduce((sum, t) => sum + t.worksheetCount, 0)

  // Fetch popular worksheets for this year group (top 6 by downloads)
  const { data: popularWorksheets } = await supabase
    .from('library_worksheets')
    .select('*')
    .eq('year_group', yearGroup)
    .eq('status', 'published')
    .eq('region', 'UK')
    .order('download_count', { ascending: false })
    .limit(6)

  const ygInfo = YEAR_GROUPS.find((y) => y.value === yearGroup)

  // Get US grade equivalent for dual terminology
  const usGrade = getUSGradeLabelFn(yearGroup)
  const dualLabel = yearGroup === 'Reception'
    ? 'Kindergarten / Reception'
    : `${usGrade} / ${yearGroup}`

  return {
    yearGroup,
    yearGroupSlug,
    label: ygInfo?.label || yearGroup,
    ageRange: curriculum.ageRange,
    description: curriculum.description,
    topics: topicSummaries,
    worksheetCount: totalWorksheetCount,
    popularWorksheets: (popularWorksheets as LibraryWorksheet[]) || [],
    seo: {
      title: `Free ${dualLabel} Math Printables | Ages ${curriculum.ageRange}`,
      description: `Download free printable ${dualLabel} math worksheets (ages ${curriculum.ageRange}). ${curriculum.description}. Curriculum-aligned and ready to print.`,
      keywords: [
        // US-first keywords
        `${usGrade.toLowerCase()} math printables`,
        `free ${usGrade.toLowerCase()} printables`,
        `${usGrade.toLowerCase()} worksheets`,
        // UK keywords
        `${yearGroup.toLowerCase()} maths printables`,
        `free ${yearGroup.toLowerCase()} worksheets`,
        `${curriculum.ageRange} maths worksheets`,
        // Universal
        'free math printables',
        'curriculum-aligned printables',
      ],
      canonicalUrl: `${BASE_URL}/free-printables/${yearGroupSlug}`,
    },
  }
}

// ============================================================================
// TOPIC HUB PAGE - /free-printables/[yearGroup]/[topic]/
// ============================================================================

export async function getTopicHubData(
  yearGroupSlug: string,
  topicSlug: string
): Promise<TopicHub | null> {
  const yearGroup = slugToYearGroupFn(yearGroupSlug)
  const curriculum = CURRICULUM_MAPPING[yearGroup]

  if (!curriculum || !curriculum.topics[topicSlug]) {
    return null
  }

  const topicData = curriculum.topics[topicSlug]
  const supabase = getSupabase()

  // Get subtopic summaries with worksheet counts
  const subtopicSummaries: SubtopicSummary[] = []

  for (const subtopic of topicData.subtopics) {
    const { count } = await supabase
      .from('library_worksheets')
      .select('*', { count: 'exact', head: true })
      .eq('year_group', yearGroup)
      .eq('subtopic', subtopic.value)
      .eq('status', 'published')
      .eq('region', 'UK')

    subtopicSummaries.push({
      subtopic: subtopic.value,
      subtopicSlug: subtopic.value, // Already kebab-case
      label: subtopic.label,
      worksheetCount: count || 0,
      href: `/free-printables/${yearGroupSlug}/${subtopic.value}`,
    })
  }

  const totalWorksheetCount = subtopicSummaries.reduce((sum, s) => sum + s.worksheetCount, 0)

  // Fetch popular worksheets for this topic (top 6 by downloads)
  const { data: popularWorksheets } = await supabase
    .from('library_worksheets')
    .select('*')
    .eq('year_group', yearGroup)
    .eq('topic', topicSlug)
    .eq('status', 'published')
    .eq('region', 'UK')
    .order('download_count', { ascending: false })
    .limit(6)

  // Get US grade equivalent for dual terminology
  const dualLabel = getDualLabelFn(yearGroup)
  const usGrade = getUSGradeLabelFn(yearGroup)

  return {
    yearGroup,
    yearGroupSlug,
    topic: topicSlug,
    topicSlug,
    label: topicData.label,
    description: `${topicData.label} printables for ${dualLabel}`,
    subtopics: subtopicSummaries,
    worksheetCount: totalWorksheetCount,
    popularWorksheets: (popularWorksheets as LibraryWorksheet[]) || [],
    learningObjectives: topicData.learningObjectives,
    complexity: topicData.complexity,
    seo: {
      title: `Free ${topicData.label} Printables for ${dualLabel}`,
      description: `Download free ${topicData.label.toLowerCase()} printables for ${dualLabel}. ${topicData.learningObjectives[0]}. Curriculum-aligned and ready to print.`,
      keywords: [
        // US-first keywords
        `${topicData.label.toLowerCase()} printables ${usGrade.toLowerCase()}`,
        `${usGrade.toLowerCase()} ${topicData.label.toLowerCase()}`,
        `free ${topicData.label.toLowerCase()} printables`,
        // UK keywords
        `${topicData.label.toLowerCase()} worksheets ${yearGroup.toLowerCase()}`,
        `${yearGroup.toLowerCase()} ${topicData.label.toLowerCase()}`,
        // Universal
        'free math printables',
        'curriculum math resources',
      ],
      canonicalUrl: `${BASE_URL}/free-printables/${yearGroupSlug}/${topicSlug}`,
    },
  }
}

// ============================================================================
// SUBTOPIC HUB PAGE (THE MAIN BLOG) - /free-printables/[yearGroup]/[subtopic]/
// ============================================================================

export async function getSubtopicHubData(
  yearGroupSlug: string,
  subtopicSlug: string
): Promise<SubtopicHub | null> {
  const yearGroup = slugToYearGroupFn(yearGroupSlug)
  const curriculum = CURRICULUM_MAPPING[yearGroup]

  if (!curriculum) {
    return null
  }

  // Find the topic and subtopic
  let foundTopic: string | null = null
  let foundTopicLabel: string | null = null
  let foundSubtopic: { value: string; label: string; description?: string } | null = null
  let topicLearningObjectives: string[] = []

  for (const [topicId, topicData] of Object.entries(curriculum.topics)) {
    const subtopic = topicData.subtopics.find((s) => s.value === subtopicSlug)
    if (subtopic) {
      foundTopic = topicId
      foundTopicLabel = topicData.label
      foundSubtopic = subtopic
      topicLearningObjectives = topicData.learningObjectives
      break
    }
  }

  if (!foundTopic || !foundSubtopic) {
    return null
  }

  const supabase = getSupabase()

  // Fetch ALL worksheets for this subtopic
  const { data: worksheets, count } = await supabase
    .from('library_worksheets')
    .select('*', { count: 'exact' })
    .eq('year_group', yearGroup)
    .eq('subtopic', subtopicSlug)
    .eq('status', 'published')
    .eq('region', 'UK')
    .order('download_count', { ascending: false })

  // Get related subtopics (from same topic)
  const topicData = curriculum.topics[foundTopic]
  const relatedSubtopics: SubtopicSummary[] = topicData.subtopics
    .filter((s) => s.value !== subtopicSlug)
    .slice(0, 4)
    .map((s) => ({
      subtopic: s.value,
      subtopicSlug: s.value,
      label: s.label,
      worksheetCount: 0, // We don't fetch count for related to reduce queries
      href: `/free-printables/${yearGroupSlug}/${s.value}`,
      yearGroup,
      topic: foundTopic,
    }))

  // Generate educational content
  const educationalContent = generateHubContent(
    yearGroup,
    foundTopicLabel!,
    foundSubtopic.label,
    curriculum.ageRange,
    topicLearningObjectives
  )

  // Generate FAQ
  const faq = generateHubFAQ(yearGroup, foundSubtopic.label, curriculum.ageRange)

  // Generate SEO
  const seo = generateHubSEO(
    yearGroup,
    foundSubtopic.label,
    curriculum.ageRange,
    yearGroupSlug,
    subtopicSlug
  )

  // Build breadcrumbs (using dual label)
  const dualLabel = getDualLabelFn(yearGroup)
  const breadcrumbs: HubBreadcrumb[] = [
    { label: 'Home', href: '/' },
    { label: 'Free Printables', href: '/free-printables' },
    { label: dualLabel, href: `/free-printables/${yearGroupSlug}` },
    { label: foundSubtopic.label, href: `/free-printables/${yearGroupSlug}/${subtopicSlug}`, current: true },
  ]

  return {
    yearGroup,
    yearGroupSlug,
    topic: foundTopic,
    topicSlug: foundTopic,
    subtopic: subtopicSlug,
    subtopicSlug,
    label: foundSubtopic.label,
    description: foundSubtopic.description || `${foundSubtopic.label} worksheets for ${yearGroup}`,
    worksheets: (worksheets as LibraryWorksheet[]) || [],
    worksheetCount: count || 0,
    learningObjectives: topicLearningObjectives,
    educationalContent,
    relatedSubtopics,
    faq,
    seo,
    breadcrumbs,
  }
}

// ============================================================================
// SUBTOPIC HUB PAGE WITH TOPIC - /free-printables/[yearGroup]/[topic]/[subtopic]/
// ============================================================================

export async function getSubtopicHubDataWithTopic(
  yearGroupSlug: string,
  topicSlug: string,
  subtopicSlug: string
): Promise<(SubtopicHub & { topicLabel: string }) | null> {
  const yearGroup = slugToYearGroupFn(yearGroupSlug)
  const curriculum = CURRICULUM_MAPPING[yearGroup]

  if (!curriculum || !curriculum.topics[topicSlug]) {
    return null
  }

  const topicData = curriculum.topics[topicSlug]
  const foundSubtopic = topicData.subtopics.find((s) => s.value === subtopicSlug)

  if (!foundSubtopic) {
    return null
  }

  const supabase = getSupabase()

  // Fetch ALL worksheets for this subtopic
  const { data: worksheets, count } = await supabase
    .from('library_worksheets')
    .select('*', { count: 'exact' })
    .eq('year_group', yearGroup)
    .eq('subtopic', subtopicSlug)
    .eq('status', 'published')
    .eq('region', 'UK')
    .order('download_count', { ascending: false })

  // Get related subtopics (from same topic) with new URL structure
  const relatedSubtopics: SubtopicSummary[] = topicData.subtopics
    .filter((s) => s.value !== subtopicSlug)
    .slice(0, 4)
    .map((s) => ({
      subtopic: s.value,
      subtopicSlug: s.value,
      label: s.label,
      worksheetCount: 0,
      href: `/free-printables/${yearGroupSlug}/${topicSlug}/${s.value}`,
      yearGroup,
      topic: topicSlug,
    }))

  // Generate educational content
  const educationalContent = generateHubContent(
    yearGroup,
    topicData.label,
    foundSubtopic.label,
    curriculum.ageRange,
    topicData.learningObjectives
  )

  // Generate FAQ
  const faq = generateHubFAQ(yearGroup, foundSubtopic.label, curriculum.ageRange)

  // Get US grade equivalent for dual terminology
  const dualLabel = getDualLabelFn(yearGroup)
  const usGrade = getUSGradeLabelFn(yearGroup)

  // Generate SEO with new URL structure
  const seo = {
    title: `Free ${foundSubtopic.label} Printables for ${dualLabel}`,
    description: `Download free ${foundSubtopic.label.toLowerCase()} printables for ${dualLabel}. ${topicData.learningObjectives[0]}. Curriculum-aligned and ready to print.`,
    keywords: [
      // US-first keywords
      `${foundSubtopic.label.toLowerCase()} printables ${usGrade.toLowerCase()}`,
      `${usGrade.toLowerCase()} ${foundSubtopic.label.toLowerCase()}`,
      `free ${foundSubtopic.label.toLowerCase()} printables`,
      // UK keywords
      `${foundSubtopic.label.toLowerCase()} worksheets ${yearGroup.toLowerCase()}`,
      `${yearGroup.toLowerCase()} ${foundSubtopic.label.toLowerCase()}`,
      // Universal
      'free math printables',
      'curriculum math resources',
    ],
    canonicalUrl: `${BASE_URL}/free-printables/${yearGroupSlug}/${topicSlug}/${subtopicSlug}`,
  }

  // Build breadcrumbs with topic level (using dual label)
  const breadcrumbs: HubBreadcrumb[] = [
    { label: 'Home', href: '/' },
    { label: 'Free Printables', href: '/free-printables' },
    { label: dualLabel, href: `/free-printables/${yearGroupSlug}` },
    { label: topicData.label, href: `/free-printables/${yearGroupSlug}/${topicSlug}` },
    { label: foundSubtopic.label, href: `/free-printables/${yearGroupSlug}/${topicSlug}/${subtopicSlug}`, current: true },
  ]

  return {
    yearGroup,
    yearGroupSlug,
    topic: topicSlug,
    topicSlug,
    topicLabel: topicData.label,
    subtopic: subtopicSlug,
    subtopicSlug,
    label: foundSubtopic.label,
    description: foundSubtopic.description || `${foundSubtopic.label} worksheets for ${yearGroup}`,
    worksheets: (worksheets as LibraryWorksheet[]) || [],
    worksheetCount: count || 0,
    learningObjectives: topicData.learningObjectives,
    educationalContent,
    relatedSubtopics,
    faq,
    seo,
    breadcrumbs,
  }
}

// ============================================================================
// STATIC PARAMS GENERATION (for build-time generation)
// ============================================================================

/**
 * Get all valid year group slugs
 */
export function getAllYearGroupSlugs(): string[] {
  return YEAR_GROUPS.filter((y) => !y.disabled).map((y) => yearGroupToSlugFn(y.value))
}

/**
 * Get all valid subtopic paths for static generation
 */
export function getAllSubtopicPaths(): Array<{ yearGroup: string; subtopic: string }> {
  const paths: Array<{ yearGroup: string; subtopic: string }> = []

  for (const yg of YEAR_GROUPS.filter((y) => !y.disabled)) {
    const curriculum = CURRICULUM_MAPPING[yg.value]
    if (!curriculum) continue

    const yearGroupSlug = yearGroupToSlugFn(yg.value)

    for (const topicData of Object.values(curriculum.topics)) {
      for (const subtopic of topicData.subtopics) {
        paths.push({
          yearGroup: yearGroupSlug,
          subtopic: subtopic.value,
        })
      }
    }
  }

  return paths
}

/**
 * Get all valid subtopic paths with topic for static generation (new 3-level structure)
 */
export function getAllSubtopicPathsWithTopic(): Array<{ yearGroup: string; topic: string; subtopic: string }> {
  const paths: Array<{ yearGroup: string; topic: string; subtopic: string }> = []

  for (const yg of YEAR_GROUPS.filter((y) => !y.disabled)) {
    const curriculum = CURRICULUM_MAPPING[yg.value]
    if (!curriculum) continue

    const yearGroupSlug = yearGroupToSlugFn(yg.value)

    for (const [topicId, topicData] of Object.entries(curriculum.topics)) {
      for (const subtopic of topicData.subtopics) {
        paths.push({
          yearGroup: yearGroupSlug,
          topic: topicId,
          subtopic: subtopic.value,
        })
      }
    }
  }

  return paths
}

/**
 * Get all valid topic paths for static generation
 */
export function getAllTopicPaths(): Array<{ yearGroup: string; topic: string }> {
  const paths: Array<{ yearGroup: string; topic: string }> = []

  for (const yg of YEAR_GROUPS.filter((y) => !y.disabled)) {
    const curriculum = CURRICULUM_MAPPING[yg.value]
    if (!curriculum) continue

    const yearGroupSlug = yearGroupToSlugFn(yg.value)

    for (const topicId of Object.keys(curriculum.topics)) {
      paths.push({
        yearGroup: yearGroupSlug,
        topic: topicId,
      })
    }
  }

  return paths
}

// ============================================================================
// HELPER FUNCTIONS (local implementations to avoid circular imports)
// ============================================================================

function yearGroupToSlugFn(yearGroup: string): string {
  return yearGroup.toLowerCase().replace(/\s+/g, '-')
}

function slugToYearGroupFn(slug: string): string {
  if (slug === 'reception') return 'Reception'
  const match = slug.match(/^year-(\d+)$/)
  if (match) return `Year ${match[1]}`
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function getUSGradeLabelFn(yearGroup: string): string {
  const usLabels: Record<string, string> = {
    Reception: 'Kindergarten',
    'Year 1': 'Grade 1',
    'Year 2': 'Grade 2',
    'Year 3': 'Grade 3',
    'Year 4': 'Grade 4',
    'Year 5': 'Grade 5',
    'Year 6': 'Grade 6',
  }
  return usLabels[yearGroup] || yearGroup
}

function getDualLabelFn(yearGroup: string): string {
  const usGrade = getUSGradeLabelFn(yearGroup)
  return yearGroup === 'Reception'
    ? 'Kindergarten / Reception'
    : `${usGrade} / ${yearGroup}`
}
