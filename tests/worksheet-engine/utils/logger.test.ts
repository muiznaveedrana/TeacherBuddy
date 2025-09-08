/**
 * Tests for logging utility
 * Story Engine.1.1: Core Engine Infrastructure and Service Integration
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { Logger } from '../../../src/worksheet-engine/utils/logger'

describe('Logger', () => {
  let consoleSpy: {
    log: ReturnType<typeof vi.spyOn>
    warn: ReturnType<typeof vi.spyOn>
    error: ReturnType<typeof vi.spyOn>
  }

  beforeEach(() => {
    consoleSpy = {
      log: vi.spyOn(console, 'log').mockImplementation(() => {}),
      warn: vi.spyOn(console, 'warn').mockImplementation(() => {}),
      error: vi.spyOn(console, 'error').mockImplementation(() => {})
    }
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('info', () => {
    it('should log info messages with prefix', () => {
      Logger.info('Test message')
      
      expect(consoleSpy.log).toHaveBeenCalledWith('[Worksheet Engine] Test message')
    })

    it('should handle additional arguments', () => {
      Logger.info('Test message', { key: 'value' })
      
      expect(consoleSpy.log).toHaveBeenCalledWith('[Worksheet Engine] Test message', { key: 'value' })
    })
  })

  describe('success', () => {
    it('should log success messages with prefix and emoji', () => {
      Logger.success('Test success')
      
      expect(consoleSpy.log).toHaveBeenCalledWith('[Worksheet Engine] ✅ Test success')
    })
  })

  describe('warn', () => {
    it('should log warning messages with prefix and emoji', () => {
      Logger.warn('Test warning')
      
      expect(consoleSpy.warn).toHaveBeenCalledWith('[Worksheet Engine] ⚠️  Test warning')
    })
  })

  describe('error', () => {
    it('should log error messages with prefix and emoji', () => {
      Logger.error('Test error')
      
      expect(consoleSpy.error).toHaveBeenCalledWith('[Worksheet Engine] ❌ Test error')
    })

    it('should log error details in development mode', () => {
      const originalEnv = process.env.NODE_ENV
      process.env.NODE_ENV = 'development'
      
      const errorObj = new Error('Test error object')
      Logger.error('Test error', errorObj)
      
      expect(consoleSpy.error).toHaveBeenCalledWith('[Worksheet Engine] ❌ Test error')
      expect(consoleSpy.error).toHaveBeenCalledWith(errorObj)
      
      process.env.NODE_ENV = originalEnv
    })
  })

  describe('step', () => {
    it('should log step messages with step counter', () => {
      Logger.step(2, 5, 'Processing step')
      
      expect(consoleSpy.log).toHaveBeenCalledWith('[Worksheet Engine] [2/5] Processing step')
    })
  })

  describe('separator', () => {
    it('should log empty line', () => {
      Logger.separator()
      
      expect(consoleSpy.log).toHaveBeenCalledWith('')
    })
  })
})