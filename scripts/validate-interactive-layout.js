/**
 * Interactive Layout Validation Script
 *
 * Phase 0h Part B: Validates that interactive mode renders inputs IN-PLACE
 * (where yellow answer boxes are), not appended at the end of questions.
 *
 * Usage:
 *   node scripts/validate-interactive-layout.js <html-file> <year_group> <topic> <subtopic>
 *
 * Example:
 *   node scripts/validate-interactive-layout.js public/preview-worksheet-test.html "Year 2" number-place-value rounding-nearest-10
 *
 * What it does:
 *   1. Saves worksheet temporarily to library (with -test suffix)
 *   2. Opens static preview and takes screenshot
 *   3. Opens interactive mode and analyzes input placement
 *   4. Takes interactive screenshot
 *   5. Generates validation report
 *   6. Cleans up (deletes temp worksheet from database)
 *
 * Exit codes:
 *   0 = PASS (inputs are in-place)
 *   1 = FAIL (inputs at end or other issues)
 */

require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')
const { chromium } = require('playwright')
const fs = require('fs')
const path = require('path')

// Initialize Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
})

// Configuration
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'
const SCREENSHOTS_DIR = path.join(process.cwd(), 'public')

// Parse command line arguments
const args = process.argv.slice(2)
if (args.length < 4) {
  console.log(`
╔════════════════════════════════════════════════════════════════════╗
║  INTERACTIVE LAYOUT VALIDATION SCRIPT                              ║
║  Phase 0h Part B: Validates inputs appear IN-PLACE                 ║
╚════════════════════════════════════════════════════════════════════╝

Usage:
  node scripts/validate-interactive-layout.js <html-file> <year_group> <topic> <subtopic>

Example:
  node scripts/validate-interactive-layout.js public/preview-worksheet-test.html "Year 2" number-place-value rounding-nearest-10

Arguments:
  html-file   Path to the worksheet HTML file
  year_group  Year group (Reception, Year 1, Year 2, etc.)
  topic       Topic ID (e.g., number-place-value)
  subtopic    Subtopic ID (e.g., rounding-nearest-10)
`)
  process.exit(1)
}

const [htmlFile, yearGroup, topic, subtopic] = args
const testSlug = `${topic}-${subtopic}-test`

/**
 * Main validation function
 */
async function validateInteractiveLayout() {
  console.log(`
╔════════════════════════════════════════════════════════════════════╗
║  PHASE 0h PART B: INTERACTIVE LAYOUT VALIDATION                    ║
╚════════════════════════════════════════════════════════════════════╝
`)

  let browser
  let savedWorksheetId = null
  const results = {
    passed: false,
    staticScreenshot: null,
    interactiveScreenshot: null,
    inputAnalysis: null,
    errors: []
  }

  try {
    // Step 1: Read and validate HTML file
    console.log('📄 Step 1: Reading worksheet HTML...')
    if (!fs.existsSync(htmlFile)) {
      throw new Error(`File not found: ${htmlFile}`)
    }
    const htmlContent = fs.readFileSync(htmlFile, 'utf-8')
    console.log(`   ✅ Read ${htmlContent.length} characters`)

    // Count answer boxes in static HTML
    const answerBoxCount = (htmlContent.match(/class="[^"]*answer-box[^"]*"/g) || []).length
    console.log(`   📦 Found ${answerBoxCount} answer-box elements in static HTML`)

    // Step 2: Save temporarily to library
    console.log('\n📥 Step 2: Saving worksheet temporarily to library...')
    const savedWorksheet = await saveTemporaryWorksheet(htmlContent, yearGroup, topic, subtopic)
    savedWorksheetId = savedWorksheet.id
    console.log(`   ✅ Saved with slug: ${savedWorksheet.slug}`)
    console.log(`   📍 ID: ${savedWorksheetId}`)

    // Step 3: Launch browser
    console.log('\n🌐 Step 3: Launching browser...')
    browser = await chromium.launch({ headless: true })
    const context = await browser.newContext({
      viewport: { width: 1280, height: 1024 }
    })
    const page = await context.newPage()

    // Step 4: Take static preview screenshot
    console.log('\n📸 Step 4: Taking static preview screenshot...')
    const staticUrl = `${BASE_URL}/library/${savedWorksheet.slug}`
    await page.goto(staticUrl, { waitUntil: 'networkidle' })
    await page.waitForTimeout(1000) // Wait for images to load

    const staticScreenshotPath = path.join(SCREENSHOTS_DIR, `preview-screenshot-test-STATIC.png`)
    await page.screenshot({ path: staticScreenshotPath, fullPage: true })
    results.staticScreenshot = staticScreenshotPath
    console.log(`   ✅ Saved: ${staticScreenshotPath}`)

    // Step 5: Navigate to interactive mode and analyze
    console.log('\n🔍 Step 5: Opening interactive mode and analyzing layout...')
    const interactiveUrl = `${BASE_URL}/library/${savedWorksheet.slug}/interactive`
    await page.goto(interactiveUrl, { waitUntil: 'networkidle' })
    await page.waitForTimeout(2000) // Wait for React to render

    // Analyze input placement with detailed logging
    const analysisResult = await page.evaluate(() => {
      const analysis = {
        totalQuestions: 0,
        questionsWithInPlaceInputs: 0,
        questionsWithInputsAtEnd: 0,
        details: [],
        debugInfo: []
      }

      // Find all question containers - try multiple selectors
      let questions = document.querySelectorAll('.question-interactive')
      if (questions.length === 0) {
        questions = document.querySelectorAll('[class*="question"]')
      }
      if (questions.length === 0) {
        // Fallback: look for divs containing inputs
        const allInputs = document.querySelectorAll('input[type="text"]')
        const questionSet = new Set()
        allInputs.forEach(input => {
          const container = input.closest('.mb-6, .p-4, [class*="rounded"]')
          if (container) questionSet.add(container)
        })
        questions = Array.from(questionSet)
      }

      analysis.totalQuestions = questions.length
      analysis.debugInfo.push(`Found ${questions.length} question containers`)

      questions.forEach((q, idx) => {
        const questionNum = idx + 1
        const inputs = q.querySelectorAll('input[type="text"]')
        const inputCount = inputs.length

        const questionDebug = {
          question: questionNum,
          inputCount,
          inputDetails: []
        }

        if (inputCount === 0) {
          analysis.details.push({
            question: questionNum,
            status: 'NO_INPUTS',
            message: 'No input fields found'
          })
          return
        }

        let inputsAtEnd = 0
        let inputsInPlace = 0

        inputs.forEach((input, inputIdx) => {
          const inputDebug = { index: inputIdx }

          // Get computed styles
          const inputStyle = window.getComputedStyle(input)
          const bgColor = inputStyle.backgroundColor
          inputDebug.bgColor = bgColor

          // Check for yellow/cream background (answer-box style)
          const isYellowBg = bgColor.includes('255, 249, 196') ||  // rgb(255, 249, 196)
                             bgColor.includes('255, 255, 255') === false && bgColor.includes('255') // cream tones

          // Check container styling
          const container = input.closest('span, div')
          const containerStyle = container ? window.getComputedStyle(container) : null
          inputDebug.containerDisplay = containerStyle?.display

          // Check if input is inline (display: inline-block or inline)
          const isInline = inputStyle.display === 'inline-block' ||
                          inputStyle.display === 'inline' ||
                          containerStyle?.display === 'inline-block' ||
                          containerStyle?.display === 'inline'
          inputDebug.isInline = isInline

          // Check if there's text content AFTER the input (suggests inline placement)
          const nextSibling = input.nextSibling || container?.nextSibling
          const hasContentAfter = nextSibling && (nextSibling.textContent?.trim().length > 0 || nextSibling.tagName)
          inputDebug.hasContentAfter = hasContentAfter

          // Check if input is in a standalone wrapper at the bottom
          const parent = input.parentElement
          const isInStandaloneWrapper = parent?.children.length === 1 &&
                                        parent?.tagName === 'DIV' &&
                                        parent?.className === ''
          inputDebug.isInStandaloneWrapper = isInStandaloneWrapper

          // Check for marginTop on parent (indicator of "appended at end")
          const parentMarginTop = containerStyle ? parseInt(containerStyle.marginTop) : 0
          inputDebug.parentMarginTop = parentMarginTop

          // Determine placement
          // PRIMARY INDICATOR: Yellow background (#FFF9C4) = answer-box style preserved
          // This is the KEY indicator - if input has yellow bg, it was properly converted

          // Secondary IN-PLACE indicators:
          // - Is inline display
          // - Has content after it

          // AT-END indicators (only if no yellow bg):
          // - Is in a standalone wrapper div
          // - Parent has large marginTop (> 10px)
          // - No content after it and not inline

          // Yellow background is the PRIMARY indicator (worth 5 points)
          const inPlaceScore = (isYellowBg ? 5 : 0) +
                              (isInline ? 1 : 0) +
                              (hasContentAfter ? 1 : 0)
          const atEndScore = isYellowBg ? 0 : // Yellow bg = definitely in-place
                            ((isInStandaloneWrapper ? 2 : 0) +
                            (parentMarginTop > 10 ? 1 : 0) +
                            (!isInline && !hasContentAfter ? 1 : 0))

          inputDebug.inPlaceScore = inPlaceScore
          inputDebug.atEndScore = atEndScore

          if (inPlaceScore >= atEndScore) {
            inputsInPlace++
            inputDebug.verdict = 'IN_PLACE'
          } else {
            inputsAtEnd++
            inputDebug.verdict = 'AT_END'
          }

          questionDebug.inputDetails.push(inputDebug)
        })

        analysis.debugInfo.push(questionDebug)

        // A question passes if majority of inputs are in-place
        if (inputsInPlace >= inputsAtEnd) {
          analysis.questionsWithInPlaceInputs++
          analysis.details.push({
            question: questionNum,
            status: 'IN_PLACE',
            message: `${inputsInPlace}/${inputCount} inputs are in-place`,
            inputsInPlace,
            inputsAtEnd
          })
        } else {
          analysis.questionsWithInputsAtEnd++
          analysis.details.push({
            question: questionNum,
            status: 'INPUTS_AT_END',
            message: `${inputsAtEnd}/${inputCount} inputs appear to be at end of question`,
            inputsInPlace,
            inputsAtEnd
          })
        }
      })

      return analysis
    })

    results.inputAnalysis = analysisResult

    // Check browser console for parser warnings
    const consoleMessages = []
    page.on('console', msg => {
      if (msg.text().includes('No pattern matched') || msg.text().includes('NO placeholders')) {
        consoleMessages.push(msg.text())
      }
    })

    // Step 6: Take interactive screenshot
    console.log('\n📸 Step 6: Taking interactive mode screenshot...')
    const interactiveScreenshotPath = path.join(SCREENSHOTS_DIR, `preview-screenshot-test-INTERACTIVE.png`)
    await page.screenshot({ path: interactiveScreenshotPath, fullPage: true })
    results.interactiveScreenshot = interactiveScreenshotPath
    console.log(`   ✅ Saved: ${interactiveScreenshotPath}`)

    // Step 7: Generate report
    console.log('\n📊 Step 7: Generating validation report...')

    const passRate = analysisResult.totalQuestions > 0
      ? (analysisResult.questionsWithInPlaceInputs / analysisResult.totalQuestions) * 100
      : 0

    results.passed = passRate >= 80 && analysisResult.questionsWithInputsAtEnd === 0

    console.log(`
┌─────────────────────────────────────────────────────────────────────┐
│ VALIDATION RESULTS                                                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Total Questions:        ${String(analysisResult.totalQuestions).padEnd(40)}│
│  Inputs IN-PLACE:        ${String(analysisResult.questionsWithInPlaceInputs).padEnd(40)}│
│  Inputs AT END:          ${String(analysisResult.questionsWithInputsAtEnd).padEnd(40)}│
│  Pass Rate:              ${String(passRate.toFixed(1) + '%').padEnd(40)}│
│                                                                     │
│  Overall Result:         ${results.passed ? '✅ PASS'.padEnd(40) : '❌ FAIL'.padEnd(40)}│
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
`)

    // Count inputs with yellow background (key metric)
    let totalInputs = 0
    let yellowBgInputs = 0
    analysisResult.debugInfo.forEach(info => {
      if (info.inputDetails) {
        info.inputDetails.forEach(detail => {
          totalInputs++
          if (detail.bgColor?.includes('255, 249, 196')) {
            yellowBgInputs++
          }
        })
      }
    })

    // Print detailed results
    console.log('Question-by-Question Analysis:')
    analysisResult.details.forEach(d => {
      const icon = d.status === 'IN_PLACE' ? '✅' : d.status === 'INPUTS_AT_END' ? '❌' : '⚠️'
      console.log(`  Q${d.question}: ${icon} ${d.message}`)
    })

    console.log(`
📌 KEY METRIC: Inputs with Yellow Background (#FFF9C4)
   ${yellowBgInputs}/${totalInputs} inputs have answer-box styling preserved
   ${yellowBgInputs === totalInputs ? '✅ All inputs styled correctly!' : '⚠️  Some inputs missing answer-box styling'}
`)

    // Print debug info if verbose or if failed
    if (!results.passed || process.env.VERBOSE) {
      console.log('\n📋 Debug Information:')
      analysisResult.debugInfo.forEach(info => {
        if (typeof info === 'string') {
          console.log(`  ${info}`)
        } else {
          console.log(`\n  Question ${info.question} (${info.inputCount} inputs):`)
          info.inputDetails?.forEach(detail => {
            console.log(`    Input ${detail.index + 1}:`)
            console.log(`      - Background: ${detail.bgColor}`)
            console.log(`      - Container display: ${detail.containerDisplay}`)
            console.log(`      - Is inline: ${detail.isInline}`)
            console.log(`      - Has content after: ${detail.hasContentAfter}`)
            console.log(`      - In standalone wrapper: ${detail.isInStandaloneWrapper}`)
            console.log(`      - Parent marginTop: ${detail.parentMarginTop}px`)
            console.log(`      - Scores: in-place=${detail.inPlaceScore}, at-end=${detail.atEndScore}`)
            console.log(`      - Verdict: ${detail.verdict}`)
          })
        }
      })
    }

    if (!results.passed) {
      console.log(`
╔════════════════════════════════════════════════════════════════════╗
║  ❌ VALIDATION FAILED                                               ║
╠════════════════════════════════════════════════════════════════════╣
║                                                                    ║
║  Some inputs are rendered at the END of questions instead of      ║
║  IN-PLACE where the yellow answer boxes are.                       ║
║                                                                    ║
║  NEXT STEPS:                                                       ║
║  1. Check browser console for parser warnings                      ║
║  2. Ensure answer-box elements use exact CSS classes:              ║
║     <span class="answer-box"></span>                               ║
║  3. Avoid nesting answer-box in complex structures                 ║
║  4. Update prompt and regenerate worksheet                         ║
║  5. Re-run this validation                                         ║
║                                                                    ║
╚════════════════════════════════════════════════════════════════════╝
`)
    } else {
      console.log(`
╔════════════════════════════════════════════════════════════════════╗
║  ✅ VALIDATION PASSED                                               ║
╠════════════════════════════════════════════════════════════════════╣
║                                                                    ║
║  All inputs are rendered IN-PLACE where yellow boxes appear.       ║
║  Interactive mode layout matches static preview.                   ║
║                                                                    ║
║  You can now proceed to Phase 0i: Deploy validated prompt          ║
║                                                                    ║
╚════════════════════════════════════════════════════════════════════╝
`)
    }

    // Print screenshot locations
    console.log(`
Screenshots saved:
  Static:      ${results.staticScreenshot}
  Interactive: ${results.interactiveScreenshot}

Compare these side-by-side to visually verify layout consistency.
`)

  } catch (error) {
    results.errors.push(error.message)
    console.error('\n❌ Validation error:', error.message)
  } finally {
    // Step 8: Cleanup
    console.log('\n🧹 Step 8: Cleaning up...')

    if (browser) {
      await browser.close()
      console.log('   ✅ Browser closed')
    }

    if (savedWorksheetId) {
      try {
        const { error } = await supabase
          .from('library_worksheets')
          .delete()
          .eq('id', savedWorksheetId)

        if (error) {
          console.log(`   ⚠️ Could not delete temp worksheet: ${error.message}`)
        } else {
          console.log(`   ✅ Deleted temp worksheet (ID: ${savedWorksheetId})`)
        }
      } catch (err) {
        console.log(`   ⚠️ Cleanup error: ${err.message}`)
      }
    }
  }

  // Exit with appropriate code
  process.exit(results.passed ? 0 : 1)
}

/**
 * Save worksheet temporarily to library for testing
 */
async function saveTemporaryWorksheet(htmlContent, yearGroup, topic, subtopic) {
  const testSlug = `${topic}-${subtopic}-test-${Date.now()}`

  const worksheetData = {
    slug: testSlug,
    title: `[TEST] ${subtopic} Validation`,
    year_group: yearGroup,
    topic: topic,
    subtopic: subtopic,
    difficulty: 'average',
    question_count: 5,
    html_content: htmlContent,
    status: 'published', // Must be published to be accessible via library routes
    region: 'UK',
    layout_type: 'standard',
    seo_title: `Test - ${subtopic}`,
    seo_description: 'Temporary worksheet for validation',
    seo_keywords: ['test'],
    thumbnail_url: 'https://ik.imagekit.io/starworksheets/placeholder.png',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }

  const { data, error } = await supabase
    .from('library_worksheets')
    .insert(worksheetData)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to save temporary worksheet: ${error.message}`)
  }

  return data
}

// Run validation
validateInteractiveLayout().catch(console.error)
