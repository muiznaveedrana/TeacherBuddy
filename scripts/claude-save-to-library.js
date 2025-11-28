/**
 * Claude Desktop Save-to-Library Script
 * 
 * Usage: node scripts/claude-save-to-library.js
 * 
 * This script allows Claude Desktop to save generated worksheets
 * directly to Supabase library, WITH thumbnail generation.
 */

require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')
const puppeteer = require('puppeteer-core')
const sharp = require('sharp')
const glob = require('glob')

// Initialize Supabase Admin client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

// ImageKit setup
const ImageKit = require('imagekit')
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
})

/**
 * Upload buffer to ImageKit
 */
async function uploadToImageKit(buffer, options) {
  return new Promise((resolve, reject) => {
    imagekit.upload(
      {
        file: buffer.toString('base64'),
        fileName: options.fileName,
        folder: options.folder || '/worksheets/thumbnails',
        tags: options.tags || [],
        useUniqueFileName: options.useUniqueFileName ?? false,
        overwriteFile: options.overwriteFile ?? false,
      },
      (error, result) => {
        if (error) reject(error)
        else resolve(result.url)
      }
    )
  })
}

/**
 * Convert image path to data URI
 */
function imageToDataUri(imagePath) {
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
  return ''
}

/**
 * Generate thumbnail from HTML
 */
async function generateThumbnail(htmlContent, slug) {
  console.log(`📸 Generating thumbnail for: ${slug}`)
  let browser = null

  try {
    // Find Chrome executable
    let executablePath = null
    const commonChromePaths = [
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      process.env.LOCALAPPDATA + '\\Google\\Chrome\\Application\\chrome.exe',
    ]
    
    for (const chromePath of commonChromePaths) {
      if (fs.existsSync(chromePath)) {
        executablePath = chromePath
        console.log('📍 Using Chrome:', chromePath)
        break
      }
    }

    if (!executablePath) {
      throw new Error('❌ No Chrome found')
    }

    browser = await puppeteer.launch({
      headless: true,
      executablePath,
      defaultViewport: { width: 1200, height: 1500 },
    })

    const page = await browser.newPage()

    // Replace image paths with data URIs
    let htmlWithDataUris = htmlContent
    const imageSrcRegex = /src="\/images\/([^"]+)"/g
    let match
    while ((match = imageSrcRegex.exec(htmlContent)) !== null) {
      const imagePath = `/images/${match[1]}`
      const dataUri = imageToDataUri(imagePath)
      if (dataUri) {
        htmlWithDataUris = htmlWithDataUris.replace(`src="${imagePath}"`, `src="${dataUri}"`)
      }
    }

    await page.setContent(htmlWithDataUris, { waitUntil: 'load', timeout: 60000 })

    // Wait for images
    await page.evaluate(() => {
      return Promise.all(
        Array.from(document.images)
          .filter(img => !img.complete)
          .map(img => new Promise(resolve => {
            img.addEventListener('load', resolve)
            img.addEventListener('error', resolve)
          }))
      )
    })

    await new Promise(resolve => setTimeout(resolve, 500))

    console.log('📷 Taking screenshot...')
    const screenshotBuffer = await page.screenshot({ type: 'png', fullPage: true })

    await browser.close()
    browser = null

    console.log('🎨 Optimizing image...')
    const optimizedBuffer = await sharp(screenshotBuffer)
      .resize(1200, 1500, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer()

    console.log(`✅ Image optimized: ${(optimizedBuffer.length / 1024).toFixed(1)} KB`)

    console.log('☁️ Uploading to ImageKit...')
    const timestamp = Date.now()
    const thumbnailUrl = await uploadToImageKit(optimizedBuffer, {
      fileName: `${slug}-${timestamp}-thumb.webp`,
      folder: '/worksheets/thumbnails',
      tags: ['worksheet', 'thumbnail', slug.split('-')[0]],
    })

    console.log('✅ Thumbnail uploaded:', thumbnailUrl)
    return thumbnailUrl

  } catch (error) {
    console.error('❌ Thumbnail generation failed:', error)
    if (browser) await browser.close()
    return '/images/placeholder-thumbnail.png'
  }
}

/**
 * Generate unique slug with auto-versioning
 */
async function generateUniqueSlug(title, visualTheme, activityType, seasonalTheme, layoutType) {
  let slug = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()

  if (visualTheme) slug = `${slug}-with-${visualTheme.toLowerCase().replace(/\s+/g, '-')}`
  if (activityType) slug = `${slug}-${activityType.toLowerCase().replace(/\s+/g, '-')}`
  if (seasonalTheme) slug = `${slug}-${seasonalTheme.toLowerCase().replace(/\s+/g, '-')}-edition`
  if (layoutType && layoutType !== 'default') slug = `${slug}-${layoutType.toLowerCase().replace(/\s+/g, '-')}-layout`

  const { data } = await supabase.from('library_worksheets').select('slug').eq('slug', slug).single()
  if (!data) return slug

  let version = 2
  while (true) {
    const versionedSlug = `${slug}-v${version}`
    const { data: exists } = await supabase.from('library_worksheets').select('slug').eq('slug', versionedSlug).single()
    if (!exists) return versionedSlug
    version++
    if (version > 100) return `${slug}-${Date.now()}`
  }
}

/**
 * Save worksheet to library WITH thumbnail
 */
async function saveToLibrary(worksheetData) {
  const {
    title,
    html_content,
    year_group,
    topic,
    subtopic,
    difficulty = 'average',
    question_count = 5,
    layout_type = 'standard',
    visual_theme,
    activity_type,
    seasonal_theme,
    tags = [],
    status = 'published',
  } = worksheetData

  // Generate unique slug
  const slug = await generateUniqueSlug(title, visual_theme, activity_type, seasonal_theme, layout_type)

  // Generate thumbnail
  const thumbnail_url = await generateThumbnail(html_content, slug)

  const input = {
    title,
    html_content,
    region: 'UK',
    year_group,
    topic,
    subtopic,
    difficulty,
    question_count,
    layout_type,
    visual_theme: visual_theme || null,
    activity_type: activity_type || null,
    seasonal_theme: seasonal_theme || null,
    thumbnail_url,
    preview_images: [],
    tags,
    status,
    slug,
  }

  const { data, error } = await supabase
    .from('library_worksheets')
    .insert(input)
    .select()
    .single()

  if (error) {
    console.error('❌ Failed to save worksheet:', error)
    throw error
  }

  console.log('✅ Worksheet saved to library!')
  console.log('   Slug:', data.slug)
  console.log('   ID:', data.id)
  console.log('   Thumbnail:', data.thumbnail_url)
  console.log('   URL: http://localhost:3000/worksheets/' + data.slug)

  return data
}

/**
 * Save worksheet from HTML file
 */
async function saveFromFile(filePath, metadata) {
  const htmlContent = fs.readFileSync(filePath, 'utf-8')
  return saveToLibrary({
    ...metadata,
    html_content: htmlContent,
  })
}

module.exports = { saveToLibrary, saveFromFile, generateUniqueSlug, generateThumbnail }

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2)

  if (args.length === 0) {
    console.log(`
Claude Desktop Save-to-Library Script (with Thumbnail)
=======================================================

Usage:
  node scripts/claude-save-to-library.js <html-file> <metadata-json>

Example:
  node scripts/claude-save-to-library.js public/preview-worksheet.html '{"title":"Counting","year_group":"reception","topic":"number-counting","subtopic":"counting-to-10"}'
    `)
    process.exit(0)
  }

  const htmlFile = args[0]
  const metadata = JSON.parse(args[1] || '{}')

  saveFromFile(htmlFile, metadata)
    .then(() => process.exit(0))
    .catch(() => process.exit(1))
}
