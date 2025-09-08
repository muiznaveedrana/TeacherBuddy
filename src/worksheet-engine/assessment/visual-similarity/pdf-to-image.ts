/**
 * PDF to Image Converter - Converts PDF pages to images for visual comparison
 * Story Engine.1.2: Hybrid Quality Assessment Framework
 */

import { pdf2pic } from 'pdf2pic'
import * as fs from 'fs'
import * as path from 'path'

export interface PdfConversionOptions {
  density: number // DPI for image quality
  saveDir: string // Directory to save images
  format: 'png' | 'jpg'
  quality: number // Quality for jpg (1-100)
}

export interface ConversionResult {
  success: boolean
  imagePaths: string[]
  pageCount: number
  conversionTime: number
  errors?: string[]
}

export class PdfToImageConverter {
  private static readonly DEFAULT_OPTIONS: PdfConversionOptions = {
    density: 200, // Good balance between quality and file size
    saveDir: './temp/assessment-images',
    format: 'png',
    quality: 90
  }

  async convertPdfToImages(
    pdfPath: string, 
    options: Partial<PdfConversionOptions> = {}
  ): Promise<ConversionResult> {
    const startTime = Date.now()
    const finalOptions = { ...PdfToImageConverter.DEFAULT_OPTIONS, ...options }
    
    try {
      // Verify PDF exists
      if (!fs.existsSync(pdfPath)) {
        return {
          success: false,
          imagePaths: [],
          pageCount: 0,
          conversionTime: Date.now() - startTime,
          errors: [`PDF file not found: ${pdfPath}`]
        }
      }

      // Ensure output directory exists
      await this.ensureDirectoryExists(finalOptions.saveDir)

      // Configure pdf2pic
      const convert = pdf2pic.fromPath(pdfPath, {
        density: finalOptions.density,
        saveDir: finalOptions.saveDir,
        saveName: `page`,
        format: finalOptions.format,
        ...(finalOptions.format === 'jpg' && { quality: finalOptions.quality })
      })

      // Convert all pages
      const results = await convert.bulk(-1, { responseType: 'image' })
      
      const imagePaths: string[] = []
      const errors: string[] = []

      // Process results
      for (let i = 0; i < results.length; i++) {
        const result = results[i]
        if (result && typeof result.path === 'string') {
          imagePaths.push(result.path)
        } else {
          errors.push(`Failed to convert page ${i + 1}`)
        }
      }

      const conversionTime = Date.now() - startTime

      return {
        success: imagePaths.length > 0,
        imagePaths: imagePaths.sort(), // Sort to ensure consistent order
        pageCount: results.length,
        conversionTime,
        ...(errors.length > 0 && { errors })
      }

    } catch (error) {
      console.error('PDF to image conversion failed:', error)
      
      return {
        success: false,
        imagePaths: [],
        pageCount: 0,
        conversionTime: Date.now() - startTime,
        errors: [error instanceof Error ? error.message : 'Unknown conversion error']
      }
    }
  }

  async convertSinglePage(
    pdfPath: string,
    pageNumber: number,
    options: Partial<PdfConversionOptions> = {}
  ): Promise<ConversionResult> {
    const startTime = Date.now()
    const finalOptions = { ...PdfToImageConverter.DEFAULT_OPTIONS, ...options }
    
    try {
      if (!fs.existsSync(pdfPath)) {
        return {
          success: false,
          imagePaths: [],
          pageCount: 0,
          conversionTime: Date.now() - startTime,
          errors: [`PDF file not found: ${pdfPath}`]
        }
      }

      await this.ensureDirectoryExists(finalOptions.saveDir)

      const convert = pdf2pic.fromPath(pdfPath, {
        density: finalOptions.density,
        saveDir: finalOptions.saveDir,
        saveName: `page_${pageNumber}`,
        format: finalOptions.format,
        ...(finalOptions.format === 'jpg' && { quality: finalOptions.quality })
      })

      const result = await convert(pageNumber, { responseType: 'image' })
      
      const conversionTime = Date.now() - startTime

      if (result && typeof result.path === 'string') {
        return {
          success: true,
          imagePaths: [result.path],
          pageCount: 1,
          conversionTime
        }
      } else {
        return {
          success: false,
          imagePaths: [],
          pageCount: 0,
          conversionTime,
          errors: [`Failed to convert page ${pageNumber}`]
        }
      }

    } catch (error) {
      console.error('Single page PDF conversion failed:', error)
      
      return {
        success: false,
        imagePaths: [],
        pageCount: 0,
        conversionTime: Date.now() - startTime,
        errors: [error instanceof Error ? error.message : 'Unknown conversion error']
      }
    }
  }

  private async ensureDirectoryExists(dirPath: string): Promise<void> {
    try {
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true })
      }
    } catch (error) {
      throw new Error(`Failed to create directory ${dirPath}: ${error}`)
    }
  }

  async cleanupImages(imagePaths: string[]): Promise<void> {
    const promises = imagePaths.map(async (imagePath) => {
      try {
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath)
        }
      } catch (error) {
        console.warn(`Failed to cleanup image ${imagePath}:`, error)
      }
    })

    await Promise.all(promises)
  }

  async getImageInfo(imagePath: string): Promise<{
    width: number
    height: number
    format: string
    size: number
  } | null> {
    try {
      const Jimp = require('jimp')
      const image = await Jimp.read(imagePath)
      const stats = fs.statSync(imagePath)
      
      return {
        width: image.bitmap.width,
        height: image.bitmap.height,
        format: image._originalMime,
        size: stats.size
      }
    } catch (error) {
      console.warn(`Failed to get image info for ${imagePath}:`, error)
      return null
    }
  }

  // Helper method to determine optimal density based on PDF size
  static getOptimalDensity(pdfSizeKb: number): number {
    if (pdfSizeKb > 5000) { // Large PDF (>5MB)
      return 150 // Lower density for faster processing
    } else if (pdfSizeKb > 1000) { // Medium PDF (>1MB)
      return 200 // Standard density
    } else {
      return 300 // High density for small PDFs
    }
  }

  // Helper to estimate conversion time
  static estimateConversionTime(pageCount: number, density: number): number {
    // Rough estimates in milliseconds
    const baseTimePerPage = 500 // Base 500ms per page
    const densityMultiplier = density / 200 // Multiplier based on density
    
    return Math.round(baseTimePerPage * pageCount * densityMultiplier)
  }
}