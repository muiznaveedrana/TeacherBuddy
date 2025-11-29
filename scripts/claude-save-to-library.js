/**
 * Claude Desktop Save-to-Library Script
 * 
 * Usage: node scripts/claude-save-to-library.js
 * 
 * This script allows Claude Desktop to save generated worksheets
 * directly to Supabase library, with thumbnail generation and
 * full SEO/educational content matching the web UI flow.
 * 
 * UPDATED: Now matches /api/library/save route logic
 */

require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')
const puppeteer = require('puppeteer-core')
const sharp = require('sharp')
const { GoogleGenerativeAI } = require('@google/generative-ai')

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

// Gemini AI setup for educational content
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

// US Grade level mapping
const yearGroupToUSGrade = {
  'Reception': 'Kindergarten',
  'reception': 'Kindergarten',
  'Year 1': 'Grade 1',
  'Year 2': 'Grade 2',
  'Year 3': 'Grade 3',
  'Year 4': 'Grade 4',
  'Year 5': 'Grade 5',
  'Year 6': 'Grade 6',
}

// Age range mapping
const yearGroupToAge = {
  'Reception': '4-5',
  'reception': '4-5',
  'Year 1': '5-6',
  'Year 2': '6-7',
  'Year 3': '7-8',
  'Year 4': '8-9',
  'Year 5': '9-10',
  'Year 6': '10-11',
}

/**
 * Format string to Title Case
 */
function formatLabel(str) {
  return str
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

/**
 * Normalize year group to proper format
 */
function normalizeYearGroup(yg) {
  if (yg.toLowerCase() === 'reception') return 'Reception'
  const match = yg.match(/year\s*(\d)/i)
  if (match) return `Year ${match[1]}`
  return yg
}

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
 * Generate educational content using Gemini AI (matches educationalContentService.ts)
 */
async function generateEducationalContent(metadata) {
  const { year_group, topic, subtopic, difficulty, question_count, visual_theme, seasonal_theme } = metadata
  
  try {
    console.log('📚 Generating educational content with Gemini...')
    
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash-exp',
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 2000,
      }
    })

    const prompt = `You are an educational content writer specializing in UK primary school mathematics.

Generate comprehensive educational content for a worksheet with these details:

📚 Worksheet Details:
- Year Group: ${year_group}
- Topic: ${topic}
- Subtopic: ${subtopic}
- Difficulty: ${difficulty || 'average'}
- Number of Questions: ${question_count || 5}
${visual_theme ? `- Visual Theme: ${visual_theme}` : ''}
${seasonal_theme ? `- Seasonal Theme: ${seasonal_theme}` : ''}

Generate the following content in valid JSON format:

{
  "learning_objectives": [
    "Specific learning objective 1 (start with action verb)",
    "Specific learning objective 2",
    "Specific learning objective 3"
  ],
  "how_to_use": "2-3 paragraph teacher guidance on how to effectively use this worksheet.",
  "educational_benefits": "200-300 word rich description of the educational value.",
  "skills_developed": [
    "Core mathematical skill 1",
    "Core mathematical skill 2",
    "Transferable skill 1",
    "Transferable skill 2"
  ],
  "estimated_time_minutes": 15,
  "curriculum_standards": [
    "Age-appropriate learning objective 1",
    "Age-appropriate learning objective 2"
  ],
  "faq": [
    {"question": "What age is this worksheet suitable for?", "answer": "Answer for ${year_group}"},
    {"question": "What skills does this worksheet help develop?", "answer": "Brief overview"},
    {"question": "How long does this worksheet take to complete?", "answer": "Estimated time"},
    {"question": "Can I customize this worksheet?", "answer": "Yes, you can generate similar worksheets with different themes and difficulty levels."}
  ]
}

IMPORTANT: Respond ONLY with valid JSON, no markdown code blocks.`

    const result = await model.generateContent(prompt)
    const response = result.response.text()

    const jsonMatch = response.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('No valid JSON found in AI response')
    }

    const content = JSON.parse(jsonMatch[0])
    
    // Ensure estimated_time is a valid integer
    let estimatedTime = 15
    if (content.estimated_time_minutes) {
      const timeValue = typeof content.estimated_time_minutes === 'number'
        ? content.estimated_time_minutes
        : parseInt(String(content.estimated_time_minutes).split('-')[0])
      if (!isNaN(timeValue) && timeValue > 0) {
        estimatedTime = timeValue
      }
    }

    console.log('✅ Educational content generated')
    
    return {
      learning_objectives: content.learning_objectives || [],
      how_to_use: content.how_to_use || '',
      educational_benefits: content.educational_benefits || '',
      skills_developed: content.skills_developed || [],
      estimated_time_minutes: estimatedTime,
      curriculum_standards: content.curriculum_standards || [],
      faq: content.faq || [],
    }

  } catch (error) {
    console.warn('⚠️ AI content generation failed, using defaults:', error.message)
    return generateDefaultEducationalContent(metadata)
  }
}

/**
 * Generate default educational content (fallback)
 */
function generateDefaultEducationalContent(metadata) {
  const { year_group, topic, subtopic, difficulty, question_count } = metadata
  const formattedTopic = formatLabel(topic)
  const formattedSubtopic = formatLabel(subtopic)
  
  const baseTime = 3
  const count = question_count || 5
  const difficultyMultiplier = difficulty === 'hard' ? 1.5 : difficulty === 'easy' ? 0.8 : 1
  const estimatedTime = Math.round(count * baseTime * difficultyMultiplier)

  return {
    learning_objectives: [
      `Understand key concepts in ${formattedSubtopic}`,
      `Practice ${formattedTopic} skills at ${year_group} level`,
      `Build confidence in mathematical problem-solving`
    ],
    how_to_use: `This ${year_group} worksheet is ideal for ${formattedTopic} practice, focusing on ${formattedSubtopic}. Use it as independent practice after introducing the concept, for homework reinforcement, or as a formative assessment tool.

For differentiation, encourage struggling students to use concrete materials or draw pictures. Challenge higher-attaining students to explain their reasoning or create similar questions.`,
    educational_benefits: `This ${year_group} ${formattedTopic} worksheet provides essential practice in ${formattedSubtopic}. Designed specifically for ${year_group} students, this worksheet helps build strong foundations in mathematical understanding through carefully structured questions.

The worksheet develops core mathematical skills while also building transferable skills such as problem-solving, logical thinking, and attention to detail. Regular practice helps students build confidence and prepare for more advanced concepts.`,
    skills_developed: [
      `${formattedTopic} understanding`,
      'Problem-solving',
      'Logical thinking',
      'Mathematical reasoning'
    ],
    estimated_time_minutes: estimatedTime,
    curriculum_standards: [`${year_group} Mathematics - ${formattedTopic}`],
    faq: [
      {
        question: `What age is this worksheet suitable for?`,
        answer: `This worksheet is designed for ${year_group} students (ages ${yearGroupToAge[year_group] || '5-11'}).`
      },
      {
        question: 'What skills does this worksheet help develop?',
        answer: `This worksheet develops ${formattedSubtopic} skills along with problem-solving abilities.`
      },
      {
        question: 'How long does this worksheet take?',
        answer: `Most students complete this in approximately ${estimatedTime} minutes.`
      },
      {
        question: 'Can I customize this worksheet?',
        answer: 'Yes! Generate similar worksheets with different themes and difficulty levels using our AI worksheet generator.'
      }
    ]
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
  if (layoutType && layoutType !== 'standard' && layoutType !== 'default') {
    slug = `${slug}-${layoutType.toLowerCase().replace(/\s+/g, '-')}-layout`
  }

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
 * Generate SEO metadata (matches metadataGenerator.ts)
 */
function generateSEOMetadata(metadata) {
  const { year_group, topic, subtopic, difficulty, question_count, visual_theme, layout_type } = metadata
  
  const normalizedYearGroup = normalizeYearGroup(year_group)
  const usGrade = yearGroupToUSGrade[normalizedYearGroup] || yearGroupToUSGrade[year_group] || 'Elementary'
  const formattedTopic = formatLabel(topic)
  const formattedSubtopic = formatLabel(subtopic)
  
  // Title: "Topic - Subtopic"
  const title = `${formattedTopic} - ${formattedSubtopic}`
  
  // SEO Title (max 60 chars)
  let seoTitle = `Free ${normalizedYearGroup} ${formattedSubtopic} Worksheet | Math Printables`
  if (seoTitle.length > 60) seoTitle = seoTitle.substring(0, 57) + '...'
  
  // SEO Description (max 160 chars)
  const difficultyText = difficulty ? ` (${difficulty} level)` : ''
  const questionText = question_count ? ` with ${question_count} questions` : ''
  let seoDescription = `Download free ${normalizedYearGroup} (${usGrade}) ${formattedSubtopic} worksheet${difficultyText}${questionText}. Print-ready PDF for classroom or homeschool.`
  if (seoDescription.length > 160) seoDescription = seoDescription.substring(0, 157) + '...'
  
  // SEO Keywords
  const seoKeywords = [
    normalizedYearGroup.toLowerCase(),
    usGrade.toLowerCase(),
    topic.toLowerCase(),
    subtopic.toLowerCase(),
    'worksheet',
    'free',
    'printable',
    'math worksheet',
    'educational',
    'homeschool',
    'classroom',
  ]
  if (visual_theme) seoKeywords.push(visual_theme.toLowerCase())
  
  // Tags
  const tags = [
    normalizedYearGroup.toLowerCase().replace(/\s+/g, '-'),
    usGrade.toLowerCase().replace(/\s+/g, '-'),
    topic.toLowerCase().replace(/\s+/g, '-'),
    subtopic.toLowerCase().replace(/\s+/g, '-'),
    'free',
    'printable',
  ]
  if (visual_theme) tags.push(visual_theme.toLowerCase().replace(/\s+/g, '-'))
  if (layout_type && layout_type !== 'standard') tags.push(layout_type.toLowerCase())
  
  return {
    title,
    seo_title: seoTitle,
    seo_description: seoDescription,
    seo_keywords: [...new Set(seoKeywords)],
    tags: [...new Set(tags)],
  }
}


/**
 * Save worksheet to library with FULL SEO and educational content
 * (Matches /api/library/save route.ts logic)
 */
async function saveToLibrary(worksheetData) {
  const {
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
    status = 'published',
  } = worksheetData

  const normalizedYearGroup = normalizeYearGroup(year_group)
  
  // Generate SEO metadata
  console.log('📝 Generating SEO metadata...')
  const seoData = generateSEOMetadata({
    year_group: normalizedYearGroup,
    topic,
    subtopic,
    difficulty,
    question_count,
    visual_theme,
    layout_type,
  })
  
  // Generate unique slug
  const slug = await generateUniqueSlug(seoData.title, visual_theme, activity_type, seasonal_theme, layout_type)
  console.log('🔗 Generated slug:', slug)

  // Generate thumbnail
  const thumbnail_url = await generateThumbnail(html_content, slug)

  // Generate educational content (AI-powered)
  console.log('📚 Generating educational content...')
  const educationalContent = await generateEducationalContent({
    year_group: normalizedYearGroup,
    topic,
    subtopic,
    difficulty,
    question_count,
    visual_theme,
    seasonal_theme,
  })

  // Build complete database record
  const record = {
    title: seoData.title,
    slug,
    html_content,
    region: worksheetData.region || 'UK',  // Default UK, but can be overridden for region-specific content (e.g., US coins)
    year_group: normalizedYearGroup,
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
    // SEO fields
    seo_title: seoData.seo_title,
    seo_description: seoData.seo_description,
    seo_keywords: seoData.seo_keywords,
    tags: seoData.tags,
    // Educational content fields
    learning_objectives: educationalContent.learning_objectives,
    how_to_use: educationalContent.how_to_use,
    educational_benefits: educationalContent.educational_benefits,
    skills_developed: educationalContent.skills_developed,
    estimated_time_minutes: educationalContent.estimated_time_minutes,
    curriculum_standards: educationalContent.curriculum_standards,
    faq: educationalContent.faq,
    // Status
    status,
  }

  console.log('💾 Saving to database...')
  const { data, error } = await supabase
    .from('library_worksheets')
    .insert(record)
    .select()
    .single()

  if (error) {
    console.error('❌ Failed to save worksheet:', error)
    throw error
  }

  console.log('✅ Worksheet saved to library!')
  console.log('   ID:', data.id)
  console.log('   Slug:', data.slug)
  console.log('   Title:', data.title)
  console.log('   Thumbnail:', data.thumbnail_url)
  console.log('   SEO Title:', data.seo_title)
  console.log('   Status:', data.status)
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

module.exports = { saveToLibrary, saveFromFile, generateUniqueSlug, generateThumbnail, generateEducationalContent }


// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2)

  if (args.length === 0) {
    console.log(`
Claude Desktop Save-to-Library Script (Full SEO + Educational Content)
=======================================================================

Usage:
  node scripts/claude-save-to-library.js <html-file> '<metadata-json>'

Required metadata fields:
  - year_group: "Reception" | "Year 1" | "Year 2" | etc.
  - topic: e.g., "number-counting"
  - subtopic: e.g., "counting-to-10"

Optional metadata fields:
  - difficulty: "easy" | "average" | "hard" (default: "average")
  - question_count: number (default: 5)
  - layout_type: "standard" | "fluency" | etc. (default: "standard")
  - visual_theme: e.g., "animals", "food"
  - activity_type: e.g., "counting", "matching"
  - seasonal_theme: e.g., "christmas", "halloween"

Example:
  node scripts/claude-save-to-library.js public/preview-worksheet-1.html '{"year_group":"Reception","topic":"number-counting","subtopic":"counting-to-10","difficulty":"average","question_count":5}'
    `)
    process.exit(0)
  }

  const htmlFile = args[0]
  const metadata = JSON.parse(args[1] || '{}')

  if (!metadata.year_group || !metadata.topic || !metadata.subtopic) {
    console.error('❌ Missing required metadata: year_group, topic, subtopic')
    process.exit(1)
  }

  saveFromFile(htmlFile, metadata)
    .then(() => {
      console.log('✅ Done!')
      process.exit(0)
    })
    .catch((err) => {
      console.error('❌ Error:', err)
      process.exit(1)
    })
}
