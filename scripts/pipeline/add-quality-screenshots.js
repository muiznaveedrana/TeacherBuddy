#!/usr/bin/env node
/**
 * Phase 0: Add Quality Screenshots to Test Files
 *
 * One-time script that inserts a screenshot capture line into all interactive
 * test files, right before the submit button click. This captures the worksheet
 * with all answers filled in — the best state for quality assessment.
 *
 * Usage:
 *   node scripts/pipeline/add-quality-screenshots.js              # All test files
 *   node scripts/pipeline/add-quality-screenshots.js --year=reception  # Single year group
 *   node scripts/pipeline/add-quality-screenshots.js --dry-run     # Preview changes
 */

const fs = require('fs')
const path = require('path')
const { getTestFiles, extractSlug, getYearGroup, log } = require('./utils')

function addScreenshotToFile(filePath, dryRun) {
  const content = fs.readFileSync(filePath, 'utf-8')
  const slug = extractSlug(filePath)

  if (!slug) {
    return { file: filePath, status: 'skipped', reason: 'No WORKSHEET_SLUG found' }
  }

  // Check if screenshot line already exists
  if (content.includes('quality-screenshots')) {
    return { file: filePath, status: 'already-present', slug }
  }

  // Find the submit button click line — the anchor point
  // Pattern: await submitButton.click({ force: true })
  const submitPattern = /(\s*)(await submitButton\.click\(\{[^}]*\}\))/
  const match = content.match(submitPattern)

  if (!match) {
    // Try alternative patterns
    const altPattern = /(\s*)(await submitButton\.click\(\))/
    const altMatch = content.match(altPattern)
    if (!altMatch) {
      return { file: filePath, status: 'skipped', reason: 'No submitButton.click() found', slug }
    }
    // Use alternative match
    const indent = altMatch[1]
    const screenshotLine = `${indent}await page.screenshot({ path: \`test-results/quality-screenshots/${slug}.png\`, fullPage: true })\n`
    const newContent = content.replace(altMatch[0], screenshotLine + altMatch[0])

    if (!dryRun) {
      fs.writeFileSync(filePath, newContent, 'utf-8')
    }
    return { file: filePath, status: 'added', slug }
  }

  const indent = match[1]
  const screenshotLine = `${indent}await page.screenshot({ path: \`test-results/quality-screenshots/${slug}.png\`, fullPage: true })\n`
  const newContent = content.replace(match[0], screenshotLine + match[0])

  if (!dryRun) {
    fs.writeFileSync(filePath, newContent, 'utf-8')
  }

  return { file: filePath, status: 'added', slug }
}

function main() {
  const args = process.argv.slice(2)
  const dryRun = args.includes('--dry-run')
  const yearFilter = args.find(a => a.startsWith('--year='))?.split('=')[1] || null

  log('Phase0', `Adding quality screenshots to test files${yearFilter ? ` (${yearFilter} only)` : ' (all)'}${dryRun ? ' [DRY RUN]' : ''}`)

  const files = getTestFiles(yearFilter)
  log('Phase0', `Found ${files.length} test files`)

  const results = { added: 0, alreadyPresent: 0, skipped: 0, errors: [] }

  for (const filePath of files) {
    try {
      const result = addScreenshotToFile(filePath, dryRun)
      if (result.status === 'added') {
        results.added++
        log('Phase0', `  + ${path.basename(filePath)} (${result.slug})`)
      } else if (result.status === 'already-present') {
        results.alreadyPresent++
      } else {
        results.skipped++
        log('Phase0', `  ~ ${path.basename(filePath)}: ${result.reason}`)
      }
    } catch (err) {
      results.errors.push({ file: filePath, error: err.message })
      log('Phase0', `  ! ${path.basename(filePath)}: ${err.message}`)
    }
  }

  log('Phase0', `\nDone:`)
  log('Phase0', `  Added:    ${results.added}`)
  log('Phase0', `  Existing: ${results.alreadyPresent}`)
  log('Phase0', `  Skipped:  ${results.skipped}`)
  if (results.errors.length > 0) {
    log('Phase0', `  Errors:   ${results.errors.length}`)
  }

  return results
}

if (require.main === module) {
  main()
}

module.exports = { addScreenshotToFile, main }
