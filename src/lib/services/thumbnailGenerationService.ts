import puppeteer from 'puppeteer-core'
import chromium from '@sparticuz/chromium'
import sharp from 'sharp'
import { uploadToImageKit } from './imageKitService'

interface ThumbnailConfig {
  width?: number
  height?: number
  quality?: number
  format?: 'png' | 'jpeg' | 'webp'
}

const DEFAULT_CONFIG: ThumbnailConfig = {
  width: 800,
  height: 1000,
  quality: 80,
  format: 'webp',
}

export async function generateWorksheetThumbnail(
  worksheetHtml: string,
  slug: string,
  config: ThumbnailConfig = {}
): Promise<string> {
  const finalConfig = { ...DEFAULT_CONFIG, ...config }
  let browser = null

  try {
    console.log(`📸 Generating thumbnail for: ${slug}`)

    // Use local Chromium in development, Sparticuz in production
    const isProduction = process.env.NODE_ENV === 'production'

    const launchOptions: any = {
      headless: true,
      defaultViewport: {
        width: finalConfig.width,
        height: finalConfig.height,
      },
    }

    if (isProduction) {
      // Production: Use Sparticuz Chromium for AWS Lambda
      launchOptions.executablePath = await chromium.executablePath()
      launchOptions.args = chromium.args
    } else {
      // Development: Use Puppeteer's installed Chromium
      const path = require('path')
      const fs = require('fs')
      const glob = require('glob')

      // Find Chromium executable dynamically (version-agnostic)
      const chromiumDir = path.join(process.cwd(), 'chromium')

      if (fs.existsSync(chromiumDir)) {
        // Find chrome.exe recursively in chromium directory
        const chromiumPaths = glob.sync('**/chrome.exe', {
          cwd: chromiumDir,
          absolute: true,
        })

        if (chromiumPaths.length > 0) {
          const chromiumPath = chromiumPaths[0]
          console.log('📍 Using Puppeteer Chromium:', chromiumPath)
          launchOptions.executablePath = chromiumPath
        } else {
          console.log('⚠️ Chromium directory exists but chrome.exe not found')
        }
      } else {
        // Fallback: Let Puppeteer find Chrome/Chromium automatically
        console.log('⚠️ Using system Chrome (Puppeteer Chromium not found)')
      }
    }

    browser = await puppeteer.launch(launchOptions)

    const page = await browser.newPage()

    await page.setContent(worksheetHtml, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    })

    console.log('📷 Taking screenshot...')
    const screenshotBuffer = await page.screenshot({
      type: 'png',
      fullPage: true,
    })

    await browser.close()
    browser = null

    console.log('🎨 Optimizing image...')
    const optimizedBuffer = await sharp(screenshotBuffer)
      .resize(finalConfig.width!, finalConfig.height!, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality: finalConfig.quality })
      .toBuffer()

    console.log(`✅ Image optimized: ${(optimizedBuffer.length / 1024).toFixed(1)} KB`)

    console.log('☁️ Uploading to ImageKit...')
    const thumbnailUrl = await uploadToImageKit(optimizedBuffer, {
      fileName: `${slug}-thumb.${finalConfig.format}`,
      folder: '/worksheets/thumbnails',
      tags: ['worksheet', 'thumbnail', slug.split('-')[0]],
      useUniqueFileName: false,
      overwriteFile: true,
    })

    console.log('✅ Thumbnail generated:', thumbnailUrl)
    return thumbnailUrl

  } catch (error) {
    console.error('❌ Thumbnail generation failed:', error)
    if (browser) await browser.close()
    throw new Error(`Failed to generate thumbnail: ${error}`)
  }
}

export function generateSlugFromTitle(
  title: string,
  visualTheme?: string,
  activityType?: string,
  seasonalTheme?: string,
  layoutType?: string,
  version?: string
): string {
  // Start with base slug from title
  let slug = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()

  // Add differentiators for uniqueness
  // NOTE: All differentiators create separate URLs for maximum SEO visibility
  if (visualTheme) {
    slug = `${slug}-with-${visualTheme.toLowerCase().replace(/\s+/g, '-')}`
  }
  if (activityType) {
    slug = `${slug}-${activityType.toLowerCase().replace(/\s+/g, '-')}`
  }
  if (seasonalTheme) {
    slug = `${slug}-${seasonalTheme.toLowerCase().replace(/\s+/g, '-')}-edition`
  }
  // Layout is a PRIMARY differentiator - different LLM prompts = different content
  if (layoutType && layoutType !== 'default') {
    slug = `${slug}-${layoutType.toLowerCase().replace(/\s+/g, '-')}-layout`
  }
  if (version && !visualTheme && !activityType && !seasonalTheme && !layoutType) {
    slug = `${slug}-version-${version.toLowerCase()}`
  }

  return slug
}
