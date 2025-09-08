/**
 * Tests for configuration mapping utilities
 * Story Engine.1.1: Core Engine Infrastructure and Service Integration
 */

import { describe, it, expect } from 'vitest'
import { 
  mapEngineConfigToWorksheetConfig, 
  validateServiceCompatibility 
} from '../../../src/worksheet-engine/integration/config-mapper'
import { EngineConfig } from '../../../src/worksheet-engine/types/engine-types'

describe('Config Mapper', () => {
  const mockEngineConfig: EngineConfig = {
    configId: 'test-config',
    layout: 'standard',
    yearGroup: 'Year 3',
    topic: 'addition-subtraction',
    subtopic: 'problem-solving',
    difficulty: 'average',
    questionCount: 5,
    promptVariant: 'baseline'
  }

  describe('mapEngineConfigToWorksheetConfig', () => {
    it('should map engine config to worksheet config correctly', () => {
      const result = mapEngineConfigToWorksheetConfig(mockEngineConfig)
      
      expect(result).toEqual({
        layout: 'standard',
        yearGroup: 'Year 3',
        topic: 'addition-subtraction',
        subtopic: 'problem-solving',
        difficulty: 'average',
        questionCount: 5,
        studentNames: [],
        visualTheme: undefined
      })
    })

    it('should set empty student names array for CLI usage', () => {
      const result = mapEngineConfigToWorksheetConfig(mockEngineConfig)
      expect(result.studentNames).toEqual([])
    })

    it('should set undefined visual theme to let LLM decide', () => {
      const result = mapEngineConfigToWorksheetConfig(mockEngineConfig)
      expect(result.visualTheme).toBeUndefined()
    })
  })

  describe('validateServiceCompatibility', () => {
    it('should validate compatible engine config', () => {
      expect(() => validateServiceCompatibility(mockEngineConfig)).not.toThrow()
    })

    it('should throw error for missing required fields', () => {
      const incompleteConfig = { ...mockEngineConfig }
      delete (incompleteConfig as any).layout
      
      expect(() => validateServiceCompatibility(incompleteConfig))
        .toThrow('Cannot map engine config to worksheet config: missing layout')
    })

    it('should throw error for multiple missing fields', () => {
      const incompleteConfig = { ...mockEngineConfig }
      delete (incompleteConfig as any).layout
      delete (incompleteConfig as any).yearGroup
      
      expect(() => validateServiceCompatibility(incompleteConfig))
        .toThrow('Cannot map engine config to worksheet config: missing layout, yearGroup')
    })

    it('should validate all required mapping fields', () => {
      const requiredFields = [
        'layout', 'yearGroup', 'topic', 'subtopic', 'difficulty', 'questionCount'
      ]
      
      requiredFields.forEach(field => {
        const incompleteConfig = { ...mockEngineConfig }
        delete (incompleteConfig as any)[field]
        
        expect(() => validateServiceCompatibility(incompleteConfig))
          .toThrow(`Cannot map engine config to worksheet config: missing ${field}`)
      })
    })
  })
})