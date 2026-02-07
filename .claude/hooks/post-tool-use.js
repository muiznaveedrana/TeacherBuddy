#!/usr/bin/env node

/**
 * PostToolUse Hook — Enhanced Verification
 *
 * Runs after Edit/Write operations complete:
 * 1. Lint + auto-fix (existing behavior, now unified)
 * 2. TypeScript type-check for .ts/.tsx files
 * 3. Targeted test run if a test file was edited
 *
 * This hook runs AFTER the tool already executed, so it cannot block.
 * It provides feedback to Claude via stdout (informational).
 *
 * Exit codes:
 *   0 = success (stdout is shown to Claude as context)
 *   1 = non-blocking error (logged but not shown)
 */

const { execSync } = require('child_process');
const path = require('path');

const PROJECT_DIR = process.env.CLAUDE_PROJECT_DIR || process.cwd();

function readStdin() {
  return new Promise((resolve) => {
    let data = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => { data += chunk; });
    process.stdin.on('end', () => {
      try {
        resolve(JSON.parse(data));
      } catch {
        resolve({});
      }
    });
  });
}

function runSilent(cmd, timeoutMs = 30000) {
  try {
    const result = execSync(cmd, {
      cwd: PROJECT_DIR,
      encoding: 'utf8',
      timeout: timeoutMs,
      stdio: ['pipe', 'pipe', 'pipe'],
    });
    return { success: true, output: result };
  } catch (err) {
    return { success: false, output: (err.stderr || '') + '\n' + (err.stdout || '') };
  }
}

function getFileExtension(filePath) {
  return path.extname(filePath || '').toLowerCase();
}

function isTypeScriptFile(filePath) {
  const ext = getFileExtension(filePath);
  return ext === '.ts' || ext === '.tsx';
}

function isTestFile(filePath) {
  if (!filePath) return false;
  const normalized = filePath.replace(/\\/g, '/');
  return normalized.includes('.spec.') || normalized.includes('.test.') || normalized.includes('tests/');
}

function isSourceFile(filePath) {
  const ext = getFileExtension(filePath);
  return ['.ts', '.tsx', '.js', '.jsx'].includes(ext);
}

async function main() {
  const input = await readStdin();
  const toolInput = input.tool_input || {};
  const filePath = toolInput.file_path || '';
  const feedback = [];

  if (!filePath || !isSourceFile(filePath)) {
    process.exit(0);
  }

  // 1. Lint + auto-fix (replaces the old shell-based lint hook)
  const lintResult = runSilent('npm run lint -- --fix 2>nul');
  if (!lintResult.success) {
    // Extract just the error count
    const errorMatch = lintResult.output.match(/(\d+)\s+error/);
    if (errorMatch) {
      feedback.push(`Lint: ${errorMatch[1]} error(s) remain after auto-fix`);
    }
  }

  // 2. TypeScript type-check for .ts/.tsx files
  if (isTypeScriptFile(filePath)) {
    const tscResult = runSilent('npx tsc --noEmit --pretty 2>&1', 60000);
    if (!tscResult.success) {
      // Extract error count and first few errors
      const lines = tscResult.output.split('\n');
      const errorLines = lines.filter((l) => /error TS\d+/.test(l)).slice(0, 5);
      const countMatch = tscResult.output.match(/Found (\d+) error/);
      const count = countMatch ? countMatch[1] : errorLines.length;

      if (parseInt(count) > 0) {
        feedback.push(`TypeScript: ${count} type error(s) detected`);
        errorLines.forEach((l) => feedback.push(`  ${l.trim()}`));
      }
    }
  }

  // 3. Targeted test run if a test file was edited
  if (isTestFile(filePath)) {
    const normalized = filePath.replace(/\\/g, '/');

    if (normalized.includes('e2e') || normalized.includes('.spec.')) {
      // Playwright test — just list, don't run (too slow for a hook)
      feedback.push(`Test file edited: ${path.basename(filePath)} — run with: npx playwright test "${filePath}"`);
    } else if (normalized.includes('.test.')) {
      // Vitest unit test — fast enough to run
      const testResult = runSilent(`npx vitest run "${filePath}" --reporter=verbose 2>&1`, 30000);
      if (!testResult.success) {
        const failLines = testResult.output.split('\n').filter((l) => /FAIL|fail|Error/.test(l)).slice(0, 5);
        feedback.push(`Unit test FAILED: ${path.basename(filePath)}`);
        failLines.forEach((l) => feedback.push(`  ${l.trim()}`));
      } else {
        feedback.push(`Unit test PASSED: ${path.basename(filePath)}`);
      }
    }
  }

  // Output feedback to Claude
  if (feedback.length > 0) {
    process.stdout.write(feedback.join('\n'));
  }

  process.exit(0);
}

main().catch((err) => {
  process.stderr.write(`PostToolUse hook error: ${err.message}\n`);
  process.exit(1);
});
