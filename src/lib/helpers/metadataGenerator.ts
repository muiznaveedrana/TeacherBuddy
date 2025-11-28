import type { SaveToLibraryMetadata } from '@/lib/types/library'

// US Grade level mapping for SEO
const yearGroupToUSGrade: Record<string, string> = {
  'Reception': 'Kindergarten',
  'Year 1': 'Grade 1',
  'Year 2': 'Grade 2',
  'Year 3': 'Grade 3',
  'Year 4': 'Grade 4',
  'Year 5': 'Grade 5',
  'Year 6': 'Grade 6',
}

/**
 * Generates SEO-optimized alt text for worksheet images
 * US-first terminology for primary market targeting
 *
 * @example
 * generateImageAlt({
 *   title: "Counting to 10",
 *   yearGroup: "Reception",
 *   subtopic: "counting-to-10",
 *   visualTheme: "animals"
 * })
 * // Returns: "Free Kindergarten counting to 10 math worksheet - animals themed"
 */
export function generateImageAlt(config: {
  title: string
  yearGroup: string
  subtopic: string
  visualTheme?: string | null
  topic?: string
}): string {
  const { title, yearGroup, subtopic, visualTheme, topic } = config

  // Format subtopic for display (e.g., "counting-to-10" -> "counting to 10")
  const formattedSubtopic = subtopic.replace(/-/g, ' ')

  // Get US grade level (primary) with UK as fallback
  const usGrade = yearGroupToUSGrade[yearGroup] || yearGroup

  // Build alt text with US-first terminology
  let altText = `Free ${usGrade} ${formattedSubtopic} math worksheet`

  // Add visual theme if present
  if (visualTheme && visualTheme.trim() !== '') {
    altText += ` - ${visualTheme.toLowerCase()} themed`
  }

  // Ensure alt text isn't too long (max 125 chars recommended for accessibility)
  if (altText.length > 125) {
    altText = `Free ${usGrade} ${formattedSubtopic} worksheet`
  }

  return altText
}

/**
 * Generates auto-populated metadata for saving worksheets to library
 */
export function generateLibraryMetadata(config: {
  yearGroup: string
  topic: string
  subtopic: string
  layout: string
  visualTheme?: string
  difficulty?: 'easy' | 'average' | 'hard'
  questionCount?: number
}): SaveToLibraryMetadata {
  const { yearGroup, topic, subtopic, layout, visualTheme, difficulty, questionCount } = config

  // Format topic and subtopic for display
  const formatLabel = (str: string) =>
    str
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ')

  const formattedTopic = formatLabel(topic)
  const formattedSubtopic = formatLabel(subtopic)

  // Generate title including subtopic for unique slugs
  // Format: "Topic - Subtopic" (e.g., "Number Counting - Counting To 10")
  const title = `${formattedTopic} - ${formattedSubtopic}`

  // Generate SEO title (max 60 chars)
  const seoTitle = `Free ${yearGroup} ${formattedSubtopic} Worksheet | Math Printables`

  // Generate SEO description (max 160 chars)
  const difficultyText = difficulty ? ` (${difficulty} level)` : ''
  const questionText = questionCount ? ` with ${questionCount} questions` : ''
  const seoDescription = `Download free ${yearGroup} ${formattedSubtopic} worksheet${difficultyText}${questionText}. Age-appropriate and ready to print. PDF format.`

  // Generate tags (clean, curriculum-focused only)
  const tags = [
    yearGroup.toLowerCase().replace(/\s+/g, '-'),
    topic,
    subtopic,
    layout, // e.g., 'standard'
  ]

  // ONLY add visual theme if explicitly set by user
  // (themes like 'food', 'animals' should only appear if user selected them)
  if (visualTheme && visualTheme.trim() !== '') {
    tags.push(visualTheme.toLowerCase())
  }

  // NOTE: Difficulty is NOT added to tags (user preference)
  // Difficulty is stored in metadata but not used for tagging/SEO

  return {
    title,
    year_group: yearGroup,
    topic,
    subtopic,
    layout_type: layout,
    visual_theme: visualTheme,
    difficulty,
    question_count: questionCount,
    seo_title: seoTitle.length <= 60 ? seoTitle : seoTitle.substring(0, 57) + '...',
    seo_description: seoDescription.length <= 160 ? seoDescription : seoDescription.substring(0, 157) + '...',
    tags: tags.filter((tag, index, self) => self.indexOf(tag) === index), // Remove duplicates
  }
}
