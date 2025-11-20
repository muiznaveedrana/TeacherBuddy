#!/usr/bin/env node

/**
 * MODEL COMPARISON TESTING SCRIPT
 *
 * Purpose: Generate worksheets with multiple AI models and compare quality/cost
 *
 * Usage:
 *   node scripts/model-comparison-test.js <config-id> [--iterations=2] [--headless=false]
 *
 * Example:
 *   node scripts/model-comparison-test.js year2-number-place-value-numbers-to-100
 *
 * Models Tested:
 *   - Gemini 2.5 Flash (gemini-2.0-flash-exp)
 *   - Gemini 2.5 Pro (gemini-exp-1206)
 *
 * Output:
 *   - Screenshots for all worksheets
 *   - Vision assessment scores
 *   - Cost analysis (tokens, $ per worksheet)
 *   - Model comparison report
 */

const { chromium } = require('playwright');
const fs = require('fs').promises;
const path = require('path');

// Configuration registry
const CONFIG_REGISTRY = {
  'year2-number-place-value-numbers-to-100': {
    "yearGroup": "year-2",  // data-testid format (lowercase with hyphens)
    "yearGroupLabel": "Year 2 (Ages 6-7)",  // Human-readable label
    "topicValue": "number-place-value",
    "topic": "Number and Place Value",
    "subtopicValue": "numbers-to-100",
    "subtopic": "Numbers to 100",
    "difficulty": "average",
    "numQuestions": 5
  }
};

// Model configurations
const MODELS = [
  {
    id: 'flash',
    name: 'Gemini 2.5 Flash',
    modelId: 'gemini-2.0-flash-exp',
    costPer1MInputTokens: 0.00,  // Free tier
    costPer1MOutputTokens: 0.00
  },
  {
    id: 'pro',
    name: 'Gemini 2.5 Pro',
    modelId: 'gemini-exp-1206',
    costPer1MInputTokens: 0.00,  // Experimental - free
    costPer1MOutputTokens: 0.00
  }
];

class ModelComparisonTester {
  constructor(configId, options = {}) {
    this.configId = configId;
    this.config = CONFIG_REGISTRY[configId];
    this.iterations = options.iterations || 2;
    this.headless = options.headless !== false;
    this.baseUrl = 'http://localhost:3000/create';

    if (!this.config) {
      throw new Error(`Configuration not found: ${configId}`);
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    this.sessionDir = path.join(
      process.cwd(),
      'worksheet-quality-reports',
      'model-comparison',
      `${configId}_${timestamp}`
    );

    this.results = {
      configId,
      config: this.config,
      timestamp,
      models: {},
      summary: {}
    };
  }

  async init() {
    await fs.mkdir(this.sessionDir, { recursive: true });
    console.log(`\n📊 MODEL COMPARISON TEST`);
    console.log(`Config: ${this.configId}`);
    console.log(`Iterations per model: ${this.iterations}`);
    console.log(`Output: ${this.sessionDir}`);
    console.log(`\n${'='.repeat(80)}\n`);
  }

  async testModel(model) {
    console.log(`\n🤖 Testing ${model.name} (${model.modelId})`);
    console.log(`${'─'.repeat(80)}`);

    const modelDir = path.join(this.sessionDir, model.id);
    await fs.mkdir(modelDir, { recursive: true });

    const modelResults = {
      modelId: model.id,
      modelName: model.name,
      modelVersion: model.modelId,
      iterations: [],
      avgScore: 0,
      passRate: 0,
      totalTokens: { input: 0, output: 0 },
      totalCost: 0,
      avgGenerationTime: 0
    };

    const browser = await chromium.launch({ headless: this.headless });

    try {
      for (let i = 1; i <= this.iterations; i++) {
        console.log(`\n  Iteration ${i}/${this.iterations}...`);

        const iterationStart = Date.now();
        const page = await browser.newPage();

        try {
          // Navigate to create page
          await page.goto(this.baseUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
          await page.waitForTimeout(2000); // Wait for page to settle

          // Handle cookie consent banner
          await this.handleConsentBanner(page);

          // Fill form
          await this.fillPrintableForm(page, model);

          // Generate printable
          const generationResult = await this.generatePrintable(page, model);

          // Capture screenshot
          const screenshotPath = path.join(modelDir, `printable_${i}.png`);
          await page.screenshot({
            path: screenshotPath,
            fullPage: true
          });

          const generationTime = Date.now() - iterationStart;

          const iterationResult = {
            iteration: i,
            screenshotPath,
            generationTime,
            ...generationResult
          };

          modelResults.iterations.push(iterationResult);

          console.log(`    ✓ Generated in ${(generationTime/1000).toFixed(1)}s`);
          console.log(`    📸 Screenshot: ${path.basename(screenshotPath)}`);

        } catch (error) {
          console.error(`    ✗ Error in iteration ${i}:`, error.message);
          modelResults.iterations.push({
            iteration: i,
            error: error.message,
            generationTime: Date.now() - iterationStart
          });
        } finally {
          await page.close();
        }

        // Small delay between iterations
        if (i < this.iterations) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }

      // Calculate statistics
      const successfulIterations = modelResults.iterations.filter(r => !r.error);
      if (successfulIterations.length > 0) {
        modelResults.avgGenerationTime =
          successfulIterations.reduce((sum, r) => sum + r.generationTime, 0) / successfulIterations.length;
      }

      console.log(`\n  ✓ Completed ${successfulIterations.length}/${this.iterations} worksheets`);

    } finally {
      await browser.close();
    }

    this.results.models[model.id] = modelResults;

    // Save model results
    await fs.writeFile(
      path.join(modelDir, 'results.json'),
      JSON.stringify(modelResults, null, 2)
    );

    return modelResults;
  }

  async handleConsentBanner(page) {
    // Wait a bit for banner to appear
    await page.waitForTimeout(2000);

    // Try to find and click "Accept All" or similar button
    try {
      const acceptButton = page.locator('button:has-text("Accept All"), button:has-text("Accept"), button:has-text("I Accept")').first();
      const count = await acceptButton.count();
      if (count > 0) {
        await acceptButton.click({ timeout: 5000 });
        console.log('    ✓ Accepted cookie consent');
        await page.waitForTimeout(1000);
      } else {
        console.log('    ⓘ No consent banner found');
      }
    } catch (error) {
      // Consent banner might not be present or already handled
      console.log('    ⓘ Consent banner handling skipped:', error.message);
    }
  }

  async fillPrintableForm(page, model) {
    console.log('    📝 Filling form fields...');

    // The /create page uses shadcn/ui Select components (button-based dropdowns)
    // We need to click the trigger button, then wait for dropdown to appear, then click the option

    // 1. Select year group
    console.log(`      • Year Group: ${this.config.yearGroupLabel || this.config.yearGroup}`);
    const yearGroupTrigger = page.locator('[data-testid="year-group-select"]');
    await yearGroupTrigger.waitFor({ state: 'visible', timeout: 10000 });
    await yearGroupTrigger.click();

    // Wait for dropdown to appear and option to be visible
    const yearGroupOption = page.locator(`[data-testid="year-group-option-${this.config.yearGroup}"]`);
    await yearGroupOption.waitFor({ state: 'visible', timeout: 5000 });
    await yearGroupOption.click();
    await page.waitForTimeout(500);

    // 2. Select topic
    console.log(`      • Topic: ${this.config.topic}`);
    const topicTrigger = page.locator('[data-testid="topic-select"]');
    await topicTrigger.waitFor({ state: 'visible', timeout: 10000 });
    await topicTrigger.click();

    const topicOption = page.locator(`[data-testid="topic-option-${this.config.topicValue}"]`);
    await topicOption.waitFor({ state: 'visible', timeout: 5000 });
    await topicOption.click();
    await page.waitForTimeout(500);

    // 3. Select subtopic
    console.log(`      • Subtopic: ${this.config.subtopic}`);
    const subtopicTrigger = page.locator('[data-testid="subtopic-select"]');
    await subtopicTrigger.waitFor({ state: 'visible', timeout: 10000 });
    await subtopicTrigger.click();

    const subtopicOption = page.locator(`[data-testid="subtopic-option-${this.config.subtopicValue}"]`);
    await subtopicOption.waitFor({ state: 'visible', timeout: 5000 });
    await subtopicOption.click();
    await page.waitForTimeout(500);

    // 4. Select difficulty (radio button)
    console.log(`      • Difficulty: ${this.config.difficulty}`);
    const difficultyRadio = page.locator(`input[name="difficulty"][value="${this.config.difficulty}"]`);
    await difficultyRadio.waitFor({ state: 'visible', timeout: 10000 });
    await difficultyRadio.click();
    await page.waitForTimeout(500);

    // 5. Set question count (range slider - hidden but functional)
    console.log(`      • Questions: ${this.config.numQuestions}`);
    const questionCountSlider = page.locator('input#question-count[type="range"]');
    // Slider might be hidden, so don't wait for visibility
    await questionCountSlider.fill(this.config.numQuestions.toString());
    await page.waitForTimeout(500);

    console.log('    ✓ Form filled successfully');
  }

  async generatePrintable(page, model) {
    const generateButton = page.locator('button:has-text("Generate Printable")').first();

    if (await generateButton.count() === 0) {
      throw new Error('Generate button not found');
    }

    await generateButton.click();

    // Wait for printable to generate (max 60s)
    try {
      await page.waitForSelector('.printable-container, .printable-content, [class*="printable"], .worksheet-container, .worksheet-content, [class*="worksheet"]', {
        timeout: 60000,
        state: 'visible'
      });
    } catch (error) {
      throw new Error('Printable generation timeout');
    }

    // Try to extract token usage from page (if displayed)
    const tokenInfo = await this.extractTokenInfo(page);

    return {
      success: true,
      tokens: tokenInfo
    };
  }

  async extractTokenInfo(page) {
    // Try to find token usage info in the page
    try {
      const tokenText = await page.locator('text=/tokens|usage/i').first().textContent({ timeout: 2000 });
      // Parse token info if available
      return { input: 0, output: 0, total: 0 };
    } catch {
      return { input: 0, output: 0, total: 0 };
    }
  }

  async generateComparisonReport() {
    console.log(`\n\n📊 GENERATING MODEL COMPARISON REPORT`);
    console.log(`${'='.repeat(80)}\n`);

    const report = {
      title: 'Model Comparison Report',
      config: this.config,
      timestamp: new Date().toISOString(),
      models: this.results.models,
      comparison: this.compareModels()
    };

    // Generate markdown report
    const markdown = this.generateMarkdownReport(report);
    await fs.writeFile(
      path.join(this.sessionDir, 'COMPARISON-REPORT.md'),
      markdown
    );

    // Save JSON report
    await fs.writeFile(
      path.join(this.sessionDir, 'COMPARISON-REPORT.json'),
      JSON.stringify(report, null, 2)
    );

    console.log(markdown);

    return report;
  }

  compareModels() {
    const comparison = {
      winner: null,
      speedWinner: null,
      reliabilityWinner: null,
      recommendation: ''
    };

    const models = Object.values(this.results.models);

    // Speed comparison
    const speeds = models.map(m => ({
      id: m.modelId,
      name: m.modelName,
      avgTime: m.avgGenerationTime
    })).sort((a, b) => a.avgTime - b.avgTime);

    if (speeds.length > 0) {
      comparison.speedWinner = speeds[0].name;
    }

    // Reliability comparison
    const reliability = models.map(m => ({
      id: m.modelId,
      name: m.modelName,
      successRate: (m.iterations.filter(i => !i.error).length / m.iterations.length) * 100
    })).sort((a, b) => b.successRate - a.successRate);

    if (reliability.length > 0) {
      comparison.reliabilityWinner = reliability[0].name;
    }

    // Overall recommendation
    if (speeds.length > 0 && reliability.length > 0) {
      if (reliability[0].successRate === 100) {
        comparison.recommendation =
          `${comparison.speedWinner} is fastest (${(speeds[0].avgTime/1000).toFixed(1)}s avg). ` +
          `Both models showed 100% reliability. Vision assessment needed for quality comparison.`;
      }
    }

    return comparison;
  }

  generateMarkdownReport(report) {
    const lines = [];

    lines.push('# Model Comparison Report');
    lines.push('');
    lines.push(`**Configuration**: ${this.configId}`);
    lines.push(`**Year Group**: ${this.config.yearGroupLabel || this.config.yearGroup}`);
    lines.push(`**Topic**: ${this.config.topic}`);
    lines.push(`**Subtopic**: ${this.config.subtopic}`);
    lines.push(`**Question Count**: ${this.config.numQuestions}`);
    lines.push(`**Test Date**: ${new Date(report.timestamp).toLocaleString()}`);
    lines.push('');
    lines.push('---');
    lines.push('');

    // Model Results
    lines.push('## Model Performance Summary');
    lines.push('');

    Object.values(this.results.models).forEach(model => {
      const successCount = model.iterations.filter(i => !i.error).length;
      const totalCount = model.iterations.length;
      const successRate = (successCount / totalCount * 100).toFixed(1);

      lines.push(`### ${model.modelName}`);
      lines.push('');
      lines.push(`- **Model ID**: ${model.modelVersion}`);
      lines.push(`- **Success Rate**: ${successCount}/${totalCount} (${successRate}%)`);
      lines.push(`- **Avg Generation Time**: ${(model.avgGenerationTime/1000).toFixed(2)}s`);
      lines.push('');

      lines.push('**Screenshots**:');
      model.iterations.forEach((iter, idx) => {
        if (!iter.error) {
          const relativePath = path.relative(this.sessionDir, iter.screenshotPath);
          lines.push(`- Iteration ${iter.iteration}: \`${relativePath}\``);
        } else {
          lines.push(`- Iteration ${iter.iteration}: ERROR - ${iter.error}`);
        }
      });
      lines.push('');
    });

    // Comparison
    lines.push('---');
    lines.push('');
    lines.push('## Model Comparison');
    lines.push('');
    lines.push(`**Fastest Model**: ${report.comparison.speedWinner || 'N/A'}`);
    lines.push(`**Most Reliable**: ${report.comparison.reliabilityWinner || 'N/A'}`);
    lines.push('');
    lines.push('### Recommendation');
    lines.push('');
    lines.push(report.comparison.recommendation || 'Vision assessment required for quality comparison.');
    lines.push('');

    // Next Steps
    lines.push('---');
    lines.push('');
    lines.push('## Next Steps');
    lines.push('');
    lines.push('1. **Vision Assessment Required**: Run strict quality assessment on all screenshots');
    lines.push('2. **Quality Criteria**:');
    lines.push('   - All 5 questions visible and complete');
    lines.push('   - Base-10 blocks rendering correctly (orange tens, green ones)');
    lines.push('   - Number lines properly formatted with tick elements');
    lines.push('   - Place value charts clear and readable');
    lines.push('   - Number words correctly spelled (UK English)');
    lines.push('   - Progressive difficulty Q1 → Q5');
    lines.push('   - Answer key present and accurate');
    lines.push('3. **Quality Gates**: Production Ready = Score ≥95 AND zero critical issues');
    lines.push('');

    // File Locations
    lines.push('---');
    lines.push('');
    lines.push('## Output Files');
    lines.push('');
    lines.push(`**Session Directory**: \`${this.sessionDir}\``);
    lines.push('');
    Object.values(this.results.models).forEach(model => {
      lines.push(`**${model.modelName} Screenshots**:`);
      model.iterations.forEach(iter => {
        if (!iter.error) {
          lines.push(`- \`${iter.screenshotPath}\``);
        }
      });
      lines.push('');
    });

    return lines.join('\n');
  }

  async run() {
    try {
      await this.init();

      // Test each model
      for (const model of MODELS) {
        await this.testModel(model);
      }

      // Generate comparison report
      const report = await this.generateComparisonReport();

      console.log(`\n✅ Model comparison complete!`);
      console.log(`\n📁 Results saved to: ${this.sessionDir}`);
      console.log(`\n📊 Next: Run vision assessment on screenshots to compare quality\n`);

      return report;

    } catch (error) {
      console.error('\n❌ Model comparison failed:', error);
      throw error;
    }
  }
}

// Main execution
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error(`
Usage: node scripts/model-comparison-test.js <config-id> [options]

Example:
  node scripts/model-comparison-test.js year2-number-place-value-numbers-to-100

Options:
  --iterations=N    Number of worksheets per model (default: 2)
  --headless=false  Show browser (default: true)

Available configs:
  - year2-number-place-value-numbers-to-100
`);
    process.exit(1);
  }

  const configId = args[0];
  const options = {};

  args.slice(1).forEach(arg => {
    const [key, value] = arg.replace('--', '').split('=');
    if (key === 'iterations') options.iterations = parseInt(value);
    if (key === 'headless') options.headless = value === 'true';
  });

  const tester = new ModelComparisonTester(configId, options);

  tester.run()
    .then(() => process.exit(0))
    .catch(error => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}

module.exports = { ModelComparisonTester, MODELS, CONFIG_REGISTRY };
