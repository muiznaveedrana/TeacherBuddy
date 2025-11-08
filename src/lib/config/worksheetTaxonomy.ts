/**
 * WORKSHEET TAXONOMY - Pulled from curriculum.ts (Single Source of Truth)
 *
 * This file provides standardized vocabulary for worksheet metadata by
 * reading directly from the curriculum mapping used throughout the app.
 *
 * Benefits:
 * - Zero duplication: curriculum.ts drives dropdowns, prompts, AND library
 * - No regressions: existing worksheet generation continues to work
 * - Automatic updates: adding topics to curriculum.ts updates everything
 */

import { CURRICULUM_MAPPING, getAvailableTopics, getAvailableSubtopics } from '@/lib/data/curriculum'

export interface TopicDefinition {
  value: string // Database value (kebab-case)
  display: string // UI display name
  subtopics: SubtopicDefinition[]
}

export interface SubtopicDefinition {
  value: string // Database value (kebab-case)
  display: string // UI display name
  synonyms?: string[] // For AI search mapping
}

/**
 * Build taxonomy from curriculum.ts dynamically
 */
function buildTaxonomyFromCurriculum(): TopicDefinition[] {
  const taxonomy: TopicDefinition[] = []

  // Process each year group
  for (const [yearGroup, yearData] of Object.entries(CURRICULUM_MAPPING)) {
    // Process each topic in this year group
    for (const [topicId, topicData] of Object.entries(yearData.topics)) {
      // Check if we already have this topic (from another year group)
      let existingTopic = taxonomy.find(t => t.value === topicId)

      if (!existingTopic) {
        // Create new topic entry
        existingTopic = {
          value: topicId,
          display: topicData.label,
          subtopics: []
        }
        taxonomy.push(existingTopic)
      }

      // Add subtopics (avoiding duplicates)
      for (const subtopic of topicData.subtopics) {
        const exists = existingTopic.subtopics.some(s => s.value === subtopic.value)
        if (!exists) {
          existingTopic.subtopics.push({
            value: subtopic.value,
            display: subtopic.label,
            synonyms: generateSynonyms(subtopic.value, subtopic.label)
          })
        }
      }
    }
  }

  return taxonomy
}

/**
 * Generate search synonyms for a subtopic
 */
function generateSynonyms(value: string, label: string): string[] {
  const synonyms: string[] = []

  // Add the value itself (kebab-case)
  synonyms.push(value)

  // Add label (Title Case)
  synonyms.push(label.toLowerCase())

  // Add common variations
  if (value.includes('to-')) {
    // "numbers-to-20" → "numbers to 20", "counting to 20"
    synonyms.push(value.replace(/-/g, ' '))
    synonyms.push('counting ' + value.split('-to-')[1])
  }

  if (value.includes('within-')) {
    // "adding-to-20" → "adding within 20", "add to 20"
    synonyms.push(value.replace('adding-', 'add ').replace('to-', 'to '))
    synonyms.push(value.replace('-', ' ').replace('to-', 'within '))
  }

  return synonyms
}

/**
 * SINGLE SOURCE OF TRUTH - Built from curriculum.ts
 */
export const WORKSHEET_TAXONOMY = buildTaxonomyFromCurriculum()

/**
 * HELPER FUNCTIONS
 */

// Get all topic values (for dropdowns, validation)
export function getAllTopics(): string[] {
  return WORKSHEET_TAXONOMY.map(t => t.value)
}

// Get subtopics for a specific topic
export function getSubtopicsForTopic(topicValue: string): SubtopicDefinition[] {
  const topic = WORKSHEET_TAXONOMY.find(t => t.value === topicValue)
  return topic?.subtopics || []
}

// Map display name to database value (with fuzzy matching)
export function normalizeTopicValue(displayOrValue: string): string | null {
  const normalized = displayOrValue.toLowerCase().trim()

  // Exact value match (kebab-case)
  const exactMatch = WORKSHEET_TAXONOMY.find(t => t.value === normalized)
  if (exactMatch) return exactMatch.value

  // Display name match (Title Case)
  const displayMatch = WORKSHEET_TAXONOMY.find(t =>
    t.display.toLowerCase() === normalized
  )
  if (displayMatch) return displayMatch.value

  // Fuzzy match common variations
  // "number & place value" → "number-place-value"
  const kebabized = normalized.replace(/\s+&\s+/g, '-').replace(/\s+/g, '-')
  const fuzzyMatch = WORKSHEET_TAXONOMY.find(t => t.value === kebabized)
  if (fuzzyMatch) return fuzzyMatch.value

  return null
}

// Map display name or synonym to subtopic value
export function normalizeSubtopicValue(topicValue: string, displayOrValue: string): string | null {
  const topic = WORKSHEET_TAXONOMY.find(t => t.value === topicValue)
  if (!topic) return null

  const normalized = displayOrValue.toLowerCase().trim()

  // Exact value match
  const exactMatch = topic.subtopics.find(s => s.value === normalized)
  if (exactMatch) return exactMatch.value

  // Display name match
  const displayMatch = topic.subtopics.find(s =>
    s.display.toLowerCase() === normalized
  )
  if (displayMatch) return displayMatch.value

  // Synonym match
  const synonymMatch = topic.subtopics.find(s =>
    s.synonyms?.some(syn => syn.toLowerCase() === normalized)
  )
  if (synonymMatch) return synonymMatch.value

  // Fuzzy match: remove spaces/hyphens
  const fuzzyNormalized = normalized.replace(/[\s-]/g, '')
  const fuzzyMatch = topic.subtopics.find(s =>
    s.value.replace(/[\s-]/g, '') === fuzzyNormalized
  )
  if (fuzzyMatch) return fuzzyMatch.value

  return null
}

// Get display name for topic value
export function getTopicDisplay(topicValue: string): string {
  const topic = WORKSHEET_TAXONOMY.find(t => t.value === topicValue)
  return topic?.display || topicValue
}

// Get display name for subtopic value
export function getSubtopicDisplay(topicValue: string, subtopicValue: string): string {
  const topic = WORKSHEET_TAXONOMY.find(t => t.value === topicValue)
  const subtopic = topic?.subtopics.find(s => s.value === subtopicValue)
  return subtopic?.display || subtopicValue
}

/**
 * VISUAL THEMES (standardized)
 */
export const VISUAL_THEMES = [
  { value: 'animals', display: 'Animals' },
  { value: 'fruits', display: 'Fruits' },
  { value: 'toys', display: 'Toys' },
  { value: 'vehicles', display: 'Vehicles' },
  { value: 'food', display: 'Food' },
  { value: 'sports', display: 'Sports' },
  { value: 'space', display: 'Space' },
  { value: 'nature', display: 'Nature' },
] as const

/**
 * SEASONAL THEMES (standardized)
 */
export const SEASONAL_THEMES = [
  { value: 'christmas', display: 'Christmas' },
  { value: 'halloween', display: 'Halloween' },
  { value: 'easter', display: 'Easter' },
  { value: 'summer', display: 'Summer' },
  { value: 'spring', display: 'Spring' },
  { value: 'autumn', display: 'Autumn' },
  { value: 'winter', display: 'Winter' },
] as const

/**
 * ACTIVITY TYPES (standardized)
 */
export const ACTIVITY_TYPES = [
  { value: 'circle-answer', display: 'Circle the Answer' },
  { value: 'fill-blanks', display: 'Fill in the Blanks' },
  { value: 'matching', display: 'Matching' },
  { value: 'color-count', display: 'Color & Count' },
  { value: 'trace-write', display: 'Trace & Write' },
  { value: 'cut-paste', display: 'Cut & Paste' },
  { value: 'tracing', display: 'Tracing' },
  { value: 'picture-addition', display: 'Picture Addition' },
] as const
