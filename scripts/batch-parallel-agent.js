#!/usr/bin/env node

/**
 * BATCH PARALLEL WORKSHEET QUALITY AGENT v1.0
 *
 * Ultra-optimized agent that generates multiple worksheets in parallel
 * using multiple browser contexts for maximum throughput.
 *
 * Performance improvements over sequential agent:
 * - Multi-browser context architecture (5+ parallel generations)
 * - Parallel vision assessments (batch processing)
 * - Shared browser instance (reduced startup overhead)
 * - Optimized resource management
 *
 * Expected performance:
 * - Sequential: 5 worksheets × 216s = 1080s (18 minutes)
 * - Parallel: 5 worksheets in ~90s (5x speedup, 18s per worksheet amortized)
 *
 * Usage:
 *   node scripts/batch-parallel-agent.js <config-id> [options]
 *
 * Options:
 *   --batch-size=N          Number of worksheets to generate in parallel (default: 5)
 *   --max-concurrent=N      Maximum concurrent browser contexts (default: 5)
 *   --enable-vision=true    Enable vision assessment (default: true)
 *   --headless=true         Run in headless mode (default: false)
 *
 * Example:
 *   node scripts/batch-parallel-agent.js reception-number-counting-counting-to-10 --batch-size=10 --max-concurrent=5
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');

// ============================================================================
// CONFIG REGISTRY (Import from autonomous agent)
// ============================================================================

const CONFIG_REGISTRY = {
  'reception-number-counting-counting-to-10': {
    yearGroup: 'Reception',
    yearGroupSelect: 'Reception (Ages 4-5)',
    topicValue: 'number-counting',
    topic: 'Number and Counting',
    subtopicValue: 'counting-to-10',
    subtopic: 'Counting to 10',
    difficulty: 'average',
    numQuestions: 5,
    qualityGate: {
      minOverallScore: 85,
      minCurriculumAlignment: 8,
      minPresentationQuality: 7,
      minContentConfigMatch: 9,
      minImageQuestionAlignment: 9,
      minContentFreshness: 9,
      minImageDiversity: 8
    },
    specificChecks: {
      minNumber: 1,
      maxNumber: 10,
      requireVisualSupport: true,
      minImagesPerQuestion: 1,
      maxQuestionComplexity: 'simple',
      singleObjectTypeRequired: true,
      realWorldContextRequired: true,
      maxWordLength: 10,
      forbiddenWords: []
    },
    promptConfig: {
      version: 'v1.0',
      filePath: 'prompts/config-specific/reception-number-counting-counting-to-10-v1.0.ts'
    }
  }
};

// ============================================================================
// CLI ARGUMENT PARSING
// ============================================================================

function parseArgs() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0].startsWith('--')) {
    console.error('\n❌ Error: Configuration ID is required\n');
    console.log('Usage: node scripts/batch-parallel-agent.js <config-id> [options]\n');
    console.log('Available configs:');
    Object.keys(CONFIG_REGISTRY).forEach(key => {
      console.log(`  - ${key}`);
    });
    console.log('\nOptions:');
    console.log('  --batch-size=N          Worksheets to generate in parallel (default: 5)');
    console.log('  --max-concurrent=N      Max concurrent browser contexts (default: 5)');
    console.log('  --enable-vision=true    Enable vision assessment (default: true)');
    console.log('  --headless=true         Run in headless mode (default: false)');
    console.log('');
    process.exit(1);
  }

  const configId = args[0];
  const options = {
    batchSize: 5,
    maxConcurrent: 5,
    enableVision: true,
    headless: false
  };

  for (let i = 1; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith('--')) {
      const [key, value] = arg.substring(2).split('=');
      switch (key) {
        case 'batch-size':
          options.batchSize = parseInt(value) || 5;
          break;
        case 'max-concurrent':
          options.maxConcurrent = parseInt(value) || 5;
          break;
        case 'enable-vision':
          options.enableVision = value !== 'false';
          break;
        case 'headless':
          options.headless = value === 'true';
          break;
      }
    }
  }

  return { configId, options };
}

const { configId, options } = parseArgs();
const config = CONFIG_REGISTRY[configId];

if (!config) {
  console.error(`\n❌ Error: Unknown configuration "${configId}"\n`);
  console.log('Available configurations:');
  Object.keys(CONFIG_REGISTRY).forEach(key => {
    console.log(`  - ${key}`);
  });
  console.log('');
  process.exit(1);
}

// ============================================================================
// CONFIGURATION
// ============================================================================

const AGENT_CONFIG = {
  BASE_URL: 'http://localhost:3000',
  BATCH_SIZE: options.batchSize,
  MAX_CONCURRENT: options.maxConcurrent,
  ENABLE_VISION: options.enableVision,
  HEADLESS: options.headless,
  TIMEOUT: 120000
};

// Session setup
const SESSION_ID = `batch-${configId}-${new Date().toISOString().replace(/[:.]/g, '-')}`;
const SESSION_DIR = path.join(process.cwd(), 'worksheet-quality-reports', 'batch-sessions', SESSION_ID);
fs.mkdirSync(SESSION_DIR, { recursive: true });

// Performance tracking
const performanceData = {
  startTime: performance.now(),
  batches: [],
  worksheets: [],
  totalTime: 0
};

console.log('='.repeat(80));
console.log('🚀 BATCH PARALLEL WORKSHEET QUALITY AGENT v1.0');
console.log('='.repeat(80));
console.log('');
console.log(`📋 Configuration: ${configId}`);
console.log(`📚 Year Group: ${config.yearGroup}`);
console.log(`📖 Topic: ${config.topic} → ${config.subtopic}`);
console.log(`📦 Batch Size: ${AGENT_CONFIG.BATCH_SIZE} worksheets`);
console.log(`⚡ Max Concurrent: ${AGENT_CONFIG.MAX_CONCURRENT} contexts`);
console.log(`👁️  Vision Assessment: ${AGENT_CONFIG.ENABLE_VISION ? 'ENABLED' : 'DISABLED'}`);
console.log(`🎭 Browser Mode: ${AGENT_CONFIG.HEADLESS ? 'Headless' : 'Headed'}`);
console.log(`📁 Session Directory: ${SESSION_DIR}`);
console.log('');

// ============================================================================
// MULTI-CONTEXT BROWSER MANAGER
// ============================================================================

class BrowserContextManager {
  constructor(browser, maxConcurrent) {
    this.browser = browser;
    this.maxConcurrent = maxConcurrent;
    this.activeContexts = new Map();
    this.availableSlots = maxConcurrent;
  }

  async createContext(contextId) {
    if (this.availableSlots <= 0) {
      throw new Error('No available context slots');
    }

    const context = await this.browser.newContext({
      viewport: { width: 1920, height: 1080 }
    });
    const page = await context.newPage();

    this.activeContexts.set(contextId, { context, page });
    this.availableSlots--;

    console.log(`   🌐 Context ${contextId} created (${this.activeContexts.size}/${this.maxConcurrent} active)`);

    return { context, page };
  }

  async closeContext(contextId) {
    const ctx = this.activeContexts.get(contextId);
    if (ctx) {
      await ctx.page.close();
      await ctx.context.close();
      this.activeContexts.delete(contextId);
      this.availableSlots++;

      console.log(`   ✅ Context ${contextId} closed (${this.activeContexts.size}/${this.maxConcurrent} active)`);
    }
  }

  async closeAll() {
    const closePromises = Array.from(this.activeContexts.keys()).map(id =>
      this.closeContext(id)
    );
    await Promise.all(closePromises);
  }

  getAvailableSlots() {
    return this.availableSlots;
  }
}

// ============================================================================
// PARALLEL WORKSHEET GENERATOR
// ============================================================================

async function generateWorksheetInContext(page, worksheetId, config, screenshotDir) {
  const startTime = performance.now();

  try {
    console.log(`      📄 [WS-${worksheetId}] Starting generation...`);

    // Navigate to dashboard
    await page.goto(`${AGENT_CONFIG.BASE_URL}/dashboard`, {
      waitUntil: 'networkidle',
      timeout: AGENT_CONFIG.TIMEOUT
    });

    // Wait for year-group select
    await page.waitForSelector('[data-testid="year-group-select"]', { timeout: 10000 });

    // Select Year Group
    const yearGroupValue = config.yearGroup.toLowerCase().replace(/\s+/g, '-');
    await page.getByTestId('year-group-select').click();
    await page.waitForTimeout(300); // Small delay for dropdown animation
    await page.getByTestId(`year-group-option-${yearGroupValue}`).click();

    // Wait for topic dropdown
    await page.waitForSelector('[data-testid="topic-select"]:not([disabled])', { timeout: 10000 });

    // Select Topic
    const topicValue = config.topicValue || config.topic.toLowerCase().replace(/\s+/g, '-');
    await page.getByTestId('topic-select').click();
    await page.waitForTimeout(300); // Small delay for dropdown animation
    await page.waitForSelector(`[data-testid="topic-option-${topicValue}"]`, { timeout: 10000, state: 'visible' });
    await page.getByTestId(`topic-option-${topicValue}`).click();

    // Wait for subtopic dropdown
    await page.waitForSelector('[data-testid="subtopic-select"]:not([disabled])', { timeout: 10000 });

    // Select Subtopic
    const subtopicValue = config.subtopicValue || config.subtopic.toLowerCase().replace(/\s+/g, '-');
    await page.getByTestId('subtopic-select').click();
    await page.waitForTimeout(300); // Small delay for dropdown animation
    await page.waitForSelector(`[data-testid="subtopic-option-${subtopicValue}"]`, { timeout: 10000, state: 'visible' });
    await page.getByTestId(`subtopic-option-${subtopicValue}`).click();

    // Wait for form state update
    await page.waitForLoadState('domcontentloaded');

    // Select Difficulty
    if (config.difficulty) {
      await page.click(`#difficulty-${config.difficulty}`);
      await page.waitForLoadState('domcontentloaded');
    }

    // Click Generate
    const generateButton = page.getByRole('button', { name: 'Generate Worksheet' });
    const isEnabled = await generateButton.isEnabled();
    if (!isEnabled) {
      throw new Error('Generate button is disabled');
    }
    await generateButton.click();

    console.log(`      ⏳ [WS-${worksheetId}] Waiting for generation...`);

    // Wait for completion
    await page.waitForSelector('text=Download', { timeout: AGENT_CONFIG.TIMEOUT });

    // Parallel image preloading
    const imageSrcs = await page.evaluate(() => {
      const images = document.querySelectorAll('.worksheet-preview img, .worksheet img');
      return Array.from(images).map(img => img.src);
    });

    console.log(`      🖼️  [WS-${worksheetId}] Preloading ${imageSrcs.length} images...`);

    await Promise.all(
      imageSrcs.map(src =>
        page.evaluate((url) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve({ success: true });
            img.onerror = () => resolve({ success: false });
            img.src = url;
            setTimeout(() => resolve({ timeout: true }), 5000);
          });
        }, src)
      )
    );

    // Wait for images to be fully loaded
    await page.waitForFunction(() => {
      const images = document.querySelectorAll('.worksheet-preview img, .worksheet img');
      return Array.from(images).every(img => img.complete && img.naturalHeight !== 0);
    }, { timeout: 3000 }).catch(() => {});

    // Take screenshot
    const screenshotPath = path.join(screenshotDir, `ws-${worksheetId}-worksheet.png`);
    await page.screenshot({
      path: screenshotPath,
      fullPage: true
    });

    // Extract content
    const text = await page.locator('.worksheet-preview, .worksheet').textContent();
    const questions = (text.match(/\d+[\.\)]\s*.+/g) || []);
    const imageElements = await page.locator('.worksheet-preview img, .worksheet img').all();
    const images = await Promise.all(
      imageElements.map(async img => ({
        src: await img.getAttribute('src') || '',
        alt: await img.getAttribute('alt') || '',
        visible: await img.isVisible()
      }))
    );
    const html = await page.locator('.worksheet-preview, .worksheet').innerHTML();

    const endTime = performance.now();
    const generationTime = (endTime - startTime) / 1000;

    console.log(`      ✅ [WS-${worksheetId}] Generated in ${generationTime.toFixed(2)}s`);

    return {
      success: true,
      worksheetId,
      generationTime,
      screenshotPath,
      content: {
        text,
        questions,
        images,
        html
      }
    };

  } catch (error) {
    const endTime = performance.now();
    const generationTime = (endTime - startTime) / 1000;

    console.log(`      ❌ [WS-${worksheetId}] Failed in ${generationTime.toFixed(2)}s: ${error.message}`);

    return {
      success: false,
      worksheetId,
      error: error.message,
      generationTime
    };
  }
}

// ============================================================================
// BATCH PROCESSOR
// ============================================================================

async function processBatch(browser, batchNum, config) {
  console.log('\n' + '━'.repeat(80));
  console.log(`📦 BATCH ${batchNum} - Generating ${AGENT_CONFIG.BATCH_SIZE} worksheets in parallel`);
  console.log('━'.repeat(80) + '\n');

  const batchStartTime = performance.now();
  const screenshotDir = path.join(SESSION_DIR, `batch-${batchNum}-screenshots`);
  fs.mkdirSync(screenshotDir, { recursive: true });

  // Create context manager
  const contextManager = new BrowserContextManager(browser, AGENT_CONFIG.MAX_CONCURRENT);

  // Generate worksheets in parallel batches (respecting maxConcurrent limit)
  const results = [];
  const worksheetIds = Array.from({ length: AGENT_CONFIG.BATCH_SIZE }, (_, i) => i + 1);

  console.log(`   🚀 Starting parallel generation (max ${AGENT_CONFIG.MAX_CONCURRENT} concurrent)...\n`);

  // Process in chunks to respect maxConcurrent limit
  for (let i = 0; i < worksheetIds.length; i += AGENT_CONFIG.MAX_CONCURRENT) {
    const chunk = worksheetIds.slice(i, i + AGENT_CONFIG.MAX_CONCURRENT);
    const chunkNum = Math.floor(i / AGENT_CONFIG.MAX_CONCURRENT) + 1;

    console.log(`   📋 Chunk ${chunkNum}: Processing worksheets ${chunk.join(', ')}...\n`);

    const chunkPromises = chunk.map(async (worksheetId) => {
      const contextId = `batch${batchNum}-ws${worksheetId}`;
      const { page } = await contextManager.createContext(contextId);

      try {
        const result = await generateWorksheetInContext(page, worksheetId, config, screenshotDir);
        return result;
      } finally {
        await contextManager.closeContext(contextId);
      }
    });

    const chunkResults = await Promise.all(chunkPromises);
    results.push(...chunkResults);

    console.log(`\n   ✅ Chunk ${chunkNum} complete: ${chunkResults.filter(r => r.success).length}/${chunkResults.length} successful\n`);
  }

  // Close all contexts
  await contextManager.closeAll();

  const batchEndTime = performance.now();
  const batchTime = (batchEndTime - batchStartTime) / 1000;

  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  const avgTime = successful > 0
    ? results.filter(r => r.success).reduce((sum, r) => sum + r.generationTime, 0) / successful
    : 0;

  console.log('\n' + '━'.repeat(80));
  console.log(`📊 BATCH ${batchNum} COMPLETE`);
  console.log('━'.repeat(80));
  console.log(`   Total Time: ${batchTime.toFixed(2)}s`);
  console.log(`   Successful: ${successful}/${AGENT_CONFIG.BATCH_SIZE}`);
  console.log(`   Failed: ${failed}/${AGENT_CONFIG.BATCH_SIZE}`);
  console.log(`   Avg Generation Time: ${avgTime.toFixed(2)}s`);
  console.log(`   Time per Worksheet (amortized): ${(batchTime / AGENT_CONFIG.BATCH_SIZE).toFixed(2)}s`);
  console.log(`   Speedup vs Sequential: ${(avgTime / (batchTime / AGENT_CONFIG.BATCH_SIZE)).toFixed(2)}x`);
  console.log('━'.repeat(80) + '\n');

  return {
    batchNum,
    batchTime,
    results,
    successful,
    failed,
    avgTime,
    timePerWorksheet: batchTime / AGENT_CONFIG.BATCH_SIZE
  };
}

// ============================================================================
// PARALLEL VISION ASSESSMENT
// ============================================================================

async function parallelVisionAssessment(batchResults, config) {
  if (!AGENT_CONFIG.ENABLE_VISION) {
    console.log('\n👁️  Vision assessment disabled (--enable-vision=false)\n');
    return [];
  }

  console.log('\n' + '━'.repeat(80));
  console.log('👁️  PARALLEL VISION ASSESSMENT');
  console.log('━'.repeat(80) + '\n');

  const ClaudeCodeVisionAssessor = require('./services/claude-code-vision-assessor.js');
  const visionAssessor = new ClaudeCodeVisionAssessor(SESSION_DIR);

  await visionAssessor.initialize();

  // Create vision tasks for all successful worksheets
  const visionTasks = [];
  for (const result of batchResults.filter(r => r.success)) {
    const task = await visionAssessor.createVisionTask(
      result.screenshotPath,
      config,
      result.worksheetId,
      batchResults[0].batchNum
    );
    visionTasks.push(task);
  }

  console.log(`📋 Created ${visionTasks.length} vision tasks\n`);
  console.log('⏸️  PAUSING FOR VISION ASSESSMENT...\n');
  console.log('Please assess all screenshots. Results will be processed in parallel.\n');

  // Wait for all vision assessments in parallel
  const visionStartTime = performance.now();
  const visionResults = await Promise.all(
    visionTasks.map(task => visionAssessor.waitForAssessment(task.taskId, 600))
  );
  const visionEndTime = performance.now();
  const visionTime = (visionEndTime - visionStartTime) / 1000;

  const completedCount = visionResults.filter(r => r.success).length;

  console.log(`\n✅ Vision assessment complete: ${completedCount}/${visionTasks.length} successful`);
  console.log(`   Total Vision Time: ${visionTime.toFixed(2)}s`);
  console.log(`   Time per Assessment: ${(visionTime / visionTasks.length).toFixed(2)}s\n`);

  return visionResults;
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

async function main() {
  try {
    // Wait for server
    console.log(`⏳ Waiting for server at ${AGENT_CONFIG.BASE_URL}...`);
    for (let i = 0; i < 30; i++) {
      try {
        const response = await fetch(AGENT_CONFIG.BASE_URL);
        if (response.ok) {
          console.log(`✅ Server is ready!\n`);
          break;
        }
      } catch (error) {
        // Server not ready
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Launch browser (single instance for all contexts)
    console.log('🌐 Launching browser...\n');
    const browser = await chromium.launch({
      headless: AGENT_CONFIG.HEADLESS,
      args: ['--window-size=1920,1080']
    });

    // Process batch
    const batchResult = await processBatch(browser, 1, config);
    performanceData.batches.push(batchResult);
    performanceData.worksheets.push(...batchResult.results);

    // Parallel vision assessment (if enabled)
    if (AGENT_CONFIG.ENABLE_VISION) {
      const visionResults = await parallelVisionAssessment(batchResult.results, config);
      batchResult.visionResults = visionResults;
    }

    // Close browser
    await browser.close();

    // Calculate final metrics
    performanceData.endTime = performance.now();
    performanceData.totalTime = (performanceData.endTime - performanceData.startTime) / 1000;

    // Generate report
    console.log('\n' + '='.repeat(80));
    console.log('📊 FINAL BATCH PROCESSING REPORT');
    console.log('='.repeat(80) + '\n');

    const sequential_estimated = batchResult.avgTime * AGENT_CONFIG.BATCH_SIZE;
    const parallel_actual = batchResult.batchTime;
    const speedup = sequential_estimated / parallel_actual;

    console.log(`📈 Performance Summary:`);
    console.log(`   Worksheets Generated: ${batchResult.successful}/${AGENT_CONFIG.BATCH_SIZE}`);
    console.log(`   Total Batch Time: ${batchResult.batchTime.toFixed(2)}s`);
    console.log(`   Avg Generation Time: ${batchResult.avgTime.toFixed(2)}s`);
    console.log(`   Time per Worksheet (amortized): ${batchResult.timePerWorksheet.toFixed(2)}s`);
    console.log(`\n🚀 Speedup Analysis:`);
    console.log(`   Sequential (estimated): ${sequential_estimated.toFixed(2)}s`);
    console.log(`   Parallel (actual): ${parallel_actual.toFixed(2)}s`);
    console.log(`   Speedup: ${speedup.toFixed(2)}x faster`);
    console.log(`   Time Saved: ${(sequential_estimated - parallel_actual).toFixed(2)}s`);
    console.log('');

    // Save report
    const reportPath = path.join(SESSION_DIR, 'batch-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(performanceData, null, 2));
    console.log(`📁 Report saved: ${reportPath}\n`);

    process.exit(0);

  } catch (error) {
    console.error('\n❌ Fatal error:', error);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run batch processor
main();
