import type { SaveToLibraryMetadata } from '@/lib/types/library'

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

  // Generate title (simple, clean - just the topic name)
  // Year group and subtopic are already visible on the worksheet itself
  const title = formattedTopic

  // Generate SEO title (max 60 chars)
  const seoTitle = `Free ${yearGroup} ${formattedSubtopic} Worksheet | UK Curriculum`

  // Generate SEO description (max 160 chars)
  const difficultyText = difficulty ? ` (${difficulty} level)` : ''
  const questionText = questionCount ? ` with ${questionCount} questions` : ''
  const seoDescription = `Download free ${yearGroup} ${formattedSubtopic} worksheet${difficultyText}${questionText}. Aligned with UK National Curriculum. Print-ready PDF format.`

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
