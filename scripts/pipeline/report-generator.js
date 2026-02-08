/**
 * Pipeline Report Generator
 *
 * Produces a single progressive HTML report updated after each phase.
 * Includes summary cards, filter buttons, expandable per-test details,
 * quality scores, healer logs, and action points.
 */

const fs = require('fs')
const path = require('path')
const { PIPELINE_RESULTS_DIR, esc, formatDuration, YEAR_GROUPS, getScreenshotPath } = require('./utils')
const { DIMENSIONS } = require('./quality-criteria')

const REPORT_PATH = path.join(PIPELINE_RESULTS_DIR, 'pipeline-report.html')
const ACTION_POINTS_PATH = path.join(PIPELINE_RESULTS_DIR, 'action-points.json')

/**
 * Generate or update the pipeline report
 */
function generateReport(data) {
  const {
    phase1Results = [],
    phase2Results = [],
    phase3Results = [],
    startTime,
    currentPhase = 0,
    opts = {}
  } = data

  fs.mkdirSync(PIPELINE_RESULTS_DIR, { recursive: true })

  // Merge all data into unified per-test records
  const tests = buildUnifiedResults(phase1Results, phase2Results, phase3Results)

  // Classify
  const green = tests.filter(t => t.classification === 'GREEN')
  const amber = tests.filter(t => t.classification === 'AMBER')
  const red = tests.filter(t => t.classification === 'RED')

  const firstPassPassed = phase1Results.filter(r => r.status === 'passed').length
  const firstPassFailed = phase1Results.filter(r => r.status === 'failed').length
  const healerFixed = phase2Results.filter(r => r.afterStatus === 'passed').length
  const totalPassed = tests.filter(t => t.testStatus === 'passed').length
  const totalFailed = tests.filter(t => t.testStatus === 'failed').length

  const qualityAssessed = phase3Results.length
  const qualityPass = phase3Results.filter(r => r.classification === 'GREEN').length
  const qualityFail = phase3Results.filter(r => r.classification !== 'GREEN').length

  const duration = startTime ? Date.now() - startTime : 0

  // Build action points
  const actionPoints = buildActionPoints(tests)
  fs.writeFileSync(ACTION_POINTS_PATH, JSON.stringify(actionPoints, null, 2))

  // Generate HTML
  const html = buildHTML({
    tests, green, amber, red,
    firstPassPassed, firstPassFailed, healerFixed,
    healerTotal: phase2Results.length,
    totalPassed, totalFailed,
    qualityAssessed, qualityPass, qualityFail,
    duration, currentPhase, actionPoints, opts
  })

  fs.writeFileSync(REPORT_PATH, html)
  return REPORT_PATH
}

function buildUnifiedResults(phase1, phase2, phase3) {
  const tests = []
  const healerMap = new Map(phase2.map(r => [r.slug || r.testId, r]))
  const qualityMap = new Map(phase3.map(r => [r.slug, r]))

  for (const t of phase1) {
    const healer = healerMap.get(t.slug) || healerMap.get(t.testId) || null
    const quality = qualityMap.get(t.slug) || null
    const testPassed = healer ? healer.afterStatus === 'passed' : t.status === 'passed'

    let classification = 'RED'
    if (testPassed && quality) {
      classification = quality.classification
    } else if (testPassed && !quality) {
      classification = 'GREEN' // No quality data yet means pending
    }

    tests.push({
      slug: t.slug,
      testId: t.testId,
      title: t.title,
      file: t.file,
      yearGroup: t.yearGroup,
      testStatus: testPassed ? 'passed' : 'failed',
      firstPassStatus: t.status,
      testDuration: t.duration,
      error: t.error,
      healer,
      quality,
      classification,
      qualityScore: quality?.finalScore ?? null
    })
  }

  return tests
}

function buildActionPoints(tests) {
  const points = []

  for (const t of tests) {
    if (t.classification === 'RED' && t.testStatus === 'failed') {
      points.push({
        priority: 'P0',
        slug: t.slug,
        yearGroup: t.yearGroup,
        issue: 'Test failed — healer could not fix',
        score: null,
        error: t.error?.slice(0, 200),
        recommendation: 'Manual investigation needed'
      })
    }

    if (t.quality && t.quality.autoFails?.length > 0) {
      for (const af of t.quality.autoFails) {
        points.push({
          priority: 'P0',
          slug: t.slug,
          yearGroup: t.yearGroup,
          issue: `Auto-fail: ${af.description || af.id}`,
          score: t.quality.finalScore,
          recommendation: `Fix ${af.id} condition`
        })
      }
    }

    if (t.quality && t.quality.finalScore < 80 && t.quality.finalScore > 0) {
      points.push({
        priority: 'P1',
        slug: t.slug,
        yearGroup: t.yearGroup,
        issue: `Low quality score: ${t.quality.finalScore}`,
        score: t.quality.finalScore,
        failingDimensions: t.quality.dimensions?.filter(d => d.score < 7).map(d => d.id) || [],
        recommendation: t.quality.actionPoints?.join('; ') || 'Review worksheet quality'
      })
    } else if (t.quality && t.quality.finalScore >= 80 && t.quality.finalScore < 95) {
      points.push({
        priority: 'P2',
        slug: t.slug,
        yearGroup: t.yearGroup,
        issue: `Near-production quality: ${t.quality.finalScore}`,
        score: t.quality.finalScore,
        failingDimensions: t.quality.dimensions?.filter(d => d.score < 8).map(d => d.id) || [],
        recommendation: t.quality.actionPoints?.join('; ') || 'Minor improvements needed'
      })
    }
  }

  // Sort by priority
  const priorityOrder = { P0: 0, P1: 1, P2: 2 }
  points.sort((a, b) => (priorityOrder[a.priority] ?? 99) - (priorityOrder[b.priority] ?? 99))

  return points
}

function buildHTML(data) {
  const {
    tests, green, amber, red,
    firstPassPassed, firstPassFailed, healerFixed,
    healerTotal = 0,
    totalPassed, totalFailed,
    qualityAssessed, qualityPass, qualityFail,
    duration, currentPhase, actionPoints, opts
  } = data

  const total = tests.length
  const greenPct = total > 0 ? ((green.length / total) * 100).toFixed(1) : 0
  const amberPct = total > 0 ? ((amber.length / total) * 100).toFixed(1) : 0
  const redPct = total > 0 ? ((red.length / total) * 100).toFixed(1) : 0

  // Build year group options
  const yearGroups = [...new Set(tests.map(t => t.yearGroup))].sort()

  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8">
<title>Pipeline Report</title>
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0f172a; color: #e2e8f0; padding: 24px; }
.container { max-width: 1400px; margin: 0 auto; }

/* Header */
.header { margin-bottom: 32px; }
.header h1 { font-size: 28px; font-weight: 700; color: #f8fafc; margin-bottom: 8px; }
.header-meta { display: flex; gap: 24px; font-size: 14px; color: #94a3b8; }
.phase-indicator { display: inline-flex; gap: 8px; align-items: center; }
.phase-dot { width: 10px; height: 10px; border-radius: 50%; }
.phase-dot.done { background: #22c55e; }
.phase-dot.active { background: #f59e0b; animation: pulse 1.5s infinite; }
.phase-dot.pending { background: #475569; }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }

/* Summary Bar */
.summary-bar { display: grid; grid-template-columns: repeat(3, 1fr) 2fr; gap: 16px; margin-bottom: 32px; }
.stat-card { background: #1e293b; border-radius: 12px; padding: 20px; border: 1px solid #334155; }
.stat-card.green { border-color: #22c55e; }
.stat-card.amber { border-color: #f59e0b; }
.stat-card.red { border-color: #ef4444; }
.stat-count { font-size: 42px; font-weight: 800; line-height: 1; }
.stat-card.green .stat-count { color: #22c55e; }
.stat-card.amber .stat-count { color: #f59e0b; }
.stat-card.red .stat-count { color: #ef4444; }
.stat-label { font-size: 13px; color: #94a3b8; margin-top: 4px; }
.stat-pct { font-size: 14px; color: #64748b; }

/* Progress bar in stat card */
.progress-bar-bg { height: 8px; background: #334155; border-radius: 4px; margin-top: 12px; overflow: hidden; display: flex; }
.progress-segment { height: 100%; transition: width 0.3s; }
.progress-segment.green { background: #22c55e; }
.progress-segment.amber { background: #f59e0b; }
.progress-segment.red { background: #ef4444; }

/* Pipeline stats */
.pipeline-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.pipeline-stat { text-align: center; }
.pipeline-stat-value { font-size: 20px; font-weight: 700; color: #f8fafc; }
.pipeline-stat-label { font-size: 11px; color: #64748b; text-transform: uppercase; }

/* Filters */
.filters { display: flex; gap: 8px; margin-bottom: 24px; flex-wrap: wrap; align-items: center; }
.filter-btn { padding: 6px 14px; border-radius: 6px; border: 1px solid #334155; background: #1e293b; color: #94a3b8; cursor: pointer; font-size: 13px; transition: all 0.15s; }
.filter-btn:hover { border-color: #64748b; color: #e2e8f0; }
.filter-btn.active { background: #334155; color: #f8fafc; border-color: #64748b; }
.filter-btn.green.active { border-color: #22c55e; color: #22c55e; }
.filter-btn.amber.active { border-color: #f59e0b; color: #f59e0b; }
.filter-btn.red.active { border-color: #ef4444; color: #ef4444; }
select.filter-select { padding: 6px 10px; border-radius: 6px; border: 1px solid #334155; background: #1e293b; color: #94a3b8; font-size: 13px; cursor: pointer; }
.filter-sep { width: 1px; height: 24px; background: #334155; }
.expand-btn { margin-left: auto; }

/* Test rows */
.test-table { width: 100%; border-collapse: separate; border-spacing: 0; }
.test-table th { padding: 10px 16px; text-align: left; font-size: 12px; text-transform: uppercase; color: #64748b; border-bottom: 1px solid #334155; position: sticky; top: 0; background: #0f172a; z-index: 1; }
.test-row { cursor: pointer; transition: background 0.1s; }
.test-row:hover { background: #1e293b; }
.test-row td { padding: 10px 16px; border-bottom: 1px solid #1e293b; font-size: 14px; }
.test-row.green td:first-child { border-left: 3px solid #22c55e; }
.test-row.amber td:first-child { border-left: 3px solid #f59e0b; }
.test-row.red td:first-child { border-left: 3px solid #ef4444; }

.badge { padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: 600; }
.badge.pass { background: #052e16; color: #22c55e; }
.badge.fail { background: #450a0a; color: #ef4444; }
.badge.fixed { background: #422006; color: #f59e0b; }
.badge.green { background: #052e16; color: #22c55e; }
.badge.amber { background: #422006; color: #f59e0b; }
.badge.red { background: #450a0a; color: #ef4444; }
.badge.pending { background: #1e293b; color: #64748b; }

/* Expandable details */
.detail-row { display: none; }
.detail-row.expanded { display: table-row; }
.detail-cell { padding: 16px; background: #1e293b; }
.detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.detail-section { background: #0f172a; border-radius: 8px; padding: 16px; border: 1px solid #334155; }
.detail-section h4 { font-size: 13px; color: #94a3b8; text-transform: uppercase; margin-bottom: 12px; }

/* Dimension scores */
.dim-row { display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px solid #1e293b; }
.dim-row:last-child { border-bottom: none; }
.dim-name { font-size: 13px; color: #cbd5e1; }
.dim-weight { font-size: 11px; color: #64748b; }
.dim-score { font-size: 14px; font-weight: 700; }
.dim-score.high { color: #22c55e; }
.dim-score.mid { color: #f59e0b; }
.dim-score.low { color: #ef4444; }
.dim-bar { width: 60px; height: 6px; background: #334155; border-radius: 3px; overflow: hidden; margin-left: 8px; display: inline-block; vertical-align: middle; }
.dim-bar-fill { height: 100%; border-radius: 3px; }
.dim-bar-fill.high { background: #22c55e; }
.dim-bar-fill.mid { background: #f59e0b; }
.dim-bar-fill.low { background: #ef4444; }

/* Screenshot thumbnail */
.screenshot-thumb { max-width: 100%; border-radius: 8px; border: 1px solid #334155; cursor: pointer; }
.screenshot-thumb:hover { border-color: #64748b; }

/* Error box */
.error-box { background: #450a0a; border: 1px solid #7f1d1d; border-radius: 8px; padding: 12px; font-family: monospace; font-size: 12px; color: #fca5a5; white-space: pre-wrap; word-break: break-all; max-height: 200px; overflow: auto; }

/* Healer box */
.healer-box { background: #422006; border: 1px solid #78350f; border-radius: 8px; padding: 12px; font-size: 13px; color: #fde68a; }

/* Action Points */
.action-section { background: #1e293b; border-radius: 12px; padding: 24px; margin-top: 32px; border: 1px solid #334155; }
.action-section h2 { font-size: 18px; color: #f8fafc; margin-bottom: 16px; }
.action-item { display: flex; gap: 12px; padding: 12px; border-radius: 8px; margin-bottom: 8px; align-items: flex-start; }
.action-item.P0 { background: #450a0a; border: 1px solid #7f1d1d; }
.action-item.P1 { background: #422006; border: 1px solid #78350f; }
.action-item.P2 { background: #172554; border: 1px solid #1e3a5f; }
.action-priority { font-weight: 800; font-size: 13px; min-width: 30px; }
.action-item.P0 .action-priority { color: #ef4444; }
.action-item.P1 .action-priority { color: #f59e0b; }
.action-item.P2 .action-priority { color: #3b82f6; }
.action-detail { flex: 1; }
.action-slug { font-weight: 600; color: #f8fafc; font-size: 14px; }
.action-issue { font-size: 13px; color: #94a3b8; margin-top: 2px; }
.action-score { font-weight: 700; font-size: 16px; min-width: 40px; text-align: right; }
</style>
</head><body>
<div class="container">

<!-- Header -->
<div class="header">
  <h1>Pipeline Report</h1>
  <div class="header-meta">
    <span>Generated: ${new Date().toLocaleString()}</span>
    <span>Duration: ${formatDuration(duration)}</span>
    <span>Tests: ${total}</span>
    <span class="phase-indicator">
      <span class="phase-dot ${currentPhase >= 1 ? 'done' : 'pending'}"></span> Tests
      <span class="phase-dot ${currentPhase >= 2 ? 'done' : currentPhase === 2 ? 'active' : 'pending'}"></span> Healer
      <span class="phase-dot ${currentPhase >= 3 ? 'done' : currentPhase === 3 ? 'active' : 'pending'}"></span> Quality
    </span>
  </div>
</div>

<!-- Summary -->
<div class="summary-bar">
  <div class="stat-card green">
    <div class="stat-count">${green.length}</div>
    <div class="stat-label">GREEN</div>
    <div class="stat-pct">${greenPct}%</div>
  </div>
  <div class="stat-card amber">
    <div class="stat-count">${amber.length}</div>
    <div class="stat-label">AMBER</div>
    <div class="stat-pct">${amberPct}%</div>
  </div>
  <div class="stat-card red">
    <div class="stat-count">${red.length}</div>
    <div class="stat-label">RED</div>
    <div class="stat-pct">${redPct}%</div>
  </div>
  <div class="stat-card">
    <div class="progress-bar-bg">
      <div class="progress-segment green" style="width:${greenPct}%"></div>
      <div class="progress-segment amber" style="width:${amberPct}%"></div>
      <div class="progress-segment red" style="width:${redPct}%"></div>
    </div>
    <div class="pipeline-stats" style="margin-top:16px;">
      <div class="pipeline-stat">
        <div class="pipeline-stat-value">${firstPassPassed}</div>
        <div class="pipeline-stat-label">First Pass</div>
      </div>
      <div class="pipeline-stat">
        <div class="pipeline-stat-value">${healerFixed}</div>
        <div class="pipeline-stat-label">Healer Fixed</div>
      </div>
      <div class="pipeline-stat">
        <div class="pipeline-stat-value">${totalFailed}</div>
        <div class="pipeline-stat-label">Still Failing</div>
      </div>
    </div>
    <div class="pipeline-stats" style="margin-top:8px;">
      <div class="pipeline-stat">
        <div class="pipeline-stat-value">${qualityAssessed}</div>
        <div class="pipeline-stat-label">Assessed</div>
      </div>
      <div class="pipeline-stat">
        <div class="pipeline-stat-value">${qualityPass}</div>
        <div class="pipeline-stat-label">Quality Pass</div>
      </div>
      <div class="pipeline-stat">
        <div class="pipeline-stat-value">${qualityFail}</div>
        <div class="pipeline-stat-label">Quality Fail</div>
      </div>
    </div>
  </div>
</div>

<!-- Filters -->
<div class="filters">
  <button class="filter-btn active" onclick="filterStatus('all')">All (${total})</button>
  <button class="filter-btn green" onclick="filterStatus('GREEN')">GREEN (${green.length})</button>
  <button class="filter-btn amber" onclick="filterStatus('AMBER')">AMBER (${amber.length})</button>
  <button class="filter-btn red" onclick="filterStatus('RED')">RED (${red.length})</button>
  <span class="filter-sep"></span>
  <button class="filter-btn" onclick="filterStatus('healer')">Healer (${healerTotal})</button>
  <select class="filter-select" onchange="filterYear(this.value)">
    <option value="all">All Years</option>
    ${yearGroups.map(yg => `<option value="${yg}">${yg}</option>`).join('')}
  </select>
  <button class="filter-btn expand-btn" onclick="toggleAll()">Expand/Collapse All</button>
</div>

<!-- Test Table -->
<table class="test-table">
  <thead>
    <tr>
      <th>Year</th>
      <th>Test</th>
      <th>Run</th>
      <th>Healer</th>
      <th>Quality</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    ${tests.map((t, i) => buildTestRow(t, i)).join('')}
  </tbody>
</table>

<!-- Action Points -->
${actionPoints.length > 0 ? `
<div class="action-section">
  <h2>Action Points (${actionPoints.length})</h2>
  ${actionPoints.map(ap => `
  <div class="action-item ${esc(ap.priority)}">
    <div class="action-priority">${esc(ap.priority)}</div>
    <div class="action-detail">
      <div class="action-slug">${esc(ap.yearGroup)}/${esc(ap.slug)}</div>
      <div class="action-issue">${esc(ap.issue)}${ap.recommendation ? ' — ' + esc(ap.recommendation) : ''}</div>
    </div>
    ${ap.score != null ? `<div class="action-score">${ap.score}</div>` : ''}
  </div>`).join('')}
</div>` : ''}

</div>

<script>
let allExpanded = false;
function filterStatus(status) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (event && event.target) event.target.classList.add('active');
  document.querySelectorAll('.test-row').forEach(row => {
    const detail = row.nextElementSibling;
    if (status === 'all') {
      row.style.display = '';
      if (detail?.classList.contains('detail-row')) detail.style.display = '';
    } else if (status === 'healer') {
      const show = row.dataset.healer === 'true';
      row.style.display = show ? '' : 'none';
      if (detail?.classList.contains('detail-row')) detail.style.display = show ? '' : 'none';
    } else {
      const show = row.dataset.classification === status;
      row.style.display = show ? '' : 'none';
      if (detail?.classList.contains('detail-row')) detail.style.display = show ? '' : 'none';
    }
  });
}
function filterYear(year) {
  document.querySelectorAll('.test-row').forEach(row => {
    const detail = row.nextElementSibling;
    if (year === 'all') {
      row.style.display = '';
      if (detail?.classList.contains('detail-row')) detail.style.display = '';
    } else {
      const show = row.dataset.year === year;
      row.style.display = show ? '' : 'none';
      if (detail?.classList.contains('detail-row')) detail.style.display = show ? '' : 'none';
    }
  });
}
function toggleRow(idx) {
  const detail = document.getElementById('detail-' + idx);
  if (detail) detail.classList.toggle('expanded');
}
function toggleAll() {
  allExpanded = !allExpanded;
  document.querySelectorAll('.detail-row').forEach(r => {
    r.classList.toggle('expanded', allExpanded);
  });
}
</script>
</body></html>`
}

function buildTestRow(t, i) {
  const cls = (t.classification || 'red').toLowerCase()
  const runBadge = t.firstPassStatus === 'passed'
    ? '<span class="badge pass">PASS</span>'
    : '<span class="badge fail">FAIL</span>'

  let healerBadge = '<span class="badge pending">-</span>'
  if (t.healer) {
    healerBadge = t.healer.afterStatus === 'passed'
      ? '<span class="badge fixed">FIXED</span>'
      : '<span class="badge fail">FAILED</span>'
  }

  let qualityBadge = '<span class="badge pending">-</span>'
  if (t.qualityScore != null) {
    const qCls = t.qualityScore >= 95 ? 'green' : t.qualityScore >= 70 ? 'amber' : 'red'
    qualityBadge = `<span class="badge ${qCls}">${t.qualityScore}</span>`
  }

  const statusBadge = `<span class="badge ${cls}">${t.classification || 'PENDING'}</span>`

  // Detail row content
  let detailContent = ''

  // Quality dimensions
  if (t.quality && t.quality.dimensions) {
    const dimsHtml = t.quality.dimensions.map(d => {
      const scoreClass = d.score >= 8 ? 'high' : d.score >= 5 ? 'mid' : 'low'
      const pct = d.score * 10
      const dimDef = DIMENSIONS.find(dd => dd.id === d.id)
      const weight = dimDef ? `${(dimDef.weight * 100).toFixed(0)}%` : ''
      return `<div class="dim-row">
        <div><span class="dim-name">${esc(d.id)}</span> <span class="dim-weight">(${weight})</span></div>
        <div><span class="dim-score ${scoreClass}">${d.score}/10</span>
          <span class="dim-bar"><span class="dim-bar-fill ${scoreClass}" style="width:${pct}%"></span></span>
        </div>
      </div>`
    }).join('')

    detailContent += `<div class="detail-section"><h4>Quality Dimensions</h4>${dimsHtml}</div>`
  }

  // Error / healer info
  let infoContent = ''
  if (t.error) {
    infoContent += `<div style="margin-bottom:12px"><h4 style="font-size:13px;color:#94a3b8;margin-bottom:8px;">Error</h4><div class="error-box">${esc(t.error)}</div></div>`
  }
  if (t.healer) {
    infoContent += `<div><h4 style="font-size:13px;color:#94a3b8;margin-bottom:8px;">Healer</h4><div class="healer-box">${esc(t.healer.fixDescription || 'No description')}</div></div>`
  }
  if (t.quality?.actionPoints?.length) {
    infoContent += `<div style="margin-top:12px"><h4 style="font-size:13px;color:#94a3b8;margin-bottom:8px;">Action Points</h4><ul style="padding-left:16px;color:#94a3b8;font-size:13px;">${t.quality.actionPoints.map(ap => `<li>${esc(ap)}</li>`).join('')}</ul></div>`
  }
  if (infoContent) {
    detailContent += `<div class="detail-section">${infoContent}</div>`
  }

  // Screenshot — check quality data first, then fall back to direct file lookup
  let screenshotPath = t.quality?.screenshotPath
  if (!screenshotPath && t.slug) {
    const fallback = getScreenshotPath(t.slug)
    if (fs.existsSync(fallback)) screenshotPath = fallback
  }
  if (screenshotPath) {
    try {
      const imgData = fs.readFileSync(screenshotPath).toString('base64')
      detailContent += `<div class="detail-section" style="grid-column: 1 / -1;"><h4>Screenshot</h4><img class="screenshot-thumb" src="data:image/png;base64,${imgData}" alt="${esc(t.slug)}" /></div>`
    } catch {
      // Screenshot not available
    }
  }

  return `<tr class="test-row ${cls}" data-classification="${t.classification || ''}" data-year="${t.yearGroup}" data-healer="${!!t.healer}" onclick="toggleRow(${i})">
    <td>${esc(t.yearGroup)}</td>
    <td><strong>${esc(t.slug || t.title)}</strong></td>
    <td>${runBadge}</td>
    <td>${healerBadge}</td>
    <td>${qualityBadge}</td>
    <td>${statusBadge}</td>
  </tr>
  <tr class="detail-row" id="detail-${i}">
    <td colspan="6" class="detail-cell">
      <div class="detail-grid">${detailContent || '<em style="color:#64748b">No details available</em>'}</div>
    </td>
  </tr>`
}

module.exports = { generateReport, REPORT_PATH }
