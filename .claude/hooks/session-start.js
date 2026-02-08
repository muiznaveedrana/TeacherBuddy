#!/usr/bin/env node

/**
 * SessionStart Hook — Context Injection
 *
 * Fires on every session start, resume, clear, or compaction.
 * Outputs context to stdout which gets injected into Claude's context.
 *
 * Injects:
 * 1. Current git branch + uncommitted changes summary
 * 2. Last build status (from build marker)
 * 3. Active task queue status (for Night Worker)
 * 4. Contents of .claude/CONTEXT.md (persistent notes)
 * 5. Session type (fresh start vs resume vs compaction)
 *
 * Exit codes:
 *   0 = success (stdout added to Claude's context)
 *   1 = non-blocking error
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const PROJECT_DIR = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const BUILD_MARKER = path.join(PROJECT_DIR, '.claude', '.build-passed');
const TASK_QUEUE = path.join(PROJECT_DIR, '.claude', 'task-queue.json');
const CONTEXT_FILE = path.join(PROJECT_DIR, '.claude', 'CONTEXT.md');

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

function run(cmd, timeoutMs = 10000) {
  try {
    return execSync(cmd, {
      cwd: PROJECT_DIR,
      encoding: 'utf8',
      timeout: timeoutMs,
      stdio: ['pipe', 'pipe', 'pipe'],
    }).trim();
  } catch {
    return '';
  }
}

function getGitContext() {
  const lines = [];

  const branch = run('git branch --show-current');
  if (branch) lines.push(`Branch: ${branch}`);

  const status = run('git status --short');
  if (status) {
    const changed = status.split('\n').filter(Boolean);
    lines.push(`Uncommitted changes: ${changed.length} file(s)`);
    // Show first 10
    changed.slice(0, 10).forEach((l) => lines.push(`  ${l}`));
    if (changed.length > 10) lines.push(`  ... and ${changed.length - 10} more`);
  } else {
    lines.push('Working tree: clean');
  }

  const lastCommit = run('git log --oneline -1');
  if (lastCommit) lines.push(`Last commit: ${lastCommit}`);

  return lines;
}

function getBuildStatus() {
  if (!fs.existsSync(BUILD_MARKER)) {
    return 'Build status: unknown (no recent build marker)';
  }

  try {
    const data = JSON.parse(fs.readFileSync(BUILD_MARKER, 'utf8'));
    const age = Date.now() - new Date(data.timestamp).getTime();
    const mins = Math.round(age / 60000);

    if (mins > 30) {
      return `Build status: STALE (passed ${mins} min ago on branch "${data.branch}")`;
    }
    return `Build status: PASSED (${mins} min ago on branch "${data.branch}")`;
  } catch {
    return 'Build status: unknown (invalid marker)';
  }
}

function getTaskQueueStatus() {
  if (!fs.existsSync(TASK_QUEUE)) return null;

  try {
    const queue = JSON.parse(fs.readFileSync(TASK_QUEUE, 'utf8'));
    const tasks = queue.tasks || [];
    const pending = tasks.filter((t) => t.status === 'pending');
    const inProgress = tasks.filter((t) => t.status === 'in_progress');
    const completed = (queue.completed || []).length;
    const iteration = queue.current_iteration || 0;
    const maxIterations = queue.max_iterations || 10;

    const lines = [
      `Task queue: ${pending.length} pending, ${inProgress.length} in-progress, ${completed} completed`,
      `Iteration: ${iteration}/${maxIterations}`,
    ];

    if (inProgress.length > 0) {
      lines.push(`Current task: "${inProgress[0].description}"`);
    } else if (pending.length > 0) {
      lines.push(`Next task: "${pending[0].description}"`);
    }

    return lines;
  } catch {
    return null;
  }
}

function getContextFile() {
  if (!fs.existsSync(CONTEXT_FILE)) return null;

  try {
    const content = fs.readFileSync(CONTEXT_FILE, 'utf8').trim();
    if (content.length === 0) return null;
    // Limit to 2000 chars to avoid flooding context
    const truncated = content.length > 2000 ? content.substring(0, 2000) + '\n... (truncated)' : content;
    return truncated;
  } catch {
    return null;
  }
}

async function main() {
  const input = await readStdin();
  const sessionType = input.type || 'startup';

  const output = [];

  output.push('--- Session Context (auto-injected by hooks) ---');
  output.push(`Session type: ${sessionType}`);
  output.push('');

  // Git context
  const gitLines = getGitContext();
  if (gitLines.length > 0) {
    output.push(...gitLines);
    output.push('');
  }

  // Build status
  output.push(getBuildStatus());
  output.push('');

  // Task queue (Night Worker)
  const taskLines = getTaskQueueStatus();
  if (taskLines) {
    output.push(...taskLines);
    output.push('');
  }

  // Persistent context notes
  const context = getContextFile();
  if (context) {
    output.push('--- Persistent Context Notes ---');
    output.push(context);
    output.push('');
  }

  // Compaction-specific reminder
  if (sessionType === 'compact') {
    output.push('NOTE: Context was just compacted. Check task list and git status for current state.');
  }

  output.push('--- End Session Context ---');

  process.stdout.write(output.join('\n'));
  process.exit(0);
}

main().catch((err) => {
  process.stderr.write(`SessionStart hook error: ${err.message}\n`);
  process.exit(1);
});
