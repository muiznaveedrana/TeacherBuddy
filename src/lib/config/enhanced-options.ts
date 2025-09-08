import type { 
  VisualTheme, 
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




/**
 * Get contextual suggestions based on current selections
 */
export const getContextualSuggestions = (
  yearGroup: string
): {
  visualTheme: VisualThemeOption[]
} => {
  // Filter options based on age appropriateness
  const suitableVisualThemes = VISUAL_THEME_OPTIONS.filter(option => 
    option.ageGroups.includes(yearGroup)
  )

  return {
    visualTheme: suitableVisualThemes
  }
}

