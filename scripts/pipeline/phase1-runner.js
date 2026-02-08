#!/usr/bin/env node
/**
 * Phase 1: Test Execution
 *
 * Runs all Playwright interactive tests and parses JSON results.
 * Outputs structured results + quality screenshots captured by test code.
 *
 * Usage:
 *   node scripts/pipeline/phase1-runner.js
 *   node scripts/pipeline/phase1-runner.js --year=reception --workers=4
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')
const { INTERACTIVE_TESTS_DIR, QUALITY_SCREENSHOTS_DIR, log, ensureDirs, getYearGroup, extractSlug } = require('./utils')

/**
 * Run Playwright tests and return structured results
 */
function runTests(opts = {}) {
  const {
    year = null,
    workers = 4,
    timeout = 30000,
    retries = 0
  } = opts

  ensureDirs()

  const testPath = year
    ? path.join(INTERACTIVE_TESTS_DIR, year).replace(/\\/g, '/')
    : INTERACTIVE_TESTS_DIR.replace(/\\/g, '/')

  if (!fs.existsSync(testPath)) {
    throw new Error(`Test path does not exist: ${testPath}`)
  }

  const jsonOutput = 'test-results/results.json'
  const jsonOutputAbs = path.resolve(__dirname, '../../test-results/results.json')
  // Remove stale results
  if (fs.existsSync(jsonOutputAbs)) fs.unlinkSync(jsonOutputAbs)

  // Use PLAYWRIGHT_JSON_OUTPUT_NAME env var to write JSON to file
  // Combined with --reporter=json, this writes the full JSON to the file
  const cmd = [
    'npx playwright test',
    `"${testPath}"`,
    '--project=chromium-desktop',
    `--workers=${workers}`,
    `--timeout=${timeout}`,
    `--retries=${retries}`,
    '--reporter=json'
  ].join(' ')

  log('Phase1', `Running: ${cmd}`)
  log('Phase1', `JSON output: ${jsonOutput}`)
  log('Phase1', `Target: ${year || 'all year groups'}`)

  const startTime = Date.now()

  try {
    execSync(cmd, {
      cwd: path.resolve(__dirname, '../..'),
      encoding: 'utf-8',
      maxBuffer: 100 * 1024 * 1024,
      timeout: 10 * 60 * 1000,
      env: { ...process.env, PLAYWRIGHT_JSON_OUTPUT_NAME: jsonOutput },
      stdio: ['pipe', 'pipe', 'pipe']
    })
  } catch (err) {
    // Playwright exits non-zero when tests fail — expected behavior
    // With PLAYWRIGHT_JSON_OUTPUT_NAME, JSON is written to file regardless of exit code
  }

  const duration = Date.now() - startTime

  // Parse JSON results from file
  let jsonResults = null
  if (fs.existsSync(jsonOutputAbs)) {
    try {
      jsonResults = JSON.parse(fs.readFileSync(jsonOutputAbs, 'utf-8'))
      log('Phase1', `JSON results file: ${(fs.statSync(jsonOutputAbs).size / 1024).toFixed(1)}KB`)
    } catch (e) {
      log('Phase1', `Warning: Could not parse JSON results: ${e.message}`)
    }
  } else {
    log('Phase1', `Warning: JSON output file not created at ${jsonOutputAbs}`)
    log('Phase1', 'Falling back: re-running with stdout capture...')
    jsonResults = runWithStdoutCapture(cmd, path.resolve(__dirname, '../..'))
  }

  // Parse results into structured format
  const results = parseResults(jsonResults)

  // Count quality screenshots captured
  let screenshotCount = 0
  if (fs.existsSync(QUALITY_SCREENSHOTS_DIR)) {
    screenshotCount = fs.readdirSync(QUALITY_SCREENSHOTS_DIR).filter(f => f.endsWith('.png')).length
  }

  log('Phase1', `Completed in ${Math.round(duration / 1000)}s`)
  log('Phase1', `Total: ${results.length} | Passed: ${results.filter(r => r.status === 'passed').length} | Failed: ${results.filter(r => r.status === 'failed').length}`)
  log('Phase1', `Quality screenshots captured: ${screenshotCount}`)

  return {
    results,
    duration,
    screenshotCount,
    rawJson: jsonResults
  }
}

/**
 * Fallback: run Playwright and capture JSON from stdout via a wrapper script
 */
function runWithStdoutCapture(cmd, cwd) {
  const tmpScript = path.resolve(__dirname, '../../test-results/_run-tests.js')
  const tmpOutput = path.resolve(__dirname, '../../test-results/_stdout.json')

  // Write a tiny Node wrapper that captures stdout
  fs.writeFileSync(tmpScript, `
const { execSync } = require('child_process');
try {
  const out = execSync(${JSON.stringify(cmd)}, { encoding: 'utf-8', maxBuffer: 100*1024*1024, timeout: 600000 });
  require('fs').writeFileSync(${JSON.stringify(tmpOutput)}, out);
} catch(e) {
  if (e.stdout) require('fs').writeFileSync(${JSON.stringify(tmpOutput)}, e.stdout);
}
`)

  try {
    execSync(`node "${tmpScript}"`, { cwd, encoding: 'utf-8', timeout: 600000, maxBuffer: 100 * 1024 * 1024 })
  } catch {
    // ignore — output file should still be written
  }

  // Clean up script
  try { fs.unlinkSync(tmpScript) } catch {}

  if (fs.existsSync(tmpOutput)) {
    try {
      const data = JSON.parse(fs.readFileSync(tmpOutput, 'utf-8'))
      fs.unlinkSync(tmpOutput)
      return data
    } catch {
      try { fs.unlinkSync(tmpOutput) } catch {}
    }
  }

  return null
}

/**
 * Parse Playwright JSON reporter output into simplified results
 */
function parseResults(jsonData) {
  if (!jsonData || !jsonData.suites) return []

  const results = []
  flattenSuites(jsonData.suites, results)
  return results
}

function flattenSuites(suites, results) {
  // testDir is the parent of INTERACTIVE_TESTS_DIR (i.e. tests/e2e)
  const testDir = path.dirname(INTERACTIVE_TESTS_DIR)

  for (const suite of suites) {
    if (suite.suites) {
      flattenSuites(suite.suites, results)
    }
    if (suite.specs) {
      for (const spec of suite.specs) {
        for (const test of spec.tests || []) {
          const lastResult = test.results?.[test.results.length - 1]
          const filePath = spec.file || suite.file || ''

          // Resolve relative file path from JSON results to absolute, then extract WORKSHEET_SLUG
          let slug = null
          if (filePath) {
            try {
              const absPath = path.resolve(testDir, filePath)
              slug = extractSlug(absPath)
            } catch {
              // File may not exist or be unreadable
            }
          }
          // Fall back to title-based extraction for files without WORKSHEET_SLUG
          if (!slug) {
            slug = extractSlugFromTitle(suite.title || spec.title || '')
          }

          results.push({
            testId: spec.file ? `${path.basename(path.dirname(spec.file))}/${path.basename(spec.file)}` : spec.title,
            title: spec.title || suite.title || 'Unknown',
            file: filePath,
            yearGroup: getYearGroup(filePath),
            slug,
            status: test.status === 'expected' ? 'passed' : (test.status === 'skipped' ? 'skipped' : 'failed'),
            duration: lastResult?.duration || 0,
            error: lastResult?.error?.message || null,
            errorSnippet: lastResult?.error?.snippet || null
          })
        }
      }
    }
  }
}

function extractSlugFromTitle(title) {
  // Suite titles are like "Interactive: number-counting-counting-to-10"
  const match = title.match(/Interactive:\s*(.+)/)
  return match ? match[1].trim() : title.replace(/\s+/g, '-').toLowerCase()
}

if (require.main === module) {
  const args = process.argv.slice(2)
  const year = args.find(a => a.startsWith('--year='))?.split('=')[1] || null
  const workers = parseInt(args.find(a => a.startsWith('--workers='))?.split('=')[1] || '8', 10)
  const timeout = parseInt(args.find(a => a.startsWith('--timeout='))?.split('=')[1] || '15000', 10)

  const result = runTests({ year, workers, timeout })
  console.log(JSON.stringify({ total: result.results.length, passed: result.results.filter(r => r.status === 'passed').length, failed: result.results.filter(r => r.status === 'failed').length, duration: result.duration }, null, 2))
}

module.exports = { runTests }
