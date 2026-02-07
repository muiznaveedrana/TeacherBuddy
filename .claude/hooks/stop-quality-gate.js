#!/usr/bin/env node

/**
 * Stop Hook — Quality Gate
 *
 * Runs when Claude is about to stop responding. Checks:
 * 1. If code was edited, verify the build still passes
 * 2. If task queue has incomplete items, nudge Claude to continue
 * 3. Creates a .build-passed marker on successful build (used by deploy gate)
 *
 * CRITICAL: Checks stop_hook_active to prevent infinite loops.
 *
 * Exit codes:
 *   0 = allow stop
 *   2 = block stop (stderr fed back to Claude as feedback)
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const PROJECT_DIR = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const BUILD_MARKER = path.join(PROJECT_DIR, '.claude', '.build-passed');
const TASK_QUEUE = path.join(PROJECT_DIR, '.claude', 'task-queue.json');
const HOOK_LOG = path.join(PROJECT_DIR, '.claude', 'hooks', 'logs');

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

function ensureLogDir() {
  if (!fs.existsSync(HOOK_LOG)) {
    fs.mkdirSync(HOOK_LOG, { recursive: true });
  }
}

function log(entry) {
  ensureLogDir();
  const logFile = path.join(HOOK_LOG, 'stop-quality-gate.log');
  const timestamp = new Date().toISOString();
  const line = `[${timestamp}] ${JSON.stringify(entry)}\n`;
  fs.appendFileSync(logFile, line);
}

function hasRecentCodeChanges() {
  try {
    // Check git diff for staged + unstaged changes to source files
    const diff = execSync('git diff --name-only HEAD 2>nul', {
      cwd: PROJECT_DIR,
      encoding: 'utf8',
      timeout: 10000,
    }).trim();

    const stagedDiff = execSync('git diff --cached --name-only 2>nul', {
      cwd: PROJECT_DIR,
      encoding: 'utf8',
      timeout: 10000,
    }).trim();

    const allChanged = [...new Set([...diff.split('\n'), ...stagedDiff.split('\n')])].filter(Boolean);

    // Check if any source files were changed (not just docs, configs, etc.)
    const sourceExtensions = ['.ts', '.tsx', '.js', '.jsx', '.css', '.json'];
    const sourceChanges = allChanged.filter((f) => {
      const ext = path.extname(f).toLowerCase();
      return sourceExtensions.includes(ext) && !f.startsWith('tests/') && !f.startsWith('.claude/');
    });

    return sourceChanges.length > 0;
  } catch {
    return false;
  }
}

function runBuildCheck() {
  try {
    execSync('npm run build', {
      cwd: PROJECT_DIR,
      encoding: 'utf8',
      timeout: 120000, // 2 min timeout for build
      stdio: ['pipe', 'pipe', 'pipe'],
    });
    return { success: true };
  } catch (err) {
    const stderr = err.stderr || '';
    const stdout = err.stdout || '';
    // Extract the most relevant error lines
    const output = (stderr + '\n' + stdout).split('\n');
    const errorLines = output.filter((l) =>
      /error|Error|failed|Failed|FAIL/.test(l)
    ).slice(0, 15);
    return { success: false, errors: errorLines.join('\n') };
  }
}

function checkTaskQueue() {
  if (!fs.existsSync(TASK_QUEUE)) return null;

  try {
    const queue = JSON.parse(fs.readFileSync(TASK_QUEUE, 'utf8'));
    const pending = (queue.tasks || []).filter((t) => t.status === 'pending' || t.status === 'in_progress');
    const maxIterations = queue.max_iterations || 10;
    const currentIteration = queue.current_iteration || 0;

    if (pending.length > 0 && currentIteration < maxIterations) {
      return {
        hasPendingTasks: true,
        pendingCount: pending.length,
        nextTask: pending[0],
        iteration: currentIteration,
        maxIterations,
      };
    }
    return { hasPendingTasks: false };
  } catch {
    return null;
  }
}

function removeBuildMarker() {
  try {
    if (fs.existsSync(BUILD_MARKER)) {
      fs.unlinkSync(BUILD_MARKER);
    }
  } catch {
    // ignore
  }
}

function createBuildMarker() {
  try {
    fs.writeFileSync(BUILD_MARKER, JSON.stringify({
      timestamp: new Date().toISOString(),
      branch: getBranch(),
    }));
  } catch {
    // ignore
  }
}

function getBranch() {
  try {
    return execSync('git branch --show-current', {
      cwd: PROJECT_DIR,
      encoding: 'utf8',
      timeout: 5000,
    }).trim();
  } catch {
    return 'unknown';
  }
}

async function main() {
  const input = await readStdin();

  // CRITICAL: Prevent infinite loops
  if (input.stop_hook_active) {
    log({ event: 'stop_hook_active', action: 'allow_stop' });
    process.exit(0);
  }

  const reasons = [];

  // Check 1: Build verification if source code was changed
  if (hasRecentCodeChanges()) {
    log({ event: 'code_changes_detected', action: 'running_build' });
    const buildResult = runBuildCheck();

    if (!buildResult.success) {
      removeBuildMarker();
      log({ event: 'build_failed', errors: buildResult.errors });
      process.stderr.write(
        `Build verification FAILED after code changes. Fix the build errors before stopping:\n\n${buildResult.errors}\n\nRun "npm run build" to see full output.`
      );
      process.exit(2);
    }

    // Build passed — create marker for deploy gate
    createBuildMarker();
    log({ event: 'build_passed', action: 'marker_created' });
  }

  // Check 2: Task queue (for Night Worker pattern)
  const taskStatus = checkTaskQueue();
  if (taskStatus && taskStatus.hasPendingTasks) {
    const next = taskStatus.nextTask;
    log({
      event: 'pending_tasks',
      count: taskStatus.pendingCount,
      nextTask: next.description,
      iteration: taskStatus.iteration,
    });
    process.stderr.write(
      `Task queue has ${taskStatus.pendingCount} pending task(s). Next: "${next.description}" (iteration ${taskStatus.iteration + 1}/${taskStatus.maxIterations}). Continue working on the task queue.`
    );
    process.exit(2);
  }

  // All checks passed — allow stop
  log({ event: 'all_checks_passed', action: 'allow_stop' });
  process.exit(0);
}

main().catch((err) => {
  // Non-blocking error — don't prevent Claude from stopping
  try { log({ event: 'hook_error', error: err.message }); } catch { /* ignore */ }
  process.exit(1);
});
