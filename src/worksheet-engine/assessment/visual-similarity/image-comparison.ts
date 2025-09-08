/**
 * Image Comparison - Compares images for visual similarity using multiple metrics
 * Story Engine.1.2: Hybrid Quality Assessment Framework
 */

const Jimp = require('jimp')
const { compare } = require('resemblejs')

export interface ImageComparisonResult {
  ssim: number // Structural Similarity Index (0-1)
  pixelDifference: number // Percentage of different pixels
  layoutConsistency: number // Layout element positioning similarity
  colorSimilarity: number // Color distribution similarity
  overallSimilarity: number // Combined similarity score (0-10)
  comparisonTime: number
  analysisDetails: {
    imageDimensions: {
      reference: { width: number; height: number }
      comparison: { width: number; height: number }
    }
    diffPixelCount: number
    totalPixels: number
    majorDifferences: string[]
  }
}

export interface ComparisonOptions {
  threshold: number // Sensitivity threshold (0-1)
  includeColorAnalysis: boolean
  includeLayoutAnalysis: boolean
  ignoreColors: boolean
  ignoreAntialiasing: boolean
  resizeToMatch: boolean
}

export class ImageComparator {
  private static readonly DEFAULT_OPTIONS: ComparisonOptions = {
    threshold: 0.05,
    includeColorAnalysis: true,
    includeLayoutAnalysis: true,
    ignoreColors: false,
    ignoreAntialiasing: true,
    resizeToMatch: true
  }

  async compareImages(
    referencePath: string,
    comparisonPath: string,
    options: Partial<ComparisonOptions> = {}
  ): Promise<ImageComparisonResult> {
    const startTime = Date.now()
    const finalOptions = { ...ImageComparator.DEFAULT_OPTIONS, ...options }

    try {
      // Load images
      const [referenceImg, comparisonImg] = await Promise.all([
        Jimp.read(referencePath),
        Jimp.read(comparisonPath)
      ])

      // Resize images to match if requested
      let processedComparisonImg = comparisonImg
      if (finalOptions.resizeToMatch && 
          (referenceImg.bitmap.width !== comparisonImg.bitmap.width || 
           referenceImg.bitmap.height !== comparisonImg.bitmap.height)) {
        processedComparisonImg = comparisonImg.clone().resize(
          referenceImg.bitmap.width, 
          referenceImg.bitmap.height
        )
      }

      // Perform multiple similarity analyses
      const [pixelDiffResult, ssimScore, colorSimilarity, layoutConsistency] = await Promise.all([
        this.calculatePixelDifference(referenceImg, processedComparisonImg, finalOptions),
        this.calculateSSIM(referenceImg, processedComparisonImg),
        finalOptions.includeColorAnalysis ? 
          this.calculateColorSimilarity(referenceImg, processedComparisonImg) : 
          Promise.resolve(8.0),
        finalOptions.includeLayoutAnalysis ?
          this.calculateLayoutConsistency(referenceImg, processedComparisonImg) :
          Promise.resolve(8.0)
      ])

      // Calculate overall similarity score
      const overallSimilarity = this.calculateOverallSimilarity(
        ssimScore,
        100 - pixelDiffResult.differencePercentage,
        colorSimilarity,
        layoutConsistency
      )

      const comparisonTime = Date.now() - startTime

      return {
        ssim: ssimScore,
        pixelDifference: pixelDiffResult.differencePercentage,
        layoutConsistency,
        colorSimilarity,
        overallSimilarity,
        comparisonTime,
        analysisDetails: {
          imageDimensions: {
            reference: {
              width: referenceImg.bitmap.width,
              height: referenceImg.bitmap.height
            },
            comparison: {
              width: processedComparisonImg.bitmap.width,
              height: processedComparisonImg.bitmap.height
            }
          },
          diffPixelCount: pixelDiffResult.diffPixelCount,
          totalPixels: referenceImg.bitmap.width * referenceImg.bitmap.height,
          majorDifferences: this.identifyMajorDifferences(
            ssimScore,
            pixelDiffResult.differencePercentage,
            colorSimilarity,
            layoutConsistency
          )
        }
      }

    } catch (error) {
      console.error('Image comparison failed:', error)
      
      return {
        ssim: 0,
        pixelDifference: 100,
        layoutConsistency: 0,
        colorSimilarity: 0,
        overallSimilarity: 0,
        comparisonTime: Date.now() - startTime,
        analysisDetails: {
          imageDimensions: {
            reference: { width: 0, height: 0 },
            comparison: { width: 0, height: 0 }
          },
          diffPixelCount: 0,
          totalPixels: 0,
          majorDifferences: ['Comparison failed: ' + (error instanceof Error ? error.message : 'Unknown error')]
        }
      }
    }
  }

  private async calculatePixelDifference(
    img1: any,
    img2: any,
    options: ComparisonOptions
  ): Promise<{ differencePercentage: number; diffPixelCount: number }> {
    try {
      return new Promise((resolve, reject) => {
        compare(img1, img2, {
          ignore: options.ignoreColors ? ['color'] : [],
          ignoreAntialiasing: options.ignoreAntialiasing,
          threshold: options.threshold
        }, (err: any, data: any) => {
          if (err) {
            reject(err)
          } else {
            resolve({
              differencePercentage: parseFloat(data.misMatchPercentage) || 0,
              diffPixelCount: data.diffBounds ? 
                (data.diffBounds.right - data.diffBounds.left) * 
                (data.diffBounds.bottom - data.diffBounds.top) : 0
            })
          }
        })
      })
    } catch (error) {
      console.warn('Pixel difference calculation failed:', error)
      return { differencePercentage: 50, diffPixelCount: 0 }
    }
  }

  private async calculateSSIM(img1: any, img2: any): Promise<number> {
    try {
      // Simplified SSIM calculation
      // In a production system, you'd use a proper SSIM library
      const width = Math.min(img1.bitmap.width, img2.bitmap.width)
      const height = Math.min(img1.bitmap.height, img2.bitmap.height)
      
      let totalDiff = 0
      let pixelCount = 0

      for (let y = 0; y < height; y += 4) { // Sample every 4th pixel for performance
        for (let x = 0; x < width; x += 4) {
          const pixel1 = Jimp.intToRGBA(img1.getPixelColor(x, y))
          const pixel2 = Jimp.intToRGBA(img2.getPixelColor(x, y))
          
          const diff = Math.abs(pixel1.r - pixel2.r) + 
                      Math.abs(pixel1.g - pixel2.g) + 
                      Math.abs(pixel1.b - pixel2.b)
          
          totalDiff += diff
          pixelCount++
        }
      }

      // Convert to similarity score (0-1)
      const avgDiff = totalDiff / (pixelCount * 255 * 3)
      return Math.max(0, 1 - avgDiff)

    } catch (error) {
      console.warn('SSIM calculation failed:', error)
      return 0.5
    }
  }

  private async calculateColorSimilarity(img1: any, img2: any): Promise<number> {
    try {
      // Analyze color histograms
      const hist1 = this.getColorHistogram(img1)
      const hist2 = this.getColorHistogram(img2)
      
      // Calculate histogram similarity using correlation
      let correlation = 0
      let sum1 = 0, sum2 = 0, sum1Sq = 0, sum2Sq = 0, pSum = 0

      for (let i = 0; i < hist1.length; i++) {
        sum1 += hist1[i]
        sum2 += hist2[i]
        sum1Sq += hist1[i] * hist1[i]
        sum2Sq += hist2[i] * hist2[i]
        pSum += hist1[i] * hist2[i]
      }

      const num = pSum - (sum1 * sum2 / hist1.length)
      const den = Math.sqrt((sum1Sq - sum1 * sum1 / hist1.length) * 
                           (sum2Sq - sum2 * sum2 / hist1.length))

      if (den === 0) return 5.0 // Neutral score
      
      correlation = num / den
      
      // Convert correlation to 0-10 scale
      return Math.max(0, Math.min(10, (correlation + 1) * 5))

    } catch (error) {
      console.warn('Color similarity calculation failed:', error)
      return 5.0
    }
  }

  private getColorHistogram(img: any): number[] {
    const histogram = new Array(256).fill(0)
    
    try {
      for (let y = 0; y < img.bitmap.height; y += 2) { // Sample every other pixel
        for (let x = 0; x < img.bitmap.width; x += 2) {
          const pixel = Jimp.intToRGBA(img.getPixelColor(x, y))
          const grayscale = Math.round(0.299 * pixel.r + 0.587 * pixel.g + 0.114 * pixel.b)
          histogram[grayscale]++
        }
      }
    } catch (error) {
      console.warn('Histogram calculation failed:', error)
    }

    return histogram
  }

  private async calculateLayoutConsistency(img1: any, img2: any): Promise<number> {
    try {
      // Simple layout consistency check based on edge detection
      const edges1 = this.detectEdges(img1)
      const edges2 = this.detectEdges(img2)
      
      // Compare edge patterns
      let matchingEdges = 0
      let totalEdges = 0

      const width = Math.min(img1.bitmap.width, img2.bitmap.width)
      const height = Math.min(img1.bitmap.height, img2.bitmap.height)

      for (let y = 0; y < height; y += 5) {
        for (let x = 0; x < width; x += 5) {
          const edge1 = edges1[y] && edges1[y][x] ? edges1[y][x] : 0
          const edge2 = edges2[y] && edges2[y][x] ? edges2[y][x] : 0
          
          totalEdges++
          if (Math.abs(edge1 - edge2) < 50) { // Threshold for edge similarity
            matchingEdges++
          }
        }
      }

      const layoutSimilarity = totalEdges > 0 ? matchingEdges / totalEdges : 0.5
      return layoutSimilarity * 10

    } catch (error) {
      console.warn('Layout consistency calculation failed:', error)
      return 5.0
    }
  }

  private detectEdges(img: any): number[][] {
    try {
      const edges: number[][] = []
      const width = img.bitmap.width
      const height = img.bitmap.height

      for (let y = 1; y < height - 1; y++) {
        edges[y] = []
        for (let x = 1; x < width - 1; x++) {
          // Sobel edge detection
          const tl = Jimp.intToRGBA(img.getPixelColor(x - 1, y - 1))
          const tm = Jimp.intToRGBA(img.getPixelColor(x, y - 1))
          const tr = Jimp.intToRGBA(img.getPixelColor(x + 1, y - 1))
          const ml = Jimp.intToRGBA(img.getPixelColor(x - 1, y))
          const mr = Jimp.intToRGBA(img.getPixelColor(x + 1, y))
          const bl = Jimp.intToRGBA(img.getPixelColor(x - 1, y + 1))
          const bm = Jimp.intToRGBA(img.getPixelColor(x, y + 1))
          const br = Jimp.intToRGBA(img.getPixelColor(x + 1, y + 1))

          // Convert to grayscale for edge detection
          const gray = (pixel: any) => 0.299 * pixel.r + 0.587 * pixel.g + 0.114 * pixel.b

          const gx = gray(tr) + 2 * gray(mr) + gray(br) - gray(tl) - 2 * gray(ml) - gray(bl)
          const gy = gray(bl) + 2 * gray(bm) + gray(br) - gray(tl) - 2 * gray(tm) - gray(tr)

          edges[y][x] = Math.sqrt(gx * gx + gy * gy)
        }
      }

      return edges
    } catch (error) {
      console.warn('Edge detection failed:', error)
      return []
    }
  }

  private calculateOverallSimilarity(
    ssim: number,
    pixelSimilarity: number,
    colorSimilarity: number,
    layoutConsistency: number
  ): number {
    // Weighted combination of similarity metrics
    const weights = {
      ssim: 0.30,
      pixel: 0.30,
      color: 0.20,
      layout: 0.20
    }

    const weightedScore = 
      (ssim * 10 * weights.ssim) +
      (pixelSimilarity * 0.1 * weights.pixel) +
      (colorSimilarity * weights.color) +
      (layoutConsistency * weights.layout)

    return Math.max(0, Math.min(10, Number(weightedScore.toFixed(1))))
  }

  private identifyMajorDifferences(
    ssim: number,
    pixelDiff: number,
    colorSimilarity: number,
    layoutConsistency: number
  ): string[] {
    const differences: string[] = []

    if (ssim < 0.7) {
      differences.push('Low structural similarity detected')
    }

    if (pixelDiff > 15) {
      differences.push(`High pixel difference: ${pixelDiff.toFixed(1)}%`)
    }

    if (colorSimilarity < 6.0) {
      differences.push('Significant color distribution differences')
    }

    if (layoutConsistency < 6.0) {
      differences.push('Layout positioning inconsistencies')
    }

    if (pixelDiff > 30) {
      differences.push('Major visual differences detected')
    }

    if (ssim < 0.5 && pixelDiff > 25) {
      differences.push('Possible completely different content')
    }

    return differences
  }
}