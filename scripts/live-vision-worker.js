#!/usr/bin/env node

/**
 * LIVE VISION ASSESSMENT WORKER
 *
 * Continuously monitors the pending-queue.json for new worksheets
 * and processes them in parallel with worksheet generation.
 *
 * WORKFLOW:
 * 1. Poll pending-queue.json every 3 seconds
 * 2. Pick up pending screenshots
 * 3. Assess using Claude Vision API
 * 4. Write results to vision-assessment-results.json incrementally
 * 5. Check for generation-complete.json marker
 * 6. Exit when queue is empty AND generation is complete
 * 7. Generate final HTML report
 *
 * PERFORMANCE IMPROVEMENT:
 * - Traditional: Generation (6min) → Assessment (1.5min) = 7.5min total
 * - Parallel: Generation (6min) + Assessment (overlapped) = ~6.5min total
 * - Savings: 15% faster + immediate report availability
 *
 * Usage:
 *   node scripts/live-vision-worker.js <SESSION_DIR>
 *
 * Example:
 *   # Terminal 1: Start live worker
 *   node scripts/live-vision-worker.js ./worksheet-quality-reports/multi-batch-sessions/multi-batch-all-reception-2025-...
 *
 *   # Terminal 2: Start generation
 *   node scripts/batch-parallel-agent.js all-reception
 */

const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');

// Import the vision assessor
const ClaudeVisionAssessor = require('./services/claude-vision-assessor');

// ============================================================================
// CONFIGURATION
// ============================================================================

const POLL_INTERVAL_MS = 3000; // Poll every 3 seconds
const MAX_RETRIES = 3;

// ============================================================================
// CLI ARGUMENT PARSING
// ============================================================================

function parseArgs() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('\n❌ Error: SESSION_DIR is required\n');
    console.log('Usage: node scripts/live-vision-worker.js <SESSION_DIR>\n');
    console.log('Example:');
    console.log('  node scripts/live-vision-worker.js ./worksheet-quality-reports/multi-batch-sessions/multi-batch-all-reception-2025-...\n');
    process.exit(1);
  }

  const sessionDir = path.resolve(args[0]);

  if (!fs.existsSync(sessionDir)) {
    console.error(`\n❌ Error: Session directory does not exist: ${sessionDir}\n`);
    process.exit(1);
  }

  return { sessionDir };
}

const { sessionDir } = parseArgs();

const queuePath = path.join(sessionDir, 'pending-queue.json');
const resultsPath = path.join(sessionDir, 'vision-assessment-results.json');
const completionMarkerPath = path.join(sessionDir, 'generation-complete.json');

// ============================================================================
// STATE MANAGEMENT
// ============================================================================

const workerState = {
  startTime: performance.now(),
  totalProcessed: 0,
  totalSuccess: 0,
  totalFailed: 0,
  currentlyProcessing: new Set(),
  results: []
};

// ============================================================================
// QUEUE MANAGEMENT
// ============================================================================

function loadQueue() {
  if (!fs.existsSync(queuePath)) {
    return [];
  }
  try {
    return JSON.parse(fs.readFileSync(queuePath, 'utf8'));
  } catch (error) {
    console.error(`⚠️  Error reading queue: ${error.message}`);
    return [];
  }
}

function saveQueue(queue) {
  try {
    fs.writeFileSync(queuePath, JSON.stringify(queue, null, 2));
  } catch (error) {
    console.error(`⚠️  Error saving queue: ${error.message}`);
  }
}

function loadResults() {
  if (!fs.existsSync(resultsPath)) {
    return [];
  }
  try {
    return JSON.parse(fs.readFileSync(resultsPath, 'utf8'));
  } catch (error) {
    console.error(`⚠️  Error reading results: ${error.message}`);
    return [];
  }
}

function saveResults(results) {
  try {
    fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
  } catch (error) {
    console.error(`⚠️  Error saving results: ${error.message}`);
  }
}

function isGenerationComplete() {
  return fs.existsSync(completionMarkerPath);
}

// ============================================================================
// ASSESSMENT PROCESSING
// ============================================================================

async function processScreenshot(item, assessor) {
  const startTime = performance.now();

  try {
    console.log(`   📸 Assessing ${item.config.subtopic} - WS ${item.worksheetId}...`);

    // Assess using Claude Vision
    const visionResult = await assessor.assessWorksheetVisually(
      item.screenshotPath,
      {
        configId: item.configId,
        yearGroup: item.config.yearGroup,
        topic: item.config.topic,
        subtopic: item.config.subtopic,
        numQuestions: item.config.numQuestions || 5
      }
    );

    const endTime = performance.now();
    const assessmentTime = (endTime - startTime) / 1000;

    console.log(`   ✅ ${item.config.subtopic} - WS ${item.worksheetId} assessed in ${assessmentTime.toFixed(2)}s`);

    return {
      ...item,
      visionResult,
      assessmentTime,
      processedAt: Date.now(),
      status: 'completed'
    };

  } catch (error) {
    const endTime = performance.now();
    const assessmentTime = (endTime - startTime) / 1000;

    console.error(`   ❌ ${item.config.subtopic} - WS ${item.worksheetId} failed: ${error.message}`);

    return {
      ...item,
      visionResult: {
        success: false,
        error: error.message
      },
      assessmentTime,
      processedAt: Date.now(),
      status: 'failed'
    };
  }
}

// ============================================================================
// MAIN WORKER LOOP
// ============================================================================

async function workerLoop(assessor) {
  console.log('\n👁️  Starting live vision assessment worker...');
  console.log(`📁 Session: ${sessionDir}`);
  console.log(`⏱️  Poll interval: ${POLL_INTERVAL_MS}ms\n`);

  let pollCount = 0;

  while (true) {
    pollCount++;

    // Load current queue and results
    const queue = loadQueue();
    const results = loadResults();

    // Find pending items
    const pendingItems = queue.filter(item => item.status === 'pending');

    if (pendingItems.length > 0) {
      console.log(`\n📋 Poll #${pollCount}: Found ${pendingItems.length} pending screenshots`);

      // Process pending items sequentially (to avoid rate limits)
      for (const item of pendingItems) {
        // Mark as processing
        item.status = 'processing';
        saveQueue(queue);
        workerState.currentlyProcessing.add(item.worksheetId);

        // Assess the screenshot
        const result = await processScreenshot(item, assessor);

        // Update results
        results.push(result);
        saveResults(results);

        // Update state
        workerState.totalProcessed++;
        if (result.status === 'completed') {
          workerState.totalSuccess++;
        } else {
          workerState.totalFailed++;
        }
        workerState.currentlyProcessing.delete(item.worksheetId);

        // Remove from queue
        const itemIndex = queue.findIndex(q =>
          q.configId === item.configId && q.worksheetId === item.worksheetId
        );
        if (itemIndex !== -1) {
          queue.splice(itemIndex, 1);
          saveQueue(queue);
        }

        // Log progress
        console.log(`   📊 Progress: ${workerState.totalSuccess} successful, ${workerState.totalFailed} failed`);
      }
    } else {
      // No pending items
      if (pollCount % 10 === 0) {
        console.log(`📋 Poll #${pollCount}: No pending items (waiting for new screenshots...)`);
      }
    }

    // Check if generation is complete
    const generationComplete = isGenerationComplete();

    // Exit conditions
    if (generationComplete && pendingItems.length === 0 && workerState.currentlyProcessing.size === 0) {
      console.log('\n✅ Generation complete and queue empty - worker finished!\n');
      break;
    }

    // Wait before next poll
    await new Promise(resolve => setTimeout(resolve, POLL_INTERVAL_MS));
  }

  return results;
}

// ============================================================================
// HTML REPORT GENERATION
// ============================================================================

function generateFinalReport(results, sessionDir) {
  console.log('\n📊 Generating final HTML report...');

  const totalWorksheets = results.length;
  const successfulAssessments = results.filter(r => r.visionResult?.success).length;
  const productionReady = results.filter(r =>
    r.visionResult?.success && r.visionResult?.overallAssessment?.productionReady
  ).length;

  const avgScore = successfulAssessments > 0
    ? results
        .filter(r => r.visionResult?.success)
        .reduce((sum, r) => sum + (r.visionResult.overallAssessment?.score || 0), 0) / successfulAssessments
    : 0;

  const totalTime = (performance.now() - workerState.startTime) / 1000;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Live Vision Assessment Report</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
    h1 { color: #333; }
    .summary { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .worksheet-card { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .config-header { font-size: 1.2em; font-weight: bold; color: #2563eb; margin-bottom: 10px; }
    .vision-section { background: #f0fdf4; border-left: 4px solid #10b981; padding: 15px; margin: 15px 0; border-radius: 4px; }
    .vision-warning { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 15px 0; border-radius: 4px; }
    .vision-critical { background: #fee2e2; border-left: 4px solid #ef4444; padding: 15px; margin: 15px 0; border-radius: 4px; }
    .screenshot-container { margin: 15px 0; border: 2px solid #ddd; border-radius: 8px; overflow: hidden; background: #f8f9fa; }
    .screenshot-container img { width: 100%; height: auto; display: block; cursor: pointer; transition: transform 0.2s; }
    .screenshot-container img:hover { transform: scale(1.02); }
    .success { color: #10b981; font-weight: bold; }
    .failed { color: #ef4444; font-weight: bold; }
    .warning { color: #f59e0b; font-weight: bold; }
    .badge { padding: 4px 8px; border-radius: 4px; font-size: 0.85em; font-weight: bold; display: inline-block; }
    .badge-success { background: #10b981; color: white; }
    .badge-warning { background: #f59e0b; color: white; }
    .badge-danger { background: #ef4444; color: white; }
    table { width: 100%; border-collapse: collapse; margin-top: 10px; }
    th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
    th { background: #f1f5f9; font-weight: bold; }
    details { margin: 10px 0; }
    summary { cursor: pointer; font-weight: bold; padding: 5px; }
    summary:hover { background: #f0f0f0; }
  </style>
</head>
<body>
  <h1>👁️ Live Vision Assessment Report</h1>

  <div class="summary">
    <h2>Summary</h2>
    <p><strong>Session:</strong> ${path.basename(sessionDir)}</p>
    <p><strong>Total Worksheets Assessed:</strong> ${totalWorksheets}</p>
    <p><strong>Successful Assessments:</strong> <span class="success">${successfulAssessments}/${totalWorksheets}</span></p>
    <p><strong>Production Ready:</strong> <span class="${productionReady > 0 ? 'success' : 'warning'}">${productionReady}/${successfulAssessments}</span> (${successfulAssessments > 0 ? ((productionReady/successfulAssessments)*100).toFixed(1) : 0}%)</p>
    <p><strong>Average Score:</strong> ${avgScore.toFixed(1)}/100</p>
    <p><strong>Total Assessment Time:</strong> ${totalTime.toFixed(2)}s (${(totalTime / 60).toFixed(2)} minutes)</p>
    <p><strong>Avg Time per Worksheet:</strong> ${totalWorksheets > 0 ? (totalTime / totalWorksheets).toFixed(2) : 0}s</p>
  </div>

  <div class="summary">
    <h2>Assessment Results</h2>
    <table>
      <tr>
        <th>#</th>
        <th>Config</th>
        <th>WS</th>
        <th>Status</th>
        <th>Score</th>
        <th>Production Ready</th>
        <th>Time</th>
      </tr>
      ${results.map((r, idx) => {
        const v = r.visionResult?.overallAssessment;
        const status = r.visionResult?.success
          ? (v?.productionReady
              ? '<span class="badge badge-success">✅ READY</span>'
              : '<span class="badge badge-warning">⚠️ NEEDS WORK</span>')
          : '<span class="badge badge-danger">❌ FAILED</span>';
        return `
          <tr>
            <td>${idx + 1}</td>
            <td>${r.config.subtopic}</td>
            <td>${r.worksheetId}</td>
            <td>${status}</td>
            <td>${v?.score || 'N/A'}/100</td>
            <td>${v?.productionReady ? '👍 Yes' : '👎 No'}</td>
            <td>${r.assessmentTime?.toFixed(2)}s</td>
          </tr>
        `;
      }).join('')}
    </table>
  </div>

  ${results.map((r, idx) => {
    const v = r.visionResult;
    const sectionClass = v?.success
      ? (v.overallAssessment?.productionReady ? 'vision-section' : 'vision-warning')
      : 'vision-critical';

    return `
      <div class="worksheet-card">
        <div class="config-header">${idx + 1}. ${r.config.subtopic} - Worksheet ${r.worksheetId}</div>
        <p><strong>Config ID:</strong> ${r.configId}</p>
        <p><strong>Assessment Time:</strong> ${r.assessmentTime?.toFixed(2)}s</p>

        ${v?.success ? `
          <div class="${sectionClass}">
            <h3>👁️ Vision Assessment</h3>
            <p><strong>Status:</strong> ${v.overallAssessment?.productionReady ? '✅ Production Ready' : '⚠️ Needs Improvement'}</p>
            <p><strong>Overall Score:</strong> ${v.overallAssessment?.score}/100</p>
            <p><strong>Teacher Would Use:</strong> ${v.overallAssessment?.teacherWouldUse ? '👍 Yes' : '👎 No'}</p>

            ${v.overallAssessment?.criticalIssues?.length > 0 ? `
              <p><strong>Critical Issues:</strong></p>
              <ul>
                ${v.overallAssessment.criticalIssues.map(issue => `<li>${issue}</li>`).join('')}
              </ul>
            ` : ''}

            ${v.overallAssessment?.recommendations?.length > 0 ? `
              <p><strong>Recommendations:</strong></p>
              <ul>
                ${v.overallAssessment.recommendations.map(rec => `<li>${rec}</li>`).join('')}
              </ul>
            ` : ''}

            <details>
              <summary>Detailed Assessment</summary>
              <p><strong>Visual Question Count:</strong> ${v.visualQuestionCount} (Expected: ${v.expectedQuestionCount})</p>
              <p><strong>Images Working:</strong> ${v.totalImagesWorking}/${v.totalImagesExpected}</p>
              ${v.numberRangeViolations?.length > 0 ? `
                <p><strong>Number Range Violations:</strong> ${v.numberRangeViolations.map(n => n.number).join(', ')}</p>
              ` : ''}
            </details>
          </div>
        ` : `
          <div class="vision-critical">
            <h3>❌ Assessment Failed</h3>
            <p><strong>Error:</strong> ${v?.error || 'Unknown error'}</p>
          </div>
        `}

        <div class="screenshot-container">
          <img src="file:///${r.screenshotPath.replace(/\\/g, '/')}" alt="Worksheet ${r.worksheetId}" onclick="window.open(this.src)" />
        </div>
      </div>
    `;
  }).join('')}

</body>
</html>
  `;

  const reportPath = path.join(sessionDir, 'live-vision-report.html');
  fs.writeFileSync(reportPath, html);

  console.log(`✅ Report saved: ${reportPath}\n`);

  return reportPath;
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

async function main() {
  try {
    console.log('='.repeat(80));
    console.log('🚀 LIVE VISION ASSESSMENT WORKER');
    console.log('='.repeat(80));

    // Check for Claude API key
    if (!process.env.ANTHROPIC_API_KEY && !process.env.CLAUDE_API_KEY) {
      console.error('\n❌ Error: ANTHROPIC_API_KEY or CLAUDE_API_KEY environment variable not set\n');
      console.log('Please set one of:');
      console.log('  - ANTHROPIC_API_KEY');
      console.log('  - CLAUDE_API_KEY\n');
      process.exit(1);
    }

    // Initialize assessor
    const assessor = new ClaudeVisionAssessor();

    // Run worker loop
    const results = await workerLoop(assessor);

    // Generate final report
    const reportPath = generateFinalReport(results, sessionDir);

    // Final summary
    console.log('='.repeat(80));
    console.log('✅ LIVE VISION ASSESSMENT COMPLETE');
    console.log('='.repeat(80));
    console.log(`📊 Total Processed: ${workerState.totalProcessed}`);
    console.log(`✅ Successful: ${workerState.totalSuccess}`);
    console.log(`❌ Failed: ${workerState.totalFailed}`);
    console.log(`⏱️  Total Time: ${((performance.now() - workerState.startTime) / 1000).toFixed(2)}s`);
    console.log(`📄 Report: ${reportPath}`);
    console.log('='.repeat(80));

    process.exit(0);

  } catch (error) {
    console.error('\n❌ Fatal error:', error);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run the worker
main();
