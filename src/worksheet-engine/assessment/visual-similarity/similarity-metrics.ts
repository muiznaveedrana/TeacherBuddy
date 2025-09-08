/**
 * Similarity Metrics - Mathematical algorithms for visual comparison
 * Story Engine.1.2: Hybrid Quality Assessment Framework
 */

import Jimp from 'jimp'

export interface SimilarityMetrics {
  structuralSimilarity: number
  pixelDifference: number
  layoutConsistency: number
  visualAlignment: number
}

export class SimilarityCalculator {
  /**
   * Calculate Structural Similarity Index (SSIM) between two images
   * Returns value between 0-1 (higher = more similar)
   */
  static async calculateSSIM(image1: Jimp, image2: Jimp): Promise<number> {
    // Ensure images are the same size
    const width = Math.min(image1.getWidth(), image2.getWidth())
    const height = Math.min(image1.getHeight(), image2.getHeight())
    
    image1.resize(width, height)
    image2.resize(width, height)

    // Convert to grayscale for SSIM calculation
    image1.grayscale()
    image2.grayscale()

    // Calculate SSIM using sliding window approach (simplified)
    const windowSize = 11
    const k1 = 0.01
    const k2 = 0.03
    const L = 255 // Maximum pixel value
    const c1 = (k1 * L) ** 2
    const c2 = (k2 * L) ** 2

    let ssimSum = 0
    let windowCount = 0

    for (let y = 0; y <= height - windowSize; y += windowSize) {
      for (let x = 0; x <= width - windowSize; x += windowSize) {
        const window1 = this.extractWindow(image1, x, y, windowSize)
        const window2 = this.extractWindow(image2, x, y, windowSize)
        
        const mu1 = this.calculateMean(window1)
        const mu2 = this.calculateMean(window2)
        const sigma1Sq = this.calculateVariance(window1, mu1)
        const sigma2Sq = this.calculateVariance(window2, mu2)
        const sigma12 = this.calculateCovariance(window1, window2, mu1, mu2)

        const numerator = (2 * mu1 * mu2 + c1) * (2 * sigma12 + c2)
        const denominator = (mu1 ** 2 + mu2 ** 2 + c1) * (sigma1Sq + sigma2Sq + c2)
        
        const ssim = numerator / denominator
        ssimSum += ssim
        windowCount++
      }
    }

    return windowCount > 0 ? Math.max(0, Math.min(1, ssimSum / windowCount)) : 0
  }

  /**
   * Calculate pixel-level difference between two images
   * Returns normalized difference (0-1, lower = more similar)
   */
  static async calculatePixelDifference(image1: Jimp, image2: Jimp): Promise<number> {
    const width = Math.min(image1.getWidth(), image2.getWidth())
    const height = Math.min(image1.getHeight(), image2.getHeight())
    
    image1.resize(width, height)
    image2.resize(width, height)

    let totalDifference = 0
    const totalPixels = width * height

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const pixel1 = image1.getPixelColor(x, y)
        const pixel2 = image2.getPixelColor(x, y)
        
        const r1 = (pixel1 >> 24) & 0xff
        const g1 = (pixel1 >> 16) & 0xff
        const b1 = (pixel1 >> 8) & 0xff
        
        const r2 = (pixel2 >> 24) & 0xff
        const g2 = (pixel2 >> 16) & 0xff
        const b2 = (pixel2 >> 8) & 0xff
        
        const diff = Math.sqrt((r1-r2)**2 + (g1-g2)**2 + (b1-b2)**2) / (255 * Math.sqrt(3))
        totalDifference += diff
      }
    }

    return Math.max(0, Math.min(1, totalDifference / totalPixels))
  }

  /**
   * Analyze layout consistency by comparing major structural elements
   */
  static async calculateLayoutConsistency(image1: Jimp, image2: Jimp): Promise<number> {
    // Convert images to binary (black/white) to identify structural elements
    const binary1 = image1.clone().greyscale().threshold({ max: 200 })
    const binary2 = image2.clone().greyscale().threshold({ max: 200 })
    
    // Calculate horizontal and vertical projections
    const hProjection1 = this.calculateHorizontalProjection(binary1)
    const hProjection2 = this.calculateHorizontalProjection(binary2)
    const vProjection1 = this.calculateVerticalProjection(binary1)
    const vProjection2 = this.calculateVerticalProjection(binary2)
    
    // Compare projections using correlation
    const hCorrelation = this.calculateCorrelation(hProjection1, hProjection2)
    const vCorrelation = this.calculateCorrelation(vProjection1, vProjection2)
    
    return (hCorrelation + vCorrelation) / 2
  }

  /**
   * Calculate visual alignment by analyzing element positioning
   */
  static async calculateVisualAlignment(image1: Jimp, image2: Jimp): Promise<number> {
    // Detect edges using a simple gradient filter
    const edges1 = this.detectEdges(image1.clone())
    const edges2 = this.detectEdges(image2.clone())
    
    // Calculate alignment score based on edge positions
    const alignmentScore = await this.calculateSSIM(edges1, edges2)
    return alignmentScore
  }

  // Helper methods

  private static extractWindow(image: Jimp, x: number, y: number, size: number): number[] {
    const window: number[] = []
    for (let dy = 0; dy < size; dy++) {
      for (let dx = 0; dx < size; dx++) {
        if (x + dx < image.getWidth() && y + dy < image.getHeight()) {
          const pixel = image.getPixelColor(x + dx, y + dy)
          const gray = (((pixel >> 24) & 0xff) + ((pixel >> 16) & 0xff) + ((pixel >> 8) & 0xff)) / 3
          window.push(gray)
        }
      }
    }
    return window
  }

  private static calculateMean(values: number[]): number {
    return values.reduce((sum, val) => sum + val, 0) / values.length
  }

  private static calculateVariance(values: number[], mean: number): number {
    const variance = values.reduce((sum, val) => sum + (val - mean) ** 2, 0) / values.length
    return variance
  }

  private static calculateCovariance(values1: number[], values2: number[], mean1: number, mean2: number): number {
    const covariance = values1.reduce((sum, val1, i) => sum + (val1 - mean1) * (values2[i] - mean2), 0) / values1.length
    return covariance
  }

  private static calculateHorizontalProjection(image: Jimp): number[] {
    const projection: number[] = []
    for (let y = 0; y < image.getHeight(); y++) {
      let sum = 0
      for (let x = 0; x < image.getWidth(); x++) {
        const pixel = image.getPixelColor(x, y)
        const gray = (((pixel >> 24) & 0xff) + ((pixel >> 16) & 0xff) + ((pixel >> 8) & 0xff)) / 3
        sum += gray < 128 ? 1 : 0 // Count dark pixels
      }
      projection.push(sum)
    }
    return projection
  }

  private static calculateVerticalProjection(image: Jimp): number[] {
    const projection: number[] = []
    for (let x = 0; x < image.getWidth(); x++) {
      let sum = 0
      for (let y = 0; y < image.getHeight(); y++) {
        const pixel = image.getPixelColor(x, y)
        const gray = (((pixel >> 24) & 0xff) + ((pixel >> 16) & 0xff) + ((pixel >> 8) & 0xff)) / 3
        sum += gray < 128 ? 1 : 0 // Count dark pixels
      }
      projection.push(sum)
    }
    return projection
  }

  private static calculateCorrelation(array1: number[], array2: number[]): number {
    const n = Math.min(array1.length, array2.length)
    if (n === 0) return 0

    const mean1 = array1.slice(0, n).reduce((sum, val) => sum + val, 0) / n
    const mean2 = array2.slice(0, n).reduce((sum, val) => sum + val, 0) / n

    let numerator = 0
    let sumSq1 = 0
    let sumSq2 = 0

    for (let i = 0; i < n; i++) {
      const diff1 = array1[i] - mean1
      const diff2 = array2[i] - mean2
      numerator += diff1 * diff2
      sumSq1 += diff1 ** 2
      sumSq2 += diff2 ** 2
    }

    const denominator = Math.sqrt(sumSq1 * sumSq2)
    return denominator === 0 ? 0 : Math.max(0, Math.min(1, numerator / denominator))
  }

  private static detectEdges(image: Jimp): Jimp {
    const width = image.getWidth()
    const height = image.getHeight()
    const result = new Jimp(width, height, 0xffffffff)

    // Simple Sobel edge detection
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const gx = this.getGradientX(image, x, y)
        const gy = this.getGradientY(image, x, y)
        const magnitude = Math.sqrt(gx ** 2 + gy ** 2)
        
        const edgeValue = magnitude > 30 ? 0x000000ff : 0xffffffff
        result.setPixelColor(edgeValue, x, y)
      }
    }

    return result
  }

  private static getGradientX(image: Jimp, x: number, y: number): number {
    const sobelX = [
      [-1, 0, 1],
      [-2, 0, 2],
      [-1, 0, 1]
    ]

    let gradient = 0
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const pixel = image.getPixelColor(x + dx, y + dy)
        const gray = (((pixel >> 24) & 0xff) + ((pixel >> 16) & 0xff) + ((pixel >> 8) & 0xff)) / 3
        gradient += gray * sobelX[dy + 1][dx + 1]
      }
    }
    return gradient
  }

  private static getGradientY(image: Jimp, x: number, y: number): number {
    const sobelY = [
      [-1, -2, -1],
      [0, 0, 0],
      [1, 2, 1]
    ]

    let gradient = 0
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const pixel = image.getPixelColor(x + dx, y + dy)
        const gray = (((pixel >> 24) & 0xff) + ((pixel >> 16) & 0xff) + ((pixel >> 8) & 0xff)) / 3
        gradient += gray * sobelY[dy + 1][dx + 1]
      }
    }
    return gradient
  }
}