/**
 * Regenerate thumbnails for Year 5 de-duplicated worksheets
 * These worksheets had their content updated but thumbnails still show old content
 */

require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')
const puppeteer = require('puppeteer-core')
const sharp = require('sharp')

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

// Worksheets that need thumbnail regeneration (de-duplicated content)
const WORKSHEETS_TO_REGENERATE = [
  'y5-add-fractions-p1',
  'y5-add-fractions-p2',
  'y5-add-fractions-p3',
  'y5-mult-4x2-p1',
  'y5-mult-4x2-p2',
  'y5-mult-4x2-p3',
  'y5-mult-4x2-p4',
  'y5-short-div-p3'
]

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
 * Convert image path to data URI for thumbnail generation
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
      .resize(1200, 1500, { fit: 'cover', position: 'top' })
      .webp({ quality: 80 })
      .toBuffer()

    console.log(`✅ Image optimized: ${(optimizedBuffer.length / 1024).toFixed(1)} KB`)

    console.log('☁️ Uploading to ImageKit...')
    const timestamp = Date.now()
    const thumbnailUrl = await uploadToImageKit(optimizedBuffer, {
      fileName: `${slug}-${timestamp}-thumb.webp`,
      folder: '/worksheets/thumbnails',
      tags: ['worksheet', 'thumbnail', 'year5', 'regenerated'],
    })

    console.log('✅ Thumbnail uploaded:', thumbnailUrl)
    return thumbnailUrl

  } catch (error) {
    console.error('❌ Thumbnail generation failed:', error)
    if (browser) await browser.close()
    throw error
  }
}

/**
 * Regenerate thumbnail for a single worksheet
 */
async function regenerateThumbnail(slug) {
  console.log(`\n${'='.repeat(60)}`)
  console.log(`🔄 Processing: ${slug}`)
  console.log('='.repeat(60))

  // Fetch worksheet from database
  const { data: worksheet, error: fetchError } = await supabase
    .from('library_worksheets')
    .select('id, slug, title, html_content, thumbnail_url')
    .eq('slug', slug)
    .single()

  if (fetchError || !worksheet) {
    console.error(`❌ Worksheet not found: ${slug}`, fetchError)
    return { slug, success: false, error: 'Not found' }
  }

  console.log(`📋 Found: ${worksheet.title}`)
  console.log(`📋 Old thumbnail: ${worksheet.thumbnail_url?.split('/').pop() || 'N/A'}`)

  try {
    // Generate new thumbnail
    const newThumbnailUrl = await generateThumbnail(worksheet.html_content, slug)

    // Update database with new thumbnail URL
    const { error: updateError } = await supabase
      .from('library_worksheets')
      .update({
        thumbnail_url: newThumbnailUrl,
        updated_at: new Date().toISOString()
      })
      .eq('id', worksheet.id)

    if (updateError) {
      console.error(`❌ Failed to update database: ${slug}`, updateError)
      return { slug, success: false, error: 'Database update failed' }
    }

    console.log(`✅ SUCCESS: ${slug}`)
    console.log(`📋 New thumbnail: ${newThumbnailUrl.split('/').pop()}`)

    return {
      slug,
      success: true,
      oldThumbnail: worksheet.thumbnail_url,
      newThumbnail: newThumbnailUrl
    }

  } catch (error) {
    console.error(`❌ Failed: ${slug}`, error.message)
    return { slug, success: false, error: error.message }
  }
}

/**
 * Main function - regenerate all thumbnails
 */
async function main() {
  console.log('\n' + '='.repeat(60))
  console.log('🖼️  Year 5 Thumbnail Regeneration Script')
  console.log('='.repeat(60))
  console.log(`\nWorksheets to regenerate: ${WORKSHEETS_TO_REGENERATE.length}`)
  WORKSHEETS_TO_REGENERATE.forEach(s => console.log(`  - ${s}`))

  const results = []

  for (const slug of WORKSHEETS_TO_REGENERATE) {
    const result = await regenerateThumbnail(slug)
    results.push(result)

    // Small delay between operations to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  // Summary
  console.log('\n' + '='.repeat(60))
  console.log('📊 SUMMARY')
  console.log('='.repeat(60))

  const successful = results.filter(r => r.success)
  const failed = results.filter(r => !r.success)

  console.log(`\n✅ Successful: ${successful.length}/${results.length}`)
  successful.forEach(r => console.log(`   - ${r.slug}`))

  if (failed.length > 0) {
    console.log(`\n❌ Failed: ${failed.length}/${results.length}`)
    failed.forEach(r => console.log(`   - ${r.slug}: ${r.error}`))
  }

  console.log('\n' + '='.repeat(60))
  console.log('✨ Done! Refresh library page to see new thumbnails.')
  console.log('='.repeat(60) + '\n')
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
