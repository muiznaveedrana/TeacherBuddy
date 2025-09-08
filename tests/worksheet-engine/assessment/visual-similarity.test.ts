/**
 * Visual Similarity Assessment Tests
 * Story Engine.1.2: Hybrid Quality Assessment Framework
 */

import { VisualSimilarityAssessment } from '@/src/worksheet-engine/assessment/visual-similarity/visual-similarity-assessment'
import fs from 'fs'
import path from 'path'

// Mock the PDF converter and image comparator
jest.mock('@/worksheet-engine/assessment/visual-similarity/pdf-to-image')
jest.mock('@/worksheet-engine/assessment/visual-similarity/image-comparison')

describe('VisualSimilarityAssessment', () => {
  let assessment: VisualSimilarityAssessment
  let tempDir: string
  let mockWorksheetPdf: string
  let mockGoldenReferencePdf: string

  beforeAll(() => {
    tempDir = path.join(__dirname, 'temp-visual-test')
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true })
    }
    
    mockWorksheetPdf = path.join(tempDir, 'worksheet.pdf')
    mockGoldenReferencePdf = path.join(tempDir, 'golden-reference.pdf')
    
    // Create mock PDF files
    fs.writeFileSync(mockWorksheetPdf, 'mock worksheet pdf content')
    fs.writeFileSync(mockGoldenReferencePdf, 'mock golden reference pdf content')
  })

  afterAll(() => {
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true })
    }
  })

  beforeEach(() => {
    assessment = new VisualSimilarityAssessment()
    
    // Reset mocks
    jest.clearAllMocks()
    
    // Mock the PDF converter
    const mockPdfConverter = require('@/worksheet-engine/assessment/visual-similarity/pdf-to-image')
    mockPdfConverter.PdfToImageConverter.mockImplementation(() => ({
      convertToImage: jest.fn().mockResolvedValue(undefined)
    }))
    
    // Mock the image comparator with reasonable default results
    const mockImageComparator = require('@/worksheet-engine/assessment/visual-similarity/image-comparison')
    mockImageComparator.ImageComparator.mockImplementation(() => ({
      compareImages: jest.fn().mockResolvedValue({
        ssim: 0.85,
        pixelDifference: 15.2,
        layoutConsistency: 8.3,
        colorSimilarity: 7.8,
        overallSimilarity: 8.2,
        comparisonTime: 1500,
        analysisDetails: {
          imageDimensions: {
            reference: { width: 595, height: 842 },
            comparison: { width: 595, height: 842 }
          },
          diffPixelCount: 12340,
          totalPixels: 501190,
          majorDifferences: []
        }
      })
    }))
  })

  describe('compare (main interface)', () => {
    it('should compare worksheet PDF with golden reference successfully', async () => {
      const result = await assessment.compare(mockWorksheetPdf, mockGoldenReferencePdf)
      
      expect(result).toBeDefined()
      expect(result.score).toBeGreaterThanOrEqual(0)
      expect(result.score).toBeLessThanOrEqual(10)
      expect(result.details.structuralSimilarity).toBeGreaterThanOrEqual(0)
      expect(result.details.layoutConsistency).toBeGreaterThanOrEqual(0)
      expect(result.details.visualAlignment).toBeGreaterThanOrEqual(0)
    })

    it('should return zero scores when worksheet PDF does not exist', async () => {
      const nonExistentPdf = path.join(tempDir, 'nonexistent.pdf')
      
      const result = await assessment.compare(nonExistentPdf, mockGoldenReferencePdf)
      
      expect(result.score).toBe(0)
      expect(result.details.structuralSimilarity).toBe(0)
      expect(result.details.layoutConsistency).toBe(0)
      expect(result.details.visualAlignment).toBe(0)
    })

    it('should return zero scores when golden reference does not exist', async () => {
      const nonExistentRef = path.join(tempDir, 'nonexistent-ref.pdf')
      
      const result = await assessment.compare(mockWorksheetPdf, nonExistentRef)
      
      expect(result.score).toBe(0)
      expect(result.details.structuralSimilarity).toBe(0)
      expect(result.details.layoutConsistency).toBe(0)
      expect(result.details.visualAlignment).toBe(0)
    })

    it('should create and clean up temporary image files', async () => {
      await assessment.compare(mockWorksheetPdf, mockGoldenReferencePdf)
      
      const tempImagesDir = path.join(path.dirname(mockWorksheetPdf), 'temp_images')
      const worksheetImage = path.join(tempImagesDir, 'worksheet_page1.png')
      const referenceImage = path.join(tempImagesDir, 'reference_page1.png')
      
      // Images should be cleaned up after comparison
      expect(fs.existsSync(worksheetImage)).toBe(false)
      expect(fs.existsSync(referenceImage)).toBe(false)
    })

    it('should handle PDF conversion errors gracefully', async () => {
      // Mock PDF converter to throw an error
      const mockPdfConverter = require('@/worksheet-engine/assessment/visual-similarity/pdf-to-image')
      mockPdfConverter.PdfToImageConverter.mockImplementation(() => ({
        convertToImage: jest.fn().mockRejectedValue(new Error('PDF conversion failed'))
      }))
      
      const result = await assessment.compare(mockWorksheetPdf, mockGoldenReferencePdf)
      
      expect(result.score).toBe(0)
      expect(result.details.structuralSimilarity).toBe(0)
      expect(result.details.layoutConsistency).toBe(0)
      expect(result.details.visualAlignment).toBe(0)
    })

    it('should handle image comparison errors gracefully', async () => {
      // Mock image comparator to throw an error
      const mockImageComparator = require('@/worksheet-engine/assessment/visual-similarity/image-comparison')
      mockImageComparator.ImageComparator.mockImplementation(() => ({
        compareImages: jest.fn().mockRejectedValue(new Error('Image comparison failed'))
      }))
      
      const result = await assessment.compare(mockWorksheetPdf, mockGoldenReferencePdf)
      
      expect(result.score).toBe(0)
    })
  })

  describe('compareImages', () => {
    it('should compare images directly when paths are provided', async () => {
      const imagePath1 = path.join(tempDir, 'image1.png')
      const imagePath2 = path.join(tempDir, 'image2.png')
      
      // Create mock image files
      fs.writeFileSync(imagePath1, 'mock image 1 data')
      fs.writeFileSync(imagePath2, 'mock image 2 data')
      
      const result = await assessment.compareImages(imagePath1, imagePath2)
      
      expect(result.score).toBeGreaterThanOrEqual(0)
      expect(result.score).toBeLessThanOrEqual(10)
      
      // Cleanup
      fs.unlinkSync(imagePath1)
      fs.unlinkSync(imagePath2)
    })

    it('should handle image comparison errors', async () => {
      const mockImageComparator = require('@/worksheet-engine/assessment/visual-similarity/image-comparison')
      mockImageComparator.ImageComparator.mockImplementation(() => ({
        compareImages: jest.fn().mockRejectedValue(new Error('Image comparison failed'))
      }))
      
      const result = await assessment.compareImages('image1.png', 'image2.png')
      
      expect(result.score).toBe(0)
      expect(result.details.structuralSimilarity).toBe(0)
      expect(result.details.layoutConsistency).toBe(0)
      expect(result.details.visualAlignment).toBe(0)
    })
  })

  describe('compareDetailed', () => {
    it('should provide detailed comparison results', async () => {
      const result = await assessment.compareDetailed(mockWorksheetPdf, mockGoldenReferencePdf)
      
      expect(result).toBeDefined()
      expect(result.ssim).toBeGreaterThanOrEqual(0)
      expect(result.pixelDifference).toBeGreaterThanOrEqual(0)
      expect(result.layoutConsistency).toBeGreaterThanOrEqual(0)
      expect(result.colorSimilarity).toBeGreaterThanOrEqual(0)
      expect(result.overallSimilarity).toBeGreaterThanOrEqual(0)
      expect(result.comparisonTime).toBeGreaterThan(0)
      expect(result.analysisDetails).toBeDefined()
      expect(result.analysisDetails.imageDimensions).toBeDefined()
      expect(result.analysisDetails.diffPixelCount).toBeGreaterThanOrEqual(0)
      expect(result.analysisDetails.totalPixels).toBeGreaterThan(0)
      expect(Array.isArray(result.analysisDetails.majorDifferences)).toBe(true)
    })

    it('should clean up temporary files after detailed comparison', async () => {
      await assessment.compareDetailed(mockWorksheetPdf, mockGoldenReferencePdf)
      
      const tempImagesDir = path.join(path.dirname(mockWorksheetPdf), 'temp_images')
      const worksheetImage = path.join(tempImagesDir, 'worksheet_detailed.png')
      const referenceImage = path.join(tempImagesDir, 'reference_detailed.png')
      
      // Images should be cleaned up
      expect(fs.existsSync(worksheetImage)).toBe(false)
      expect(fs.existsSync(referenceImage)).toBe(false)
    })

    it('should clean up temporary files even when comparison fails', async () => {
      const mockImageComparator = require('@/worksheet-engine/assessment/visual-similarity/image-comparison')
      mockImageComparator.ImageComparator.mockImplementation(() => ({
        compareImages: jest.fn().mockRejectedValue(new Error('Comparison failed'))
      }))
      
      await expect(assessment.compareDetailed(mockWorksheetPdf, mockGoldenReferencePdf))
        .rejects.toThrow('Comparison failed')
      
      // Files should still be cleaned up
      const tempImagesDir = path.join(path.dirname(mockWorksheetPdf), 'temp_images')
      const worksheetImage = path.join(tempImagesDir, 'worksheet_detailed.png')
      const referenceImage = path.join(tempImagesDir, 'reference_detailed.png')
      
      expect(fs.existsSync(worksheetImage)).toBe(false)
      expect(fs.existsSync(referenceImage)).toBe(false)
    })
  })

  describe('quickAssess', () => {
    it('should provide quick assessment metrics', async () => {
      const result = await assessment.quickAssess(mockWorksheetPdf, mockGoldenReferencePdf)
      
      expect(typeof result.score).toBe('number')
      expect(typeof result.isMatch).toBe('boolean')
      expect(typeof result.majorDifferences).toBe('number')
      expect(typeof result.similarityPercentage).toBe('number')
      
      expect(result.score).toBeGreaterThanOrEqual(0)
      expect(result.score).toBeLessThanOrEqual(10)
      expect(result.majorDifferences).toBeGreaterThanOrEqual(0)
      expect(result.similarityPercentage).toBeGreaterThanOrEqual(0)
      expect(result.similarityPercentage).toBeLessThanOrEqual(100)
    })

    it('should determine match correctly based on threshold', async () => {
      // Mock high similarity
      const mockImageComparator = require('@/worksheet-engine/assessment/visual-similarity/image-comparison')
      mockImageComparator.ImageComparator.mockImplementation(() => ({
        compareImages: jest.fn().mockResolvedValue({
          ssim: 0.95,
          pixelDifference: 5.0,
          layoutConsistency: 9.0,
          colorSimilarity: 9.2,
          overallSimilarity: 9.5,
          comparisonTime: 1000,
          analysisDetails: {
            imageDimensions: {
              reference: { width: 595, height: 842 },
              comparison: { width: 595, height: 842 }
            },
            diffPixelCount: 1000,
            totalPixels: 501190,
            majorDifferences: []
          }
        })
      }))
      
      const result = await assessment.quickAssess(mockWorksheetPdf, mockGoldenReferencePdf)
      
      expect(result.isMatch).toBe(true)
      expect(result.score).toBeGreaterThanOrEqual(7.0)
      expect(result.similarityPercentage).toBeGreaterThan(70)
    })

    it('should determine no match for low similarity', async () => {
      // Mock low similarity
      const mockImageComparator = require('@/worksheet-engine/assessment/visual-similarity/image-comparison')
      mockImageComparator.ImageComparator.mockImplementation(() => ({
        compareImages: jest.fn().mockResolvedValue({
          ssim: 0.3,
          pixelDifference: 60.0,
          layoutConsistency: 4.0,
          colorSimilarity: 3.5,
          overallSimilarity: 3.8,
          comparisonTime: 1200,
          analysisDetails: {
            imageDimensions: {
              reference: { width: 595, height: 842 },
              comparison: { width: 595, height: 842 }
            },
            diffPixelCount: 300000,
            totalPixels: 501190,
            majorDifferences: ['Layout structure differs significantly', 'Color scheme mismatch']
          }
        })
      }))
      
      const result = await assessment.quickAssess(mockWorksheetPdf, mockGoldenReferencePdf)
      
      expect(result.isMatch).toBe(false)
      expect(result.score).toBeLessThan(7.0)
      expect(result.similarityPercentage).toBeLessThan(70)
    })

    it('should handle quick assessment errors gracefully', async () => {
      const result = await assessment.quickAssess('/nonexistent/file.pdf', mockGoldenReferencePdf)
      
      expect(result.score).toBe(0)
      expect(result.isMatch).toBe(false)
      expect(result.majorDifferences).toBe(10)
      expect(result.similarityPercentage).toBe(0)
    })
  })

  describe('convertToVisualSimilarityScore', () => {
    it('should convert ImageComparisonResult to VisualSimilarityScore correctly', async () => {
      // This is tested indirectly through the other methods, but we can test edge cases
      const mockImageComparator = require('@/worksheet-engine/assessment/visual-similarity/image-comparison')
      
      // Test with perfect similarity
      mockImageComparator.ImageComparator.mockImplementation(() => ({
        compareImages: jest.fn().mockResolvedValue({
          ssim: 1.0,
          pixelDifference: 0.0,
          layoutConsistency: 10.0,
          colorSimilarity: 10.0,
          overallSimilarity: 10.0,
          comparisonTime: 500,
          analysisDetails: {
            imageDimensions: {
              reference: { width: 595, height: 842 },
              comparison: { width: 595, height: 842 }
            },
            diffPixelCount: 0,
            totalPixels: 501190,
            majorDifferences: []
          }
        })
      }))
      
      const result = await assessment.compare(mockWorksheetPdf, mockGoldenReferencePdf)
      
      expect(result.score).toBeCloseTo(10.0, 1)
      expect(result.details.structuralSimilarity).toBeCloseTo(10.0, 1)
      expect(result.details.layoutConsistency).toBeCloseTo(10.0, 1)
      expect(result.details.visualAlignment).toBeCloseTo(10.0, 1)
    })

    it('should handle edge case conversions correctly', async () => {
      const mockImageComparator = require('@/worksheet-engine/assessment/visual-similarity/image-comparison')
      
      // Test with no similarity
      mockImageComparator.ImageComparator.mockImplementation(() => ({
        compareImages: jest.fn().mockResolvedValue({
          ssim: 0.0,
          pixelDifference: 100.0,
          layoutConsistency: 0.0,
          colorSimilarity: 0.0,
          overallSimilarity: 0.0,
          comparisonTime: 800,
          analysisDetails: {
            imageDimensions: {
              reference: { width: 595, height: 842 },
              comparison: { width: 595, height: 842 }
            },
            diffPixelCount: 501190,
            totalPixels: 501190,
            majorDifferences: ['Complete mismatch']
          }
        })
      }))
      
      const result = await assessment.compare(mockWorksheetPdf, mockGoldenReferencePdf)
      
      expect(result.score).toBe(0)
      expect(result.details.structuralSimilarity).toBe(0)
      expect(result.details.layoutConsistency).toBe(0)
      expect(result.details.visualAlignment).toBe(0)
    })
  })

  describe('file cleanup', () => {
    it('should clean up temp files even when warnings occur', async () => {
      // Mock console.warn to capture cleanup warnings
      const originalWarn = console.warn
      const warnSpy = jest.fn()
      console.warn = warnSpy
      
      // Create a temp file that exists to test cleanup
      const tempImagesDir = path.join(path.dirname(mockWorksheetPdf), 'temp_images')
      fs.mkdirSync(tempImagesDir, { recursive: true })
      const testFile = path.join(tempImagesDir, 'test-cleanup.png')
      fs.writeFileSync(testFile, 'test data')
      
      await assessment.compare(mockWorksheetPdf, mockGoldenReferencePdf)
      
      console.warn = originalWarn
      
      // The cleanup should have attempted to remove files
      expect(fs.existsSync(testFile)).toBe(false)
    })
  })
})