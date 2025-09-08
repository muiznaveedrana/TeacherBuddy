/**
 * Tests for configuration parsing utilities
 * Story Engine.1.1: Core Engine Infrastructure and Service Integration
 */

import { describe, it, expect } from 'vitest'
import { 
  parseConfigId, 
  listAvailableConfigs, 
  getConfigDetails, 
  validateConfig 
} from '../../../src/worksheet-engine/cli/utils/config-parser'
import { CliError } from '../../../src/worksheet-engine/types/engine-types'

describe('Config Parser', () => {
  describe('parseConfigId', () => {
    it('should parse valid configuration ID', () => {
      const result = parseConfigId('year3-addition-standard-average-5q', 'baseline')
      
      expect(result).toEqual({
        configId: 'year3-addition-standard-average-5q',
        layout: 'standard',
        yearGroup: 'Year 3',
        topic: 'addition-subtraction',
        subtopic: 'problem-solving',
        difficulty: 'average',
        questionCount: 5,
        promptVariant: 'baseline'
      })
    })

    it('should use default prompt variant if not provided', () => {
      const result = parseConfigId('year3-addition-standard-average-5q')
      expect(result.promptVariant).toBe('baseline')
    })

    it('should throw CliError for invalid configuration ID', () => {
      expect(() => parseConfigId('invalid-config')).toThrow()
      
      try {
        parseConfigId('invalid-config')
      } catch (error) {
        const cliError = error as CliError
        expect(cliError.code).toBe('CONFIG_NOT_FOUND')
        expect(cliError.details).toHaveProperty('configId', 'invalid-config')
        expect(cliError.details).toHaveProperty('availableConfigs')
      }
    })
  })

  describe('listAvailableConfigs', () => {
    it('should return array of configuration IDs', () => {
      const configs = listAvailableConfigs()
      
      expect(Array.isArray(configs)).toBe(true)
      expect(configs.length).toBeGreaterThan(0)
      expect(configs).toContain('year3-addition-standard-average-5q')
    })
  })

  describe('getConfigDetails', () => {
    it('should return config details for valid ID', () => {
      const details = getConfigDetails('year3-addition-standard-average-5q')
      
      expect(details).toEqual({
        layout: 'standard',
        yearGroup: 'Year 3',
        topic: 'addition-subtraction',
        subtopic: 'problem-solving',
        difficulty: 'average',
        questionCount: 5
      })
    })

    it('should return null for invalid ID', () => {
      const details = getConfigDetails('invalid-config')
      expect(details).toBeNull()
    })
  })

  describe('validateConfig', () => {
    const validConfig = {
      configId: 'test-config',
      layout: 'standard',
      yearGroup: 'Year 3',
      topic: 'addition-subtraction',
      subtopic: 'problem-solving',
      difficulty: 'average',
      questionCount: 5,
      promptVariant: 'baseline'
    }

    it('should validate valid configuration', () => {
      expect(() => validateConfig(validConfig)).not.toThrow()
    })

    it('should throw for missing required fields', () => {
      const invalidConfig = { ...validConfig }
      delete (invalidConfig as any).yearGroup
      
      try {
        validateConfig(invalidConfig)
      } catch (error) {
        const cliError = error as CliError
        expect(cliError.code).toBe('INVALID_CONFIG')
        expect(cliError.message).toContain('missing fields')
        expect(cliError.message).toContain('yearGroup')
      }
    })

    it('should throw for invalid question count', () => {
      const invalidConfig = { ...validConfig, questionCount: 25 }
      
      try {
        validateConfig(invalidConfig)
      } catch (error) {
        const cliError = error as CliError
        expect(cliError.code).toBe('INVALID_CONFIG')
        expect(cliError.message).toContain('Question count must be between 1 and 20')
      }
    })

    it('should throw for invalid year group', () => {
      const invalidConfig = { ...validConfig, yearGroup: 'Year 10' }
      
      try {
        validateConfig(invalidConfig)
      } catch (error) {
        const cliError = error as CliError
        expect(cliError.code).toBe('INVALID_CONFIG')
        expect(cliError.message).toContain('Invalid year group')
      }
    })
  })
})