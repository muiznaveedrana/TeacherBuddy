/**
 * Pipeline Utilities
 * Slug extraction, path helpers, logging, year group detection
 */

const fs = require('fs')
const path = require('path')

const INTERACTIVE_TESTS_DIR = path.resolve(__dirname, '../../tests/e2e/interactive')
const QUALITY_SCREENSHOTS_DIR = path.resolve(__dirname, '../../test-results/quality-screenshots')
const PIPELINE_RESULTS_DIR = path.resolve(__dirname, '../../pipeline-results')

const YEAR_GROUPS = ['reception', 'year1', 'year2', 'year3', 'year4', 'year5', 'year6']

/**
 * Extract WORKSHEET_SLUG from a test file's content
 */
function extractSlug(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  const match = content.match(/const WORKSHEET_SLUG\s*=\s*['"]([^'"]+)['"]/)
  return match ? match[1] : null
}

/**
 * Detect year group from file path
 */
function getYearGroup(filePath) {
  const normalized = filePath.replace(/\\/g, '/')
  for (const yg of YEAR_GROUPS) {
    // Match both absolute (/interactive/year1/) and relative (interactive/year1/) paths
    if (normalized.includes(`interactive/${yg}/`)) return yg
  }
  return 'unknown'
}

/**
 * Get all test files, optionally filtered by year group
 */
function getTestFiles(yearFilter) {
  const dirs = yearFilter ? [yearFilter] : YEAR_GROUPS
  const files = []

  for (const yg of dirs) {
    const dirPath = path.join(INTERACTIVE_TESTS_DIR, yg)
    if (!fs.existsSync(dirPath)) continue
    const entries = fs.readdirSync(dirPath).filter(f => f.endsWith('.spec.ts'))
    for (const entry of entries) {
      files.push(path.join(dirPath, entry))
    }
  }

  return files
}

/**
 * Get the quality screenshot path for a given slug
 */
function getScreenshotPath(slug) {
  return path.join(QUALITY_SCREENSHOTS_DIR, `${slug}.png`)
}

/**
 * Ensure directories exist
 */
function ensureDirs() {
  fs.mkdirSync(QUALITY_SCREENSHOTS_DIR, { recursive: true })
  fs.mkdirSync(PIPELINE_RESULTS_DIR, { recursive: true })
}

/**
 * Format duration as human-readable string
 */
function formatDuration(ms) {
  if (ms < 1000) return `${ms}ms`
  const secs = Math.floor(ms / 1000)
  if (secs < 60) return `${secs}s`
  const mins = Math.floor(secs / 60)
  const remainSecs = secs % 60
  if (mins < 60) return `${mins}m ${remainSecs}s`
  const hours = Math.floor(mins / 60)
  const remainMins = mins % 60
  return `${hours}h ${remainMins}m`
}

/**
 * Log with timestamp and phase prefix
 */
function log(phase, msg) {
  const ts = new Date().toISOString().slice(11, 19)
  console.log(`[${ts}] [${phase}] ${msg}`)
}

/**
 * Parse CLI arguments
 */
function parseArgs() {
  const args = process.argv.slice(2)
  const opts = {
    year: null,
    skipHealer: false,
    skipQuality: false,
    openReport: false,
    workers: 4,
    qualityParallel: 4,
    timeout: 30000
  }

  for (const arg of args) {
    if (arg.startsWith('--year=')) opts.year = arg.split('=')[1]
    else if (arg === '--skip-healer') opts.skipHealer = true
    else if (arg === '--skip-quality') opts.skipQuality = true
    else if (arg === '--open-report') opts.openReport = true
    else if (arg.startsWith('--workers=')) opts.workers = parseInt(arg.split('=')[1], 10)
    else if (arg.startsWith('--quality-parallel=')) opts.qualityParallel = parseInt(arg.split('=')[1], 10)
    else if (arg.startsWith('--timeout=')) opts.timeout = parseInt(arg.split('=')[1], 10)
  }

  return opts
}

/**
 * Escape HTML entities
 */
function esc(s) {
  return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

/**
 * Group items by a key function
 */
function groupBy(items, keyFn) {
  const groups = {}
  for (const item of items) {
    const key = keyFn(item)
    if (!groups[key]) groups[key] = []
    groups[key].push(item)
  }
  return groups
}

module.exports = {
  INTERACTIVE_TESTS_DIR,
  QUALITY_SCREENSHOTS_DIR,
  PIPELINE_RESULTS_DIR,
  YEAR_GROUPS,
  extractSlug,
  getYearGroup,
  getTestFiles,
  getScreenshotPath,
  ensureDirs,
  formatDuration,
  log,
  parseArgs,
  esc,
  groupBy
}
