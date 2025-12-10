#!/usr/bin/env node
/**
 * Extract answers from worksheet HTML for interactive mode testing
 * 
 * Usage:
 *   node scripts/extract-answers.js <html-file-or-slug>
 *   node scripts/extract-answers.js public/preview-worksheet-rounding-1.html
 *   node scripts/extract-answers.js number-place-value-rounding-nearest-10
 * 
 * Output:
 *   - Prints extracted answers in test-ready format
 *   - Shows answer key parsing details
 */

const fs = require('fs')
const path = require('path')

const BASE_URL = 'http://localhost:3000'

/**
 * Parse answer key from worksheet HTML
 * Returns both structured answers and flat array for tests
 */
function parseAnswerKey(htmlContent) {
  const answersByQuestion = {}
  const rawAnswers = {}
  const flatAnswers = []
  const buttonAnswers = []

  if (!htmlContent) {
    return { answersByQuestion, rawAnswers, flatAnswers, buttonAnswers }
  }

  // Find answer key section
  const answerKeyMatch = htmlContent.match(
    /<div[^>]*class="[^"]*answer-key[^"]*"[^>]*>([\s\S]*?)<\/div>\s*(?:<\/body>|$)/i
  )
  
  if (!answerKeyMatch) {
    console.error('❌ No answer key found in HTML')
    return { answersByQuestion, rawAnswers, flatAnswers, buttonAnswers }
  }

  const answerKeyHtml = answerKeyMatch[1]
  
  // Match Q1:, 1., 1:, <strong>1.</strong>, etc.
  const questionPattern = /<p[^>]*>(?:<strong>)?Q?(\d+)[.:]?(?:<\/strong>)?\s*([\s\S]*?)<\/p>/gi
  let match

  while ((match = questionPattern.exec(answerKeyHtml)) !== null) {
    const qNum = parseInt(match[1])
    let answerText = match[2].trim()
      .replace(/&nbsp;/g, ' ')
      .replace(/&gt;/g, '>')
      .replace(/&lt;/g, '<')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()

    rawAnswers[qNum] = answerText

    // Parse multi-part answers (a) X  b) Y)
    const parts = []
    const hasLabeledParts = /[a-f]\)/.test(answerText)

    if (hasLabeledParts) {
      // Extract labeled parts
      const partPattern = /([a-f])\)\s*(.*?)(?=\s+[a-f]\)|$)/gi
      let partMatch
      while ((partMatch = partPattern.exec(answerText)) !== null) {
        let value = partMatch[2].trim()
        // Remove explanations in parentheses
        value = value.replace(/\([^)]*\)/g, '').trim()
        // Remove trailing comma
        value = value.replace(/,\s*$/, '').trim()
        
        if (value) {
          // Check for Yes/No (these go to buttons)
          if (/^(yes|no)$/i.test(value)) {
            buttonAnswers.push(value)
          } else {
            parts.push(value)
          }
        }
      }
    }

    if (parts.length > 0) {
      answersByQuestion[qNum] = parts
      flatAnswers.push(...parts)
    } else {
      // Single answer - clean up
      let cleanedAnswer = answerText
        .replace(/\([^)]*\)/g, '') // Remove explanations
        .replace(/\s+/g, ' ')
        .trim()
      
      // Check for Yes/No
      if (/^(yes|no)$/i.test(cleanedAnswer)) {
        buttonAnswers.push(cleanedAnswer)
        answersByQuestion[qNum] = [cleanedAnswer]
      } else {
        // Split comma-separated answers
        const answers = cleanedAnswer.split(/,\s*/)
          .map(a => a.trim())
          .filter(a => a && !/^(e\.g\.|any|example)/i.test(a))
        
        if (answers.length > 0) {
          answersByQuestion[qNum] = answers
          flatAnswers.push(...answers)
        }
      }
    }
  }

  return { answersByQuestion, rawAnswers, flatAnswers, buttonAnswers }
}

async function extractFromSlug(slug) {
  console.log(`\n📥 Fetching worksheet: ${slug}`)
  
  try {
    const response = await fetch(`${BASE_URL}/api/library/${slug}`)
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    const data = await response.json()
    return data.html_content || data.htmlContent
  } catch (error) {
    console.error(`❌ Failed to fetch: ${error.message}`)
    console.log('   Make sure dev server is running on localhost:3000')
    return null
  }
}

function extractFromFile(filePath) {
  const fullPath = path.resolve(filePath)
  console.log(`\n📄 Reading file: ${fullPath}`)
  
  if (!fs.existsSync(fullPath)) {
    console.error(`❌ File not found: ${fullPath}`)
    return null
  }
  
  return fs.readFileSync(fullPath, 'utf-8')
}

function printResults(results, source) {
  const { answersByQuestion, rawAnswers, flatAnswers, buttonAnswers } = results
  
  console.log('\n' + '═'.repeat(60))
  console.log('📋 ANSWER EXTRACTION RESULTS')
  console.log('═'.repeat(60))
  console.log(`Source: ${source}`)
  console.log(`Questions found: ${Object.keys(answersByQuestion).length}`)
  console.log(`Total text inputs: ${flatAnswers.length}`)
  console.log(`Button answers (Yes/No): ${buttonAnswers.length}`)
  
  console.log('\n' + '─'.repeat(60))
  console.log('📝 RAW ANSWER KEY (as parsed from HTML)')
  console.log('─'.repeat(60))
  for (const [q, raw] of Object.entries(rawAnswers)) {
    console.log(`Q${q}: ${raw}`)
  }
  
  console.log('\n' + '─'.repeat(60))
  console.log('🎯 PARSED ANSWERS (per question)')
  console.log('─'.repeat(60))
  for (const [q, answers] of Object.entries(answersByQuestion)) {
    console.log(`Q${q}: ${JSON.stringify(answers)}`)
  }
  
  console.log('\n' + '─'.repeat(60))
  console.log('✅ TEST-READY FORMAT (copy-paste into test file)')
  console.log('─'.repeat(60))
  console.log(`const WORKSHEET_ANSWERS = ${JSON.stringify(flatAnswers)}`)
  if (buttonAnswers.length > 0) {
    console.log(`const YES_NO_BUTTON = "${buttonAnswers[0]}"`)
  }
  
  console.log('\n' + '─'.repeat(60))
  console.log('📄 FULL TEST FILE TEMPLATE')
  console.log('─'.repeat(60))
  
  const testTemplate = `import { test, expect } from '@playwright/test'

const WORKSHEET_SLUG = '${source.includes('/') ? 'YOUR-SLUG-HERE' : source}'
const WORKSHEET_ANSWERS = ${JSON.stringify(flatAnswers)}
${buttonAnswers.length > 0 ? `const YES_NO_BUTTON = "${buttonAnswers[0]}"` : '// No Yes/No buttons in this worksheet'}

async function dismissCookieConsent(page) {
  await page.evaluate(() => {
    document.querySelector('.cookie-consent-container')?.remove()
    document.querySelectorAll('[class*="cookie"], [class*="consent"]').forEach(el => {
      if (el.style?.position === 'fixed') el.remove()
    })
  })
}

test.describe(\`Interactive: \${WORKSHEET_SLUG}\`, () => {
  test('should complete with 100% score', async ({ page }) => {
    await page.goto(\`/library/\${WORKSHEET_SLUG}/interactive\`)
    await dismissCookieConsent(page)
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible()

    const inputs = page.locator('.interactive-worksheet-container input[type="text"]:not([disabled])')
    const inputCount = await inputs.count()
    console.log(\`Found \${inputCount} inputs, have \${WORKSHEET_ANSWERS.length} answers\`)

    for (let i = 0; i < inputCount && i < WORKSHEET_ANSWERS.length; i++) {
      const input = inputs.nth(i)
      await input.scrollIntoViewIfNeeded()
      await input.click()
      await input.pressSequentially(WORKSHEET_ANSWERS[i], { delay: 50 })
    }

    ${buttonAnswers.length > 0 ? `// Handle Yes/No button
    const yesNoBtn = page.locator(\`button:has-text("\${YES_NO_BUTTON}")\`).first()
    if (await yesNoBtn.count() > 0) {
      await yesNoBtn.click({ force: true })
    }` : '// No Yes/No buttons needed'}

    await dismissCookieConsent(page)
    const submitButton = page.locator('.sticky.bottom-0 button').first()
    await submitButton.click({ force: true })

    const celebrationOverlay = page.locator('.fixed.inset-0.z-50')
    await expect(celebrationOverlay).toBeVisible({ timeout: 10000 })

    const scoreText = await page.locator('text=/\\\\d+%/').first().textContent()
    console.log(\`Score: \${scoreText}\`)
    expect(scoreText).toBe('100%')
  })
})`

  console.log(testTemplate)
  console.log('\n' + '═'.repeat(60))
}

async function main() {
  const args = process.argv.slice(2)
  
  if (args.length === 0) {
    console.log(`
Usage:
  node scripts/extract-answers.js <html-file-or-slug>

Examples:
  node scripts/extract-answers.js public/preview-worksheet-rounding-1.html
  node scripts/extract-answers.js number-place-value-rounding-nearest-10
  node scripts/extract-answers.js number-counting-counting-to-10-v2
`)
    process.exit(1)
  }

  const input = args[0]
  let htmlContent
  let source

  // Check if it's a file path or a slug
  if (input.includes('.html') || input.includes('/') || input.includes('\\')) {
    htmlContent = extractFromFile(input)
    source = input
  } else {
    htmlContent = await extractFromSlug(input)
    source = input
  }

  if (!htmlContent) {
    process.exit(1)
  }

  const results = parseAnswerKey(htmlContent)
  printResults(results, source)
}

main().catch(console.error)
