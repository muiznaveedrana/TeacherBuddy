#!/usr/bin/env node
/**
 * Finalize Report
 *
 * Consumes Phase 3 assessment results (written by Claude Code in-session)
 * and generates the final pipeline report with all 3 phases.
 *
 * Usage:
 *   node scripts/pipeline/finalize-report.js
 *   node scripts/pipeline/finalize-report.js --open-report
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')
const { PIPELINE_RESULTS_DIR, log, formatDuration } = require('./utils')
const { generateReport, REPORT_PATH } = require('./report-generator')

function main() {
  const openReport = process.argv.includes('--open-report')

  // Read Phase 1+2 data saved by orchestrator
  const dataPath = path.join(PIPELINE_RESULTS_DIR, 'phase1-phase2-data.json')
  if (!fs.existsSync(dataPath)) {
    log('Finalize', 'ERROR: phase1-phase2-data.json not found. Run the orchestrator first.')
    process.exit(1)
  }

  const { phase1Results, phase2Results, startTime, opts } = JSON.parse(
    fs.readFileSync(dataPath, 'utf-8')
  )

  // Read Phase 3 results written by Claude Code
  const phase3Path = path.join(PIPELINE_RESULTS_DIR, 'phase3-results.json')
  if (!fs.existsSync(phase3Path)) {
    log('Finalize', 'ERROR: phase3-results.json not found. Complete in-session assessment first.')
    process.exit(1)
  }

  const phase3Results = JSON.parse(fs.readFileSync(phase3Path, 'utf-8'))

  log('Finalize', `Phase 1 results: ${phase1Results.length} tests`)
  log('Finalize', `Phase 2 results: ${phase2Results.length} healer attempts`)
  log('Finalize', `Phase 3 results: ${phase3Results.length} quality assessments`)

  // Summarize quality
  const green = phase3Results.filter(r => r.classification === 'GREEN').length
  const amber = phase3Results.filter(r => r.classification === 'AMBER').length
  const red = phase3Results.filter(r => r.classification === 'RED').length
  log('Finalize', `Quality: ${green} GREEN, ${amber} AMBER, ${red} RED`)

  // Generate final report with all 3 phases
  generateReport({
    phase1Results,
    phase2Results,
    phase3Results,
    startTime,
    currentPhase: 3,
    opts
  })

  log('Finalize', `Final report: ${REPORT_PATH}`)

  if (openReport) {
    try {
      const openCmd = process.platform === 'win32' ? 'start' : process.platform === 'darwin' ? 'open' : 'xdg-open'
      execSync(`${openCmd} "${REPORT_PATH}"`)
    } catch {
      log('Finalize', 'Could not open report automatically')
    }
  }
}

main()
