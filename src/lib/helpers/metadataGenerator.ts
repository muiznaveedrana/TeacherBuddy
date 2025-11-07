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

  // Generate title
  const title = `${yearGroup} - ${formattedTopic} - ${formattedSubtopic}`

  // Generate SEO title (max 60 chars)
  const seoTitle = `Free ${yearGroup} ${formattedSubtopic} Worksheet | UK Curriculum`

  // Generate SEO description (max 160 chars)
  const difficultyText = difficulty ? ` (${difficulty} level)` : ''
  const questionText = questionCount ? ` with ${questionCount} questions` : ''
  const seoDescription = `Download free ${yearGroup} ${formattedSubtopic} worksheet${difficultyText}${questionText}. Aligned with UK National Curriculum. Print-ready PDF format.`

  // Generate tags
  const tags = [
    yearGroup.toLowerCase().replace(/\s+/g, '-'),
    topic,
    subtopic,
  ]

  // Add difficulty tag
  if (difficulty) {
    tags.push(difficulty)
  }

  // Add theme tag
  if (visualTheme) {
    tags.push(visualTheme)
  }

  // Add layout tag
  tags.push(layout)

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
