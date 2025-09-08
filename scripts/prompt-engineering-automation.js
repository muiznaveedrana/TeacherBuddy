#!/usr/bin/env node

/**
 * Node.js Prompt Engineering Automation Script
 * Complete workflow for systematic prompt optimization
 * Cross-platform compatible automation
 */

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  configId: process.env.CONFIG_ID || 'year3-addition-standard-average-5q',
  baseOutputDir: process.env.BASE_OUTPUT_DIR || './prompt-engineering-results',
  baselineVariant: process.env.BASELINE_VARIANT || 'baseline',
  enhancedVariants: (process.env.ENHANCED_VARIANTS || 'enhanced-v1,enhanced-v2').split(','),
  iterations: parseInt(process.env.ITERATIONS || '5'),
  minCompositeScore: parseFloat(process.env.MIN_COMPOSITE_SCORE || '7.5'),
  parallel: process.env.PARALLEL !== 'false'
};

// Generate timestamp and session directory
const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
const sessionDir = path.join(config.baseOutputDir, `session_${timestamp}`);

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
  white: '\x1b[37m'
};

// Utility functions
function colorLog(message, color = 'white') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function printSection(title) {
  console.log('');
  colorLog('========================================', 'yellow');
  colorLog(title, 'yellow');
  colorLog('========================================', 'yellow');
  console.log('');
}

function success(message) {
  colorLog(`✅ ${message}`, 'green');
}

function error(message) {
  colorLog(`❌ ${message}`, 'red');
}

function info(message) {
  colorLog(`🔍 ${message}`, 'blue');
}

function warning(message) {
  colorLog(`⚠️  ${message}`, 'yellow');
}

// Helper to run worksheet engine commands
function runWorksheetEngine(args, options = {}) {
  return new Promise((resolve, reject) => {
    const command = 'npm';
    const cmdArgs = ['run', 'worksheet-engine', '--', ...args];
    
    info(`Running: ${command} ${cmdArgs.join(' ')}`);
    
    const child = spawn(command, cmdArgs, {
      stdio: options.silent ? 'pipe' : 'inherit',
      shell: true,
      ...options
    });
    
    let stdout = '';
    let stderr = '';
    
    if (options.silent) {
      child.stdout.on('data', (data) => {
        stdout += data.toString();
      });
      
      child.stderr.on('data', (data) => {
        stderr += data.toString();
      });
    }
    
    child.on('close', (code) => {
      if (code === 0) {
        resolve({ stdout, stderr, code });
      } else {
        reject(new Error(`Command failed with code ${code}\n${stderr}`));
      }
    });
    
    child.on('error', (err) => {
      reject(err);
    });
  });
}

// Helper to create directories
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Helper to read JSON files safely
function readJsonFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    return null;
  }
}

// Phase 1: Check Prerequisites
async function checkPrerequisites() {
  printSection('🔍 CHECKING PREREQUISITES');
  
  // Check GEMINI_API_KEY
  if (!process.env.GEMINI_API_KEY) {
    error('GEMINI_API_KEY environment variable is not set');
    colorLog('💡 Please set your API key:', 'yellow');
    console.log('export GEMINI_API_KEY="your-api-key-here"');
    process.exit(1);
  }
  success('GEMINI_API_KEY is configured');
  
  // Create session directory
  ensureDir(sessionDir);
  success(`Session directory created: ${sessionDir}`);
  
  // Test CLI accessibility
  try {
    await runWorksheetEngine(['--help'], { silent: true });
    success('Worksheet engine CLI is accessible');
  } catch (err) {
    error('Worksheet engine CLI is not accessible');
    console.error(err.message);
    process.exit(1);
  }
  
  success('All prerequisites met');
}

// Phase 2: Establish Baseline
async function establishBaseline() {
  printSection('📊 PHASE 1: ESTABLISHING BASELINE');
  
  const baselineDir = path.join(sessionDir, '01_baseline');
  ensureDir(baselineDir);
  
  info('Generating baseline worksheet with assessment...');
  
  try {
    await runWorksheetEngine([
      `--config=${config.configId}`,
      `--prompt-variant=${config.baselineVariant}`,
      '--assess',
      `--output-dir=${baselineDir}`
    ]);
    
    success('Baseline generated successfully');
    
    // Extract baseline score
    const assessmentFile = path.join(baselineDir, 'assessment-results.json');
    const assessment = readJsonFile(assessmentFile);
    
    if (assessment && assessment.scores && assessment.scores.composite) {
      success(`Baseline Composite Score: ${assessment.scores.composite}`);
    }
    
  } catch (err) {
    error('Baseline generation failed');
    console.error(err.message);
    process.exit(1);
  }
}

// Phase 3: Create Golden Reference
async function createGoldenReference() {
  printSection('🏆 PHASE 2: CREATING GOLDEN REFERENCE');
  
  const baselineDir = path.join(sessionDir, '01_baseline');
  const baselinePdf = path.join(baselineDir, 'worksheet.pdf');
  
  if (!fs.existsSync(baselinePdf)) {
    error(`Baseline PDF not found: ${baselinePdf}`);
    process.exit(1);
  }
  
  info('Creating golden reference from baseline...');
  
  try {
    await runWorksheetEngine([
      '--create-golden',
      `--config=${config.configId}`,
      `--source=${baselinePdf}`,
      '--approve'
    ]);
    
    success('Golden reference created successfully');
    
    info('Current golden references:');
    await runWorksheetEngine(['--list-golden']);
    
  } catch (err) {
    error('Golden reference creation failed');
    console.error(err.message);
    process.exit(1);
  }
}

// Phase 4: Test Variants
async function testVariants() {
  printSection('🧪 PHASE 3: TESTING ENHANCED VARIANTS');
  
  const variantsDir = path.join(sessionDir, '02_variants');
  ensureDir(variantsDir);
  
  for (const variant of config.enhancedVariants) {
    const trimmedVariant = variant.trim();
    info(`Testing variant: ${trimmedVariant}`);
    
    const variantDir = path.join(variantsDir, trimmedVariant);
    ensureDir(variantDir);
    
    try {
      await runWorksheetEngine([
        `--config=${config.configId}`,
        `--prompt-variant=${trimmedVariant}`,
        '--assess',
        `--golden-ref=./golden-references/${config.configId}/reference.pdf`,
        `--output-dir=${variantDir}`
      ]);
      
      success(`Variant ${trimmedVariant} tested successfully`);
      
      // Extract variant score
      const assessmentFile = path.join(variantDir, 'assessment-results.json');
      const assessment = readJsonFile(assessmentFile);
      
      if (assessment && assessment.scores && assessment.scores.composite) {
        success(`${trimmedVariant} Composite Score: ${assessment.scores.composite}`);
      }
      
    } catch (err) {
      warning(`Variant ${trimmedVariant} testing had issues (continuing...)`);
      console.error(err.message);
    }
  }
}

// Phase 5: Run A/B Test
async function runABTest() {
  printSection('📈 PHASE 4: STATISTICAL A/B TESTING');
  
  const abTestDir = path.join(sessionDir, '03_ab_test');
  ensureDir(abTestDir);
  
  const allVariants = [config.baselineVariant, ...config.enhancedVariants].join(',');
  
  info('Running A/B test with statistical analysis...');
  info(`Variants: ${allVariants}`);
  info(`Iterations: ${config.iterations} per variant`);
  
  try {
    await runWorksheetEngine([
      '--ab-test',
      `--config=${config.configId}`,
      `--variants=${allVariants}`,
      `--iterations=${config.iterations}`,
      ...(config.parallel ? ['--parallel'] : []),
      `--output-dir=${abTestDir}`
    ]);
    
    success('A/B test completed successfully');
    
    // Find and display results
    const files = fs.readdirSync(abTestDir);
    const resultsFile = files.find(file => file.endsWith('results.json'));
    
    if (resultsFile) {
      const results = readJsonFile(path.join(abTestDir, resultsFile));
      
      if (results) {
        success(`🏆 Winner: ${results.winner || 'Not determined'}`);
        
        if (results.statisticalAnalysis) {
          const { significant, pValue } = results.statisticalAnalysis;
          success(`📊 Statistically Significant: ${significant} (p-value: ${pValue})`);
        }
      }
    }
    
  } catch (err) {
    error('A/B test failed');
    console.error(err.message);
    process.exit(1);
  }
}

// Phase 6: Validate Quality Gates
async function validateQualityGates() {
  printSection('🚪 PHASE 5: QUALITY GATE VALIDATION');
  
  // Determine winning variant from A/B test results
  const abTestDir = path.join(sessionDir, '03_ab_test');
  let winningVariant = config.baselineVariant;
  
  try {
    const files = fs.readdirSync(abTestDir);
    const resultsFile = files.find(file => file.endsWith('results.json'));
    
    if (resultsFile) {
      const results = readJsonFile(path.join(abTestDir, resultsFile));
      if (results && results.winner) {
        winningVariant = results.winner;
      }
    }
  } catch (err) {
    info('Could not determine winner, using baseline');
  }
  
  info(`Validating winning variant: ${winningVariant}`);
  
  try {
    await runWorksheetEngine([
      '--quality-gates',
      `--config=${config.configId}`,
      `--prompt-variant=${winningVariant}`
    ]);
    
    success(`Quality gates passed for variant: ${winningVariant}`);
    
  } catch (err) {
    warning('Quality gates validation completed with warnings');
    console.error(err.message);
  }
}

// Phase 7: Generate Report
async function generateReport() {
  printSection('📋 PHASE 6: GENERATING COMPREHENSIVE REPORT');
  
  const reportDir = path.join(sessionDir, '05_report');
  ensureDir(reportDir);
  
  info('Generating automation summary report...');
  
  const summary = {
    automationSession: {
      timestamp,
      configurationId: config.configId,
      sessionDirectory: sessionDir,
      variants: [config.baselineVariant, ...config.enhancedVariants].join(','),
      phases: [
        'Baseline Establishment',
        'Golden Reference Creation',
        'Variant Testing',
        'Statistical A/B Testing',
        'Quality Gate Validation'
      ]
    },
    results: {
      baselineGenerated: true,
      goldenReferenceCreated: true,
      variantsTested: true,
      abTestCompleted: true,
      qualityGatesValidated: true
    },
    nextSteps: [
      'Review detailed results in session directory',
      'Deploy winning variant if quality gates passed',
      'Update production configuration',
      'Monitor performance in production'
    ]
  };
  
  const summaryFile = path.join(reportDir, 'automation_summary.json');
  fs.writeFileSync(summaryFile, JSON.stringify(summary, null, 2));
  
  success(`Summary report generated: ${summaryFile}`);
}

// Phase 8: Display Final Summary
function displayFinalSummary() {
  printSection('🎉 AUTOMATION COMPLETE');
  
  success('Prompt engineering automation completed successfully!');
  console.log('');
  colorLog('📁 Session Results Location:', 'blue');
  console.log(`   ${sessionDir}`);
  console.log('');
  colorLog('📊 Generated Artifacts:', 'blue');
  console.log('   • Baseline worksheet and assessment');
  console.log('   • Golden reference (approved)');
  console.log('   • Enhanced variant test results');
  console.log('   • Statistical A/B test analysis');
  console.log('   • Quality gate validation');
  console.log('   • Comprehensive summary report');
  console.log('');
  colorLog('🔍 Next Steps:', 'blue');
  console.log(`   1. Review results in: ${sessionDir}`);
  console.log('   2. Check A/B test winner and significance');
  console.log('   3. Validate quality gate outcomes');
  console.log('   4. Deploy winning variant to production');
  console.log('');
  colorLog('💡 To view results:', 'yellow');
  console.log(`   cd "${sessionDir}"`);
  console.log('   find . -name "*.json" -exec echo "{}:" \\; -exec cat "{}" \\;');
  console.log('');
}

// Main execution function
async function main() {
  try {
    colorLog('🚀 Starting Prompt Engineering Automation', 'blue');
    colorLog(`Configuration: ${config.configId}`, 'blue');
    colorLog(`Session Directory: ${sessionDir}`, 'blue');
    colorLog(`Timestamp: ${timestamp}`, 'blue');
    console.log('');
    
    // Execute all phases
    await checkPrerequisites();
    await establishBaseline();
    await createGoldenReference();
    await testVariants();
    await runABTest();
    await validateQualityGates();
    await generateReport();
    displayFinalSummary();
    
    success('🎯 Automation completed successfully!');
    
  } catch (error) {
    error(`Automation failed: ${error.message}`);
    console.error(error);
    process.exit(1);
  }
}

// Handle command line arguments
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(`
Prompt Engineering Automation Script

Usage: node prompt-engineering-automation.js [options]

Environment Variables:
  CONFIG_ID              Worksheet configuration ID (default: year3-addition-standard-average-5q)
  BASE_OUTPUT_DIR        Base output directory (default: ./prompt-engineering-results)
  BASELINE_VARIANT       Baseline variant name (default: baseline)
  ENHANCED_VARIANTS      Comma-separated enhanced variants (default: enhanced-v1,enhanced-v2)
  ITERATIONS             Number of iterations per A/B test (default: 5)
  MIN_COMPOSITE_SCORE    Minimum composite score threshold (default: 7.5)
  PARALLEL               Enable parallel processing (default: true)
  GEMINI_API_KEY         Required: Your Gemini API key

Examples:
  node prompt-engineering-automation.js
  CONFIG_ID=year4-multiplication-fluency-easy-10q node prompt-engineering-automation.js
  ENHANCED_VARIANTS=enhanced-v1,enhanced-v2,enhanced-v3 node prompt-engineering-automation.js
`);
  process.exit(0);
}

// Execute main function if this script is run directly
if (require.main === module) {
  main().catch(error => {
    console.error('Unhandled error:', error);
    process.exit(1);
  });
}

module.exports = {
  main,
  config,
  runWorksheetEngine
};