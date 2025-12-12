import { GoogleGenerativeAI } from '@google/generative-ai'
import { WORKSHEET_TAXONOMY, normalizeTopicValue, normalizeSubtopicValue } from '@/lib/config/worksheetTaxonomy'
import { CURRICULUM_MAPPING } from '@/lib/data/curriculum'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

// Curriculum-aware topic mapping for invalid year_group + topic combinations
// Maps user intent to valid curriculum topics
// This ensures searches like "reception addition" return meaningful results
// POC Phase: Only Reception, Year 1, Year 2 are available
const TOPIC_REMAPPING: Record<string, Record<string, { topic: string; subtopic?: string }>> = {
  // ============================================
  // RECEPTION (Ages 4-5) - Has: number-counting, shape-space, measurement
  // ============================================
  'Reception': {
    'addition-subtraction': { topic: 'number-counting', subtopic: 'early-addition' },
    'number-place-value': { topic: 'number-counting' },
    'geometry-shapes': { topic: 'shape-space' },
    'geometry-position': { topic: 'shape-space', subtopic: 'position-direction' },
    'multiplication-division': { topic: 'number-counting' },
    'fractions': { topic: 'number-counting' },
    'statistics': { topic: 'number-counting' },
  },

  // ============================================
  // YEAR 1 (Ages 5-6) - Has: number-place-value, addition-subtraction, measurement, geometry-shapes, fractions
  // ============================================
  'Year 1': {
    'number-counting': { topic: 'number-place-value' },
    'shape-space': { topic: 'geometry-shapes' },
    'geometry-position': { topic: 'geometry-shapes' },
    'multiplication-division': { topic: 'addition-subtraction' },
    'statistics': { topic: 'number-place-value' },
  },

  // ============================================
  // YEAR 2 (Ages 6-7) - Has: number-place-value, addition-subtraction, multiplication-division,
  //                          fractions, measurement, statistics, geometry-shapes, geometry-position
  // Year 2 has the most complete topic coverage - minimal remapping needed
  // ============================================
  'Year 2': {
    'number-counting': { topic: 'number-place-value' },
    'shape-space': { topic: 'geometry-shapes' },
  },
}

/**
 * Validate and remap topic if the year_group + topic combination doesn't exist in curriculum
 */
function validateAndRemapTopic(parsed: ParsedSearchQuery): ParsedSearchQuery {
  if (!parsed.year_group || !parsed.topic) {
    return parsed
  }

  const yearData = CURRICULUM_MAPPING[parsed.year_group]
  if (!yearData) {
    return parsed // Unknown year group, let it pass
  }

  // Check if topic exists for this year group
  const topicExists = Object.keys(yearData.topics).includes(parsed.topic)

  if (topicExists) {
    return parsed // Valid combination, no remapping needed
  }

  // Topic doesn't exist for this year group - try to remap
  const remapping = TOPIC_REMAPPING[parsed.year_group]?.[parsed.topic]

  if (remapping) {
    console.log(`🔄 Remapping invalid combo: ${parsed.year_group} + ${parsed.topic} → ${remapping.topic}${remapping.subtopic ? ` (${remapping.subtopic})` : ''}`)
    return {
      ...parsed,
      topic: remapping.topic,
      subtopic: remapping.subtopic || parsed.subtopic,
    }
  }

  // No remapping available - remove topic to show all results for year group
  console.warn(`⚠️ No valid topic mapping for ${parsed.year_group} + ${parsed.topic}, showing all ${parsed.year_group} worksheets`)
  const { topic: _, subtopic: __, ...rest } = parsed
  return rest
}

export interface ParsedSearchQuery {
  year_group?: string
  topic?: string
  subtopic?: string
  visual_theme?: string
  activity_type?: string
  seasonal_theme?: string
  difficulty?: string
  keywords?: string[]
}

// Build taxonomy-based prompt dynamically
function buildTaxonomyPrompt(): string {
  // Generate complete topic list with display names
  const topicsExamples = WORKSHEET_TAXONOMY.map(t =>
    `  - "${t.value}" (Display: ${t.display})`
  ).join('\n')

  // Generate detailed subtopic examples for better AI understanding
  const subtopicExamples = WORKSHEET_TAXONOMY.slice(0, 5).map(t => {
    const examples = t.subtopics.slice(0, 5).map(s =>
      `"${s.value}" (${s.display})`
    ).join(', ')
    return `  - ${t.display}: ${examples}`
  }).join('\n')

  // Build query mapping examples dynamically from taxonomy
  const mappingExamples: string[] = []
  WORKSHEET_TAXONOMY.slice(0, 5).forEach(topic => {
    mappingExamples.push(`- "${topic.display.toLowerCase()}" → {"topic": "${topic.value}"}`)
    if (topic.subtopics.length > 0) {
      const firstSubtopic = topic.subtopics[0]
      mappingExamples.push(`- "${firstSubtopic.display.toLowerCase()}" → {"topic": "${topic.value}", "subtopic": "${firstSubtopic.value}"}`)
    }
  })

  return `You are a search query parser for a UK primary school worksheet library.

Parse natural language queries into structured filters using EXACT taxonomy values below.

CRITICAL RULES:
1. Use kebab-case values EXACTLY as shown (e.g., "number-place-value", not "number & place value")
2. Never make up new topic/subtopic values - only use values from the lists below
3. Match user intent: "counting" could map to "number-counting" (Reception/Year 1) or "number-place-value" (Year 2+)
4. Be flexible with synonyms but map to exact taxonomy values

Available Topics (${WORKSHEET_TAXONOMY.length} total):
${topicsExamples}

Example Subtopics by Topic:
${subtopicExamples}

Available Filters:
- year_group: "Reception", "Year 1", "Year 2", "Year 3", "Year 4", "Year 5", "Year 6"
- topic: Use EXACT kebab-case values from list above
- subtopic: Use EXACT kebab-case values (check subtopics for each topic)
- visual_theme: "animals", "fruits", "toys", "vehicles", "food", "sports", "space", "nature"
- activity_type: "circle-answer", "fill-blanks", "matching", "color-count", "trace-write", "cut-paste", "tracing", "picture-addition"
- seasonal_theme: "christmas", "halloween", "easter", "summer", "spring", "autumn", "winter"
- difficulty: "easy", "medium", "hard"

Query Mapping Examples (from curriculum):
${mappingExamples.join('\n')}

Context Hints:
- "counting" WITHOUT year context → use "number-place-value" topic (broader, includes counting-to-10, counting-to-20, counting-to-100)
- "counting" WITH "reception" → use "number-counting" topic
- "numbers" → use "number-place-value" topic
- "shapes" → check for "geometry-shapes" or "shape-space" depending on year
- "addition/subtraction" → could be combined as "addition-subtraction" or separate topics

IMPORTANT for ambiguous queries:
- If query is ambiguous (like "counting" alone), prefer the BROADER topic that captures more results
- "number-place-value" is broader than "number-counting" - use it unless year group specifies Reception
- When in doubt, omit subtopic to get more results

Respond ONLY with valid JSON. No explanations.

Now parse this query:`
}

export async function parseSearchQuery(query: string): Promise<ParsedSearchQuery> {
  try {
    // Use Gemini Flash (cheapest, fastest)
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash-exp',
      generationConfig: {
        temperature: 0.1, // Low temperature for consistent parsing
        maxOutputTokens: 200,
      }
    })

    const prompt = `${buildTaxonomyPrompt()}\n\n"${query}"\n\nJSON response:`

    const result = await model.generateContent(prompt)
    const response = result.response.text()

    // Extract JSON from response (handle markdown code blocks)
    const jsonMatch = response.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('No valid JSON found in response')
    }

    let parsed: ParsedSearchQuery = JSON.parse(jsonMatch[0])

    // NORMALIZE: Fix any values that don't match taxonomy exactly
    if (parsed.topic) {
      const normalized = normalizeTopicValue(parsed.topic)
      if (normalized) {
        parsed.topic = normalized
      } else {
        console.warn(`⚠️ Unknown topic from AI: "${parsed.topic}"`)
        delete parsed.topic // Remove invalid topic
      }
    }

    if (parsed.subtopic && parsed.topic) {
      const normalized = normalizeSubtopicValue(parsed.topic, parsed.subtopic)
      if (normalized) {
        parsed.subtopic = normalized
      } else {
        console.warn(`⚠️ Unknown subtopic from AI: "${parsed.subtopic}" for topic "${parsed.topic}"`)
        delete parsed.subtopic // Remove invalid subtopic
      }
    }

    // CURRICULUM VALIDATION: Remap invalid year_group + topic combinations
    parsed = validateAndRemapTopic(parsed)

    console.log('🔍 AI Search parsed & normalized:', { query, parsed })

    return parsed

  } catch (error) {
    console.error('❌ AI search parsing failed:', error)

    // Fallback: return basic keyword search
    return {
      keywords: query.split(' ').filter(w => w.length > 2)
    }
  }
}

// Cache common queries to reduce API costs
const queryCache = new Map<string, ParsedSearchQuery>()

export async function parseSearchQueryWithCache(query: string): Promise<ParsedSearchQuery> {
  const cacheKey = query.toLowerCase().trim()

  if (queryCache.has(cacheKey)) {
    console.log('✅ Using cached parse for:', query)
    return queryCache.get(cacheKey)!
  }

  const result = await parseSearchQuery(query)
  queryCache.set(cacheKey, result)

  // Limit cache size to 1000 entries
  if (queryCache.size > 1000) {
    const firstKey = queryCache.keys().next().value
    queryCache.delete(firstKey)
  }

  return result
}
