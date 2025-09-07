import { describe, it, expect } from 'vitest'
import {
  getSmartDefaults,
  getContextualSuggestions,
  getEnhancedLayoutRecommendations,
  VISUAL_THEME_OPTIONS,
  PROBLEM_TYPE_OPTIONS,
  ENGAGEMENT_STYLE_OPTIONS
} from '@/lib/config/enhanced-options'
import type { ProblemType, EngagementStyle } from '@/lib/types/worksheet'

describe('Enhanced Configuration Options', () => {
  describe('getSmartDefaults', () => {
    describe('Visual Theme Defaults', () => {
      it('recommends animals theme for Reception and Year 1', () => {
        expect(getSmartDefaults('Reception', 'addition').visualTheme).toBe('animals')
        expect(getSmartDefaults('Year 1', 'addition').visualTheme).toBe('animals')
      })

      it('recommends food theme for Year 2 and Year 3', () => {
        expect(getSmartDefaults('Year 2', 'addition').visualTheme).toBe('food')
        expect(getSmartDefaults('Year 3', 'addition').visualTheme).toBe('food')
      })

      it('recommends sports theme for Year 4', () => {
        expect(getSmartDefaults('Year 4', 'addition').visualTheme).toBe('sports')
      })

      it('recommends space theme for Year 5 and Year 6', () => {
        expect(getSmartDefaults('Year 5', 'addition').visualTheme).toBe('space')
        expect(getSmartDefaults('Year 6', 'addition').visualTheme).toBe('space')
      })

      it('falls back to standard theme for unknown year groups', () => {
        expect(getSmartDefaults('Unknown Year', 'addition').visualTheme).toBe('standard')
      })
    })

    describe('Engagement Style Defaults', () => {
      it('recommends storytelling for early years (Reception, Year 1, Year 2)', () => {
        expect(getSmartDefaults('Reception', 'addition').engagementStyle).toBe('storytelling')
        expect(getSmartDefaults('Year 1', 'addition').engagementStyle).toBe('storytelling')
        expect(getSmartDefaults('Year 2', 'addition').engagementStyle).toBe('storytelling')
      })

      it('recommends gamified for middle years (Year 3, Year 4)', () => {
        expect(getSmartDefaults('Year 3', 'addition').engagementStyle).toBe('gamified')
        expect(getSmartDefaults('Year 4', 'addition').engagementStyle).toBe('gamified')
      })

      it('recommends structured for older years (Year 5+)', () => {
        expect(getSmartDefaults('Year 5', 'addition').engagementStyle).toBe('structured')
        expect(getSmartDefaults('Year 6', 'addition').engagementStyle).toBe('structured')
      })
    })

    describe('Problem Type Defaults', () => {
      it('recommends visual arrays for multiplication with grid layout', () => {
        const defaults = getSmartDefaults('Year 4', 'multiplication', 'grid')
        expect(defaults.problemTypes).toContain('visual-arrays' as ProblemType)
      })

      it('recommends word problems and standard calculations for multiplication with other layouts', () => {
        const defaults = getSmartDefaults('Year 4', 'multiplication', 'standard')
        expect(defaults.problemTypes).toContain('word-problems' as ProblemType)
        expect(defaults.problemTypes).toContain('standard-calculations' as ProblemType)
      })

      it('recommends word problems and mixed formats for problem-solving topics', () => {
        const defaults = getSmartDefaults('Year 5', 'problem-solving')
        expect(defaults.problemTypes).toContain('word-problems' as ProblemType)
        expect(defaults.problemTypes).toContain('mixed-formats' as ProblemType)
      })

      it('recommends visual arrays and word problems for fractions', () => {
        const defaults = getSmartDefaults('Year 3', 'fractions')
        expect(defaults.problemTypes).toContain('visual-arrays' as ProblemType)
        expect(defaults.problemTypes).toContain('word-problems' as ProblemType)
      })

      it('recommends standard calculations for mental arithmetic', () => {
        const defaults = getSmartDefaults('Year 2', 'mental arithmetic')
        expect(defaults.problemTypes).toContain('standard-calculations' as ProblemType)
      })

      it('falls back to default recommendations for unknown topics', () => {
        const defaults = getSmartDefaults('Year 3', 'unknown-topic')
        expect(defaults.problemTypes).toContain('word-problems' as ProblemType)
        expect(defaults.problemTypes).toContain('standard-calculations' as ProblemType)
      })

      it('falls back to standard calculations when no topic provided', () => {
        const defaults = getSmartDefaults('Year 3')
        expect(defaults.problemTypes).toEqual(['standard-calculations'])
      })
    })

    describe('Prompt Template Defaults', () => {
      it('recommends template A for early years (Reception, Year 1)', () => {
        expect(getSmartDefaults('Reception', 'addition').promptTemplate).toBe('A')
        expect(getSmartDefaults('Year 1', 'addition').promptTemplate).toBe('A')
      })

      it('recommends template C for problem-solving and reasoning topics', () => {
        expect(getSmartDefaults('Year 4', 'problem-solving').promptTemplate).toBe('C')
        expect(getSmartDefaults('Year 5', 'reasoning').promptTemplate).toBe('C')
      })

      it('recommends template B as default for other combinations', () => {
        expect(getSmartDefaults('Year 3', 'addition').promptTemplate).toBe('B')
        expect(getSmartDefaults('Year 4', 'multiplication').promptTemplate).toBe('B')
      })
    })
  })

  describe('getContextualSuggestions', () => {
    describe('Visual Theme Filtering', () => {
      it('includes age-appropriate visual themes', () => {
        const suggestions = getContextualSuggestions('Year 1', 'addition', 'standard')
        
        const themeValues = suggestions.visualTheme.map(t => t.value)
        expect(themeValues).toContain('animals')
        expect(themeValues).toContain('food')
      })

      it('excludes age-inappropriate themes for Reception', () => {
        const suggestions = getContextualSuggestions('Reception', 'addition', 'standard')
        
        const themeValues = suggestions.visualTheme.map(t => t.value)
        expect(themeValues).toContain('animals')
        // Space theme should not be included for Reception
        expect(themeValues).not.toContain('space')
      })

      it('includes advanced themes for older students', () => {
        const suggestions = getContextualSuggestions('Year 6', 'multiplication', 'standard')
        
        const themeValues = suggestions.visualTheme.map(t => t.value)
        expect(themeValues).toContain('space')
        expect(themeValues).toContain('sports')
      })
    })

    describe('Problem Type Filtering', () => {
      it('filters problem types based on layout compatibility', () => {
        const suggestions = getContextualSuggestions('Year 4', 'multiplication', 'grid')
        
        const typeValues = suggestions.problemTypes.map(t => t.value)
        expect(typeValues).toContain('visual-arrays')
      })

      it('filters problem types based on topic relevance', () => {
        const suggestions = getContextualSuggestions('Year 3', 'addition', 'standard')
        
        const typeValues = suggestions.problemTypes.map(t => t.value)
        expect(typeValues).toContain('word-problems')
        expect(typeValues).toContain('standard-calculations')
      })

      it('includes all problem types when layout is not specified', () => {
        const suggestions = getContextualSuggestions('Year 3', 'mixed-practice')
        
        expect(suggestions.problemTypes.length).toBeGreaterThan(0)
      })

      it('includes all problem types when topic has no specific matches', () => {
        const suggestions = getContextualSuggestions('Year 3', 'unknown-topic', 'standard')
        
        expect(suggestions.problemTypes.length).toBe(PROBLEM_TYPE_OPTIONS.length)
      })
    })

    describe('Engagement Style Filtering', () => {
      it('includes age-appropriate engagement styles', () => {
        const suggestions = getContextualSuggestions('Year 2', 'addition', 'standard')
        
        const styleValues = suggestions.engagementStyle.map(s => s.value)
        expect(styleValues).toContain('storytelling')
        expect(styleValues).toContain('structured')
      })

      it('excludes age-inappropriate engagement styles for early years', () => {
        const suggestions = getContextualSuggestions('Reception', 'addition', 'standard')
        
        const styleValues = suggestions.engagementStyle.map(s => s.value)
        expect(styleValues).toContain('storytelling')
        expect(styleValues).toContain('structured')
      })

      it('includes gamified style for appropriate age groups', () => {
        const suggestions = getContextualSuggestions('Year 4', 'multiplication', 'standard')
        
        const styleValues = suggestions.engagementStyle.map(s => s.value)
        expect(styleValues).toContain('gamified')
      })
    })
  })

  describe('getEnhancedLayoutRecommendations', () => {
    it('recommends layouts based on problem types', () => {
      const recommendations = getEnhancedLayoutRecommendations(['visual-arrays'], 'structured')
      
      expect(recommendations).toContain('grid')
      expect(recommendations).toContain('standard')
    })

    it('recommends layouts based on engagement style', () => {
      const recommendations = getEnhancedLayoutRecommendations(['word-problems'], 'storytelling')
      
      expect(recommendations).toContain('reasoning')
      expect(recommendations).toContain('differentiated')
    })

    it('combines recommendations from multiple problem types', () => {
      const recommendations = getEnhancedLayoutRecommendations(
        ['visual-arrays', 'word-problems'], 
        'structured'
      )
      
      expect(recommendations).toContain('grid') // from visual-arrays
      expect(recommendations).toContain('reasoning') // from word-problems
      expect(recommendations).toContain('standard') // from structured engagement
    })

    it('adjusts recommendations based on gamified engagement', () => {
      const recommendations = getEnhancedLayoutRecommendations(['standard-calculations'], 'gamified')
      
      expect(recommendations).toContain('differentiated')
      expect(recommendations).toContain('grid')
    })

    it('returns unique layout recommendations', () => {
      const recommendations = getEnhancedLayoutRecommendations(
        ['visual-arrays', 'mixed-formats'], 
        'structured'
      )
      
      const uniqueRecommendations = new Set(recommendations)
      expect(recommendations.length).toBe(uniqueRecommendations.size)
    })
  })

  describe('Configuration Data Structures', () => {
    describe('VISUAL_THEME_OPTIONS', () => {
      it('contains all required theme options', () => {
        const themeValues = VISUAL_THEME_OPTIONS.map(t => t.value)
        expect(themeValues).toContain('animals')
        expect(themeValues).toContain('food')
        expect(themeValues).toContain('sports')
        expect(themeValues).toContain('space')
        expect(themeValues).toContain('standard')
      })

      it('has proper structure for each theme option', () => {
        VISUAL_THEME_OPTIONS.forEach(option => {
          expect(option).toHaveProperty('value')
          expect(option).toHaveProperty('label')
          expect(option).toHaveProperty('description')
          expect(option).toHaveProperty('icon')
          expect(option).toHaveProperty('ageGroups')
          expect(option).toHaveProperty('examples')
          expect(Array.isArray(option.ageGroups)).toBe(true)
          expect(Array.isArray(option.examples)).toBe(true)
        })
      })
    })

    describe('PROBLEM_TYPE_OPTIONS', () => {
      it('contains all required problem type options', () => {
        const typeValues = PROBLEM_TYPE_OPTIONS.map(t => t.value)
        expect(typeValues).toContain('word-problems')
        expect(typeValues).toContain('visual-arrays')
        expect(typeValues).toContain('mixed-formats')
        expect(typeValues).toContain('standard-calculations')
      })

      it('has proper structure for each problem type option', () => {
        PROBLEM_TYPE_OPTIONS.forEach(option => {
          expect(option).toHaveProperty('value')
          expect(option).toHaveProperty('label')
          expect(option).toHaveProperty('description')
          expect(option).toHaveProperty('icon')
          expect(option).toHaveProperty('layouts')
          expect(option).toHaveProperty('topics')
          expect(Array.isArray(option.layouts)).toBe(true)
          expect(Array.isArray(option.topics)).toBe(true)
        })
      })
    })

    describe('ENGAGEMENT_STYLE_OPTIONS', () => {
      it('contains all required engagement style options', () => {
        const styleValues = ENGAGEMENT_STYLE_OPTIONS.map(s => s.value)
        expect(styleValues).toContain('structured')
        expect(styleValues).toContain('storytelling')
        expect(styleValues).toContain('gamified')
      })

      it('has proper structure for each engagement style option', () => {
        ENGAGEMENT_STYLE_OPTIONS.forEach(option => {
          expect(option).toHaveProperty('value')
          expect(option).toHaveProperty('label')
          expect(option).toHaveProperty('description')
          expect(option).toHaveProperty('icon')
          expect(option).toHaveProperty('ageGroups')
          expect(option).toHaveProperty('characteristics')
          expect(Array.isArray(option.ageGroups)).toBe(true)
          expect(Array.isArray(option.characteristics)).toBe(true)
        })
      })
    })
  })
})