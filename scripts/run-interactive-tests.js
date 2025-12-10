#!/usr/bin/env node
/**
 * Run Interactive Worksheet Tests - Detailed Report
 * Shows exactly which answers are wrong and why tests fail.
 * 
 * Usage:
 *   node scripts/run-interactive-tests.js                    # Test ALL worksheets
 *   node scripts/run-interactive-tests.js --subtopic=rounding-nearest-10  # Filter by subtopic
 *   node scripts/run-interactive-tests.js --slug=number-place-value-rounding  # Filter by slug pattern
 *   node scripts/run-interactive-tests.js --topic=number-place-value  # Filter by topic
 *   node scripts/run-interactive-tests.js --year="Year 2"    # Filter by year group
 */

const { chromium } = require('playwright')
const fs = require('fs')
const path = require('path')

const BASE_URL = 'http://localhost:3000'

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2)
  const filters = {
    subtopic: null,
    slug: null,
    topic: null,
    year: null
  }
  
  for (const arg of args) {
    if (arg.startsWith('--subtopic=')) {
      filters.subtopic = arg.split('=')[1]
    } else if (arg.startsWith('--slug=')) {
      filters.slug = arg.split('=')[1]
    } else if (arg.startsWith('--topic=')) {
      filters.topic = arg.split('=')[1]
    } else if (arg.startsWith('--year=')) {
      filters.year = arg.split('=')[1]
    }
  }
  
  return filters
}

// Filter worksheets based on command line arguments
function filterWorksheets(worksheets, filters) {
  return worksheets.filter(ws => {
    if (filters.subtopic && !ws.subtopic?.includes(filters.subtopic)) return false
    if (filters.slug && !ws.slug?.includes(filters.slug)) return false
    if (filters.topic && !ws.topic?.includes(filters.topic)) return false
    if (filters.year && ws.year_group !== filters.year) return false
    return true
  })
}

/**
 * Parse answer key from worksheet HTML
 */
function parseAnswerKey(htmlContent) {
  const answersByQuestion = {}
  const rawAnswers = {}

  if (!htmlContent) return { answersByQuestion, rawAnswers }

  const answerKeyMatch = htmlContent.match(/<div[^>]*class="[^"]*answer-key[^"]*"[^>]*>([\s\S]*?)<\/div>\s*(?:<\/body>|$)/i)
  if (!answerKeyMatch) return { answersByQuestion, rawAnswers }

  const answerKeyHtml = answerKeyMatch[1]
  // Match Q1:, 1., 1:, etc. - the Q prefix is optional
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

    rawAnswers[qNum] = answerText // Store raw for debugging

    // Parse multi-part answers (a) X  b) Y) - but also handle unlabeled parts before them
    const parts = []

    // Check if there are labeled parts (a), b), etc.)
    const hasLabeledParts = /[a-d]\)/.test(answerText)

    if (hasLabeledParts) {
      // Split by labeled parts and process each segment
      // First, extract any unlabeled parts before the first label
      const firstLabelMatch = answerText.match(/[a-d]\)/)
      if (firstLabelMatch && firstLabelMatch.index > 0) {
        const beforeLabels = answerText.substring(0, firstLabelMatch.index).trim()
        // Split unlabeled parts by comma and extract answers
        const unlabeledParts = beforeLabels.split(/,\s*/).map(p => p.trim()).filter(p => p)
        for (const part of unlabeledParts) {
          // For comparison expressions like "91 > 89", extract the operator
          const compMatch = part.match(/\d+\s*([><=])\s*\d+/)
          if (compMatch) {
            parts.push(compMatch[1]) // Just the operator
          } else {
            parts.push(part.replace(/\([^)]*\)/g, '').trim())
          }
        }
      }

      // Now parse labeled parts - use .*? to allow any content, \s+ before next label
      const partPattern = /([a-d])\)\s*(.*?)(?=\s+[a-d]\)|$)/gi
      let partMatch
      while ((partMatch = partPattern.exec(answerText)) !== null) {
        let value = partMatch[2].trim()
        const valueMatch = value.match(/^([^(]+)/)
        if (valueMatch) value = valueMatch[1].trim()
        value = value.replace(/,\s*$/, '').trim()

        // For comparison expressions, extract operator
        const compMatch = value.match(/\d+\s*([><=])\s*\d+/)
        if (compMatch) {
          parts.push(compMatch[1])
        } else {
          // Extract just number from "X more" patterns
          const moreMatch = value.match(/^(\d+)\s+more/)
          if (moreMatch) {
            parts.push(moreMatch[1])
          } else {
            // Check for "X + Y" expanded form (e.g., "90 + 5" -> ["90", "5"])
            const expandedMatch = value.match(/^(\d+)\s*\+\s*(\d+)$/)
            if (expandedMatch) {
              parts.push(expandedMatch[1])
              parts.push(expandedMatch[2])
            } else {
              parts.push(value)
            }
          }
        }
      }
    }

    if (parts.length > 0) {
      answersByQuestion[qNum] = parts
    } else {
      // Single or comma-separated answers - clean up explanations in parentheses
      const cleanedAnswer = answerText.replace(/\([^)]*\)/g, '').trim()

      // Special handling for "Any X numbers greater than Y, e.g. A, B, C" pattern
      // Extract the example numbers as valid answers
      const egMatch = answerText.match(/e\.g\.\s*([\d,\s]+)/i)
      if (egMatch) {
        const exampleNumbers = egMatch[1].split(/,\s*/).map(n => n.trim()).filter(n => /^\d+$/.test(n))
        if (exampleNumbers.length > 0) {
          answersByQuestion[qNum] = exampleNumbers
        }
      }
      // Special handling for "X tens and Y ones" pattern (place value questions)
      else {
        const tensOnesMatch = cleanedAnswer.match(/(\d+)\s*tens?\s+and\s+(\d+)\s*ones?/i)
        if (tensOnesMatch) {
          answersByQuestion[qNum] = [tensOnesMatch[1], tensOnesMatch[2]]
        }
        // Special handling for equation answers like "3 + 7 = 10"
        // Extract just the operands (the numbers before the equals sign)
        else {
          const equationMatch = cleanedAnswer.match(/^(\d+)\s*[+−\-]\s*(\d+)\s*=\s*\d+$/)
          if (equationMatch) {
            answersByQuestion[qNum] = [equationMatch[1], equationMatch[2]]
          } else {
            const singleAnswers = cleanedAnswer.split(/,\s*/).map(a => {
              let answer = a.trim()
              // Strip descriptive words after numbers (e.g., "13 sheep" -> "13", "7 apples" -> "7")
              // But keep non-numeric answers as-is (e.g., "red", "circle")
              const numericMatch = answer.match(/^(\d+)\s+[a-zA-Z]+/)
              if (numericMatch) {
                answer = numericMatch[1] // Extract just the number
              }
              return answer
            })
              .filter(a => a && !a.toLowerCase().includes('e.g.') && !a.toLowerCase().includes('any'))

            if (singleAnswers.length > 0) {
              answersByQuestion[qNum] = singleAnswers
            }
          }
        }
      }
    }
  }

  return { answersByQuestion, rawAnswers }
}

function flattenAnswers(answersByQuestion, questionCount) {
  const flatAnswers = []
  const buttonAnswers = [] // Yes/No answers that go to buttons, not text inputs

  for (let q = 1; q <= questionCount; q++) {
    const qAnswers = answersByQuestion[q] || []
    for (const answer of qAnswers) {
      // Yes/No are rendered as buttons in interactive mode, not text inputs
      if (/^(yes|no)$/i.test(answer)) {
        buttonAnswers.push(answer)
      } else {
        flatAnswers.push(answer)
      }
    }
  }
  return { flatAnswers, buttonAnswers }
}

async function runTests() {
  const filters = parseArgs()
  const hasFilters = filters.subtopic || filters.slug || filters.topic || filters.year
  
  if (hasFilters) {
    console.log('🔍 Filters applied:')
    if (filters.subtopic) console.log(`   --subtopic=${filters.subtopic}`)
    if (filters.slug) console.log(`   --slug=${filters.slug}`)
    if (filters.topic) console.log(`   --topic=${filters.topic}`)
    if (filters.year) console.log(`   --year=${filters.year}`)
    console.log('')
  }
  
  console.log('Fetching worksheets from library API...')

  const response = await fetch(`${BASE_URL}/api/library/browse`)
  const data = await response.json()
  let worksheets = data.worksheets || []

  console.log(`Found ${worksheets.length} total worksheets in library`)
  
  // Apply filters
  if (hasFilters) {
    worksheets = filterWorksheets(worksheets, filters)
    console.log(`After filtering: ${worksheets.length} worksheets to test\n`)
  } else {
    console.log(`Testing all ${worksheets.length} worksheets\n`)
  }
  
  if (worksheets.length === 0) {
    console.log('❌ No worksheets match the filter criteria')
    return []
  }

  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext()

  const results = []

  for (const worksheet of worksheets) {
    const { slug, title, html_content, year_group, topic, subtopic } = worksheet
    console.log(`Testing: ${slug}`)

    const { answersByQuestion, rawAnswers } = parseAnswerKey(html_content || '')
    const page = await context.newPage()

    let result = {
      slug, title, yearGroup: year_group, topic, subtopic,
      status: 'unknown', score: null, inputCount: 0, questionCount: 0,
      parsedAnswers: answersByQuestion, rawAnswers,
      inputDetails: [], errors: [], diagnostics: {}
    }

    try {
      await page.goto(`${BASE_URL}/library/${slug}/interactive`)

      // Dismiss cookie consent
      await page.evaluate(() => {
        document.querySelector('.cookie-consent-container')?.remove()
        document.querySelectorAll('[class*="cookie"], [class*="consent"]').forEach(el => {
          if (el.style?.position === 'fixed') el.remove()
        })
      })

      const container = page.locator('.interactive-worksheet-container')
      await container.waitFor({ state: 'visible' })

      const questionCount = await page.locator('.question-interactive').count()
      result.questionCount = questionCount

      const { flatAnswers, buttonAnswers } = flattenAnswers(answersByQuestion, questionCount)
      result.diagnostics.flatAnswersCount = flatAnswers.length
      result.diagnostics.flatAnswers = flatAnswers
      result.diagnostics.buttonAnswers = buttonAnswers

      const inputs = page.locator('.interactive-worksheet-container input[type="text"]')
      await page.waitForTimeout(500)
      const inputCount = await inputs.count()
      result.inputCount = inputCount

      result.diagnostics.answerInputMismatch = flatAnswers.length !== inputCount
      result.diagnostics.mismatchDetails = flatAnswers.length !== inputCount
        ? `Expected ${flatAnswers.length} answers but found ${inputCount} inputs`
        : null

      if (inputCount === 0) {
        result.status = 'skipped'
        result.errors.push('No inputs found on page')
        results.push(result)
        await page.close()
        continue
      }

      // Fill inputs
      for (let i = 0; i < inputCount; i++) {
        const input = inputs.nth(i)
        await input.scrollIntoViewIfNeeded()
        await input.click()
        const answer = flatAnswers[i] || String(i + 1)
        const isFallback = i >= flatAnswers.length
        await input.pressSequentially(String(answer), { delay: 30 })
        result.inputDetails.push({
          index: i,
          filledWith: String(answer),
          isFromAnswerKey: !isFallback,
          expectedAnswer: flatAnswers[i] || null,
          isFallback
        })
      }

      // Remove cookie consent before button interactions
      await page.evaluate(() => {
        document.querySelector('.cookie-consent-container')?.remove()
        document.querySelectorAll('[class*="cookie"], [class*="consent"]').forEach(el => {
          if (el.style?.position === 'fixed') el.remove()
        })
      })

      // Handle Yes/No button questions (these are tracked separately from text inputs)
      if (buttonAnswers.length > 0) {
        for (const answer of buttonAnswers) {
          const isYes = /^yes$/i.test(answer)
          const buttonSelector = isYes ? 'button:has-text("Yes")' : 'button:has-text("No")'
          const button = page.locator(buttonSelector).first()
          if (await button.count() > 0) {
            await button.scrollIntoViewIfNeeded()
            await button.click({ force: true })
            await page.waitForTimeout(200) // Wait for React state update
            result.inputDetails.push({
              index: 'button',
              filledWith: answer,
              isFromAnswerKey: true,
              expectedAnswer: answer,
              isFallback: false,
              isButton: true
            })
          }
        }
      }

      // Remove cookie consent again before submit
      await page.evaluate(() => {
        document.querySelector('.cookie-consent-container')?.remove()
      })

      const submitButton = page.locator('.sticky.bottom-0 button').first()
      await submitButton.waitFor({ state: 'visible' })

      let buttonText = await submitButton.textContent()
      result.diagnostics.initialButtonText = buttonText

      let attempts = 0
      while (!buttonText?.includes('Submit') && attempts < 10) {
        await page.waitForTimeout(200)
        buttonText = await submitButton.textContent()
        attempts++
      }

      result.diagnostics.finalButtonText = buttonText

      if (!buttonText?.includes('Submit')) {
        result.status = 'incomplete'
        result.errors.push(`Cannot submit: "${buttonText}"`)

        // Check what's remaining
        const remainingMatch = buttonText?.match(/(\d+)\s*remaining/i)
        if (remainingMatch) {
          result.diagnostics.inputsRemaining = parseInt(remainingMatch[1])
          result.errors.push(`${remainingMatch[1]} input(s) still need to be filled`)
        }

        results.push(result)
        await page.close()
        continue
      }

      await submitButton.click({ force: true })

      const celebrationOverlay = page.locator('.fixed.inset-0.z-50')
      await celebrationOverlay.waitFor({ state: 'visible' })

      const scoreText = await page.locator('text=/\\d+%/').first().textContent()
      result.score = scoreText
      result.diagnostics.scorePercent = parseInt(scoreText) || 0

      // Get correct/total count
      const correctText = await page.locator('text=/\\d+ out of \\d+/').first().textContent().catch(() => null)
      if (correctText) {
        const match = correctText.match(/(\d+) out of (\d+)/)
        if (match) {
          result.diagnostics.correctCount = parseInt(match[1])
          result.diagnostics.totalCount = parseInt(match[2])
          result.diagnostics.wrongCount = parseInt(match[2]) - parseInt(match[1])
        }
      }

      if (scoreText === '100%') {
        result.status = 'passed'
        console.log(`  ✅ PASSED: ${scoreText}`)
      } else {
        result.status = 'failed'
        result.errors.push(`Score ${scoreText} is not 100%`)
        if (result.diagnostics.wrongCount) {
          result.errors.push(`${result.diagnostics.wrongCount} question(s) answered incorrectly`)
        }
        console.log(`  ❌ FAILED: ${scoreText}`)
      }

    } catch (error) {
      result.status = 'error'
      result.errors.push(error.message)
      console.log(`  💥 ERROR: ${error.message}`)
    }

    results.push(result)
    await page.close()
  }

  await browser.close()

  // Pass filters to report generation for naming
  generateHtmlReport(results, filters)
  return results
}

function generateHtmlReport(results, filters = {}) {
  const passed = results.filter(r => r.status === 'passed')
  const failed = results.filter(r => r.status === 'failed')
  const errors = results.filter(r => r.status === 'error')
  const incomplete = results.filter(r => r.status === 'incomplete')
  
  // Generate filter description for report title
  const filterDesc = filters.subtopic ? ` - ${filters.subtopic}` : 
                     filters.slug ? ` - ${filters.slug}` :
                     filters.topic ? ` - ${filters.topic}` : ''

  const html = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>Interactive Worksheet Test Report${filterDesc}</title>
<style>
  * { box-sizing: border-box; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
  .container { max-width: 1600px; margin: 0 auto; }
  h1 { color: #1a1a2e; margin-bottom: 10px; }
  .timestamp { color: #666; font-size: 14px; margin-bottom: 20px; }
  .summary { display: grid; grid-template-columns: repeat(5, 1fr); gap: 15px; margin-bottom: 30px; }
  .summary-card { padding: 20px; border-radius: 10px; text-align: center; color: white; }
  .summary-card.passed { background: linear-gradient(135deg, #10b981, #059669); }
  .summary-card.failed { background: linear-gradient(135deg, #ef4444, #dc2626); }
  .summary-card.error { background: linear-gradient(135deg, #f59e0b, #d97706); }
  .summary-card.incomplete { background: linear-gradient(135deg, #6366f1, #4f46e5); }
  .summary-card.skipped { background: linear-gradient(135deg, #6b7280, #4b5563); }
  .summary-card .count { font-size: 36px; font-weight: bold; }
  .summary-card .label { font-size: 14px; opacity: 0.9; }

  .worksheet-card { background: white; border-radius: 10px; margin-bottom: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); overflow: hidden; }
  .worksheet-header { padding: 15px 20px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; }
  .worksheet-header:hover { filter: brightness(0.98); }
  .worksheet-header.passed { background: #d1fae5; border-left: 5px solid #10b981; }
  .worksheet-header.failed { background: #fee2e2; border-left: 5px solid #ef4444; }
  .worksheet-header.error { background: #fef3c7; border-left: 5px solid #f59e0b; }
  .worksheet-header.incomplete { background: #e0e7ff; border-left: 5px solid #6366f1; }
  .worksheet-header.skipped { background: #f3f4f6; border-left: 5px solid #6b7280; }
  .worksheet-title { font-weight: 600; font-size: 16px; color: #1a1a2e; }
  .worksheet-slug { font-size: 12px; color: #666; margin-top: 4px; font-family: monospace; }
  .worksheet-meta { font-size: 12px; color: #666; margin-top: 4px; }
  .score-badge { padding: 8px 16px; border-radius: 20px; font-weight: bold; font-size: 18px; }
  .score-badge.passed { background: #10b981; color: white; }
  .score-badge.failed { background: #ef4444; color: white; }
  .score-badge.na { background: #6b7280; color: white; }

  .worksheet-body { padding: 20px; display: none; border-top: 1px solid #e5e7eb; }
  .worksheet-body.expanded { display: block; }

  .section { margin-bottom: 20px; }
  .section-title { font-weight: 600; font-size: 14px; color: #374151; margin-bottom: 10px; display: flex; align-items: center; gap: 8px; }
  .section-title::before { content: ''; display: block; width: 4px; height: 16px; border-radius: 2px; }
  .section-title.errors::before { background: #ef4444; }
  .section-title.diagnostics::before { background: #6366f1; }
  .section-title.answers::before { background: #10b981; }
  .section-title.raw::before { background: #f59e0b; }

  .error-list { background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 15px; }
  .error-item { color: #991b1b; margin-bottom: 8px; display: flex; align-items: flex-start; gap: 8px; }
  .error-item:last-child { margin-bottom: 0; }
  .error-item::before { content: '❌'; }

  .diagnostics-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px; }
  .diagnostic-item { background: #f3f4f6; padding: 10px; border-radius: 6px; }
  .diagnostic-label { font-size: 11px; color: #6b7280; text-transform: uppercase; margin-bottom: 4px; }
  .diagnostic-value { font-weight: 600; color: #1f2937; font-family: monospace; }
  .diagnostic-value.warning { color: #d97706; }
  .diagnostic-value.error { color: #dc2626; }
  .diagnostic-value.success { color: #059669; }

  .answers-table { width: 100%; border-collapse: collapse; font-size: 14px; }
  .answers-table th { background: #f9fafb; padding: 10px; text-align: left; border-bottom: 2px solid #e5e7eb; font-size: 12px; }
  .answers-table td { padding: 10px; border-bottom: 1px solid #e5e7eb; }
  .answers-table tr:hover { background: #f9fafb; }
  .answer-cell { font-family: monospace; padding: 4px 8px; border-radius: 4px; display: inline-block; }
  .answer-cell.correct { background: #d1fae5; color: #065f46; }
  .answer-cell.wrong { background: #fee2e2; color: #991b1b; }
  .answer-cell.fallback { background: #fef3c7; color: #92400e; }

  .raw-answers { background: #fffbeb; border: 1px solid #fcd34d; border-radius: 8px; padding: 15px; font-family: monospace; font-size: 13px; }
  .raw-answer-item { margin-bottom: 8px; }
  .raw-answer-item:last-child { margin-bottom: 0; }
  .raw-q { color: #92400e; font-weight: 600; }
  .raw-a { color: #1f2937; }

  .filter-buttons { display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap; }
  .filter-btn { padding: 8px 16px; border: 2px solid transparent; border-radius: 6px; cursor: pointer; font-size: 14px; background: #e5e7eb; }
  .filter-btn:hover { filter: brightness(0.95); }
  .filter-btn.active { border-color: #1f2937; box-shadow: 0 2px 8px rgba(0,0,0,0.15); }
  .filter-btn.passed { background: #d1fae5; color: #065f46; }
  .filter-btn.failed { background: #fee2e2; color: #991b1b; }
  .filter-btn.incomplete { background: #e0e7ff; color: #3730a3; }

  .expand-all { margin-left: auto; background: #f3f4f6; color: #374151; }

  .legend { display: flex; gap: 20px; margin-bottom: 20px; padding: 15px; background: white; border-radius: 8px; flex-wrap: wrap; }
  .legend-item { display: flex; align-items: center; gap: 8px; font-size: 13px; }
  .legend-dot { width: 16px; height: 16px; border-radius: 4px; }
  .legend-dot.correct { background: #d1fae5; border: 1px solid #10b981; }
  .legend-dot.wrong { background: #fee2e2; border: 1px solid #ef4444; }
  .legend-dot.fallback { background: #fef3c7; border: 1px solid #f59e0b; }
</style></head>
<body><div class="container">
  <h1>🧪 Interactive Worksheet Test Report${filterDesc}</h1>
  <div class="timestamp">Generated: ${new Date().toLocaleString()}</div>

  <div class="summary">
    <div class="summary-card passed"><div class="count">${passed.length}</div><div class="label">✅ Passed (100%)</div></div>
    <div class="summary-card failed"><div class="count">${failed.length}</div><div class="label">❌ Failed (&lt;100%)</div></div>
    <div class="summary-card error"><div class="count">${errors.length}</div><div class="label">💥 Errors</div></div>
    <div class="summary-card incomplete"><div class="count">${incomplete.length}</div><div class="label">⚠️ Incomplete</div></div>
    <div class="summary-card skipped"><div class="count">${results.filter(r => r.status === 'skipped').length}</div><div class="label">⏭️ Skipped</div></div>
  </div>

  <div class="legend">
    <div class="legend-item"><div class="legend-dot correct"></div> Correct answer from answer key</div>
    <div class="legend-item"><div class="legend-dot wrong"></div> Wrong answer (test failure cause)</div>
    <div class="legend-item"><div class="legend-dot fallback"></div> Fallback value (no answer key entry)</div>
  </div>

  <div class="filter-buttons">
    <button class="filter-btn active" onclick="filterResults('all')">All (${results.length})</button>
    <button class="filter-btn passed" onclick="filterResults('passed')">✅ Passed (${passed.length})</button>
    <button class="filter-btn failed" onclick="filterResults('failed')">❌ Failed (${failed.length})</button>
    <button class="filter-btn incomplete" onclick="filterResults('incomplete')">⚠️ Incomplete (${incomplete.length})</button>
    <button class="filter-btn expand-all" onclick="toggleAllDetails()">📖 Expand/Collapse All</button>
  </div>

  <div id="results">${results.map(r => generateCard(r)).join('')}</div>
</div>
<script>
let allExpanded = false;
function filterResults(f) {
  document.querySelectorAll('.filter-btn:not(.expand-all)').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  document.querySelectorAll('.worksheet-card').forEach(c => {
    c.style.display = (f === 'all' || c.dataset.status === f) ? 'block' : 'none';
  });
}
function toggleDetails(el) {
  el.closest('.worksheet-card').querySelector('.worksheet-body').classList.toggle('expanded');
}
function toggleAllDetails() {
  allExpanded = !allExpanded;
  document.querySelectorAll('.worksheet-body').forEach(b => {
    b.classList.toggle('expanded', allExpanded);
  });
}
</script></body></html>`

  // Generate report filename - use subtopic-specific name if filtered
  const reportName = filters.subtopic ? `test-report-${filters.subtopic}.html` :
                     filters.slug ? `test-report-${filters.slug}.html` :
                     filters.topic ? `test-report-${filters.topic}.html` :
                     'test-report.html'
  
  const reportPath = path.join(__dirname, '..', 'tests', 'e2e', 'interactive', reportName)
  fs.mkdirSync(path.dirname(reportPath), { recursive: true })
  fs.writeFileSync(reportPath, html)
  console.log(`\n✅ HTML Report saved to: ${reportPath}`)
  
  // Print summary
  console.log(`\n${'═'.repeat(50)}`)
  console.log(`📊 TEST SUMMARY${filterDesc}`)
  console.log(`${'═'.repeat(50)}`)
  console.log(`   ✅ Passed:     ${passed.length}`)
  console.log(`   ❌ Failed:     ${failed.length}`)
  console.log(`   💥 Errors:     ${errors.length}`)
  console.log(`   ⚠️  Incomplete: ${incomplete.length}`)
  console.log(`${'═'.repeat(50)}`)
  
  if (failed.length === 0 && errors.length === 0 && incomplete.length === 0 && passed.length > 0) {
    console.log(`\n🎉 ALL ${passed.length} WORKSHEETS PASSED!`)
  }
}

function generateCard(r) {
  const scoreDisplay = r.score || 'N/A'
  const scoreBadgeClass = r.status === 'passed' ? 'passed' : r.status === 'failed' ? 'failed' : 'na'

  // Errors section
  let errorsHtml = ''
  if (r.errors && r.errors.length > 0) {
    errorsHtml = `<div class="section">
      <div class="section-title errors">Issues Found</div>
      <div class="error-list">${r.errors.map(e => `<div class="error-item">${esc(e)}</div>`).join('')}</div>
    </div>`
  }

  // Diagnostics section
  let diagnosticsHtml = ''
  if (r.diagnostics) {
    const d = r.diagnostics
    diagnosticsHtml = `<div class="section">
      <div class="section-title diagnostics">Diagnostics</div>
      <div class="diagnostics-grid">
        <div class="diagnostic-item">
          <div class="diagnostic-label">Questions Found</div>
          <div class="diagnostic-value">${r.questionCount}</div>
        </div>
        <div class="diagnostic-item">
          <div class="diagnostic-label">Inputs Found</div>
          <div class="diagnostic-value">${r.inputCount}</div>
        </div>
        <div class="diagnostic-item">
          <div class="diagnostic-label">Answers Parsed</div>
          <div class="diagnostic-value ${d.flatAnswersCount !== r.inputCount ? 'warning' : ''}">${d.flatAnswersCount || 0}</div>
        </div>
        ${d.answerInputMismatch ? `<div class="diagnostic-item">
          <div class="diagnostic-label">⚠️ Mismatch</div>
          <div class="diagnostic-value error">${esc(d.mismatchDetails)}</div>
        </div>` : ''}
        ${d.inputsRemaining ? `<div class="diagnostic-item">
          <div class="diagnostic-label">Inputs Remaining</div>
          <div class="diagnostic-value error">${d.inputsRemaining}</div>
        </div>` : ''}
        ${d.wrongCount ? `<div class="diagnostic-item">
          <div class="diagnostic-label">Wrong Answers</div>
          <div class="diagnostic-value error">${d.wrongCount} of ${d.totalCount}</div>
        </div>` : ''}
        ${d.scorePercent !== undefined ? `<div class="diagnostic-item">
          <div class="diagnostic-label">Score</div>
          <div class="diagnostic-value ${d.scorePercent === 100 ? 'success' : 'error'}">${d.scorePercent}%</div>
        </div>` : ''}
      </div>
    </div>`
  }

  // Raw answers section (from answer key)
  let rawAnswersHtml = ''
  if (r.rawAnswers && Object.keys(r.rawAnswers).length > 0) {
    rawAnswersHtml = `<div class="section">
      <div class="section-title raw">Raw Answer Key (as parsed from HTML)</div>
      <div class="raw-answers">
        ${Object.entries(r.rawAnswers).map(([q, a]) =>
          `<div class="raw-answer-item"><span class="raw-q">Q${q}:</span> <span class="raw-a">${esc(a)}</span></div>`
        ).join('')}
      </div>
    </div>`
  }

  // Answers table
  let answersHtml = ''
  if (r.inputDetails && r.inputDetails.length > 0) {
    answersHtml = `<div class="section">
      <div class="section-title answers">Answers Filled (${r.inputCount} inputs)</div>
      <table class="answers-table">
        <tr><th>Input #</th><th>Answer Filled</th><th>Expected (from key)</th><th>Match?</th><th>Notes</th></tr>
        ${r.inputDetails.map(d => {
          const isMatch = d.expectedAnswer &&
            d.filledWith.toLowerCase().trim() === d.expectedAnswer.toLowerCase().trim()
          const cellClass = d.isFallback ? 'fallback' : (isMatch ? 'correct' : 'wrong')
          const icon = d.isFallback ? '⚠️' : (isMatch ? '✅' : '❌')
          const note = d.isFallback
            ? 'Used fallback (no answer key)'
            : (isMatch ? 'Matched' : 'MISMATCH - caused failure')
          return `<tr>
            <td><strong>${d.index + 1}</strong></td>
            <td><span class="answer-cell ${cellClass}">${esc(d.filledWith)}</span></td>
            <td>${d.expectedAnswer ? esc(d.expectedAnswer) : '<em style="color:#999">N/A</em>'}</td>
            <td>${icon}</td>
            <td style="font-size:12px;color:#666">${note}</td>
          </tr>`
        }).join('')}
      </table>
    </div>`
  }

  return `<div class="worksheet-card" data-status="${r.status}">
    <div class="worksheet-header ${r.status}" onclick="toggleDetails(this)">
      <div>
        <div class="worksheet-title">${esc(r.title)}</div>
        <div class="worksheet-slug">${esc(r.slug)}</div>
        <div class="worksheet-meta">${r.yearGroup || ''} • ${r.topic || ''} • ${r.questionCount} questions, ${r.inputCount} inputs</div>
      </div>
      <div class="score-badge ${scoreBadgeClass}">${scoreDisplay}</div>
    </div>
    <div class="worksheet-body ${r.status !== 'passed' ? 'expanded' : ''}">
      ${errorsHtml}
      ${diagnosticsHtml}
      ${rawAnswersHtml}
      ${answersHtml}
    </div>
  </div>`
}

function esc(s) { return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;') }

runTests().catch(console.error)
