#!/usr/bin/env node
/**
 * Pipeline Orchestrator
 *
 * Single entry point that coordinates all pipeline phases:
 *   Phase 0: Prepare (add screenshot capture to test files — one-time)
 *   Phase 1: Run Tests (Playwright, parallel, JSON results)
 *   Phase 2: Heal Failures (playwright-test-healer agent)
 *   Phase 3: Quality Assessment (Claude Code vision, 7 dimensions)
 *   Report: Progressive HTML + action-points.json
 *
 * Usage:
 *   node scripts/pipeline-orchestrator.js                         # Full pipeline
 *   node scripts/pipeline-orchestrator.js --year=reception        # Single year group
 *   node scripts/pipeline-orchestrator.js --skip-healer           # Skip Phase 2
 *   node scripts/pipeline-orchestrator.js --skip-quality          # Skip Phase 3
 *   node scripts/pipeline-orchestrator.js --open-report           # Open report when done
 *   node scripts/pipeline-orchestrator.js --workers=4 --quality-parallel=2
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')
const { parseArgs, log, ensureDirs, formatDuration, getScreenshotPath, INTERACTIVE_TESTS_DIR, PIPELINE_RESULTS_DIR } = require('./pipeline/utils')
const { main: addScreenshots } = require('./pipeline/add-quality-screenshots')
const { runTests } = require('./pipeline/phase1-runner')
const { healTests, regressionCheck } = require('./pipeline/phase2-healer')
const { generateReport, REPORT_PATH } = require('./pipeline/report-generator')

async function main() {
  const opts = parseArgs()
  const startTime = Date.now()

  log('Pipeline', '='.repeat(60))
  log('Pipeline', 'WORKSHEET TEST PIPELINE')
  log('Pipeline', '='.repeat(60))
  log('Pipeline', `Year filter: ${opts.year || 'all'}`)
  log('Pipeline', `Workers: ${opts.workers} | Quality parallel: ${opts.qualityParallel}`)
  log('Pipeline', `Skip healer: ${opts.skipHealer} | Skip quality: ${opts.skipQuality}`)
  log('Pipeline', '')

  ensureDirs()

  // ------------------------------------------------------------------
  // Phase 0: Prepare — ensure screenshot lines exist in test files
  // ------------------------------------------------------------------
  log('Pipeline', 'PHASE 0: PREPARE')
  log('Pipeline', '-'.repeat(40))

  const phase0Result = addScreenshots()
  if (phase0Result.added > 0) {
    log('Pipeline', `Added screenshot lines to ${phase0Result.added} files`)
  } else {
    log('Pipeline', `All files already have screenshot lines (${phase0Result.alreadyPresent} checked)`)
  }

  // Generate initial report
  generateReport({ startTime, currentPhase: 0, opts })
  log('Pipeline', '')

  // ------------------------------------------------------------------
  // Phase 1: Run Tests
  // ------------------------------------------------------------------
  log('Pipeline', 'PHASE 1: RUN TESTS')
  log('Pipeline', '-'.repeat(40))

  const phase1 = runTests({
    year: opts.year,
    workers: opts.workers,
    timeout: opts.timeout
  })

  const passed = phase1.results.filter(r => r.status === 'passed')
  const failed = phase1.results.filter(r => r.status === 'failed')

  log('Pipeline', `First pass: ${passed.length} passed, ${failed.length} failed`)

  // Back up Phase 1 results so Phase 2 regression check doesn't overwrite them
  if (phase1.rawJson) {
    fs.writeFileSync(
      path.join(PIPELINE_RESULTS_DIR, 'phase1-results.json'),
      JSON.stringify(phase1.rawJson, null, 2)
    )
  }

  // Update report after Phase 1
  generateReport({
    phase1Results: phase1.results,
    startTime,
    currentPhase: 1,
    opts
  })
  log('Pipeline', '')

  // ------------------------------------------------------------------
  // Phase 2: Healer
  // ------------------------------------------------------------------
  let phase2Results = []

  if (!opts.skipHealer && failed.length > 0) {
    log('Pipeline', 'PHASE 2: HEALER')
    log('Pipeline', '-'.repeat(40))

    phase2Results = healTests(failed)

    // Regression check
    const testPath = opts.year
      ? path.join(INTERACTIVE_TESTS_DIR, opts.year)
      : INTERACTIVE_TESTS_DIR

    const regression = regressionCheck(testPath, opts.workers)
    if (!regression.passed) {
      log('Pipeline', 'WARNING: Regression detected after healer — check results')
    }

    // Update report after Phase 2
    generateReport({
      phase1Results: phase1.results,
      phase2Results,
      startTime,
      currentPhase: 2,
      opts
    })
  } else if (opts.skipHealer) {
    log('Pipeline', 'PHASE 2: SKIPPED (--skip-healer)')
    generateReport({
      phase1Results: phase1.results,
      startTime,
      currentPhase: 2,
      opts
    })
  } else {
    log('Pipeline', 'PHASE 2: SKIPPED (no failures)')
    generateReport({
      phase1Results: phase1.results,
      startTime,
      currentPhase: 2,
      opts
    })
  }
  log('Pipeline', '')

  // ------------------------------------------------------------------
  // Phase 3: Write assessment manifest (assessed in-session by Claude Code)
  // ------------------------------------------------------------------
  if (!opts.skipQuality) {
    log('Pipeline', 'PHASE 3: PREPARING ASSESSMENT MANIFEST')
    log('Pipeline', '-'.repeat(40))

    // Determine passing tests (original + healer-fixed)
    const healerFixed = new Set(
      phase2Results.filter(r => r.afterStatus === 'passed').map(r => r.slug || r.testId)
    )
    const allPassing = phase1.results.filter(r => {
      if (r.status === 'passed') return true
      return healerFixed.has(r.slug) || healerFixed.has(r.testId)
    })

    // Filter to tests that have quality screenshots
    const assessable = allPassing.filter(test => {
      const screenshotPath = getScreenshotPath(test.slug)
      return fs.existsSync(screenshotPath)
    })

    // Write manifest for Claude Code in-session assessment
    const manifest = assessable.map(test => ({
      slug: test.slug,
      yearGroup: test.yearGroup,
      testId: test.testId,
      title: test.title,
      screenshotPath: getScreenshotPath(test.slug)
    }))

    const manifestPath = path.join(PIPELINE_RESULTS_DIR, 'pending-assessments.json')
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))

    // Also save phase1 + phase2 results for finalize-report.js
    fs.writeFileSync(
      path.join(PIPELINE_RESULTS_DIR, 'phase1-phase2-data.json'),
      JSON.stringify({ phase1Results: phase1.results, phase2Results, startTime, opts }, null, 2)
    )

    log('Pipeline', `${assessable.length} worksheets have screenshots (${allPassing.length - assessable.length} skipped — no screenshot)`)
    log('Pipeline', `Manifest written: ${manifestPath}`)
    log('Pipeline', '')
    log('Pipeline', `Phase 3 ready — ${assessable.length} worksheets pending assessment.`)
    log('Pipeline', `Use /pipeline to assess in Claude Code (in-session vision).`)
  } else {
    log('Pipeline', 'PHASE 3: SKIPPED (--skip-quality)')
  }

  // Generate interim report (Phase 2 complete, Phase 3 pending)
  generateReport({
    phase1Results: phase1.results,
    phase2Results,
    phase3Results: [],
    startTime,
    currentPhase: 2,
    opts
  })

  // ------------------------------------------------------------------
  // Summary
  // ------------------------------------------------------------------
  const totalDuration = Date.now() - startTime

  log('Pipeline', '')
  log('Pipeline', '='.repeat(60))
  log('Pipeline', 'PHASES 0-2 COMPLETE')
  log('Pipeline', '='.repeat(60))
  log('Pipeline', `Total duration: ${formatDuration(totalDuration)}`)
  log('Pipeline', `Tests: ${phase1.results.length}`)
  log('Pipeline', `First pass: ${passed.length} passed, ${failed.length} failed`)
  if (phase2Results.length > 0) {
    const healed = phase2Results.filter(r => r.afterStatus === 'passed').length
    log('Pipeline', `Healer: ${healed} fixed, ${phase2Results.length - healed} still failing`)
  }
  if (!opts.skipQuality) {
    const manifestPath = path.join(PIPELINE_RESULTS_DIR, 'pending-assessments.json')
    if (fs.existsSync(manifestPath)) {
      const pending = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))
      log('Pipeline', `Quality: ${pending.length} worksheets pending in-session assessment`)
    }
  }
  log('Pipeline', `Interim report: ${REPORT_PATH}`)

  // Open report if requested
  if (opts.openReport) {
    try {
      const openCmd = process.platform === 'win32' ? 'start' : process.platform === 'darwin' ? 'open' : 'xdg-open'
      execSync(`${openCmd} "${REPORT_PATH}"`)
    } catch {
      log('Pipeline', 'Could not open report automatically')
    }
  }
}

main().catch(err => {
  log('Pipeline', `FATAL ERROR: ${err.message}`)
  console.error(err)
  process.exit(1)
})
