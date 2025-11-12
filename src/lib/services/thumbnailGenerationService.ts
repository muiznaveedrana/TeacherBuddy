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
  width: 1200,
  height: 1500,
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
      // Development: Try multiple sources in order of preference
      const path = require('path')
      const fs = require('fs')
      const glob = require('glob')

      let foundExecutable = false

      // 1. Try Puppeteer's installed Chromium
      const chromiumDir = path.join(process.cwd(), 'chromium')
      if (fs.existsSync(chromiumDir)) {
        const chromiumPaths = glob.sync('**/chrome.exe', {
          cwd: chromiumDir,
          absolute: true,
        })
        if (chromiumPaths.length > 0) {
          launchOptions.executablePath = chromiumPaths[0]
          console.log('📍 Using Puppeteer Chromium:', chromiumPaths[0])
          foundExecutable = true
        }
      }

      // 2. Try Playwright's Chromium (most reliable for dev)
      if (!foundExecutable) {
        const playwrightChromiumPath = path.join(
          process.cwd(),
          'node_modules',
          '@playwright',
          'chromium',
          '.local-browsers',
          'chromium-*',
          'chrome-win',
          'chrome.exe'
        )
        const playwrightPaths = glob.sync(playwrightChromiumPath)
        if (playwrightPaths.length > 0) {
          launchOptions.executablePath = playwrightPaths[0]
          console.log('📍 Using Playwright Chromium:', playwrightPaths[0])
          foundExecutable = true
        }
      }

      // 3. Try common system Chrome locations on Windows
      if (!foundExecutable) {
        const commonChromePaths = [
          'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
          'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
          process.env.LOCALAPPDATA + '\\Google\\Chrome\\Application\\chrome.exe',
        ]
        for (const chromePath of commonChromePaths) {
          if (fs.existsSync(chromePath)) {
            launchOptions.executablePath = chromePath
            console.log('📍 Using system Chrome:', chromePath)
            foundExecutable = true
            break
          }
        }
      }

      if (!foundExecutable) {
        throw new Error(
          '❌ No Chrome/Chromium found. Install Playwright browsers: npx playwright install chromium'
        )
      }
    }

    browser = await puppeteer.launch(launchOptions)

    const page = await browser.newPage()

    // CRITICAL FIX: Convert image paths to data URIs for reliable screenshot generation
    // Puppeteer can't reliably fetch images from production URL during serverless execution
    // So we read them from the filesystem and embed as base64 data URIs
    const path = require('path')
    const fs = require('fs')

    // Function to convert image to data URI
    function imageToDataUri(imagePath: string): string {
      try {
        const fullPath = path.join(process.cwd(), 'public', imagePath)
        if (fs.existsSync(fullPath)) {
          const imageBuffer = fs.readFileSync(fullPath)
          const ext = path.extname(imagePath).substring(1)
          const mimeType = ext === 'svg' ? 'svg+xml' : ext
          return `data:image/${mimeType};base64,${imageBuffer.toString('base64')}`
        }
      } catch (error) {
        console.warn(`Failed to read image: ${imagePath}`, error)
      }
      return '' // Return empty string if image not found
    }

    // Replace all image src paths with data URIs
    let htmlWithDataUris = worksheetHtml
    const imageSrcRegex = /src="\/images\/([^"]+)"/g
    let match

    while ((match = imageSrcRegex.exec(worksheetHtml)) !== null) {
      const imagePath = `/images/${match[1]}`
      const dataUri = imageToDataUri(imagePath)
      if (dataUri) {
        htmlWithDataUris = htmlWithDataUris.replace(
          `src="${imagePath}"`,
          `src="${dataUri}"`
        )
      }
    }

    // Use 'load' instead of 'networkidle0' since we're using data URIs (no network requests)
    await page.setContent(htmlWithDataUris, {
      waitUntil: 'load',
      timeout: 60000, // Increased to 60s for slower machines
    })

    // CRITICAL: Wait for ALL images to load before screenshot
    console.log('🖼️ Waiting for images to load...')
    await page.evaluate(() => {
      return Promise.all(
        Array.from(document.images)
          .filter(img => !img.complete)
          .map(img => new Promise((resolve) => {
            img.addEventListener('load', resolve)
            img.addEventListener('error', resolve) // Don't block on broken images
          }))
      )
    })

    // Additional safety: Wait for rendering to complete
    await new Promise(resolve => setTimeout(resolve, 500))

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
    // Add timestamp to ensure each thumbnail is unique and prevent CDN caching issues
    const timestamp = Date.now()
    const thumbnailUrl = await uploadToImageKit(optimizedBuffer, {
      fileName: `${slug}-${timestamp}-thumb.${finalConfig.format}`,
      folder: '/worksheets/thumbnails',
      tags: ['worksheet', 'thumbnail', slug.split('-')[0]],
      useUniqueFileName: false,
      overwriteFile: false, // Don't overwrite - each version should have its own thumbnail
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
