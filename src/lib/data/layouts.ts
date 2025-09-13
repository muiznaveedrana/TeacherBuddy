import { LayoutTemplate, LayoutType } from '@/lib/types/worksheet'

/**
 * Layout template definitions for the worksheet generation system
 * Each layout is optimized for specific pedagogical approaches and mathematical learning objectives
 */
export const LAYOUT_TEMPLATES: Record<LayoutType, LayoutTemplate> = {
  standard: {
    id: 'standard',
    name: 'Standard Questions',
    description: 'Sequential numbered questions with generous working space',
    icon: '📝',
    features: ['Numbered questions', '3-4 lines working space', 'Configurable answer styles', 'Traditional format'],
    suitable: ['General practice', 'Mixed topics', 'Assessment preparation', 'Homework tasks'],
    questionRange: { min: 5, max: 25 }
  },
  fluency: {
    id: 'fluency',
    name: 'Two-Column Fluency',
    description: 'Multi-column arithmetic problems for fluency practice',
    icon: '⚡',
    features: ['2-3 columns', 'Answer boxes only', 'High question volume', 'Rapid practice focus'],
    suitable: ['Times tables', 'Mental arithmetic', 'Basic operations', 'Speed practice'],
    questionRange: { min: 10, max: 50 }
  },
  grid: {
    id: 'grid',
    name: 'Grid/Table Format',
    description: 'Structured grids for multiplication tables, place value, and number patterns',
    icon: '⬜',
    features: ['Multiplication grids', 'Place value tables', 'Number squares', 'Auto-fill options'],
    suitable: ['Times tables', 'Place value', 'Number patterns', 'Systematic practice'],
    questionRange: { min: 8, max: 20 }
  },
  differentiated: {
    id: 'differentiated',
    name: 'Differentiated (Mild/Medium/Hot)',
    description: 'Clear difficulty progression with color-coded sections',
    icon: '🌡️',
    features: ['Mild/Medium/Hot sections', 'Progressive difficulty', 'Optional color-coding', 'Inclusive design'],
    suitable: ['Mixed ability groups', 'Challenge progression', 'Inclusive lessons', 'Extension work'],
    questionRange: { min: 6, max: 18 }
  },
  reasoning: {
    id: 'reasoning',
    name: 'Reasoning Boxes',
    description: 'Bordered question boxes with space for explanations and working',
    icon: '💭',
    features: ['Bordered question boxes', 'Generous working space', 'Explanation focus', 'Problem-solving emphasis'],
    suitable: ['Problem solving', 'Mathematical reasoning', 'Explain your thinking', 'Investigation tasks'],
    questionRange: { min: 3, max: 12 }
  }
}

/**
 * Default layout selection based on educational best practices
 */
export const DEFAULT_LAYOUT: LayoutType = 'standard'

/**
 * Layout recommendations based on topic types
 */
export const LAYOUT_RECOMMENDATIONS: Record<string, LayoutType[]> = {
  'multiplication': ['fluency', 'grid', 'standard'],
  'division': ['fluency', 'standard', 'reasoning'],
  'fractions': ['reasoning', 'differentiated', 'standard'],
  'problem-solving': ['reasoning', 'differentiated', 'standard'],
  'place-value': ['grid', 'standard', 'differentiated'],
  'mental-arithmetic': ['fluency', 'standard', 'differentiated']
}

/**
 * Get layout templates as array for dropdown/selection components
 */
export const getLayoutOptions = (): LayoutTemplate[] => {
  // Only return standard layout for now
  return [LAYOUT_TEMPLATES.standard]
}

/**
 * Get layout template by ID
 */
export const getLayoutTemplate = (layoutId: LayoutType): LayoutTemplate => {
  return LAYOUT_TEMPLATES[layoutId]
}

/**
 * Get recommended layouts for a given topic
 */
export const getRecommendedLayouts = (topic: string): LayoutType[] => {
  const normalizedTopic = topic.toLowerCase()
  
  // Check for exact matches first
  for (const [key, layouts] of Object.entries(LAYOUT_RECOMMENDATIONS)) {
    if (normalizedTopic.includes(key)) {
      return layouts
    }
  }
  
  // Default recommendation order
  return ['standard', 'differentiated', 'reasoning']
}