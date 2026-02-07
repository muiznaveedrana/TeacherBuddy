# Claude Code Hooks Master Plan — WorksheetGenerator-AI

## Table of Contents
1. [Research Findings](#1-research-findings)
2. [Current State (Phase 1 Complete)](#2-current-state)
3. [Phase 2: Deployment Pipeline](#3-phase-2-deployment-pipeline)
4. [Phase 3: Night Worker — Autonomous Continuous Operation](#4-phase-3-night-worker)
5. [Phase 4: Worksheet-Specific Intelligence](#5-phase-4-worksheet-intelligence)
6. [Architecture: All 14 Hook Events Mapped](#6-architecture)
7. [Safety & Human-in-the-Loop Design](#7-safety)
8. [Implementation Priority & Timeline](#8-priority)

---

## 1. Research Findings

### 1.1 Key Patterns from disler/claude-code-hooks-mastery

The reference repo implements all 14 hook events using UV single-file Python scripts. Key architectural decisions we should adopt:

| Pattern | What They Do | Our Adaptation |
|---------|-------------|----------------|
| **Progressive activation** | All hooks built but deployed conservatively (`--log-only` first) | Deploy new hooks in log-only mode for 1 week before activating blocking |
| **Graceful degradation** | Every hook catches all exceptions and exits 0 | Already doing this — fail-closed for PreToolUse, fail-open for others |
| **Session-scoped data** | `.claude/data/sessions/{session_id}.json` tracks per-session state | Adopt for tracking iteration counts, task progress across compactions |
| **Transcript backup** | PreCompact saves JSONL transcript before context compression | Critical for our long worksheet-generation sessions |
| **TTS notifications** | Multi-provider TTS announces completion and permission needs | Replace with Windows toast notifications (no TTS needed) |
| **LLM-powered summaries** | Cheap fast models summarize subagent work for notifications | Use Haiku for stop-hook quality evaluation |
| **File-based locking** | Mutex for concurrent TTS/subagent coordination | Adopt for Night Worker iteration tracking |
| **Environment persistence** | `CLAUDE_ENV_FILE` to set env vars from hooks | Use to ensure `NODE_ENV=development` in all sessions |

### 1.2 Proven Community Patterns We Should Adopt

| Pattern | Source | Value for Us |
|---------|--------|-------------|
| **Guaranteed context injection** (PreToolUse) | Vercel research: skills skipped 56% of the time | Inject Playwright test patterns when editing test files |
| **Dynamic input modification** (PreToolUse updatedInput) | Official docs v2.0.10+ | Auto-add `--project=chromium-desktop --workers=4` to Playwright commands |
| **Periodic context refresh** (UserPromptSubmit) | John Lindquist pattern | Re-inject critical rules every 3 prompts in long sessions |
| **Async background testing** (PostToolUse async:true) | Official docs | Run Playwright smoke tests in background after source edits |
| **TaskCompleted quality gates** | claude-pipeline | Enforce test pass before marking worksheet tasks done |
| **Ralph Wiggum autonomous loops** (Stop hook) | frankbria/ralph-claude-code | Foundation for Night Worker — tested at YC hackathons |
| **PreCompact recovery brief** | mvara-ai/precompact-hook | AI-generated context summary before compaction |
| **Skill suggestion engine** (PreToolUse) | Dev.to guardrails article | Auto-suggest relevant skills based on file paths being edited |

### 1.3 Critical Pitfalls to Avoid

1. **Infinite Stop hook loops** — Always check `stop_hook_active` (already implemented)
2. **Performance death spiral** — Never run full build on every edit (fixed in Phase 1 review)
3. **Fail-open safety hooks** — PreToolUse must exit 2 on crash, not exit 0 (fixed)
4. **Overly aggressive blocking** — Start with `warn`/`ask` mode, escalate to `block` after validation
5. **Windows `fcntl` incompatibility** — Use file-based locking with Windows-compatible API
6. **Prompt hooks are non-deterministic** — Use command hooks for safety, prompt hooks for judgment
7. **Async hooks cannot block** — Only use async for non-critical background tasks
8. **Shell profile interference** — Test hooks with `claude --debug` to catch stdout pollution

---

## 2. Current State (Phase 1 Complete)

### Hooks Deployed

| Hook | Event | Purpose | Status |
|------|-------|---------|--------|
| `pre-tool-use.js` | PreToolUse | Block force push, .env access, critical deletes, unverified deploys | Active |
| `post-tool-use.js` | PostToolUse | Scoped lint after Edit/Write | Active |
| `stop-quality-gate.js` | Stop | Type-check verification, task queue enforcement | Active |
| `session-start.js` | SessionStart | Git status, build state, task queue, CONTEXT.md injection | Active |
| (Windows MessageBox) | Notification | Desktop alert on task completion | Active |

### Hooks Not Yet Implemented (14 total events)

| Event | Planned Phase | Purpose |
|-------|--------------|---------|
| UserPromptSubmit | Phase 4 | Periodic context refresh, prompt logging |
| PermissionRequest | Phase 2 | Auto-allow read-only ops, audit deploy permissions |
| PostToolUseFailure | Phase 4 | Log tool failures for debugging |
| SubagentStart | Phase 4 | Track subagent spawns for observability |
| SubagentStop | Phase 4 | Verify subagent work quality |
| TeammateIdle | Phase 3 | Prevent idle during Night Worker runs |
| TaskCompleted | Phase 3 | Quality gate before marking tasks done |
| PreCompact | Phase 3 | Backup transcript + context before compaction |
| SessionEnd | Phase 4 | Cleanup temp files, log session summary |
| Setup | Phase 4 | Environment detection, dependency check |

---

## 3. Phase 2: Deployment Pipeline

### Goal
Make production deploys safe and verified. No deploy without build + smoke tests passing. No DB promotion without backup. Full audit trail.

### 3.1 Hook: Pre-Deploy Full Verification (PreToolUse enhancement)

**Trigger**: `vercel --prod` detected in Bash command
**Current behavior**: Checks for `.build-passed` marker, escalates to user
**New behavior**:

```
vercel --prod detected
  |
  v
Run npm run build (full build, not just tsc)
  |-- FAIL --> Block with build errors
  |-- PASS
  v
Run Playwright smoke tests (npx playwright test --grep "SMOKE")
  |-- FAIL --> Block with test failures
  |-- PASS
  v
Create .deploy-ready marker with build hash + test results
  |
  v
Escalate to user: "Build PASSED. 3/3 smoke tests PASSED. Deploy to production?"
  |-- User approves --> Allow
  |-- User denies --> Block
```

**Implementation**: Enhance existing `pre-tool-use.js` with a `runPreDeployChecks()` function. This runs ONLY when `vercel --prod` is detected — not on every tool call.

### 3.2 Hook: Post-Deploy Health Check (PostToolUse enhancement)

**Trigger**: After `vercel --prod` completes successfully
**Behavior**:

```
vercel --prod completed
  |
  v
Wait 15s for deployment propagation
  |
  v
Health check: GET production-url/ (expect 200)
Health check: GET production-url/library (expect 200)
Health check: GET production-url/api/health (expect 200)
  |
  |-- All pass --> Log success, Windows toast "Deploy successful"
  |-- Any fail --> Windows toast "DEPLOY HEALTH CHECK FAILED", log details
```

**Implementation**: New file `.claude/hooks/post-deploy-health.js` registered as PostToolUse with matcher for Bash commands containing `vercel`.

### 3.3 Hook: DB Promotion Safety Gate (PreToolUse enhancement)

**Trigger**: `npm run db:promote` or `node scripts/promote-to-production.js`
**Current behavior**: Escalates to user
**New behavior**:

```
db:promote detected
  |
  v
Check: Recent deploy marker exists? (vercel deploy within last 1 hour)
  |-- NO --> Block: "Deploy code first, then promote data"
  |
  v
Auto-run: npm run db:backup (backup PROD before promotion)
  |-- FAIL --> Block: "Backup failed, cannot promote"
  |-- PASS
  v
Query: Count worksheets in DEV vs PROD
  |
  v
Escalate: "Promoting N new worksheets. PROD backed up. DEV has X total, PROD has Y. Confirm?"
```

**Implementation**: New file `.claude/hooks/db-promote-gate.js`.

### 3.4 Deploy Audit Log

All deployment events logged to `.claude/hooks/logs/deploy.log`:
```json
{
  "timestamp": "2026-02-07T22:15:00Z",
  "event": "deploy_started|deploy_passed|deploy_failed|health_check|db_promote",
  "branch": "feature/claude-code-hooks",
  "commit": "abc1234",
  "build_duration_ms": 45000,
  "smoke_tests_passed": 3,
  "health_check_results": {"home": 200, "library": 200, "api": 200}
}
```

### 3.5 Files to Create

| File | Purpose |
|------|---------|
| `.claude/hooks/deploy-verify.js` | Pre-deploy build + smoke test gate |
| `.claude/hooks/post-deploy-health.js` | Post-deploy health checks |
| `.claude/hooks/db-promote-gate.js` | DB promotion safety with auto-backup |

### 3.6 Settings Changes

```json
{
  "PreToolUse": [
    {
      "matcher": "Bash",
      "hooks": [
        { "type": "command", "command": "node \"$CLAUDE_PROJECT_DIR/.claude/hooks/pre-tool-use.js\"", "timeout": 10 },
        { "type": "command", "command": "node \"$CLAUDE_PROJECT_DIR/.claude/hooks/deploy-verify.js\"", "timeout": 300 },
        { "type": "command", "command": "node \"$CLAUDE_PROJECT_DIR/.claude/hooks/db-promote-gate.js\"", "timeout": 60 }
      ]
    }
  ],
  "PostToolUse": [
    {
      "matcher": "Bash",
      "hooks": [
        { "type": "command", "command": "node \"$CLAUDE_PROJECT_DIR/.claude/hooks/post-deploy-health.js\"", "timeout": 60 }
      ]
    }
  ]
}
```

---

## 4. Phase 3: Night Worker — Autonomous Continuous Operation

### Goal
Claude Code works autonomously while you sleep. Picks up tasks from a queue, works through them, handles token limits gracefully, resumes automatically, and produces a morning report.

### 4.1 Architecture Overview

```
YOU (before bed)
  |
  v
Create task-queue.json with tonight's work
  |
  v
Start night-worker.ps1 watchdog
  |
  v
Claude Code picks up first task
  |
  v
[Work Loop]
  Claude works --> Makes tool calls --> Hooks enforce quality
  |
  |-- Stop hook: tasks remaining? --> Block stop, continue working
  |-- TaskCompleted hook: tests pass? --> Allow/block completion
  |-- PreCompact hook: backup context before compression
  |-- Token limit hit --> Claude exits
  |
  v
[Watchdog Loop]
  night-worker.ps1 detects exit
  |-- Clean exit (all tasks done) --> Generate morning report, notify
  |-- Token limit exit --> Wait 5 min, resume session
  |-- Error exit --> Log, wait 10 min, retry (max 3 retries)
  |-- Max runtime exceeded --> Force stop, generate partial report
  |
  v
YOU (morning)
  Read .claude/night-worker-report.md
  Review git log for auto-commits
  Approve or revert changes
```

### 4.2 Task Queue Schema

```json
{
  "created": "2026-02-07T22:00:00Z",
  "created_by": "user",
  "max_iterations": 10,
  "max_runtime_hours": 8,
  "current_iteration": 0,
  "session_id": null,
  "safety": {
    "allow_git_commit": true,
    "allow_git_push": false,
    "allow_deploy": false,
    "allow_db_changes": false,
    "target_branch": "feature/night-worker-output"
  },
  "tasks": [
    {
      "id": 1,
      "description": "Run all Year 3 interactive E2E tests",
      "command": "npx playwright test tests/e2e/interactive/year3/ --project=chromium-desktop --workers=4",
      "status": "pending",
      "priority": 1,
      "requires_approval": false,
      "started_at": null,
      "completed_at": null,
      "result": null
    },
    {
      "id": 2,
      "description": "Fix any failing Year 3 tests using playwright-test-healer",
      "depends_on": [1],
      "status": "pending",
      "priority": 2,
      "requires_approval": false
    },
    {
      "id": 3,
      "description": "Run quality assessment on all Reception worksheets",
      "status": "pending",
      "priority": 3,
      "requires_approval": true
    }
  ],
  "completed": [],
  "log": []
}
```

### 4.3 New Hooks for Night Worker

#### PreCompact — Transcript Backup + Context Preservation

**Purpose**: Before Claude's context gets compressed, save the full transcript and a summary of current progress to `.claude/CONTEXT.md`.

```
PreCompact fires
  |
  v
Copy transcript JSONL to .claude/hooks/logs/transcripts/
  |
  v
Extract key decisions/progress from last 20 messages
  |
  v
Update .claude/CONTEXT.md with:
  - Current task being worked on
  - Tasks completed so far
  - Key errors encountered
  - Files modified
  |
  v
Update task-queue.json current_iteration++
```

**Implementation**: `.claude/hooks/pre-compact.js`

#### TaskCompleted — Quality Gate Before Task Completion

**Purpose**: When Claude marks a task done (in the task queue), verify the work actually passes quality checks.

```
TaskCompleted fires
  |
  v
Read task-queue.json, find the completing task
  |
  v
If task involves tests:
  Run the test command, verify pass rate
  |-- Fail --> Exit 2: "Tests failing, fix before completing"
  |
  v
If task involves code changes:
  Run tsc --noEmit
  |-- Fail --> Exit 2: "Type errors, fix before completing"
  |
  v
Move task to completed[], update task-queue.json
Exit 0
```

**Implementation**: `.claude/hooks/task-completed-gate.js`

#### SessionStart — Night Worker Context Reload

**Enhancement to existing hook**: When session type is `resume` and task-queue.json exists, inject detailed context about what was being worked on.

```
SessionStart (resume) fires
  |
  v
Read .claude/CONTEXT.md (preserved by PreCompact)
  |
  v
Read task-queue.json for current state
  |
  v
Inject: "You are in Night Worker mode. Session resumed after token limit.
  Current task: [description]
  Completed: [N] tasks
  Remaining: [M] tasks
  Iteration: [X]/[max]
  Branch: [target_branch]
  Last activity: [timestamp]
  Continue working on the current task."
```

### 4.4 Watchdog Script (night-worker.ps1)

**Purpose**: External PowerShell script that monitors Claude Code, handles restarts, and enforces runtime limits.

**Key behaviors**:
- Launches `claude --resume` with the session ID
- Monitors process exit
- Distinguishes clean exit from token limit (via exit code + task-queue state)
- Waits configurable cooldown between restarts (default: 5 min)
- Enforces max runtime (default: 8 hours)
- Generates morning report on completion
- Sends Windows notification on finish or error

**Lifecycle**:
```
1. Read task-queue.json, validate
2. Create git branch (safety.target_branch)
3. Launch claude --resume (or claude -p "Work on task queue" for first run)
4. Wait for process exit
5. Check task-queue.json:
   - All tasks completed? --> Generate report, exit
   - Tasks remaining + iteration < max? --> Wait cooldown, goto 3
   - Max iterations reached? --> Generate report, exit
   - Error detected? --> Log, retry up to 3 times, then exit
6. Generate .claude/night-worker-report.md
7. Windows toast notification
```

### 4.5 Morning Report Format

```markdown
# Night Worker Report — 2026-02-08 07:00

## Summary
- Started: 2026-02-07 22:00
- Finished: 2026-02-08 04:30
- Duration: 6h 30m
- Iterations: 4/10
- Tasks completed: 2/3

## Task Results
### Task 1: Run all Year 3 interactive E2E tests
- Status: COMPLETED
- Duration: 45 min
- Result: 215/217 tests passed (2 flaky)
- Files modified: none

### Task 2: Fix failing Year 3 tests
- Status: COMPLETED
- Duration: 1h 15m
- Result: 2 tests fixed
- Files modified:
  - tests/e2e/interactive/year3/adding-2digit-numbers.spec.ts
  - tests/e2e/interactive/year3/counting-in-5s.spec.ts
- Commits:
  - abc1234: fix(test): update selector for 2-digit addition
  - def5678: fix(test): handle async loading in counting-in-5s

### Task 3: Quality assessment on Reception worksheets
- Status: PENDING (requires_approval)
- Note: Skipped — marked as requires_approval

## Git Summary
- Branch: feature/night-worker-output
- Commits: 2 new
- No pushes (safety.allow_git_push = false)

## Errors Encountered
- Iteration 2: Token limit reached after 45 min, resumed successfully
- No other errors

## Recommendations
- Merge feature/night-worker-output into master after review
- Task 3 requires manual approval — run when ready
```

### 4.6 Safety Rails for Night Worker

| Safety Mechanism | How It Works |
|-----------------|-------------|
| **Max iterations** | Hard cap (default 10), watchdog enforces |
| **Max runtime** | Hard cap (default 8 hours), watchdog kills process |
| **Dedicated branch** | All work on `safety.target_branch`, never on master |
| **No push by default** | `safety.allow_git_push = false` |
| **No deploy** | `safety.allow_deploy = false` + PreToolUse blocks |
| **No DB changes** | `safety.allow_db_changes = false` + PreToolUse blocks |
| **Approval gates** | Tasks with `requires_approval: true` are skipped |
| **Git tags** | Each iteration tagged for easy rollback |
| **stop_hook_active guard** | Prevents infinite loops (existing) |
| **Morning report** | Full audit of everything done overnight |
| **CONTEXT.md persistence** | State survives context compaction |

### 4.7 Files to Create

| File | Purpose |
|------|---------|
| `.claude/hooks/pre-compact.js` | Backup transcript, update CONTEXT.md |
| `.claude/hooks/task-completed-gate.js` | Quality gate before task completion |
| `scripts/night-worker.ps1` | External watchdog script |
| `.claude/night-worker-report-template.md` | Report template |

---

## 5. Phase 4: Worksheet-Specific Intelligence

### Goal
Hooks that understand the worksheet domain — auto-suggest Playwright patterns, inject generation rules, validate worksheet HTML, and provide observability for long generation sessions.

### 5.1 Hook: Context-Aware Skill Injection (PreToolUse)

**Trigger**: Any Edit/Write/Read on files matching specific paths
**Behavior**: Inject relevant domain rules based on what Claude is editing.

```
File path matches?
  |
  |-- tests/e2e/interactive/ --> Inject: Playwright test patterns
  |     "Use fill() not pressSequentially(). Remove .cookie-consent-container.
  |      Verify 100% score. Use --project=chromium-desktop --workers=4."
  |
  |-- src/lib/prompts/ --> Inject: Worksheet generation rules
  |     "Follow curriculum taxonomy. Check image availability in catalogs.
  |      All questions must have answer keys. Max 5 questions per worksheet."
  |
  |-- supabase/ --> Inject: Database safety rules
  |     "Always target dev database. Never modify RLS policies directly.
  |      Use migration files for schema changes. Test with npx supabase db execute."
  |
  |-- src/app/ --> Inject: Next.js conventions
  |     "Use App Router patterns. Server components by default.
  |      Client components only for interactivity. Use Zod for validation."
```

**Implementation**: `.claude/hooks/context-injector.js`

### 5.2 Hook: Playwright Command Enhancement (PreToolUse updatedInput)

**Trigger**: Bash commands containing `npx playwright test`
**Behavior**: Auto-add standard flags if missing.

```
npx playwright test tests/e2e/interactive/year3/
  |
  v (hook modifies command)

npx playwright test tests/e2e/interactive/year3/ --project=chromium-desktop --workers=4 --timeout=30000
```

**Output**: Returns `updatedInput` with the enhanced command.

**Implementation**: Part of `context-injector.js`

### 5.3 Hook: UserPromptSubmit — Periodic Refresh

**Trigger**: Every 3rd user prompt (using modulo counter)
**Behavior**: Re-inject critical rules that Claude tends to forget in long sessions.

```
Prompt count % 3 === 0 AND prompt count >= 3?
  |
  v
Inject: "Reminder — Worksheet Generator Rules:
  - Use fill() not pressSequentially() for test inputs
  - ALWAYS remove .cookie-consent-container before clicking buttons
  - Use Playwright agents: planner → generator → healer
  - E2E tests: NO screenshots, only functional testing
  - Cookie consent must be dismissed in every test"
```

**Implementation**: `.claude/hooks/user-prompt-refresh.js` with counter in `.claude/data/prompt-count.json`

### 5.4 Hook: Subagent Observability (SubagentStart + SubagentStop)

**Trigger**: When Task agents spawn and complete
**Behavior**: Log subagent lifecycle for debugging and observability.

```
SubagentStart:
  Log: "Agent [type] started for task [subject]"

SubagentStop:
  Log: "Agent [type] completed in [duration]ms"
  If Night Worker active:
    Update task-queue.json with result
```

**Implementation**: `.claude/hooks/subagent-observer.js`

### 5.5 Hook: PostToolUseFailure — Error Intelligence

**Trigger**: When any tool call fails
**Behavior**: Log failures with context for debugging. Detect patterns (e.g., repeated Playwright timeouts suggest the dev server is down).

```
Tool failure detected
  |
  v
Log to .claude/hooks/logs/failures.log
  |
  v
Pattern detection:
  3+ Playwright failures in 5 min? --> "Dev server may be down. Run npx kill-port 3000 && npm run dev"
  3+ Bash failures with ENOENT? --> "Check PATH or install missing tool"
  3+ Edit failures? --> "File may be locked or path incorrect"
```

**Implementation**: `.claude/hooks/failure-tracker.js`

### 5.6 Hook: SessionEnd — Cleanup

**Trigger**: When Claude session ends
**Behavior**: Clean up temp files, rotate logs, save session summary.

```
Session ending
  |
  v
Delete .claude/data/prompt-count.json (reset for next session)
Rotate logs > 5MB
Save session summary to .claude/hooks/logs/sessions/
```

**Implementation**: `.claude/hooks/session-end.js`

### 5.7 Files to Create

| File | Purpose |
|------|---------|
| `.claude/hooks/context-injector.js` | Domain-aware context injection + Playwright command enhancement |
| `.claude/hooks/user-prompt-refresh.js` | Periodic rule refresh every N prompts |
| `.claude/hooks/subagent-observer.js` | Subagent lifecycle logging |
| `.claude/hooks/failure-tracker.js` | Tool failure pattern detection |
| `.claude/hooks/session-end.js` | Cleanup and session summary |

---

## 6. Architecture: All 14 Hook Events Mapped

Complete mapping of all 14 events to our implementation:

```
SESSION LIFECYCLE
=================
Setup ──────────────> [Phase 4] Environment detection, dependency check
SessionStart ───────> [Phase 1] Git status, build state, task queue, CONTEXT.md
                      [Phase 3] Night Worker context reload on resume
UserPromptSubmit ───> [Phase 4] Periodic context refresh every 3 prompts
SessionEnd ─────────> [Phase 4] Cleanup, log rotation, session summary

TOOL LIFECYCLE
==============
PreToolUse ─────────> [Phase 1] Safety: block force push, .env, critical deletes
                      [Phase 1] Deploy: block vercel --prod without build marker
                      [Phase 2] Deploy: full build + smoke tests before deploy
                      [Phase 2] DB: auto-backup before promotion
                      [Phase 4] Context: inject domain rules based on file path
                      [Phase 4] Playwright: auto-add standard flags to test commands
PermissionRequest ──> [Phase 2] Auto-allow read-only, audit deploy permissions
PostToolUse ────────> [Phase 1] Scoped lint after Edit/Write
                      [Phase 2] Post-deploy health checks
PostToolUseFailure ─> [Phase 4] Error pattern detection

AGENT LIFECYCLE
===============
SubagentStart ──────> [Phase 4] Observability logging
SubagentStop ───────> [Phase 4] Result tracking, Night Worker task updates
TeammateIdle ───────> [Phase 3] Prevent idle during Night Worker runs

COMPLETION LIFECYCLE
====================
TaskCompleted ──────> [Phase 3] Quality gate: tests must pass before completion
Stop ───────────────> [Phase 1] Type-check verification after code changes
                      [Phase 1] Task queue enforcement (Night Worker)
PreCompact ─────────> [Phase 3] Backup transcript, update CONTEXT.md

NOTIFICATIONS
=============
Notification ───────> [Phase 1] Windows MessageBox on task completion
                      [Phase 2] Deploy success/failure alerts
```

---

## 7. Safety & Human-in-the-Loop Design

### 7.1 Three-Tier Safety Model

```
TIER 1 — DETERMINISTIC BLOCKS (PreToolUse command hooks)
  Always blocked, no exceptions:
  - Force push to master/main
  - .env file access
  - DROP TABLE/SCHEMA
  - rm -rf on protected paths
  - Production deploy without build pass

TIER 2 — HUMAN APPROVAL (PreToolUse "ask" decision)
  Escalated to user, user decides:
  - Production deploy (after build + tests pass)
  - Database promotion
  - Overwriting critical config files (package.json, next.config.js)
  - Night Worker tasks marked requires_approval

TIER 3 — SOFT GATES (Stop/TaskCompleted hooks)
  Block Claude from stopping/completing, force self-correction:
  - Type errors after code changes
  - Failing tests
  - Incomplete task queue items
  - Missing build artifacts
```

### 7.2 Night Worker Safety Matrix

| Action | Allowed by Default | Override |
|--------|-------------------|---------|
| Read any file | Yes | — |
| Edit source files | Yes | — |
| Create new files | Yes | — |
| Delete files | Only in tests/ and .next/ | `safety.allow_delete_source: true` |
| Git commit | Yes (to target branch) | `safety.allow_git_commit: false` |
| Git push | No | `safety.allow_git_push: true` |
| Deploy to production | No | Never allowed in Night Worker |
| Database changes | No | `safety.allow_db_changes: true` |
| Install packages | No | `safety.allow_npm_install: true` |
| Run dev server | Yes | — |
| Run tests | Yes | — |

### 7.3 Emergency Stop

Three ways to stop the Night Worker:
1. **Delete task-queue.json** — Stop hook sees no tasks, allows Claude to stop
2. **Kill the watchdog** — `taskkill /F /IM powershell.exe` (kills night-worker.ps1)
3. **Set max_iterations to 0** — Edit task-queue.json, set `current_iteration >= max_iterations`

---

## 8. Implementation Priority & Timeline

### Phase 2: Deployment Pipeline (3 files, ~400 lines)

**Priority**: HIGH — Prevents production incidents
**Estimated effort**: 2-3 hours

| Step | What | Why |
|------|------|-----|
| 1 | Create `deploy-verify.js` | Full build + smoke test gate before deploy |
| 2 | Create `post-deploy-health.js` | Verify production works after deploy |
| 3 | Create `db-promote-gate.js` | Auto-backup + count comparison before DB promote |
| 4 | Wire into settings.local.json | Register with correct matchers and timeouts |
| 5 | Test manually | Simulate deploy and DB promote flows |
| 6 | Commit to feature branch | Incremental delivery |

### Phase 3: Night Worker (4 files + watchdog, ~800 lines)

**Priority**: HIGH — Enables autonomous overnight work
**Estimated effort**: 4-5 hours

| Step | What | Why |
|------|------|-----|
| 1 | Create `pre-compact.js` | Context preservation across compactions |
| 2 | Create `task-completed-gate.js` | Quality enforcement for task completion |
| 3 | Enhance `session-start.js` | Night Worker context reload |
| 4 | Create `night-worker.ps1` | External watchdog with auto-resume |
| 5 | Create report generator | Morning report from task-queue.json + git log |
| 6 | Wire into settings.local.json | Register new hooks |
| 7 | Test: create sample task queue, run 2 iterations | Validate full loop |
| 8 | Commit to feature branch | Incremental delivery |

### Phase 4: Worksheet Intelligence (5 files, ~500 lines)

**Priority**: MEDIUM — Quality of life and observability
**Estimated effort**: 3-4 hours

| Step | What | Why |
|------|------|-----|
| 1 | Create `context-injector.js` | Domain-aware rule injection |
| 2 | Create `user-prompt-refresh.js` | Periodic rule reminder |
| 3 | Create `subagent-observer.js` | Agent lifecycle logging |
| 4 | Create `failure-tracker.js` | Error pattern detection |
| 5 | Create `session-end.js` | Cleanup and rotation |
| 6 | Wire into settings.local.json | Register all new hooks |
| 7 | Test in real workflow | Run through a worksheet generation cycle |
| 8 | Commit to feature branch | Incremental delivery |

### Final: Merge to Master

After all phases tested:
1. Squash-merge feature branch to master
2. Tag as `v1.0-hooks`
3. Update CLAUDE.md with hooks documentation
4. Run full E2E test suite to verify no regressions

---

## Appendix A: Complete File Inventory

After all 4 phases, the hooks directory will contain:

```
.claude/
  CONTEXT.md                           # Persistent notes (survives compaction)
  task-queue.json                      # Night Worker task queue (gitignored)
  data/
    prompt-count.json                  # UserPromptSubmit counter (gitignored)
  hooks/
    # Phase 1 (DONE)
    pre-tool-use.js                    # Safety layer
    post-tool-use.js                   # Scoped lint
    stop-quality-gate.js               # Type-check + task queue
    session-start.js                   # Context injection

    # Phase 2
    deploy-verify.js                   # Pre-deploy build + smoke tests
    post-deploy-health.js              # Post-deploy health checks
    db-promote-gate.js                 # DB promotion safety

    # Phase 3
    pre-compact.js                     # Transcript backup + CONTEXT.md update
    task-completed-gate.js             # Quality gate for task completion

    # Phase 4
    context-injector.js                # Domain-aware rule injection
    user-prompt-refresh.js             # Periodic context refresh
    subagent-observer.js               # Agent lifecycle logging
    failure-tracker.js                 # Error pattern detection
    session-end.js                     # Cleanup

    logs/                              # All hook logs (gitignored)
      stop-quality-gate.log
      deploy.log
      failures.log
      sessions/
      transcripts/

scripts/
  night-worker.ps1                     # External watchdog script
```

## Appendix B: Settings.local.json Final State (All Phases)

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash|Edit|Write|Read",
        "hooks": [
          { "type": "command", "command": "node \"$CLAUDE_PROJECT_DIR/.claude/hooks/pre-tool-use.js\"", "timeout": 10 }
        ]
      },
      {
        "matcher": "Bash",
        "hooks": [
          { "type": "command", "command": "node \"$CLAUDE_PROJECT_DIR/.claude/hooks/deploy-verify.js\"", "timeout": 300 },
          { "type": "command", "command": "node \"$CLAUDE_PROJECT_DIR/.claude/hooks/db-promote-gate.js\"", "timeout": 60 },
          { "type": "command", "command": "node \"$CLAUDE_PROJECT_DIR/.claude/hooks/context-injector.js\"", "timeout": 5 }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          { "type": "command", "command": "node \"$CLAUDE_PROJECT_DIR/.claude/hooks/post-tool-use.js\"", "timeout": 30 }
        ]
      },
      {
        "matcher": "Bash",
        "hooks": [
          { "type": "command", "command": "node \"$CLAUDE_PROJECT_DIR/.claude/hooks/post-deploy-health.js\"", "timeout": 60 }
        ]
      }
    ],
    "PostToolUseFailure": [
      {
        "hooks": [
          { "type": "command", "command": "node \"$CLAUDE_PROJECT_DIR/.claude/hooks/failure-tracker.js\"", "timeout": 5 }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          { "type": "command", "command": "node \"$CLAUDE_PROJECT_DIR/.claude/hooks/stop-quality-gate.js\"", "timeout": 90 }
        ]
      }
    ],
    "SessionStart": [
      {
        "hooks": [
          { "type": "command", "command": "node \"$CLAUDE_PROJECT_DIR/.claude/hooks/session-start.js\"", "timeout": 15 }
        ]
      }
    ],
    "SessionEnd": [
      {
        "hooks": [
          { "type": "command", "command": "node \"$CLAUDE_PROJECT_DIR/.claude/hooks/session-end.js\"", "timeout": 10 }
        ]
      }
    ],
    "UserPromptSubmit": [
      {
        "hooks": [
          { "type": "command", "command": "node \"$CLAUDE_PROJECT_DIR/.claude/hooks/user-prompt-refresh.js\"", "timeout": 5 }
        ]
      }
    ],
    "TaskCompleted": [
      {
        "hooks": [
          { "type": "command", "command": "node \"$CLAUDE_PROJECT_DIR/.claude/hooks/task-completed-gate.js\"", "timeout": 120 }
        ]
      }
    ],
    "PreCompact": [
      {
        "hooks": [
          { "type": "command", "command": "node \"$CLAUDE_PROJECT_DIR/.claude/hooks/pre-compact.js\"", "timeout": 30 }
        ]
      }
    ],
    "SubagentStart": [
      {
        "hooks": [
          { "type": "command", "command": "node \"$CLAUDE_PROJECT_DIR/.claude/hooks/subagent-observer.js\"", "timeout": 5 }
        ]
      }
    ],
    "SubagentStop": [
      {
        "hooks": [
          { "type": "command", "command": "node \"$CLAUDE_PROJECT_DIR/.claude/hooks/subagent-observer.js\"", "timeout": 10 }
        ]
      }
    ],
    "Notification": [
      {
        "hooks": [
          { "type": "command", "command": "powershell -Command \"Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.MessageBox]::Show('Task completed','Claude Code')\"", "timeout": 30 }
        ]
      }
    ]
  }
}
```
