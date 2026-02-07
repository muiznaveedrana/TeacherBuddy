#!/usr/bin/env node

/**
 * PreToolUse Hook — Safety Layer
 *
 * Blocks dangerous operations before they execute:
 * - Force pushes to master/main
 * - Direct .env file access/modification
 * - Deletion of critical directories
 * - Production deploys without a passing build
 * - Dangerous rm commands targeting critical paths
 *
 * Exit codes:
 *   0 = allow (proceed)
 *   2 = block (stop the tool call, feed stderr back to Claude)
 */

const fs = require('fs');
const path = require('path');

const PROJECT_DIR = process.env.CLAUDE_PROJECT_DIR || process.cwd();

// Critical paths that must never be deleted
const PROTECTED_PATHS = [
  'supabase/migrations',
  'src/lib/services',
  'src/app',
  '.claude',
  'scripts',
  'tests/e2e',
  'public',
  'docs',
];

// Files that must never be read/edited by Claude
const SENSITIVE_FILES = [
  '.env.local',
  '.env.prod',
  '.env.production',
  '.env',
  'credentials.json',
];

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

function block(reason) {
  process.stderr.write(`BLOCKED: ${reason}\n`);
  process.exit(2);
}

function allow() {
  process.exit(0);
}

function escalate(reason) {
  // Output JSON that tells Claude to ask the user
  const output = {
    hookSpecificOutput: {
      hookEventName: 'PreToolUse',
      permissionDecision: 'ask',
      permissionDecisionReason: reason,
    },
  };
  process.stdout.write(JSON.stringify(output));
  process.exit(0);
}

function checkBashCommand(command) {
  if (!command) return;

  const cmd = command.toLowerCase().trim();

  // Block force pushes to master/main
  if (/git\s+push\s+.*--force/.test(cmd) && /(master|main)/.test(cmd)) {
    block('Force push to master/main is not allowed. Use a feature branch.');
  }

  // Block git reset --hard on master/main
  if (/git\s+reset\s+--hard/.test(cmd)) {
    const branch = getBranch();
    if (branch === 'master' || branch === 'main') {
      block('git reset --hard on master is not allowed. Switch to a feature branch first.');
    }
  }

  // Block dangerous rm commands targeting project root or critical dirs
  if (/rm\s+(-rf|-r\s+-f|-fr)\s+[\/\\]/.test(cmd)) {
    block('Recursive force delete at root level is not allowed.');
  }

  for (const protectedPath of PROTECTED_PATHS) {
    const normalized = protectedPath.replace(/\//g, '[\\\\/]');
    const rmPattern = new RegExp(`rm\\s+.*(-rf|-r).*${normalized}`);
    const rmdirPattern = new RegExp(`rmdir.*${normalized}`);
    if (rmPattern.test(cmd) || rmdirPattern.test(cmd)) {
      block(`Deletion of protected path "${protectedPath}" is not allowed.`);
    }
  }

  // Block production deploys — escalate to user for approval
  if (/vercel\s+--prod/.test(cmd) || /vercel\s+.*--prod/.test(cmd)) {
    // Check if build marker exists (created by a passing build)
    const buildMarker = path.join(PROJECT_DIR, '.claude', '.build-passed');
    if (!fs.existsSync(buildMarker)) {
      block('Production deploy blocked: no passing build detected. Run "npm run build" first and verify it passes.');
    }
    // Check marker is recent (within last 30 minutes)
    try {
      const stat = fs.statSync(buildMarker);
      const ageMs = Date.now() - stat.mtimeMs;
      const thirtyMin = 30 * 60 * 1000;
      if (ageMs > thirtyMin) {
        block('Production deploy blocked: build marker is stale (>30 min old). Run "npm run build" again.');
      }
    } catch {
      block('Production deploy blocked: cannot verify build marker.');
    }
    // Build passed and recent — escalate to user for final approval
    escalate('Production deployment detected. Build has passed. Please confirm you want to deploy to production.');
  }

  // Block db:promote without escalation
  if (/npm\s+run\s+db:promote/.test(cmd) || /node\s+.*promote-to-production/.test(cmd)) {
    escalate('Database promotion to production detected. This will copy DEV worksheets to PROD. Please confirm.');
  }

  // Block dropping database tables
  if (/drop\s+table/i.test(cmd) || /truncate\s+table/i.test(cmd)) {
    block('DROP/TRUNCATE TABLE commands are not allowed via Claude Code.');
  }
}

function checkFileAccess(filePath, toolName) {
  if (!filePath) return;

  const normalized = filePath.replace(/\\/g, '/').toLowerCase();
  const basename = path.basename(normalized);

  // Block access to sensitive env files
  for (const sensitive of SENSITIVE_FILES) {
    if (basename === sensitive.toLowerCase() || normalized.endsWith(sensitive.toLowerCase())) {
      if (toolName === 'Read') {
        block(`Reading "${sensitive}" is not allowed. Use environment variables or .env.example instead.`);
      } else {
        block(`Modifying "${sensitive}" is not allowed. Edit environment variables via Vercel dashboard or manually.`);
      }
    }
  }

  // Block deletion of protected directories via Write (empty content)
  for (const protectedPath of PROTECTED_PATHS) {
    if (normalized.includes(protectedPath.toLowerCase()) && toolName === 'Write') {
      // Allow writes to files within protected paths, but warn if it looks like an overwrite of a critical file
      const criticalFiles = ['package.json', 'next.config.js', 'playwright.config.ts', 'tsconfig.json'];
      if (criticalFiles.includes(basename)) {
        escalate(`You are about to overwrite "${basename}". Please confirm this is intentional.`);
      }
    }
  }
}

function getBranch() {
  try {
    const headFile = path.join(PROJECT_DIR, '.git', 'HEAD');
    const content = fs.readFileSync(headFile, 'utf8').trim();
    if (content.startsWith('ref: refs/heads/')) {
      return content.replace('ref: refs/heads/', '');
    }
  } catch {
    // ignore
  }
  return 'unknown';
}

async function main() {
  const input = await readStdin();
  const toolName = input.tool_name || '';
  const toolInput = input.tool_input || {};

  // Bash command checks
  if (toolName === 'Bash') {
    checkBashCommand(toolInput.command);
  }

  // File access checks for Read, Edit, Write
  if (['Read', 'Edit', 'Write'].includes(toolName)) {
    checkFileAccess(toolInput.file_path, toolName);
  }

  // All checks passed
  allow();
}

main().catch((err) => {
  // Non-blocking error — log but don't block
  process.stderr.write(`Hook error: ${err.message}\n`);
  process.exit(1);
});
