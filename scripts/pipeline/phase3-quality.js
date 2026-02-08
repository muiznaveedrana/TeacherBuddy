/**
 * Phase 3: Quality Assessment (stub)
 *
 * Phase 3 is now performed in-session by Claude Code using built-in vision.
 * The orchestrator writes a manifest (pending-assessments.json), Claude Code
 * reads screenshots and scores them, then finalize-report.js generates the
 * final report.
 *
 * Scoring utilities live in quality-criteria.js:
 *   - calculateOverallScore(dimensionScores)
 *   - applyAutoFails(overallScore, autoFails)
 *   - classify(overallScore, autoFails, testPassed)
 *   - buildVisionPrompt(screenshotPath, yearGroup, slug)
 */

// Re-export scoring functions for any callers
module.exports = require('./quality-criteria')
