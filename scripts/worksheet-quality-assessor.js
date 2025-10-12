#!/usr/bin/env node

/**
 * WORKSHEET QUALITY ASSESSOR (AUTONOMOUS)
 *
 * Config-aware autonomous agent that:
 * 1. Loads config-specific metadata (quality gates, checks)
 * 2. Generates worksheets and assesses quality
 * 3. Detects failures (P0/P1/P2)
 * 4. Automatically fixes issues (catalog, prompt)
 * 5. Re-tests until production-ready
 *
 * Usage:
 *   node scripts/worksheet-quality-assessor.js <config-id> [options]
 *
 * Examples:
 *   node scripts/worksheet-quality-assessor.js reception-number-counting-counting-to-10
 *   node scripts/worksheet-quality-assessor.js reception-number-counting-counting-to-10 --max-cycles=5
 *   node scripts/worksheet-quality-assessor.js reception-number-counting-counting-to-10 --iterations=10
 *
 * Options:
 *   --max-cycles=N     Maximum improvement cycles (default: 5)
 *   --iterations=N     Iterations per cycle (default: 5)
 *   --auto-fix         Enable automatic fixes (default: true)
 *   --prompt-version=X Test specific prompt version (default: latest)
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// ============================================================================
// CONFIGURATION
// ============================================================================

const args = process.argv.slice(2);

if (args.length < 1 || args[0].startsWith('--')) {
  console.log(`
🤖 WORKSHEET QUALITY ASSESSOR (Config-Aware Autonomous Agent)

Usage:
  node scripts/worksheet-quality-assessor.js <config-id> [options]

Examples:
  node scripts/worksheet-quality-assessor.js reception-number-counting-counting-to-10
  node scripts/worksheet-quality-assessor.js reception-number-counting-counting-to-10 --max-cycles=3
  node scripts/worksheet-quality-assessor.js reception-number-counting-counting-to-10 --iterations=10 --auto-fix=false

Arguments:
  config-id          Configuration ID to test (e.g., reception-number-counting-counting-to-10)

Options:
  --max-cycles=N     Maximum improvement cycles (default: 5)
  --iterations=N     Iterations per cycle (default: 5)
  --auto-fix         Enable automatic fixes for catalog/prompt issues (default: true)
  --prompt-version=X Test specific prompt version (default: latest)
  --headless         Run in headless mode (default: false)

Available Config IDs:
  - reception-number-counting-counting-to-10
  - reception-number-counting-number-recognition
  (Add more configs to scripts/config-quality-assessor.js)
  `);
  process.exit(1);
}

const CONFIG_ID = args[0];

const getOption = (name, defaultValue) => {
  const arg = args.find(a => a.startsWith(`--${name}=`));
  if (arg) {
    const value = arg.split('=')[1];
    if (value === 'true') return true;
    if (value === 'false') return false;
    return isNaN(value) ? value : parseInt(value, 10);
  }
  return defaultValue;
};

const MAX_CYCLES = getOption('max-cycles', 5);
const ITERATIONS = getOption('iterations', 5);
const AUTO_FIX = getOption('auto-fix', true);
const PROMPT_VERSION = getOption('prompt-version', 'latest');
const HEADLESS = args.includes('--headless');

// Create session directory
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const sessionId = `${CONFIG_ID}-${timestamp}`;
const sessionDir = path.join(process.cwd(), 'worksheet-quality-reports', 'autonomous-sessions', sessionId);
fs.mkdirSync(sessionDir, { recursive: true });

console.log(`\n${'='.repeat(80)}`);
console.log(`🤖 WORKSHEET QUALITY ASSESSOR - AUTONOMOUS MODE`);
console.log(`${'='.repeat(80)}\n`);
console.log(`📋 Config ID: ${CONFIG_ID}`);
console.log(`🔄 Max Cycles: ${MAX_CYCLES}`);
console.log(`📊 Iterations Per Cycle: ${ITERATIONS}`);
console.log(`🔧 Auto-Fix: ${AUTO_FIX ? 'ENABLED' : 'DISABLED'}`);
console.log(`📦 Prompt Version: ${PROMPT_VERSION}`);
console.log(`📁 Session: ${sessionDir}\n`);
console.log(`${'='.repeat(80)}\n`);

// ============================================================================
// AUTONOMOUS LOOP
// ============================================================================

class AutonomousQualityAgent {
  constructor() {
    this.currentCycle = 0;
    this.cycleHistory = [];
    this.fixesApplied = [];
    this.catalogBackupPath = null;
  }

  async run() {
    console.log(`🚀 Starting autonomous quality improvement loop...\n`);

    // Backup catalog
    await this.backupCatalog();

    let productionReady = false;

    while (this.currentCycle < MAX_CYCLES && !productionReady) {
      this.currentCycle++;

      console.log(`\n${'━'.repeat(80)}`);
      console.log(`🔄 CYCLE ${this.currentCycle}/${MAX_CYCLES}`);
      console.log(`${'━'.repeat(80)}\n`);

      // Run config-quality-assessor
      const assessmentResult = await this.runConfigAssessor();

      // Analyze results
      const analysis = this.analyzeResults(assessmentResult);

      // Store cycle data
      this.cycleHistory.push({
        cycle: this.currentCycle,
        assessment: assessmentResult,
        analysis,
        fixes: []
      });

      console.log(`\n📊 Cycle ${this.currentCycle} Results:`);
      console.log(`   Pass Rate: ${(analysis.passRate * 100).toFixed(1)}% (target: ≥90%)`);
      console.log(`   P0 Failures: ${analysis.totalP0Failures} (target: 0)`);
      console.log(`   Avg Score: ${analysis.avgScore.toFixed(2)}/100 (target: ≥85)`);
      console.log(`   Production Ready: ${analysis.productionReady ? '✅ YES' : '❌ NO'}\n`);

      if (analysis.productionReady) {
        productionReady = true;
        console.log(`\n${'🎉'.repeat(40)}`);
        console.log(`✅ PRODUCTION READY ACHIEVED IN CYCLE ${this.currentCycle}!`);
        console.log(`${'🎉'.repeat(40)}\n`);
        break;
      }

      // Auto-fix if enabled
      if (AUTO_FIX) {
        const fixes = await this.detectAndApplyFixes(analysis, assessmentResult);
        this.cycleHistory[this.currentCycle - 1].fixes = fixes;

        if (fixes.length === 0) {
          console.log(`\n⚠️  No automatic fixes available. Manual intervention required.\n`);
          break;
        }

        console.log(`\n✅ Applied ${fixes.length} fix(es). Re-testing in next cycle...\n`);
      } else {
        console.log(`\n⚠️  Auto-fix disabled. Stopping after cycle ${this.currentCycle}.\n`);
        break;
      }
    }

    // Generate final report
    await this.generateFinalReport(productionReady);

    return productionReady;
  }

  async runConfigAssessor() {
    console.log(`📊 Running config-quality-assessor...\n`);

    return new Promise((resolve, reject) => {
      const assessor = spawn('node', [
        path.join(__dirname, 'config-quality-assessor.js'),
        '--config', CONFIG_ID,
        '--promptVersion', PROMPT_VERSION,
        '--mode', 'standard',
        '--iterations', ITERATIONS.toString()
      ], {
        stdio: 'inherit',
        cwd: process.cwd()
      });

      assessor.on('close', (code) => {
        console.log(`\n✓ Config assessor finished (code: ${code})\n`);

        // Load results from config-quality-assessor output
        const resultsPath = path.join(
          process.cwd(),
          'worksheet-quality-reports',
          CONFIG_ID,
          PROMPT_VERSION,
          'SUMMARY.md'
        );

        if (!fs.existsSync(resultsPath)) {
          return reject(new Error(`Assessment results not found: ${resultsPath}`));
        }

        // Parse summary file
        const summary = fs.readFileSync(resultsPath, 'utf8');
        const result = this.parseSummary(summary);

        // Copy reports to session directory
        const srcDir = path.join(process.cwd(), 'worksheet-quality-reports', CONFIG_ID, PROMPT_VERSION);
        const destDir = path.join(sessionDir, `cycle-${this.currentCycle}`);
        this.copyDirectoryRecursive(srcDir, destDir);

        resolve(result);
      });

      assessor.on('error', reject);
    });
  }

  parseSummary(summaryText) {
    // Extract key metrics from SUMMARY.md
    const passRateMatch = summaryText.match(/Quality Gate Pass Rate\s*\|\s*(\d+\.?\d*)%/);
    const avgScoreMatch = summaryText.match(/Average Score\s*\|\s*(\d+\.?\d*)\/100/);
    const p0Match = summaryText.match(/P0.*?(\d+)/i);
    const p1Match = summaryText.match(/P1.*?(\d+)/i);

    return {
      passRate: passRateMatch ? parseFloat(passRateMatch[1]) / 100 : 0,
      avgScore: avgScoreMatch ? parseFloat(avgScoreMatch[1]) : 0,
      totalP0Failures: p0Match ? parseInt(p0Match[1], 10) : 0,
      totalP1Failures: p1Match ? parseInt(p1Match[1], 10) : 0,
      rawText: summaryText
    };
  }

  analyzeResults(assessmentResult) {
    const productionReady =
      assessmentResult.totalP0Failures === 0 &&
      assessmentResult.passRate >= 0.90 &&
      assessmentResult.avgScore >= 85;

    return {
      productionReady,
      passRate: assessmentResult.passRate,
      totalP0Failures: assessmentResult.totalP0Failures,
      totalP1Failures: assessmentResult.totalP1Failures,
      avgScore: assessmentResult.avgScore
    };
  }

  async detectAndApplyFixes(analysis, assessmentResult) {
    console.log(`🔧 Detecting and applying fixes...\n`);

    // Use fix registry for automatic detection and application
    const fixRegistry = require('./fixes/fix-registry.js');
    const catalogPath = path.join(process.cwd(), 'scripts', 'catalogs', 'master-vision-catalog.json');

    const fixes = await fixRegistry.detectAndApply(assessmentResult, catalogPath, CONFIG_ID);

    this.fixesApplied.push(...fixes);
    return fixes;
  }

  async applyFootballCatalogFix() {
    console.log(`    🔧 Applying football catalog fix...\n`);

    try {
      const catalogPath = path.join(process.cwd(), 'scripts', 'catalogs', 'master-vision-catalog.json');

      if (!fs.existsSync(catalogPath)) {
        console.log(`    ❌ Catalog not found: ${catalogPath}\n`);
        return null;
      }

      const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

      // Apply catalog fixes (already applied by apply-catalog-fixes.js, but ensure they're there)
      let changed = false;

      if (catalog['Sailor_Kids_School_byScrappinDoodles']) {
        const sailor = catalog['Sailor_Kids_School_byScrappinDoodles'];
        if (sailor.priority !== 5) {
          sailor.priority = 5;
          changed = true;
          console.log(`      ✓ Sailor_Kids_School priority → 5`);
        }
        if (sailor.curriculumTopics && sailor.curriculumTopics.includes('counting-to-10')) {
          sailor.curriculumTopics = sailor.curriculumTopics.filter(t => t !== 'counting-to-10');
          changed = true;
          console.log(`      ✓ Removed 'counting-to-10' from Sailor topics`);
        }
      }

      if (catalog['Football_Kids_by_ScrappinDoodles']) {
        if (catalog['Football_Kids_by_ScrappinDoodles'].priority !== 9) {
          catalog['Football_Kids_by_ScrappinDoodles'].priority = 9;
          changed = true;
          console.log(`      ✓ Football_Kids priority → 9`);
        }
      }

      if (changed) {
        fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2));
        console.log(`    ✅ Catalog fixes applied\n`);
      } else {
        console.log(`    ℹ️  Catalog fixes already applied\n`);
      }

      return {
        type: 'CATALOG_FIX',
        target: 'football_sailor_mismatch',
        action: 'APPLIED',
        message: 'Catalog fixes applied to resolve football→sailor mismatch'
      };

    } catch (error) {
      console.log(`    ❌ Failed to apply catalog fix: ${error.message}\n`);
      return null;
    }
  }

  async backupCatalog() {
    const catalogPath = path.join(process.cwd(), 'scripts', 'catalogs', 'master-vision-catalog.json');

    if (fs.existsSync(catalogPath)) {
      this.catalogBackupPath = path.join(sessionDir, 'catalog-backup.json');
      fs.copyFileSync(catalogPath, this.catalogBackupPath);
      console.log(`💾 Catalog backed up: ${this.catalogBackupPath}\n`);
    }
  }

  async generateFinalReport(productionReady) {
    console.log(`\n${'='.repeat(80)}`);
    console.log(`📊 FINAL REPORT`);
    console.log(`${'='.repeat(80)}\n`);

    const lastCycle = this.cycleHistory[this.cycleHistory.length - 1];
    const firstCycle = this.cycleHistory[0];

    const report = {
      sessionId,
      configId: CONFIG_ID,
      promptVersion: PROMPT_VERSION,
      timestamp: new Date().toISOString(),
      totalCycles: this.currentCycle,
      productionReady,
      cycleHistory: this.cycleHistory,
      fixesApplied: this.fixesApplied,
      summary: {
        firstCyclePassRate: firstCycle ? firstCycle.analysis.passRate : 0,
        lastCyclePassRate: lastCycle ? lastCycle.analysis.passRate : 0,
        improvement: lastCycle && firstCycle
          ? ((lastCycle.analysis.passRate - firstCycle.analysis.passRate) * 100).toFixed(1) + '%'
          : 'N/A',
        finalP0Failures: lastCycle ? lastCycle.analysis.totalP0Failures : 'N/A',
        finalAvgScore: lastCycle ? lastCycle.analysis.avgScore.toFixed(2) : 'N/A'
      }
    };

    const reportPath = path.join(sessionDir, 'FINAL-REPORT.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    const markdownPath = path.join(sessionDir, 'FINAL-REPORT.md');
    fs.writeFileSync(markdownPath, this.generateMarkdownReport(report));

    console.log(`📊 Results:\n`);
    console.log(`   Production Ready: ${productionReady ? '✅ YES' : '❌ NO'}`);
    console.log(`   Total Cycles: ${this.currentCycle}`);
    console.log(`   Fixes Applied: ${this.fixesApplied.length}`);
    console.log(`   Final Pass Rate: ${report.summary.lastCyclePassRate * 100}%`);
    console.log(`   Improvement: ${report.summary.improvement}`);
    console.log(`   Final P0 Failures: ${report.summary.finalP0Failures}`);
    console.log(`   Final Avg Score: ${report.summary.finalAvgScore}/100\n`);

    console.log(`📁 Reports saved:\n`);
    console.log(`   JSON: ${reportPath}`);
    console.log(`   Markdown: ${markdownPath}`);
    console.log(`   Session: ${sessionDir}\n`);

    console.log(`${'='.repeat(80)}\n`);
  }

  generateMarkdownReport(report) {
    return `# Worksheet Quality Assessor - Final Report

**Session ID**: ${report.sessionId}
**Config ID**: ${report.configId}
**Prompt Version**: ${report.promptVersion}
**Timestamp**: ${report.timestamp}
**Production Ready**: ${report.productionReady ? '✅ YES' : '❌ NO'}

---

## Executive Summary

🎯 **Production Ready**: ${report.productionReady ? '✅ YES' : '❌ NO'}

📊 **Performance**:
- Total Cycles: ${report.totalCycles}
- Fixes Applied: ${report.fixesApplied.length}
- First Cycle Pass Rate: ${(report.summary.firstCyclePassRate * 100).toFixed(1)}%
- Final Pass Rate: ${(report.summary.lastCyclePassRate * 100).toFixed(1)}%
- Improvement: ${report.summary.improvement}
- Final P0 Failures: ${report.summary.finalP0Failures}
- Final Avg Score: ${report.summary.finalAvgScore}/100

🔧 **Fixes Applied**:
${report.fixesApplied.map((fix, i) => `${i + 1}. [${fix.type}] ${fix.message}`).join('\n')}

---

## Cycle History

${report.cycleHistory.map(cycle => `
### Cycle ${cycle.cycle}

- **Pass Rate**: ${(cycle.analysis.passRate * 100).toFixed(1)}%
- **P0 Failures**: ${cycle.analysis.totalP0Failures}
- **P1 Failures**: ${cycle.analysis.totalP1Failures}
- **Avg Score**: ${cycle.analysis.avgScore.toFixed(2)}/100
- **Production Ready**: ${cycle.analysis.productionReady ? '✅ YES' : '❌ NO'}

**Fixes Applied**: ${cycle.fixes.length}
${cycle.fixes.map(fix => `- [${fix.type}] ${fix.message}`).join('\n')}
`).join('\n---\n')}

---

## Conclusion

${report.productionReady
  ? '✅ Configuration is **PRODUCTION READY**. All quality gates passed. Deploy with confidence!'
  : '❌ Configuration is **NOT PRODUCTION READY**. Review failed quality gates and apply remaining fixes before deployment.'}

---

**Session Directory**: ${sessionDir}
**Report Generated**: ${new Date().toISOString()}
`;
  }

  copyDirectoryRecursive(src, dest) {
    if (!fs.existsSync(src)) return;
    fs.mkdirSync(dest, { recursive: true });
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      if (entry.isDirectory()) {
        this.copyDirectoryRecursive(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

async function main() {
  const agent = new AutonomousQualityAgent();

  try {
    const productionReady = await agent.run();
    process.exit(productionReady ? 0 : 1);
  } catch (error) {
    console.error(`\n❌ Fatal error:`, error);
    process.exit(1);
  }
}

// Run
main();
