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
      title: 'Free Printable Maths Worksheets UK | Reception to Year 6',
      description:
        'Download free printable maths worksheets for Reception, Year 1, Year 2 and beyond. Curriculum-aligned, ready to print. Perfect for home learning and classroom use.',
      keywords: [
        'free maths worksheets',
        'printable worksheets UK',
        'free printables',
        'maths worksheets reception',
        'year 1 maths worksheets',
        'year 2 maths worksheets',
        'KS1 worksheets',
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

  const ygInfo = YEAR_GROUPS.find((y) => y.value === yearGroup)

  return {
    yearGroup,
    yearGroupSlug,
    label: ygInfo?.label || yearGroup,
    ageRange: curriculum.ageRange,
    description: curriculum.description,
    topics: topicSummaries,
    worksheetCount: totalWorksheetCount,
    seo: {
      title: `Free ${yearGroup} Maths Worksheets | Printable UK Curriculum`,
      description: `Download free printable ${yearGroup} maths worksheets (${curriculum.ageRange}). ${curriculum.description}. Curriculum-aligned and ready to print.`,
      keywords: [
        `${yearGroup.toLowerCase()} maths worksheets`,
        `free ${yearGroup.toLowerCase()} worksheets`,
        `${yearGroup.toLowerCase()} printables`,
        `${curriculum.ageRange} maths worksheets`,
        'UK curriculum worksheets',
        'free maths printables',
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

  return {
    yearGroup,
    yearGroupSlug,
    topic: topicSlug,
    topicSlug,
    label: topicData.label,
    description: `${topicData.label} worksheets for ${yearGroup}`,
    subtopics: subtopicSummaries,
    worksheetCount: totalWorksheetCount,
    learningObjectives: topicData.learningObjectives,
    complexity: topicData.complexity,
    seo: {
      title: `Free ${topicData.label} Worksheets for ${yearGroup} | Printable UK`,
      description: `Download free ${topicData.label.toLowerCase()} worksheets for ${yearGroup}. ${topicData.learningObjectives[0]}. Curriculum-aligned and ready to print.`,
      keywords: [
        `${topicData.label.toLowerCase()} worksheets`,
        `${yearGroup.toLowerCase()} ${topicData.label.toLowerCase()}`,
        `free ${topicData.label.toLowerCase()} printables`,
        'UK maths worksheets',
        'primary maths resources',
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

  // Build breadcrumbs
  const breadcrumbs: HubBreadcrumb[] = [
    { label: 'Home', href: '/' },
    { label: 'Free Printables', href: '/free-printables' },
    { label: yearGroup, href: `/free-printables/${yearGroupSlug}` },
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
