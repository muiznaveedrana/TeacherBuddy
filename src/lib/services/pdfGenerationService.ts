import { LayoutType, WorksheetConfig } from '@/lib/types/worksheet'
import svgInliningService from './svgInliningService'

export interface PdfGenerationRequest {
  config: WorksheetConfig
  generatedContent: string
  title: string
}

export interface PdfGenerationResult {
  success: boolean
  buffer?: Buffer
  filename: string
  error?: string
  generationTime: number
  svgInlining?: {
    processedImages: number
    errors: string[]
  }
}

/**
 * Rate limiting storage - in production this should use Redis or similar
 */
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

/**
 * Check rate limiting for PDF generation
 * 5 PDFs per user per 3 minutes
 */
function checkRateLimit(userId: string): boolean {
  const now = Date.now()
  const key = userId
  const limit = rateLimitStore.get(key)
  
  if (!limit || now > limit.resetTime) {
    // Reset or create new limit window
    rateLimitStore.set(key, { count: 1, resetTime: now + 3 * 60 * 1000 }) // 3 minutes
    return true
  }
  
  if (limit.count >= 5) {
    return false // Rate limit exceeded
  }
  
  limit.count += 1
  return true
}

/**
 * Generate secure filename without personal data
 * Format: Maths_{Topic}_{Layout}_{Timestamp}.pdf
 */
function generateFilename(config: WorksheetConfig): string {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
  const layout = config.layout.charAt(0).toUpperCase() + config.layout.slice(1)
  const topic = config.topic.replace(/[^a-zA-Z0-9]/g, '')
  
  return `Maths_${topic}_${layout}_${timestamp}.pdf`
}

/**
 * Main PDF generation function using Puppeteer (Updated)
 */
export async function generateWorksheetPdf(
  request: PdfGenerationRequest,
  userId: string
): Promise<PdfGenerationResult> {
  const startTime = Date.now()
  
  try {
    // Rate limiting check
    if (!checkRateLimit(userId)) {
      return {
        success: false,
        filename: '',
        error: 'Rate limit exceeded. Maximum 5 PDFs per 3 minutes.',
        generationTime: Date.now() - startTime
      }
    }
    
    // Input validation
    if (!request.config || !request.generatedContent || !request.title) {
      return {
        success: false,
        filename: '',
        error: 'Missing required fields for PDF generation',
        generationTime: Date.now() - startTime
      }
    }
    
    // Validate layout type
    const validLayouts: LayoutType[] = ['standard', 'fluency', 'grid', 'differentiated', 'reasoning', 'visual-heavy', 'word-problem-enhanced']
    if (!validLayouts.includes(request.config.layout)) {
      return {
        success: false,
        filename: '',
        error: 'Invalid layout type provided',
        generationTime: Date.now() - startTime
      }
    }
    
    // Process HTML to inline static SVGs for PDF compatibility
    console.log('Processing HTML for PDF generation - inlining static SVGs...')
    const inliningStartTime = Date.now()
    const inliningResult = await svgInliningService.inlineCountingObjectSVGs(request.generatedContent)
    const inliningTime = Date.now() - inliningStartTime

    if (!inliningResult.success) {
      console.warn(`⚠️ SVG inlining completed with errors (${inliningTime}ms):`, inliningResult.errors)
      // Continue with PDF generation even if some SVGs failed to inline
    } else {
      console.log(`✅ Successfully inlined ${inliningResult.processedImages} static SVG images for PDF (${inliningTime}ms)`)
    }

    const html = inliningResult.inlinedHtml
    
    // Configure Puppeteer for both development and serverless environments
    const isProduction = process.env.NODE_ENV === 'production'
    const isDevelopment = process.env.NODE_ENV === 'development'
    const isVercel = process.env.VERCEL === '1'

    interface BrowserConfig {
      headless: boolean;
      args?: string[];
      executablePath?: string;
    }

    let browserConfig: BrowserConfig = {
      headless: true,
    }

    if (isProduction || isVercel) {
      // Production/Vercel serverless environment with @sparticuz/chromium
      try {
        const chromium = (await import('@sparticuz/chromium')).default

        // Optimize for Vercel's serverless environment
        browserConfig = {
          args: [
            ...chromium.args,
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--disable-setuid-sandbox',
            '--no-first-run',
            '--no-sandbox',
            '--no-zygote',
            '--single-process'
          ],
          executablePath: await chromium.executablePath(),
          headless: true,
        }
        console.log('Using @sparticuz/chromium for serverless environment')
      } catch (chromiumError) {
        console.error('Failed to load @sparticuz/chromium:', chromiumError)
        throw new Error('Serverless Chrome setup failed. Please check @sparticuz/chromium installation.')
      }
    } else if (isDevelopment) {
      // Development environment - use bundled Chromium from puppeteer
      try {
        const puppeteerFull = await import('puppeteer')
        const executablePath = puppeteerFull.default.executablePath()
        console.log('Using Puppeteer bundled Chrome:', executablePath)
        
        browserConfig = {
          executablePath,
          headless: true,
          args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
        }
      } catch (puppeteerError) {
        console.warn('Puppeteer bundled Chrome not available, trying system Chrome:', puppeteerError)
        
        // Fallback to system Chrome paths
        const systemChromePaths = [
          'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', // Windows
          'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe', // Windows x86
          '/usr/bin/google-chrome-stable', // Linux
          '/usr/bin/google-chrome', // Linux alt
          '/usr/bin/chromium-browser', // Linux Chromium
          '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' // macOS
        ]
        
        const fs = await import('fs')
        let executablePath = ''
        
        for (const chromePath of systemChromePaths) {
          if (fs.existsSync(chromePath)) {
            executablePath = chromePath
            console.log('Using system Chrome:', chromePath)
            break
          }
        }
        
        if (!executablePath) {
          throw new Error(
            'Chrome executable not found. Please install Google Chrome or run: npx puppeteer browsers install chrome'
          )
        }
        
        browserConfig = {
          executablePath,
          headless: true,
          args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
        }
      }
    }
    
    // Use puppeteer-core for the fallback case
    const puppeteerCore = await import('puppeteer-core')
    const browser = await puppeteerCore.default.launch(browserConfig)
    
    const page = await browser.newPage()
    
    // Set content with optimized loading and timeout protection
    await page.setContent(html, {
      waitUntil: 'domcontentloaded', // Faster than networkidle0 for self-contained HTML
      timeout: 45000 // Extended timeout for complex worksheets
    })

    // Wait for any CSS animations or transitions to complete
    await new Promise(resolve => setTimeout(resolve, 500))

    // Ensure all fonts are loaded (important for math symbols)
    await page.evaluateHandle(() => document.fonts.ready)
    
    // Generate PDF with optimized A4 formatting and enhanced quality settings
    const pdfStartTime = Date.now()
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '10mm',    // Minimal margins to maximize content area
        bottom: '10mm',
        left: '12mm',
        right: '12mm'
      },
      preferCSSPageSize: true,
      displayHeaderFooter: false,
      scale: 1.0,
      // Optimize for print quality
      omitBackground: false
    })
    const pdfTime = Date.now() - pdfStartTime
    console.log(`📄 PDF generation completed in ${pdfTime}ms`)
    
    // Convert to Buffer for proper typing
    const buffer = Buffer.from(pdfBuffer)
    
    await browser.close()
    
    const filename = generateFilename(request.config)
    const generationTime = Date.now() - startTime
    
    // Log successful generation (no personal data)
    console.log(`PDF generated successfully: ${filename}, Layout: ${request.config.layout}, Time: ${generationTime}ms`)
    
    return {
      success: true,
      buffer,
      filename,
      generationTime,
      svgInlining: {
        processedImages: inliningResult.processedImages,
        errors: inliningResult.errors
      }
    }
    
  } catch (error) {
    const generationTime = Date.now() - startTime
    
    console.error('PDF generation failed:', {
      layout: request.config.layout,
      error: error instanceof Error ? error.message : 'Unknown error',
      generationTime
    })
    
    return {
      success: false,
      filename: '',
      error: error instanceof Error ? error.message : 'PDF generation failed',
      generationTime
    }
  }
}

/**
 * Parse questions from generated content
 * This is a simple parser - could be enhanced based on content format
 */
function parseQuestionsFromContent(content: string): { text: string }[] {
  // Split by common question patterns
  const questionPatterns = [
    /\d+\.\s*/g, // "1. ", "2. ", etc.
    /Question \d+:/gi, // "Question 1:", "Question 2:", etc.
    /\n\s*\n/g // Double line breaks
  ]
  
  let questions: string[] = []
  
  // Try each pattern to split questions
  for (const pattern of questionPatterns) {
    const parts = content.split(pattern).filter(part => part.trim().length > 10)
    if (parts.length > 1) {
      questions = parts
      break
    }
  }
  
  // Fallback: if no pattern works, treat entire content as one question
  if (questions.length === 0) {
    questions = [content]
  }
  
  // Clean and format questions
  return questions.map(q => ({
    text: q.trim().substring(0, 500) // Limit question length for security
  }))
}

/**
 * Cleanup function to remove expired rate limit entries
 * Should be called periodically in production
 */
export function cleanupRateLimit(): void {
  const now = Date.now()
  rateLimitStore.forEach((value, key) => {
    if (now > value.resetTime) {
      rateLimitStore.delete(key)
    }
  })
}