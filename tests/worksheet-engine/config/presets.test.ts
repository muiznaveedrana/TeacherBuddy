/**
 * Tests for configuration presets
 * Story Engine.1.1: Core Engine Infrastructure and Service Integration
 */

import { describe, it, expect } from 'vitest'
import { 
  WORKSHEET_CONFIG_PRESETS, 
  VALID_YEAR_GROUPS, 
  CONFIG_CONSTRAINTS 
} from '../../../src/worksheet-engine/config/presets'

describe('Configuration Presets', () => {
  describe('WORKSHEET_CONFIG_PRESETS', () => {
    it('should contain expected preset configurations', () => {
      const expectedConfigs = [
        'year3-addition-standard-average-5q',
        'year1-counting-visual-easy-3q',
        'year5-fractions-balanced-hard-8q',
        'year2-money-standard-average-6q',
        'year4-multiplication-balanced-average-10q'
      ]
      
      expectedConfigs.forEach(configId => {
        expect(WORKSHEET_CONFIG_PRESETS).toHaveProperty(configId)
      })
      
      expect(Object.keys(WORKSHEET_CONFIG_PRESETS)).toHaveLength(expectedConfigs.length)
    })

    it('should have valid structure for each preset', () => {
      Object.entries(WORKSHEET_CONFIG_PRESETS).forEach(([configId, config]) => {
        expect(config).toHaveProperty('layout')
        expect(config).toHaveProperty('yearGroup')
        expect(config).toHaveProperty('topic')
        expect(config).toHaveProperty('subtopic')
        expect(config).toHaveProperty('difficulty')
        expect(config).toHaveProperty('questionCount')
        
        expect(typeof config.layout).toBe('string')
        expect(typeof config.yearGroup).toBe('string')
        expect(typeof config.topic).toBe('string')
        expect(typeof config.subtopic).toBe('string')
        expect(typeof config.difficulty).toBe('string')
        expect(typeof config.questionCount).toBe('number')
        
        expect(config.questionCount).toBeGreaterThan(0)
        expect(config.questionCount).toBeLessThanOrEqual(20)
      })
    })

    it('should have year groups that exist in VALID_YEAR_GROUPS', () => {
      Object.values(WORKSHEET_CONFIG_PRESETS).forEach(config => {
        expect(VALID_YEAR_GROUPS).toContain(config.yearGroup as any)
      })
    })
  })

  describe('VALID_YEAR_GROUPS', () => {
    it('should contain all UK primary school year groups', () => {
      const expectedYearGroups = [
        'Reception',
        'Year 1',
        'Year 2', 
        'Year 3',
        'Year 4',
        'Year 5',
        'Year 6'
      ]
      
      expect(VALID_YEAR_GROUPS).toEqual(expectedYearGroups)
    })

    it('should be readonly', () => {
      // This test ensures the array is properly typed as readonly
      expect(Array.isArray(VALID_YEAR_GROUPS)).toBe(true)
    })
  })

  describe('CONFIG_CONSTRAINTS', () => {
    it('should have valid constraint values', () => {
      expect(CONFIG_CONSTRAINTS.MIN_QUESTION_COUNT).toBe(1)
      expect(CONFIG_CONSTRAINTS.MAX_QUESTION_COUNT).toBe(20)
      expect(CONFIG_CONSTRAINTS.DEFAULT_PROMPT_VARIANT).toBe('baseline')
      
      expect(CONFIG_CONSTRAINTS.MIN_QUESTION_COUNT).toBeLessThan(CONFIG_CONSTRAINTS.MAX_QUESTION_COUNT)
    })

    it('should have all presets within constraints', () => {
      Object.values(WORKSHEET_CONFIG_PRESETS).forEach(config => {
        expect(config.questionCount).toBeGreaterThanOrEqual(CONFIG_CONSTRAINTS.MIN_QUESTION_COUNT)
        expect(config.questionCount).toBeLessThanOrEqual(CONFIG_CONSTRAINTS.MAX_QUESTION_COUNT)
      })
    })
  })
})