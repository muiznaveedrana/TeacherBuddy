/**
 * Tests for output manager functionality
 * Story Engine.1.1: Core Engine Infrastructure and Service Integration
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { promises as fs } from 'fs'
import { join } from 'path'
import { OutputManager } from '../../../src/worksheet-engine/cli/utils/output-manager'
import { GeneratedWorksheet } from '../../../src/lib/types/worksheet'
import { EngineConfig } from '../../../src/worksheet-engine/types/engine-types'

describe('OutputManager', () => {
  const testOutputDir = './test-output'
  let outputManager: OutputManager
  let mockWorksheet: GeneratedWorksheet
  let mockConfig: EngineConfig

  beforeEach(() => {
    outputManager = new OutputManager(testOutputDir)
    
    mockWorksheet = {
      title: 'Test Worksheet',
      html: '<html><body><h1>Test</h1></body></html>',
      metadata: {
        topic: 'addition-subtraction',
        subtopic: 'problem-solving',
        difficulty: 'average',
        questionCount: 5,
        curriculum: 'UK National Curriculum',
        generatedAt: new Date().toISOString(),
        promptTemplate: 'unified-optimal',
        qualityScore: 4.5,
        isPhase1Combination: true
      }
    }
    
    mockConfig = {
      configId: 'test-config',
      layout: 'standard',
      yearGroup: 'Year 3',
      topic: 'addition-subtraction',
      subtopic: 'problem-solving',
      difficulty: 'average',
      questionCount: 5,
      promptVariant: 'baseline'
    }
  })

  afterEach(async () => {
    // Clean up test directory
    try {
      await fs.rm(testOutputDir, { recursive: true, force: true })
    } catch (error) {
      // Ignore cleanup errors
    }
  })

  describe('ensureOutputDirectory', () => {
    it('should create output directory if it does not exist', async () => {
      await outputManager.ensureOutputDirectory()
      
      const stats = await fs.stat(testOutputDir)
      expect(stats.isDirectory()).toBe(true)
    })
  })

  describe('saveResults', () => {
    it('should save all required files', async () => {
      const result = await outputManager.saveResults(mockWorksheet, mockConfig, 1000)
      
      expect(result.worksheet).toBe(mockWorksheet)
      expect(result.config).toBe(mockConfig)
      expect(result.metadata.processingTime).toBe(1000)
      expect(result.metadata.configId).toBe('test-config')
      
      // Check that files were created
      const configPath = join(testOutputDir, 'config.json')
      const htmlPath = join(testOutputDir, 'worksheet.html')
      const logPath = join(testOutputDir, 'generation-log.json')
      const metadataPath = join(testOutputDir, 'engine-metadata.json')
      
      const configExists = await fs.access(configPath).then(() => true).catch(() => false)
      const htmlExists = await fs.access(htmlPath).then(() => true).catch(() => false)
      const logExists = await fs.access(logPath).then(() => true).catch(() => false)
      const metadataExists = await fs.access(metadataPath).then(() => true).catch(() => false)
      
      expect(configExists).toBe(true)
      expect(htmlExists).toBe(true)
      expect(logExists).toBe(true)
      expect(metadataExists).toBe(true)
    })

    it('should save correct content in files', async () => {
      await outputManager.saveResults(mockWorksheet, mockConfig, 1000)
      
      // Check config.json content
      const configContent = await fs.readFile(join(testOutputDir, 'config.json'), 'utf-8')
      const savedConfig = JSON.parse(configContent)
      expect(savedConfig).toEqual(mockConfig)
      
      // Check worksheet.html content
      const htmlContent = await fs.readFile(join(testOutputDir, 'worksheet.html'), 'utf-8')
      expect(htmlContent).toBe(mockWorksheet.html)
      
      // Check generation-log.json content
      const logContent = await fs.readFile(join(testOutputDir, 'generation-log.json'), 'utf-8')
      const savedLog = JSON.parse(logContent)
      expect(savedLog.worksheet).toEqual(mockWorksheet.metadata)
      expect(savedLog.processingTime).toBe(1000)
    })
  })

  describe('getDefaultOutputDir', () => {
    it('should generate default output directory path', () => {
      const defaultDir = OutputManager.getDefaultOutputDir('test-config')
      
      expect(defaultDir).toContain('results')
      expect(defaultDir).toContain('test-config')
    })
  })

  describe('getOutputPath', () => {
    it('should return configured output path', () => {
      const path = outputManager.getOutputPath()
      expect(path).toContain('test-output')
    })
  })
})