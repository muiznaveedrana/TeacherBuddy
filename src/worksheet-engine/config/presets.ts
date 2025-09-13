/**
 * Predefined worksheet configuration presets
 * Story Engine.1.1: Core Engine Infrastructure and Service Integration
 */

import { ConfigMapping } from '../types/engine-types'

/**
 * Predefined configuration mappings based on common worksheet parameters
 * Each preset represents a commonly used worksheet configuration that teachers
 * and developers can quickly reference and use for testing or generation
 */
export const WORKSHEET_CONFIG_PRESETS: ConfigMapping = {
  'year3-addition-standard-average-5q': {
    layout: 'word-problem-enhanced',
    yearGroup: 'Year 3',
    topic: 'addition-subtraction',
    subtopic: 'problem-solving',
    difficulty: 'average',
    questionCount: 5
  },
  'year1-counting-visual-easy-3q': {
    layout: 'visual-heavy',
    yearGroup: 'Year 1',
    topic: 'number-counting',
    subtopic: 'counting-objects',
    difficulty: 'easy',
    questionCount: 3
  },
  'year5-fractions-balanced-hard-8q': {
    layout: 'balanced',
    yearGroup: 'Year 5',
    topic: 'fractions-decimals',
    subtopic: 'fraction-operations',
    difficulty: 'hard',
    questionCount: 8
  },
  'year2-money-standard-average-6q': {
    layout: 'standard',
    yearGroup: 'Year 2',
    topic: 'money',
    subtopic: 'coins-notes',
    difficulty: 'average',
    questionCount: 6
  },
  'year4-multiplication-balanced-average-10q': {
    layout: 'balanced',
    yearGroup: 'Year 4',
    topic: 'multiplication-division',
    subtopic: 'times-tables',
    difficulty: 'average',
    questionCount: 10
  },
  'year3-addition-grid-average-20q': {
    layout: 'grid',
    yearGroup: 'Year 3',
    topic: 'addition-subtraction',
    subtopic: 'three-digit-calculation',
    difficulty: 'average',
    questionCount: 20
  }
} as const

/**
 * Valid year groups supported by the worksheet engine
 */
export const VALID_YEAR_GROUPS = [
  'Reception',
  'Year 1', 
  'Year 2', 
  'Year 3', 
  'Year 4', 
  'Year 5', 
  'Year 6'
] as const

/**
 * Configuration constraints for validation
 */
export const CONFIG_CONSTRAINTS = {
  MIN_QUESTION_COUNT: 1,
  MAX_QUESTION_COUNT: 20,
  DEFAULT_PROMPT_VARIANT: 'baseline'
} as const