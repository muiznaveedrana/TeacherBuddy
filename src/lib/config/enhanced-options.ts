import type { 
  VisualTheme, 
  ProblemType, 
  EngagementStyle, 
  PromptTemplate,
  LayoutType
} from '@/lib/types/worksheet'

/**
 * Enhanced configuration options for USP.2
 * Provides teacher-friendly options with smart defaults and contextual suggestions
 */

// Visual Theme Configuration
export interface VisualThemeOption {
  value: VisualTheme
  label: string
  description: string
  icon: string
  ageGroups: string[]
  examples: string[]
}

export const VISUAL_THEME_OPTIONS: VisualThemeOption[] = [
  {
    value: 'none',
    label: 'No particular theme',
    description: 'Mixed contexts and varied question types',
    icon: '🎯',
    ageGroups: ['Reception', 'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6'],
    examples: ['Mixed contexts', 'Varied scenarios', 'LLM decides']
  },
  {
    value: 'animals',
    label: 'Animals',
    description: 'Animal-themed problems and contexts',
    icon: '🐼',
    ageGroups: ['Reception', 'Year 1', 'Year 2', 'Year 3'],
    examples: ['5 pandas eating bamboo', '3 cats sleeping', '7 birds in a tree']
  },
  {
    value: 'food',
    label: 'Food & Cooking',
    description: 'Food-based real-world contexts',
    icon: '🍎',
    ageGroups: ['Reception', 'Year 1', 'Year 2', 'Year 3', 'Year 4'],
    examples: ['12 apples to share', 'baking 24 cookies', '6 pizza slices']
  },
  {
    value: 'sports',
    label: 'Sports & Games',
    description: 'Sports and game-based scenarios',
    icon: '⚽',
    ageGroups: ['Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6'],
    examples: ['football teams', 'race times', 'game scores']
  },
  {
    value: 'space',
    label: 'Space & Science',
    description: 'Space exploration and science contexts',
    icon: '🚀',
    ageGroups: ['Year 4', 'Year 5', 'Year 6'],
    examples: ['planets and moons', 'rocket distances', 'astronaut missions']
  },
  {
    value: 'standard',
    label: 'Standard',
    description: 'Traditional mathematical contexts',
    icon: '📐',
    ageGroups: ['Reception', 'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6'],
    examples: ['numbers and calculations', 'mathematical objects', 'abstract problems']
  }
]

// Problem Type Configuration
export interface ProblemTypeOption {
  value: ProblemType
  label: string
  description: string
  icon: string
  layouts: LayoutType[]
  topics: string[]
}

export const PROBLEM_TYPE_OPTIONS: ProblemTypeOption[] = [
  {
    value: 'word-problems',
    label: 'Word Problems',
    description: 'Real-world context problems requiring comprehension',
    icon: '📖',
    layouts: ['reasoning', 'standard', 'differentiated'],
    topics: ['addition', 'subtraction', 'multiplication', 'division', 'fractions', 'time', 'money']
  },
  {
    value: 'visual-arrays',
    label: 'Visual Arrays',
    description: 'Visual representations and diagrams',
    icon: '🔲',
    layouts: ['grid', 'standard', 'differentiated'],
    topics: ['multiplication', 'division', 'arrays', 'place-value', 'fractions']
  },
  {
    value: 'mixed-formats',
    label: 'Mixed Formats',
    description: 'Combination of calculation types and presentations',
    icon: '🔀',
    layouts: ['differentiated', 'standard', 'reasoning'],
    topics: ['mixed-practice', 'problem-solving', 'review']
  },
  {
    value: 'standard-calculations',
    label: 'Standard Calculations',
    description: 'Traditional arithmetic practice',
    icon: '➕',
    layouts: ['fluency', 'standard', 'grid'],
    topics: ['addition', 'subtraction', 'multiplication', 'division', 'mental-arithmetic']
  }
]

// Engagement Style Configuration
export interface EngagementStyleOption {
  value: EngagementStyle
  label: string
  description: string
  icon: string
  ageGroups: string[]
  characteristics: string[]
}

export const ENGAGEMENT_STYLE_OPTIONS: EngagementStyleOption[] = [
  {
    value: 'structured',
    label: 'Structured Learning',
    description: 'Clear, systematic approach with consistent format',
    icon: '📋',
    ageGroups: ['Reception', 'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6'],
    characteristics: ['Clear instructions', 'Consistent format', 'Step-by-step approach', 'Traditional presentation']
  },
  {
    value: 'storytelling',
    label: 'Story-Based',
    description: 'Narrative context with characters and scenarios',
    icon: '📚',
    ageGroups: ['Reception', 'Year 1', 'Year 2', 'Year 3', 'Year 4'],
    characteristics: ['Character-driven', 'Narrative flow', 'Imaginative contexts', 'Creative scenarios']
  },
  {
    value: 'gamified',
    label: 'Game Elements',
    description: 'Challenge-based with achievement and progression',
    icon: '🎮',
    ageGroups: ['Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6'],
    characteristics: ['Challenge format', 'Achievement focus', 'Competitive elements', 'Progress tracking']
  }
]

// Smart Defaults Logic
export interface SmartDefaults {
  visualTheme: VisualTheme
  problemTypes: ProblemType[]
  engagementStyle: EngagementStyle
  promptTemplate: PromptTemplate
}

/**
 * Generate smart defaults based on year group and topic
 */
export const getSmartDefaults = (yearGroup: string, topic?: string, layout?: LayoutType): SmartDefaults => {
  // Age-based visual theme defaults
  const getDefaultVisualTheme = (yearGroup: string): VisualTheme => {
    if (yearGroup === 'Reception' || yearGroup === 'Year 1') return 'animals'
    if (yearGroup === 'Year 2' || yearGroup === 'Year 3') return 'food'
    if (yearGroup === 'Year 4') return 'sports'
    if (yearGroup === 'Year 5' || yearGroup === 'Year 6') return 'space'
    return 'standard'
  }

  // Age-based engagement style defaults
  const getDefaultEngagementStyle = (yearGroup: string): EngagementStyle => {
    if (yearGroup === 'Reception' || yearGroup === 'Year 1' || yearGroup === 'Year 2') return 'storytelling'
    if (yearGroup === 'Year 3' || yearGroup === 'Year 4') return 'gamified'
    return 'structured'
  }

  // Topic-based problem type defaults
  const getDefaultProblemTypes = (topic?: string, layout?: LayoutType): ProblemType[] => {
    if (!topic) return ['standard-calculations']
    
    const topicLower = topic.toLowerCase()
    
    if (topicLower.includes('multiplication') || topicLower.includes('division')) {
      return layout === 'grid' ? ['visual-arrays'] : ['word-problems', 'standard-calculations']
    }
    if (topicLower.includes('problem-solving') || topicLower.includes('reasoning')) {
      return ['word-problems', 'mixed-formats']
    }
    if (topicLower.includes('fractions')) {
      return ['visual-arrays', 'word-problems']
    }
    if (topicLower.includes('mental') || topicLower.includes('fluency')) {
      return ['standard-calculations']
    }
    
    return ['word-problems', 'standard-calculations']
  }

  // Simplified prompt template (single optimal approach)
  const getDefaultPromptTemplate = (): PromptTemplate => {
    return 'optimal' // Always use the single optimal template
  }

  return {
    visualTheme: getDefaultVisualTheme(yearGroup),
    problemTypes: getDefaultProblemTypes(topic, layout),
    engagementStyle: getDefaultEngagementStyle(yearGroup),
    promptTemplate: getDefaultPromptTemplate()
  }
}

/**
 * Get contextual suggestions based on current selections
 */
export const getContextualSuggestions = (
  yearGroup: string,
  topic?: string,
  layout?: LayoutType
): {
  visualTheme: VisualThemeOption[]
  problemTypes: ProblemTypeOption[]
  engagementStyle: EngagementStyleOption[]
} => {
  // Filter options based on age appropriateness
  const suitableVisualThemes = VISUAL_THEME_OPTIONS.filter(option => 
    option.ageGroups.includes(yearGroup)
  )

  // Filter problem types based on layout compatibility
  let suitableProblemTypes = PROBLEM_TYPE_OPTIONS.filter(option => {
    if (layout && !option.layouts.includes(layout)) return false
    return true
  })

  // Further filter by topic if provided
  if (topic) {
    const topicFilteredTypes = suitableProblemTypes.filter(option => {
      if (option.topics.length > 0) {
        return option.topics.some(t => topic.toLowerCase().includes(t))
      }
      return true
    })
    
    // If no matches found after topic filtering, return all layout-compatible options
    if (topicFilteredTypes.length === 0) {
      // Keep the layout-filtered options
    } else {
      suitableProblemTypes = topicFilteredTypes
    }
  }

  // Filter engagement styles based on age appropriateness
  const suitableEngagementStyles = ENGAGEMENT_STYLE_OPTIONS.filter(option =>
    option.ageGroups.includes(yearGroup)
  )

  return {
    visualTheme: suitableVisualThemes,
    problemTypes: suitableProblemTypes,
    engagementStyle: suitableEngagementStyles
  }
}

/**
 * Get layout recommendations based on enhanced options
 */
export const getEnhancedLayoutRecommendations = (
  problemTypes: ProblemType[],
  engagementStyle: EngagementStyle
): LayoutType[] => {
  const recommendations = new Set<LayoutType>()

  // Add recommendations based on problem types
  problemTypes.forEach(problemType => {
    const option = PROBLEM_TYPE_OPTIONS.find(opt => opt.value === problemType)
    if (option) {
      option.layouts.forEach(layout => recommendations.add(layout))
    }
  })

  // Adjust based on engagement style
  if (engagementStyle === 'structured') {
    recommendations.add('standard')
    recommendations.add('fluency')
  } else if (engagementStyle === 'storytelling') {
    recommendations.add('reasoning')
    recommendations.add('differentiated')
  } else if (engagementStyle === 'gamified') {
    recommendations.add('differentiated')
    recommendations.add('grid')
  }

  return Array.from(recommendations)
}