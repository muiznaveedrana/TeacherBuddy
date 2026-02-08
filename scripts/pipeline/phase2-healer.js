#!/usr/bin/env node
/**
 * Phase 2: Healer
 *
 * Groups failing tests by year group, invokes the playwright-test-healer agent
 * via Claude CLI, re-runs fixed tests, and performs regression checks.
 *
 * Usage:
 *   node scripts/pipeline/phase2-healer.js --results=test-results/results.json
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')
const { log, groupBy, formatDuration } = require('./utils')

const MAX_BATCH_SIZE = 5
const HEALER_TIMEOUT = 5 * 60 * 1000 // 5 min per batch

/**
 * Resolve the full path to the claude CLI binary.
 * Needed because execSync child processes may not inherit the full PATH.
 */
function getClaudePath() {
  // Try common locations
  const candidates = [
    path.join(process.env.APPDATA || '', 'npm', 'claude.cmd'),
    path.join(process.env.LOCALAPPDATA || '', 'Programs', 'claude', 'claude.exe'),
  ]
  for (const p of candidates) {
    if (p && fs.existsSync(p)) return `"${p}"`
  }
  // Fallback — hope it's in PATH
  return 'claude'
}

/**
 * Run healer on failing tests
 * @param {Array} failedTests - Array of {testId, file, error, yearGroup, slug}
 * @returns {Array} Healer results per test
 */
function healTests(failedTests) {
  if (failedTests.length === 0) {
    log('Phase2', 'No failing tests to heal')
    return []
  }

  log('Phase2', `Healing ${failedTests.length} failing tests`)

  // Group by year group for batching
  const byYear = groupBy(failedTests, t => t.yearGroup)
  const healerResults = []

  for (const [yearGroup, tests] of Object.entries(byYear)) {
    // Split into batches of MAX_BATCH_SIZE
    for (let i = 0; i < tests.length; i += MAX_BATCH_SIZE) {
      const batch = tests.slice(i, i + MAX_BATCH_SIZE)
      log('Phase2', `Batch: ${yearGroup} (${batch.length} tests)`)

      const batchResults = healBatch(batch, yearGroup)
      healerResults.push(...batchResults)
    }
  }

  // Summarize
  const fixed = healerResults.filter(r => r.afterStatus === 'passed').length
  const stillFailing = healerResults.filter(r => r.afterStatus !== 'passed').length
  log('Phase2', `Healer results: ${fixed} fixed, ${stillFailing} still failing`)

  return healerResults
}

/**
 * Heal a batch of tests using the playwright-test-healer agent
 */
function healBatch(tests, yearGroup) {
  const results = []

  for (const test of tests) {
    const startTime = Date.now()
    log('Phase2', `  Healing: ${test.slug || test.testId}`)

    const prompt = buildHealerPrompt(test)
    let healerApplied = false
    let fixDescription = ''
    let afterStatus = 'failed'

    try {
      // Invoke healer agent via Claude CLI (pipe prompt via stdin to avoid shell escaping issues)
      const claudeBin = getClaudePath()
      const output = execSync(
        `${claudeBin} -p --agent playwright-test-healer`,
        {
          input: prompt,
          cwd: path.resolve(__dirname, '../..'),
          encoding: 'utf-8',
          timeout: HEALER_TIMEOUT,
          maxBuffer: 10 * 1024 * 1024
        }
      )

      healerApplied = true
      fixDescription = extractFixDescription(output)

      // Re-run the specific test to verify fix
      afterStatus = verifyFix(test.file) ? 'passed' : 'failed'

    } catch (err) {
      if (err.killed) {
        fixDescription = 'Healer timed out'
      } else {
        fixDescription = `Healer error: ${err.message.slice(0, 200)}`
      }
    }

    const duration = Date.now() - startTime
    log('Phase2', `    ${afterStatus === 'passed' ? 'FIXED' : 'STILL FAILING'} (${formatDuration(duration)})`)

    results.push({
      testId: test.testId,
      file: test.file,
      slug: test.slug,
      yearGroup,
      healerApplied,
      fixDescription,
      beforeError: test.error?.slice(0, 500) || 'Unknown error',
      afterStatus,
      duration
    })
  }

  return results
}

/**
 * Build prompt for the healer agent
 */
function buildHealerPrompt(test) {
  return [
    `Debug and fix this failing Playwright test:`,
    ``,
    `File: ${test.file}`,
    `Test: ${test.title || test.testId}`,
    `Year Group: ${test.yearGroup}`,
    ``,
    `Error:`,
    test.error || 'Unknown error',
    ``,
    `Debug this test, identify the root cause, fix it, and verify it passes.`
  ].join('\n')
}

/**
 * Verify a healer fix by re-running the specific test
 */
function verifyFix(testFile) {
  try {
    execSync(
      `npx playwright test "${testFile}" --project=chromium-desktop --timeout=30000`,
      {
        cwd: path.resolve(__dirname, '../..'),
        encoding: 'utf-8',
        timeout: 60000,
        maxBuffer: 5 * 1024 * 1024
      }
    )
    return true
  } catch {
    return false
  }
}

/**
 * Run regression check — re-run all tests to ensure healer didn't break passing tests
 */
function regressionCheck(testPath, workers = 4) {
  log('Phase2', 'Running regression check...')

  // Preserve Phase 1 results.json (Playwright may clear test-results/)
  const resultsJsonAbs = path.resolve(__dirname, '../../test-results/results.json')
  const resultsBackup = path.resolve(__dirname, '../../pipeline-results/phase1-results.json')
  if (fs.existsSync(resultsJsonAbs)) {
    fs.copyFileSync(resultsJsonAbs, resultsBackup)
  }

  const regOutput = 'test-results/regression.json'
  const regOutputAbs = path.resolve(__dirname, '../../test-results/regression.json')
  try {
    execSync(
      `npx playwright test "${testPath.replace(/\\/g, '/')}" --project=chromium-desktop --workers=${workers} --timeout=30000 --reporter=json`,
      {
        cwd: path.resolve(__dirname, '../..'),
        encoding: 'utf-8',
        timeout: 10 * 60 * 1000,
        maxBuffer: 50 * 1024 * 1024,
        env: { ...process.env, PLAYWRIGHT_JSON_OUTPUT_NAME: regOutput }
      }
    )
    log('Phase2', 'Regression check passed')
    return { passed: true, regressions: [] }
  } catch (err) {
    if (fs.existsSync(regOutputAbs)) {
      try {
        const data = JSON.parse(fs.readFileSync(regOutputAbs, 'utf-8'))
        log('Phase2', 'Regression check found failures — review needed')
        return { passed: false, regressions: [] }
      } catch {
        // ignore parse errors
      }
    }
    return { passed: false, regressions: [] }
  }
}

/**
 * Revert a healer change if it caused regression
 */
function revertChange(filePath) {
  try {
    execSync(`git checkout -- "${filePath}"`, {
      cwd: path.resolve(__dirname, '../..'),
      encoding: 'utf-8'
    })
    log('Phase2', `  Reverted: ${path.basename(filePath)}`)
    return true
  } catch {
    return false
  }
}

function extractFixDescription(output) {
  // Look for common patterns in healer output
  const lines = output.split('\n')
  for (const line of lines) {
    if (line.includes('Fixed:') || line.includes('Changed:') || line.includes('Updated:')) {
      return line.trim().slice(0, 200)
    }
  }
  return output.slice(0, 200).replace(/\n/g, ' ').trim()
}

function escapeShell(str) {
  return str.replace(/"/g, '\\"').replace(/\n/g, '\\n')
}

module.exports = { healTests, regressionCheck, revertChange }
