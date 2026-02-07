# Optimal Hooks, Skills, Agents & Subagents Workflow
## Single Source of Truth — WorksheetGenerator-AI

> **Purpose**: Complete blueprint for building an autonomous, safe, 24-hour development workflow using Claude Code hooks, skills, agents, and subagents.
>
> **Replaces**: `docs/claude-code-hooks-master-plan.md` and `docs/skills-agents-subagents-master-plan.md`

---

## Table of Contents

1. [Vision & Architecture](#1-vision--architecture)
2. [Research Foundations](#2-research-foundations)
3. [CLAUDE.md Optimization Strategy](#3-claudemd-optimization-strategy)
4. [Task System & Agentic Orchestration](#4-task-system--agentic-orchestration)
5. [Phase 1: Safety & Quality Hooks (COMPLETED)](#5-phase-1-safety--quality-hooks-completed)
6. [Phase 2: Agent & Skill Upgrades](#6-phase-2-agent--skill-upgrades)
7. [Phase 3: New Agents & Skills](#7-phase-3-new-agents--skills)
8. [Phase 4: Deployment Pipeline](#8-phase-4-deployment-pipeline)
9. [Phase 5: Night Worker — Autonomous 24-Hour Operation](#9-phase-5-night-worker--autonomous-24-hour-operation)
10. [Phase 6: Worksheet Intelligence & Observability](#10-phase-6-worksheet-intelligence--observability)
11. [All 14 Hook Events — Complete Architecture](#11-all-14-hook-events--complete-architecture)
12. [Human-in-the-Loop Decision Guide](#12-human-in-the-loop-decision-guide)
13. [Example Scenarios: 24-Hour Autonomous Operation](#13-example-scenarios-24-hour-autonomous-operation)
14. [Emergency Procedures](#14-emergency-procedures)
15. [Complete Inventory (Final State)](#15-complete-inventory-final-state)
16. [Implementation Priority & Dependencies](#16-implementation-priority--dependencies)

---

## 1. Vision & Architecture

### What We're Building

A development workflow where Claude Code:
- **Works autonomously** — picks up tasks, works through them, handles errors, and continues
- **Self-corrects** — hooks catch type errors, lint issues, and test failures before they compound
- **Stays safe** — three-tier safety model prevents destructive actions without human approval
- **Survives interruptions** — token limits, context compaction, and session restarts don't lose progress
- **Reports back** — morning reports, deploy alerts, and quality summaries keep you informed
- **Learns over time** — agent memory accumulates project knowledge across sessions

### Measuring Progress: The Thread Maturity Model

Your impact scales along four vectors. Each phase in this plan advances one or more:

| Vector | Metric | Current | Target |
|--------|--------|---------|--------|
| **Parallelism** | Concurrent agents working simultaneously | 1-2 | 5+ (P-Threads) |
| **Autonomy** | Hours of uninterrupted autonomous work | <1h (token limit) | 8h+ (L-Threads) |
| **Orchestration** | Agents coordinating other agents | None | Night Worker + specialist delegation (B-Threads) |
| **Trust** | Human checkpoints per task | Every action | Only deploys + DB changes (approaching Z-Threads) |

**Thread progression** (each phase unlocks the next thread type):

```
Base Thread     You prompt, agent works, you review.               [Phase 1 - DONE]
  |
P-Threads       Multiple agents in parallel terminals/worktrees.   [Phase 5+]
  |
C-Threads       Phased work chunked across context windows.        [Phase 5 - PreCompact]
  |
B-Threads       Agents orchestrating other agents (Scout/Build/    [Phase 3+5 - night-worker-
  |              Review pattern).                                    coordinator]
L-Threads       8+ hours autonomous, thousands of tool calls.      [Phase 5 - Night Worker]
  |
Z-Threads       Zero human review — system is trusted.             [North Star — earned
                                                                     through Phases 2-6]
```

### Agentic Layer Classes

The "Agentic Layer" surrounds your codebase with intelligence. We progress through three classes:

| Class | What It Means | Our Status | Phase to Complete |
|-------|--------------|-----------|-------------------|
| **Class 1** | Memory files (CLAUDE.md), priming prompts, basic context | **DONE** — CLAUDE.md optimized, CONTEXT.md, session-start hook, `/primer` command | Phase 1 |
| **Class 2** | Specialized agents with memory, tool constraints, skill preloading, and deferral rules | **In Progress** — 9 agents exist but lack memory/maxTurns/skills | Phase 2 + 3 |
| **Class 3** | AI-powered hooks (prompt-type), closed-loop validation, custom MCP tools, agents spawning agents | **Planned** — deploy pipeline, Night Worker orchestration, prompt hooks | Phase 4 + 5 + 6 |

The **Agentic Singularity** is when Class 3 becomes so robust that agents ship and maintain the software better than you can personally. Each phase below moves toward this goal.

### Three-Tier Safety Model

```
TIER 1 — DETERMINISTIC BLOCKS (PreToolUse command hooks)
  Always blocked, no exceptions:
  - Force push to master/main
  - .env file access (except .env.example)
  - DROP TABLE/SCHEMA
  - rm -rf on protected paths (src/, .claude/, supabase/)
  - Production deploy without build pass

TIER 2 — HUMAN APPROVAL ("ask" / escalate)
  Escalated to user, user decides:
  - Production deploy (after build + tests pass)
  - Database promotion to production
  - Night Worker tasks marked requires_approval
  - First deploy of the day

TIER 3 — SOFT GATES (Stop/TaskCompleted hooks)
  Block Claude from stopping/completing, force self-correction:
  - Type errors after code changes
  - Failing tests after edits
  - Incomplete task queue items
  - Missing build artifacts
```

### System Diagram

```
                    ┌─────────────────────────────────────────┐
                    │              YOUR CODEBASE               │
                    │         worksheetgenerator-ai            │
                    └─────────────────┬───────────────────────┘
                                      │
              ┌───────────────────────┼───────────────────────┐
              │                 CLAUDE CODE                    │
              │                                               │
              │  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
              │  │  HOOKS   │  │  AGENTS  │  │  SKILLS  │   │
              │  │ (14 events)│  │(13 total)│  │(11 total)│   │
              │  └─────┬────┘  └─────┬────┘  └─────┬────┘   │
              │        │             │             │          │
              │        ▼             ▼             ▼          │
              │  ┌──────────────────────────────────────┐    │
              │  │          SAFETY LAYER                 │    │
              │  │  PreToolUse → Stop → TaskCompleted    │    │
              │  └──────────────────────────────────────┘    │
              │                                               │
              │  ┌──────────────────────────────────────┐    │
              │  │         NIGHT WORKER                  │    │
              │  │  task-queue.json → watchdog → resume  │    │
              │  └──────────────────────────────────────┘    │
              └───────────────────────────────────────────────┘
                                      │
              ┌───────────────────────┼───────────────────────┐
              │                 EXTERNAL                       │
              │  night-worker.ps1 (watchdog)                  │
              │  Windows notifications                         │
              │  Vercel / Supabase                            │
              └───────────────────────────────────────────────┘
```

---

## 2. Research Foundations

### 2.1 Patterns from disler/claude-code-hooks-mastery

| Pattern | What They Do | Our Adaptation |
|---------|-------------|----------------|
| **Progressive activation** | All hooks built but deployed conservatively (`--log-only` first) | Deploy new hooks in log-only mode for 1 week before activating blocking |
| **Graceful degradation** | Every hook catches all exceptions and exits 0 | Already doing this — fail-closed for PreToolUse, fail-open for others |
| **Session-scoped data** | `.claude/data/sessions/{session_id}.json` tracks per-session state | Adopt for tracking iteration counts, task progress across compactions |
| **Transcript backup** | PreCompact saves JSONL transcript before context compression | Critical for long worksheet-generation sessions |
| **LLM-powered summaries** | Cheap fast models summarize subagent work | Use Haiku for stop-hook quality evaluation |
| **File-based locking** | Mutex for concurrent coordination | Adopt for Night Worker iteration tracking |
| **Environment persistence** | `CLAUDE_ENV_FILE` to set env vars from hooks | Use to ensure `NODE_ENV=development` in all sessions |

### 2.2 Proven Community Patterns

| Pattern | Source | Value for Us |
|---------|--------|-------------|
| **Guaranteed context injection** (PreToolUse) | Vercel research: skills skipped 56% | Inject Playwright patterns when editing test files |
| **Dynamic input modification** (PreToolUse updatedInput) | Official docs v2.0.10+ | Auto-add `--project=chromium-desktop --workers=4` to Playwright commands |
| **Periodic context refresh** (UserPromptSubmit) | John Lindquist pattern | Re-inject critical rules every 3 prompts in long sessions |
| **Ralph Wiggum autonomous loops** (Stop hook) | frankbria/ralph-claude-code | Foundation for Night Worker — tested at YC hackathons |
| **PreCompact recovery brief** | mvara-ai/precompact-hook | AI-generated context summary before compaction |
| **Three-tier model strategy** | wshobson/agents (112 agents) | Match Opus/Sonnet/Haiku to task complexity |
| **Specialist delegation with deferral** | aaddrick/claude-pipeline | Agents have explicit scope boundaries |
| **Persistent agent memory** | affaan-m/everything-claude-code | Cross-session learning for quality patterns |

### 2.3 Critical Pitfalls to Avoid

1. **Infinite Stop hook loops** — Always check `stop_hook_active` (already implemented)
2. **Performance death spiral** — Never run full build on every edit (fixed in Phase 1)
3. **Fail-open safety hooks** — PreToolUse must exit 2 on crash, not exit 0 (fixed)
4. **Overly aggressive blocking** — Start with `warn`/`ask` mode, escalate after validation
5. **Windows `fcntl` incompatibility** — Use file-based locking with Windows-compatible API
6. **Prompt hooks are non-deterministic** — Use command hooks for safety, prompt hooks for judgment
7. **Skill skip rate of 56%** — Move critical rules to CLAUDE.md, use skills for optional workflows
8. **Agent scope creep** — Each agent needs explicit In Scope / NOT In Scope boundaries

---

## 3. CLAUDE.md Optimization Strategy

> **Status**: IMPLEMENTED — CLAUDE.md restructured from 170 lines to 63 lines (63% reduction)
> **Key insight**: Vercel's research showed skills are skipped 56% of the time, but CLAUDE.md content achieves 100% compliance because it's always in context.

### 3.1 The Golden Rule

**For every line in CLAUDE.md, ask: "Would removing this cause Claude to make mistakes?" If not, cut it.**

A bloated CLAUDE.md causes Claude to ignore your actual instructions. Frontier LLMs can follow approximately 150-200 instructions reliably. Since Claude Code's system prompt already has ~50 instructions, your CLAUDE.md budget is **~100-150 instructions maximum**.

### 3.2 The Five Tools — When to Use Each

| Tool | Loading | Use When | Context Cost |
|------|---------|----------|-------------|
| **CLAUDE.md** | Always loaded, every turn | Rules that apply universally to every task | Permanent — every token costs on every turn |
| **`.claude/rules/`** | Path-scoped, on-demand | Rules for specific directories/file types | Near-zero when not working in those paths |
| **Skills** | Auto-discovered by description | Domain knowledge needed sometimes | Only name+description pre-loaded (~50 tokens each) |
| **Slash Commands** | Manually invoked via `/command` | Explicit, repeatable workflows | Zero until invoked |
| **Hooks** | Deterministic, event-driven | Actions that MUST happen 100% of the time | Zero context cost — runs as external process |

### 3.3 Decision Framework

```
Does this need to happen 100% of the time, no exceptions?
  YES --> Use a HOOK (deterministic, guaranteed, zero context cost)
  NO  -->
    Does this apply to every task in every session?
      YES --> Put in CLAUDE.md (always loaded, kept concise)
      NO  -->
        Does it apply only when editing specific file types?
          YES --> Put in .claude/rules/ with path glob (loaded on-demand)
          NO  -->
            Should Claude auto-detect when to use it?
              YES --> Create a SKILL (auto-discovered by description)
              NO  --> Create a SLASH COMMAND (manually triggered, zero cost)
```

### 3.4 CLAUDE.md Structure (Optimal Pattern)

```markdown
# Project Name
One-sentence description.

## Commands          # What Claude can't guess
## Environment       # Quirks and constraints
## Testing           # How to run tests, conventions
## Deployment        # Production workflow
## Key Documents     # Pointers, not copies
## Path-Scoped Rules # Reference to .claude/rules/ (documentation)
## Skills & Commands # Quick reference of available /commands
```

**What belongs**: Commands Claude can't guess, conventions that differ from defaults, environment quirks, pointers to detailed docs.

**What does NOT belong**: Standard language conventions, detailed API docs (link instead), trigger phrases with multi-line instructions (use commands), time-sensitive information, anything Claude already does correctly.

### 3.5 Path-Scoped Rules (`.claude/rules/`)

Rules load only when Claude reads/edits files matching the glob pattern. This is the most context-efficient way to deliver domain-specific guidance:

| Rule File | Loads When | Content |
|-----------|-----------|---------|
| `e2e-testing.md` | Editing `tests/e2e/**/*.ts` | Playwright patterns, cookie consent, fill() |
| `supabase.md` | Editing `supabase/**/*` | DB safety, migration files, RLS |
| `worksheet-prompts.md` | Editing `src/lib/prompts/**/*` | Curriculum taxonomy, image catalogs, answer keys |
| `nextjs-app.md` | Editing `src/app/**/*` | App Router, server components, Zod |

### 3.6 Anti-Patterns to Avoid

| Anti-Pattern | Why It's Bad | Fix |
|-------------|-------------|-----|
| **Trigger phrase accumulation** | 15+ triggers with multi-line instructions permanently consuming context | Move to `/commands` or skills |
| **Using CLAUDE.md as a linter** | "Use 2 spaces for indentation" — use ESLint/Prettier instead | Delete; use deterministic tools |
| **Negative-only constraints** | "Never use X" without providing alternative Y | Always provide alternatives |
| **Excessive @-mentions** | Importing full files wastes context | Tell Claude **when** to read files, not import them |
| **Duplicating what Claude knows** | Explaining React hooks, TypeScript generics | Only document what Claude can't infer from code |
| **Auto-generated without pruning** | `/init` output accepted verbatim | Use as starting point, then ruthlessly edit |

### 3.7 Memory Hierarchy (Priority Order)

| Level | Location | Shared | Priority |
|-------|----------|--------|----------|
| User memory | `~/.claude/CLAUDE.md` | Just you | Lowest |
| Project memory | `./CLAUDE.md` | Team (git) | Medium |
| Project rules | `./.claude/rules/*.md` | Team (git) | Medium (path-scoped) |
| Project local | `./CLAUDE.local.md` | Just you | Highest |
| Auto memory | `~/.claude/projects/*/memory/` | Just you | Auto-managed |

Parent directory CLAUDE.md files load recursively upward. Child directory CLAUDE.md files load on-demand when Claude reads files in those directories.

### 3.8 What We Changed

**Before** (170 lines): Trigger phrases for snip, NotebookLM auth, worksheet assessment criteria, library implementation strategy, prompt engineering docs — all permanently in context.

**After** (63 lines): Only universally applicable rules. Everything else moved to:
- `/snip`, `/assess`, `/access-notebook` — slash commands (zero context when not used)
- `.claude/rules/e2e-testing.md` — loads only when editing test files
- `.claude/rules/supabase.md` — loads only when editing database files
- `.claude/rules/worksheet-prompts.md` — loads only for prompt engineering
- `.claude/rules/nextjs-app.md` — loads only for app code

**Result**: 63% less permanent context, same functionality, better reliability.

---

## 4. Task System & Agentic Orchestration

> **Key finding**: The Claude Code Task System (TaskCreate, TaskUpdate, TaskList, TaskGet) enables structured multi-step autonomous workflows with dependency graphs, subagent delegation, and multi-session persistence.

### 4.1 Task System Overview

Tasks persist to disk as JSON files, surviving context resets, session crashes, and machine restarts. They provide:
- **Dependency graphs**: `addBlockedBy` creates a DAG — tasks only start when prerequisites complete
- **Subagent delegation**: Tasks can be assigned to specialist agents via the `owner` field
- **Multi-session coordination**: Multiple Claude terminals can share the same task list
- **Dynamic discovery**: Subagents can create NEW tasks discovered during execution

### 4.2 Task Patterns for This Project

#### Pattern A: Spec-Driven Development (SDD)

The most structured approach for major features:

```
Phase 1 (Research): "Create a comprehensive specification for [feature]"
  → Produces spec.md with requirements, architecture, edge cases
  → Human reviews and approves spec

Phase 2 (Execute): "Implement the specification using tasks with subagents"
  → Claude creates task DAG from spec
  → Each task delegated to appropriate specialist agent
  → Atomic commits after each task
```

**Real example**: SQLite to IndexedDB migration — 14 tasks, 14 atomic commits, 15+ files changed, one afternoon.

#### Pattern B: Fan-Out / Fan-In (Parallel Work)

```javascript
// Fan out: independent tasks run in parallel
TaskCreate({ subject: "Review frontend code" })           // #1
TaskCreate({ subject: "Review backend code" })             // #2
TaskCreate({ subject: "Review database migrations" })      // #3

// Fan in: dependent task waits for all
TaskCreate({ subject: "Synthesize review findings" })      // #4
TaskUpdate({ taskId: "4", addBlockedBy: ["1", "2", "3"] })
```

#### Pattern C: Wave-Based Execution

```
Wave 1 (No Dependencies):     Task #1, Task #2 run in parallel
Wave 2 (After Wave 1):        Task #3 [blocked by #1], Task #4 [blocked by #2]
Wave 3 (After Wave 2):        Task #5 [blocked by #3, #4] — convergence point
```

#### Pattern D: Document & Clear (Long Tasks)

For tasks exceeding context limits:
1. Claude dumps progress into a `.md` file (CONTEXT.md)
2. `/clear` the context
3. New session reads the `.md` and continues

This is exactly what our PreCompact hook automates (Phase 5).

### 4.3 Integration with Hooks

| Hook Event | Task System Integration |
|-----------|------------------------|
| **Stop** | Check TaskList — if pending tasks remain, block stop and continue working |
| **TaskCompleted** | Run tests before allowing task to be marked done |
| **PreCompact** | Save current task progress to CONTEXT.md before compaction |
| **SessionStart** | Re-inject task queue state on session resume |
| **SubagentStart** | Log which agent claimed which task |
| **SubagentStop** | Update task status with agent's result |

### 4.4 Task Sizing Guidelines

| Size | Example | Verdict |
|------|---------|---------|
| Too coarse | "Build entire auth system" | Not parallelizable, no checkpoints |
| Too fine | "Add import statement" | Coordination overhead exceeds work |
| Just right | "Implement JWT refresh endpoint" | Meaningful unit, testable, committable |

Target 5-6 tasks per agent. Each task should be: independently testable, atomically committable, and completable in one context window.

### 4.5 Safe vs. Dangerous Automation

The YouTube transcript referenced **Moltbot/Clawdbot** — an autonomous agent that went viral but exposed critical security risks (prompt injection, 400+ malware packages, remote access trojans). The safe alternative:

| Aspect | Dangerous (Moltbot) | Safe (Our Approach) |
|--------|---------------------|---------------------|
| Scope | Full machine + messaging apps | Development environment only |
| Permissions | Root-level | Hook-based blocks + user approval |
| Task coordination | Ad-hoc messaging | Structured DAG with dependencies |
| Safety | Trust-based | Three-tier: blocks -> approval -> soft gates |
| Context | Shared across everything | Isolated per-subagent |

**Our philosophy**: Hooks for invariants (guaranteed), tasks for coordination (structured), human approval for irreversible actions (safe).

---

## 5. Phase 1: Safety & Quality Hooks (COMPLETED)

> **Status**: IMPLEMENTED and reviewed on `feature/claude-code-hooks` branch
> **Commits**: 4 commits (initial implementation + critical fixes from code review)

### Hooks Deployed

| Hook | Event | File | Purpose | Timeout |
|------|-------|------|---------|---------|
| Safety Layer | PreToolUse | `pre-tool-use.js` | Block force push, .env access, critical deletes, unverified deploys | 10s |
| Scoped Lint | PostToolUse | `post-tool-use.js` | Lint only the changed file after Edit/Write | 60s |
| Quality Gate | Stop | `stop-quality-gate.js` | `tsc --noEmit` on code changes, task queue enforcement | 90s |
| Context Injection | SessionStart | `session-start.js` | Git status, build state, task queue, CONTEXT.md | 15s |
| Desktop Alert | Notification | (PowerShell) | Windows MessageBox on task completion | 30s |

### Key Design Decisions (from Code Review)

| Issue Found | Fix Applied |
|-------------|-----------|
| PreToolUse exited 1 on crash (fail-open) | Changed to exit 2 (fail-closed) — safety hooks MUST block on error |
| Force push regex missed `-f` and `--force-with-lease` | Extended regex: `(-f\|--force\|--force-with-lease)\b` |
| False positive on `main` in branch names like `feature/maintain-styles` | Added word boundaries: `\b(master\|main)\b` |
| Full `npm run build` on every Stop (2+ min) | Replaced with `tsc --noEmit` (~30s); full build reserved for deploy gate |
| Full project lint on every Edit | Scoped to `npx next lint --file "{file}" --fix` |
| No log rotation | Added 1MB rotation in stop-quality-gate.js |
| `.env` only matched exact name | Changed to `basename.startsWith('.env')` while allowing `.env.example` |

### Files Created

```
.claude/
  CONTEXT.md                    # Persistent notes surviving compaction
  hooks/
    pre-tool-use.js             # Safety layer (fail-closed)
    post-tool-use.js            # Scoped lint after Edit/Write
    stop-quality-gate.js        # tsc --noEmit + task queue enforcement
    session-start.js            # Context injection on every session
    logs/
      .gitkeep                  # Ensure logs dir exists
```

### Settings Registered

```json
{
  "hooks": {
    "PreToolUse": [{ "matcher": "Bash|Edit|Write|Read", "hooks": [{ "type": "command", "command": "node \"$CLAUDE_PROJECT_DIR/.claude/hooks/pre-tool-use.js\"", "timeout": 10 }] }],
    "PostToolUse": [{ "matcher": "Edit|Write", "hooks": [{ "type": "command", "command": "node \"$CLAUDE_PROJECT_DIR/.claude/hooks/post-tool-use.js\"", "timeout": 60 }] }],
    "Stop": [{ "hooks": [{ "type": "command", "command": "node \"$CLAUDE_PROJECT_DIR/.claude/hooks/stop-quality-gate.js\"", "timeout": 90 }] }],
    "SessionStart": [{ "hooks": [{ "type": "command", "command": "node \"$CLAUDE_PROJECT_DIR/.claude/hooks/session-start.js\"", "timeout": 15 }] }],
    "Notification": [{ "hooks": [{ "type": "command", "command": "powershell -Command \"[System.Reflection.Assembly]::LoadWithPartialName('System.Windows.Forms'); [System.Windows.Forms.MessageBox]::Show('Task completed', 'Claude Code')\"", "timeout": 30 }] }]
  }
}
```

---

## 6. Phase 2: Agent & Skill Upgrades

> **Goal**: Upgrade all 9 existing agents and 8 existing skills with proper frontmatter, enabling memory, tool restrictions, model selection, and skill preloading.
> **Risk**: LOW — adds capabilities without changing behavior
> **Estimated effort**: 2-3 hours

### 4.1 Agent Upgrades

Every agent gets these missing capabilities:

| Agent | Add memory | Add maxTurns | Add skills | Add disallowedTools | Add model |
|-------|-----------|-------------|-----------|--------------------|---------|
| worksheet-quality-assessor | `project` | 100 | worksheet-quality-criteria | — | sonnet |
| playwright-test-healer | `project` | 50 | e2e-test-patterns, interactive-worksheet-testing | Write | sonnet |
| playwright-test-planner | — | 30 | e2e-test-patterns, interactive-worksheet-testing | — | sonnet |
| playwright-test-generator | — | 30 | e2e-test-patterns, interactive-worksheet-testing | — | sonnet |
| code-reviewer | `project` | 20 | coding-standards, security-review | — | inherit |
| planner | — | 15 | coding-standards | Write, Edit, Bash | inherit |
| security-reviewer | — | 15 | — | — | haiku |
| refactor-cleaner | — | 30 | coding-standards, verification-loop | — | inherit |
| tdd-guide | — | 40 | verification-loop, e2e-test-patterns | — | inherit |

**Memory benefits** (agents with `memory: project`):
- **worksheet-quality-assessor**: Learns which image combos fail, which question types are too hard per year group, which prompt fixes work
- **playwright-test-healer**: Remembers selector changes, flaky test patterns, cookie consent gotchas
- **code-reviewer**: Builds understanding of project patterns, previous review findings, team conventions

Memory files created at `.claude/agent-memory/{agent-name}/MEMORY.md`.

### 4.2 Skill Upgrades

Add YAML frontmatter to all 8 existing skills:

| Skill | Key Additions |
|-------|--------------|
| worksheet-generation | `name`, `description`, `argument-hint: "[year-group/topic/subtopic]"`, `allowed-tools: Read, Write, Bash, Glob` |
| interactive-worksheet-testing | `name`, `description`, `argument-hint: "[worksheet-slug]"` |
| e2e-test-patterns | `name`, `description`, `user-invocable: false` (reference material for agents, not user workflow) |
| coding-standards | `name`, `description`, `user-invocable: false` |
| deployment-checklist | `name`, `description` |
| verification-loop | `name`, `description`, `user-invocable: false` |
| worksheet-quality-criteria | `name`, `description`, `user-invocable: false` |
| security-review | `name`, `description` |

### 4.3 Model Tier Strategy

Match model cost to task complexity (from wshobson/agents pattern):

| Tier | Model | Agents | Rationale |
|------|-------|--------|-----------|
| **Opus** | Complex reasoning | planner (for complex tasks), night-worker-coordinator | Architecture decisions, multi-step coordination |
| **Sonnet** | Implementation | code-reviewer, playwright-test-*, refactor-cleaner, tdd-guide, build-error-resolver, worksheet-quality-assessor | Code generation, debugging, reviews |
| **Haiku** | Fast & cheap | deploy-verifier, security-reviewer, db-migration-expert (read-only) | Quick checks, read-only analysis |

---

## 7. Phase 3: New Agents & Skills

> **Goal**: Create 4 new specialist agents and 3 new skills that fill critical gaps.
> **Risk**: LOW — new agents don't affect existing workflows
> **Estimated effort**: 3-4 hours

### 5.1 New Agents

#### build-error-resolver
```yaml
model: sonnet | memory: project | maxTurns: 25
skills: coding-standards, verification-loop
```
- Diagnoses and fixes Next.js build failures
- Triggered when Stop hook detects type-check failures
- Remembers common build failure patterns across sessions
- Categorizes errors: TypeScript, ESLint, import, runtime
- Fixes root causes, not symptoms

#### deploy-verifier
```yaml
model: haiku | maxTurns: 15
skills: deployment-checklist
disallowedTools: Write, Edit
```
- Pre-deploy: Verify build, smoke tests, no uncommitted changes
- Post-deploy: Health check production URLs
- DB promotion: Verify dev data ready, backup exists
- NEVER modifies files — read-only verification only

#### db-migration-expert
```yaml
model: sonnet | maxTurns: 20
skills: supabase-best-practices
disallowedTools: Write, Edit
```
- Plans migrations with rollback strategy
- Reviews existing migrations in `supabase/migrations/`
- Verifies RLS policies
- NEVER modifies production database
- ALWAYS creates migration files (not inline SQL)

#### night-worker-coordinator
```yaml
model: sonnet | memory: project | maxTurns: 200
skills: verification-loop, dispatching-agents
```
- Reads task-queue.json and works through tasks autonomously
- Delegates to specialist agents (test-healer, quality-assessor, build-error-resolver)
- Creates git tags after each completed task
- Respects safety constraints (no push, no deploy, no DB changes by default)
- Updates CONTEXT.md for context compaction survival

### 5.2 New Skills

#### supabase-best-practices
- Query performance (indexes, EXPLAIN ANALYZE, parameterized queries)
- RLS policies (always enable, test with roles)
- Schema design (proper types, timestamps, ENUMs)
- Project-specific: DEV database URL, CLI commands, migration location

#### dispatching-agents (orchestration guide)
- Decision matrix: which task -> which agent
- Parallel dispatch rules (code-reviewer + security-reviewer can run together)
- Sequential chains (planner -> generator -> healer)
- Full test cycle and full deploy cycle orchestration

#### improvement-loop (meta-skill)
- `disable-model-invocation: true` — user-only, prevents premature optimization
- 5-step process: Document failure -> Classify -> Minimal change -> Verify -> Document
- Mandatory gate: original task complete + tests pass + user confirms

### 5.3 Agent Dispatch Decision Matrix

| Task | Agent | Why |
|------|-------|-----|
| Generate new worksheet | Use worksheet-generation skill directly | Single-step, user-guided |
| Assess worksheet quality | worksheet-quality-assessor | Autonomous multi-step |
| Plan new tests | playwright-test-planner | Exploratory, read-only |
| Generate test code | playwright-test-generator | Code generation from plan |
| Fix failing tests | playwright-test-healer | Debug + edit |
| Review code changes | code-reviewer | Read-only analysis |
| Check security | security-reviewer | Read-only analysis |
| Fix build errors | build-error-resolver | Diagnosis + fix |
| Plan implementation | planner | Read-only planning |
| Refactor code | refactor-cleaner | Careful edits |
| TDD workflow | tdd-guide | Red-green-refactor |
| Verify deployment | deploy-verifier | Read-only checks |
| DB migration | db-migration-expert | Schema planning |
| Overnight work | night-worker-coordinator | Queue-driven autonomous |

---

## 8. Phase 4: Deployment Pipeline

> **Goal**: Make production deploys safe and verified. No deploy without build + smoke tests passing. No DB promotion without backup. Full audit trail.
> **Risk**: MEDIUM — touches production workflows
> **Estimated effort**: 2-3 hours
> **Human-in-the-loop**: YES — user approval required for every deploy and DB promote

### 6.1 Pre-Deploy Full Verification (deploy-verify.js)

**Trigger**: `vercel --prod` detected in Bash command

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

### 6.2 Post-Deploy Health Check (post-deploy-health.js)

**Trigger**: After `vercel --prod` completes

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
  |-- Any fail --> Windows toast "DEPLOY HEALTH CHECK FAILED"
```

### 6.3 DB Promotion Safety Gate (db-promote-gate.js)

**Trigger**: `npm run db:promote` detected

```
db:promote detected
  |
  v
Check: Recent deploy marker exists? (within last 1 hour)
  |-- NO --> Block: "Deploy code first, then promote data"
  v
Auto-run: npm run db:backup
  |-- FAIL --> Block: "Backup failed, cannot promote"
  v
Query: Count worksheets in DEV vs PROD
  |
  v
Escalate: "Promoting N new worksheets. PROD backed up. Confirm?"
  |-- User approves --> Allow
  |-- User denies --> Block
```

### 6.4 Deploy Audit Log

All events logged to `.claude/hooks/logs/deploy.log`:
```json
{
  "timestamp": "2026-02-07T22:15:00Z",
  "event": "deploy_started|deploy_passed|deploy_failed|health_check|db_promote",
  "branch": "master",
  "commit": "abc1234",
  "build_duration_ms": 45000,
  "smoke_tests_passed": 3,
  "health_check_results": { "home": 200, "library": 200, "api": 200 }
}
```

### 6.5 Files to Create

| File | Purpose |
|------|---------|
| `.claude/hooks/deploy-verify.js` | Pre-deploy build + smoke test gate |
| `.claude/hooks/post-deploy-health.js` | Post-deploy health checks |
| `.claude/hooks/db-promote-gate.js` | DB promotion safety with auto-backup |

---

## 9. Phase 5: Night Worker — Autonomous 24-Hour Operation

> **Goal**: Claude Code works autonomously while you sleep. Picks up tasks from a queue, works through them, handles token limits, resumes automatically, and produces a morning report.
> **Risk**: MEDIUM — autonomous operation requires robust safety rails
> **Estimated effort**: 4-5 hours
> **Human-in-the-loop**: Before bed (create task queue), morning (review report + approve/revert)

### 7.1 Architecture Overview

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
Claude Code picks up first task via night-worker-coordinator agent
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

### 7.2 Task Queue Schema

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

### 7.3 New Hooks for Night Worker

#### PreCompact — Transcript Backup + Context Preservation

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

**File**: `.claude/hooks/pre-compact.js`

#### TaskCompleted — Quality Gate Before Task Completion

```
TaskCompleted fires
  |
  v
Read task-queue.json, find the completing task
  |
  v
If task involves tests: Run test command, verify pass rate
  |-- Fail --> Exit 2: "Tests failing, fix before completing"
  |
  v
If task involves code changes: Run tsc --noEmit
  |-- Fail --> Exit 2: "Type errors, fix before completing"
  |
  v
Move task to completed[], update task-queue.json
Exit 0
```

**File**: `.claude/hooks/task-completed-gate.js`

#### SessionStart Enhancement — Night Worker Context Reload

When session type is `resume` and task-queue.json exists:

```
Inject: "You are in Night Worker mode. Session resumed after token limit.
  Current task: [description]
  Completed: [N] tasks
  Remaining: [M] tasks
  Iteration: [X]/[max]
  Branch: [target_branch]
  Continue working on the current task."
```

### 7.4 Watchdog Script (night-worker.ps1)

External PowerShell script that monitors Claude Code process:
- Launches `claude --resume` with session ID
- Monitors process exit code
- Distinguishes clean exit from token limit (via exit code + task-queue state)
- Waits configurable cooldown between restarts (default: 5 min)
- Enforces max runtime (default: 8 hours)
- Generates morning report on completion
- Sends Windows notification on finish or error

**File**: `scripts/night-worker.ps1`

### 7.5 Morning Report Format

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

### Task 2: Fix failing Year 3 tests
- Status: COMPLETED
- Duration: 1h 15m
- Files modified: 2 test files
- Commits: 2 new commits on feature/night-worker-output

### Task 3: Quality assessment on Reception worksheets
- Status: PENDING (requires_approval — skipped)

## Git Summary
- Branch: feature/night-worker-output
- Commits: 2 new
- No pushes (safety.allow_git_push = false)

## Errors Encountered
- Iteration 2: Token limit reached, resumed successfully
```

### 7.6 Night Worker Safety Matrix

| Action | Default | Override |
|--------|---------|---------|
| Read any file | Allowed | — |
| Edit source files | Allowed | — |
| Create new files | Allowed | — |
| Delete files | Only in tests/ and .next/ | `safety.allow_delete_source: true` |
| Git commit | Yes (to target branch only) | `safety.allow_git_commit: false` |
| Git push | **Blocked** | `safety.allow_git_push: true` |
| Deploy to production | **Blocked** | Never allowed in Night Worker |
| Database changes | **Blocked** | `safety.allow_db_changes: true` |
| Install packages | **Blocked** | `safety.allow_npm_install: true` |
| Run dev server | Allowed | — |
| Run tests | Allowed | — |

### 7.7 Files to Create

| File | Purpose |
|------|---------|
| `.claude/hooks/pre-compact.js` | Backup transcript + update CONTEXT.md |
| `.claude/hooks/task-completed-gate.js` | Quality gate before task completion |
| `scripts/night-worker.ps1` | External watchdog script |
| `.claude/night-worker-report-template.md` | Report template |

---

## 10. Phase 6: Worksheet Intelligence & Observability

> **Goal**: Hooks that understand the worksheet domain — auto-suggest patterns, inject rules, validate quality, and provide observability.
> **Risk**: LOW — informational hooks, no blocking
> **Estimated effort**: 3-4 hours

### 8.1 Context-Aware Skill Injection (context-injector.js)

**Trigger**: Any Edit/Write/Read on files matching specific paths

```
File path matches?
  |
  |-- tests/e2e/interactive/ --> Inject Playwright test patterns
  |     "Use fill() not pressSequentially(). Remove .cookie-consent-container."
  |
  |-- src/lib/prompts/ --> Inject worksheet generation rules
  |     "Follow curriculum taxonomy. Check image availability in catalogs."
  |
  |-- supabase/ --> Inject database safety rules
  |     "Always target dev database. Use migration files. Test with npx supabase."
  |
  |-- src/app/ --> Inject Next.js conventions
  |     "Use App Router. Server components by default. Use Zod for validation."
```

### 8.2 Playwright Command Enhancement (updatedInput)

**Trigger**: Bash commands containing `npx playwright test`

Auto-adds standard flags if missing:
```
npx playwright test tests/e2e/interactive/year3/
  --> becomes
npx playwright test tests/e2e/interactive/year3/ --project=chromium-desktop --workers=4 --timeout=30000
```

### 8.3 Periodic Context Refresh (user-prompt-refresh.js)

**Trigger**: Every 3rd user prompt

Re-injects critical rules that Claude tends to forget in long sessions:
- `fill()` not `pressSequentially()` for test inputs
- Always remove `.cookie-consent-container`
- Use Playwright agents: planner -> generator -> healer
- E2E tests: NO screenshots, only functional testing

### 8.4 Subagent Observability (subagent-observer.js)

**Events**: SubagentStart + SubagentStop

Logs agent lifecycle: which agent spawned, when, for what task, duration, result. If Night Worker active, updates task-queue.json.

### 8.5 Error Pattern Detection (failure-tracker.js)

**Event**: PostToolUseFailure

Detects recurring failure patterns:
- 3+ Playwright failures in 5 min? -> "Dev server may be down"
- 3+ Bash failures with ENOENT? -> "Check PATH or install missing tool"
- 3+ Edit failures? -> "File may be locked or path incorrect"

### 8.6 Session Cleanup (session-end.js)

**Event**: SessionEnd

- Delete temporary counter files
- Rotate logs > 5MB
- Save session summary to `.claude/hooks/logs/sessions/`

### 8.7 Hooks + Agents Integration

Agent-scoped hooks in frontmatter enable per-agent quality gates:

```yaml
# refactor-cleaner stops only if types + lint clean
hooks:
  Stop:
    - hooks:
        - type: command
          command: "npx tsc --noEmit && npm run lint"

# SubagentStop verifies generated tests compile
SubagentStop:
  matcher: "playwright-test-generator"
  hooks:
    - type: command
      command: "npx tsc --noEmit"
```

### 10.8 AI-Powered Intent Hook — Non-Deterministic Armor (prompt-type)

> **Critical gap identified**: All current hooks are `type: "command"` (regex-based). Regex catches patterns but cannot analyze *intent*. A `type: "prompt"` hook uses an LLM to evaluate whether a command is dangerous — catching hallucinations that regex misses entirely.

**Event**: PreToolUse (Bash commands only)
**Hook type**: `prompt` (single-turn LLM evaluation)

```json
{
  "PreToolUse": [{
    "matcher": "Bash",
    "hooks": [{
      "type": "prompt",
      "prompt": "Analyze this bash command for safety. The command is: {{tool_input.command}}\n\nCheck for:\n1. Data destruction (rm -rf on non-temp directories, DROP TABLE, TRUNCATE)\n2. Production access (connecting to prod database, deploying without tests)\n3. Credential exposure (echoing secrets, piping env vars)\n4. Irreversible operations (force push, hard reset)\n\nIf the command is safe, respond: {\"decision\": \"allow\"}\nIf dangerous, respond: {\"decision\": \"block\", \"reason\": \"explanation\"}",
      "timeout": 10
    }]
  }]
}
```

**Why this matters**: The existing regex-based `pre-tool-use.js` catches known patterns (`git push --force`, `rm -rf src/`). But an AI-powered hook catches *novel* dangerous commands the regex never anticipated — like `npx supabase db execute --db-url $PROD_URL "DELETE FROM library_worksheets"`. This is the "Non-Deterministic Armor" that scales with thousands of tool calls.

**Cost**: ~$0.001 per Bash command evaluation (Haiku). At 500 Bash calls per session, ~$0.50/session.

**Activation strategy**: Deploy in `log-only` mode first (exit 0 always, log verdicts). After 1 week of validation, switch to blocking mode (exit 2 on "block" verdict). This prevents false positives from disrupting work.

### 10.9 Parallel Workspace Script — Unlocking P-Threads

> **Key insight from blog**: "Boris Cherny Setup — run 5 agents in parallel terminals." Our current workflow is 1 agent at a time. Git worktrees enable true parallel branch work without merge conflicts.

**File**: `scripts/parallel-workspace.ps1`

**What it does**:
```
parallel-workspace.ps1 -Workers 3 -Tasks "task1.md,task2.md,task3.md"
  |
  v
Create git worktrees:
  worktrees/worker-1/ (branch: parallel/worker-1)
  worktrees/worker-2/ (branch: parallel/worker-2)
  worktrees/worker-3/ (branch: parallel/worker-3)
  |
  v
Launch Claude in each worktree with its specific task file
  |
  v
Each agent works independently on its own branch
  |
  v
On completion: merge branches back to feature branch
```

**Use cases**:
- Run code-reviewer + security-reviewer in parallel (different worktrees, same files)
- Generate Year 1, Year 2, Year 3 worksheets simultaneously
- Fix tests in 3 year groups overnight in parallel

**Shared coordination**: Set `CLAUDE_CODE_TASK_LIST_ID` so all workers share one task list. Workers claim tasks from the shared pool — no duplicate work.

### 10.10 Context Priming Command — Focused Agent Setup

> **Blog insight**: "Use Context Priming — reusable /prime commands that set up a focused agent for a specific task." A primed agent has the exact context it needs, nothing more.

**Enhancement to existing `/primer` command**: Add task-specific priming modes.

```
/primer test    → Loads: e2e-test-patterns, test coverage plan, recent test failures
/primer deploy  → Loads: deployment checklist, last deploy log, health check endpoints
/primer quality → Loads: worksheet quality criteria, recent assessment results, learnings
/primer night   → Loads: task-queue.json, CONTEXT.md, Night Worker safety rules
```

Each mode injects a focused context set instead of the generic project overview. This keeps the agent's context window lean for the specific task.

### 10.11 Closed-Loop Validation Pattern — Request/Validate/Resolve

> **Class 3 pattern**: Agents that validate their own work before declaring it done, creating a self-correcting loop.

```
Agent generates code
  |
  v
Agent runs verification (tsc --noEmit, tests, lint)
  |-- FAIL --> Agent reads errors, fixes, loops back to verification
  |-- PASS after 3+ attempts --> Escalate to human
  |-- PASS
  v
Agent marks task complete
  |
  v
TaskCompleted hook runs independent verification
  |-- FAIL --> Block completion, feed errors back
  |-- PASS
  v
Task truly done
```

This eliminates the common failure mode where agents declare "done" when build is broken. The combination of agent self-verification + hook-based independent verification creates two layers of quality assurance.

**Implementation**: Add to each agent's system prompt:
```
After making code changes, ALWAYS verify your work:
1. Run `npx tsc --noEmit` to check types
2. If you edited tests, run them
3. If verification fails, fix the issue before reporting completion
4. Maximum 3 self-fix attempts, then escalate to user
```

### 10.12 Files to Create

| File | Purpose |
|------|---------|
| `.claude/hooks/context-injector.js` | Domain-aware context injection + Playwright command enhancement |
| `.claude/hooks/user-prompt-refresh.js` | Periodic rule refresh every N prompts |
| `.claude/hooks/subagent-observer.js` | Subagent lifecycle logging |
| `.claude/hooks/failure-tracker.js` | Tool failure pattern detection |
| `.claude/hooks/session-end.js` | Cleanup and session summary |
| `.claude/hooks/intent-safety.json` | Prompt-type hook config for AI-powered Bash command analysis |
| `scripts/parallel-workspace.ps1` | Git worktree manager for parallel agents |

---

## 11. All 14 Hook Events — Complete Architecture

```
SESSION LIFECYCLE
=================
Setup ──────────────> [Phase 6] Environment detection, dependency check
SessionStart ───────> [Phase 1 DONE] Git status, build state, task queue, CONTEXT.md
                      [Phase 5] Night Worker context reload on resume
UserPromptSubmit ───> [Phase 6] Periodic context refresh every 3 prompts
SessionEnd ─────────> [Phase 6] Cleanup, log rotation, session summary

TOOL LIFECYCLE
==============
PreToolUse ─────────> [Phase 1 DONE] Safety: block force push, .env, critical deletes
                      [Phase 1 DONE] Deploy: block vercel --prod without build marker
                      [Phase 4] Deploy: full build + smoke tests before deploy
                      [Phase 4] DB: auto-backup before promotion
                      [Phase 6] Context: inject domain rules based on file path
                      [Phase 6] Playwright: auto-add standard flags
PermissionRequest ──> [Phase 4] Auto-allow read-only, audit deploy permissions
PostToolUse ────────> [Phase 1 DONE] Scoped lint after Edit/Write
                      [Phase 4] Post-deploy health checks
PostToolUseFailure ─> [Phase 6] Error pattern detection

AGENT LIFECYCLE
===============
SubagentStart ──────> [Phase 6] Observability logging
SubagentStop ───────> [Phase 6] Result tracking, Night Worker task updates

COMPLETION LIFECYCLE
====================
TaskCompleted ──────> [Phase 5] Quality gate: tests must pass before completion
Stop ───────────────> [Phase 1 DONE] Type-check verification after code changes
                      [Phase 1 DONE] Task queue enforcement
PreCompact ─────────> [Phase 5] Backup transcript, update CONTEXT.md

NOTIFICATIONS
=============
Notification ───────> [Phase 1 DONE] Windows MessageBox on task completion
                      [Phase 4] Deploy success/failure alerts
```

---

## 12. Human-in-the-Loop Decision Guide

### When Claude MUST Ask You

| Situation | What Claude Shows | Your Options |
|-----------|------------------|-------------|
| **Production deploy** | "Build PASSED. 3/3 smoke tests PASSED. Deploy?" | Approve / Deny |
| **Database promotion** | "Promoting N worksheets. PROD backed up. Confirm?" | Approve / Deny |
| **Night Worker task with `requires_approval`** | Skips task, reports in morning report | Run manually when ready |
| **First deploy of the day** | Extra confirmation regardless of markers | Approve / Deny |
| **Type-check failures** | Claude tries to fix, then asks if stuck | Fix suggestion / Skip |

### When Claude Operates Autonomously

| Situation | What Claude Does | Safety Net |
|-----------|-----------------|-----------|
| **Edit source files** | Edits, then PostToolUse runs scoped lint | Stop hook runs tsc before session ends |
| **Run tests** | Executes Playwright/Vitest | Results logged, failures trigger healer agent |
| **Fix build errors** | build-error-resolver diagnoses + fixes | Type-check verification before marking done |
| **Night Worker tasks** | Works through queue on dedicated branch | No push, no deploy, no DB, max iterations |
| **Context compaction** | PreCompact saves state to CONTEXT.md | SessionStart reloads context on resume |

### When You Should Intervene

| Signal | Action |
|--------|--------|
| Morning report shows failed tasks | Review changes on feature branch, decide to fix or revert |
| Night Worker hit max iterations | Review progress, decide if more iterations needed |
| Deploy health check failed | Check production manually, decide on rollback |
| Multiple token limit restarts | Check if task is too large, consider breaking it up |

---

## 13. Example Scenarios: 24-Hour Autonomous Operation

### Scenario 1: Overnight Test Fix Campaign

**Goal**: Fix all failing Year 3 interactive tests (217 tests)
**Time**: Start at 22:00, expect completion by 06:00

**Before bed (5 min)**:
```json
// Create .claude/task-queue.json:
{
  "max_iterations": 10,
  "max_runtime_hours": 8,
  "safety": {
    "allow_git_commit": true,
    "allow_git_push": false,
    "target_branch": "fix/year3-tests"
  },
  "tasks": [
    { "id": 1, "description": "Run all Year 3 E2E tests and record which fail", "priority": 1 },
    { "id": 2, "description": "Fix failing tests using playwright-test-healer agent", "depends_on": [1], "priority": 2 },
    { "id": 3, "description": "Re-run all Year 3 tests to verify fixes", "depends_on": [2], "priority": 3 },
    { "id": 4, "description": "Run tsc --noEmit to verify no type errors", "depends_on": [3], "priority": 4 }
  ]
}
```

Then run:
```powershell
.\scripts\night-worker.ps1
```

**What happens overnight**:
1. night-worker-coordinator reads queue, starts Task 1
2. Runs all 217 tests, records 12 failures
3. For each failing test, delegates to playwright-test-healer
4. healer uses its memory of previous selector fixes
5. After fixing, re-runs all tests (Task 3)
6. If token limit hit, watchdog waits 5 min, resumes
7. SessionStart re-injects progress context
8. Continues from where it left off
9. Final type-check (Task 4)
10. All done -> morning report generated

**Morning (5 min)**:
1. Read `night-worker-report.md`
2. `git log fix/year3-tests` — review commits
3. `npx playwright test tests/e2e/interactive/year3/` — verify yourself
4. If happy: `git merge fix/year3-tests` into master
5. If not: `git branch -D fix/year3-tests`

---

### Scenario 2: Batch Worksheet Quality Assessment

**Goal**: Assess quality of all 51 Reception worksheets
**Time**: Start at 22:00, expect 4-6 hours

**Before bed**:
```json
{
  "max_iterations": 15,
  "max_runtime_hours": 8,
  "safety": {
    "allow_git_commit": true,
    "allow_git_push": false,
    "target_branch": "assess/reception-quality"
  },
  "tasks": [
    { "id": 1, "description": "Run worksheet-quality-assessor agent on all 51 Reception worksheets, save results to quality-reports/", "priority": 1 },
    { "id": 2, "description": "Fix worksheets that scored below 95 (broken images, missing questions)", "depends_on": [1], "priority": 2, "requires_approval": true },
    { "id": 3, "description": "Re-assess fixed worksheets", "depends_on": [2], "priority": 3, "requires_approval": true }
  ]
}
```

**What happens**:
- Task 1 runs autonomously (assessment is read-only + screenshot)
- Tasks 2-3 skipped (requires_approval) — reported in morning report
- You review the assessment, then manually approve fixes

---

### Scenario 3: Full Deploy Pipeline (Daytime, Interactive)

**Goal**: Deploy latest changes to production with database promotion
**Time**: During work hours, interactive

**Step 1**: You say "deploy to production"
```
Claude runs: vercel --prod
  --> deploy-verify.js triggers:
      - Full build: PASSED (45s)
      - Smoke tests: 3/3 PASSED
      - Escalates: "Build PASSED. Deploy?"
  --> You approve
  --> Vercel deploys
  --> post-deploy-health.js triggers:
      - Health checks: all 200
      - Windows toast: "Deploy successful"
```

**Step 2**: You say "promote database"
```
Claude runs: npm run db:promote
  --> db-promote-gate.js triggers:
      - Recent deploy marker: YES (5 min ago)
      - Auto-backup: PASSED
      - Escalates: "Promoting 8 new worksheets. PROD backed up. Confirm?"
  --> You approve
  --> Promotion runs
```

---

### Scenario 4: Continuous Development Day (Autonomous with Checkpoints)

**Goal**: Implement new feature with tests, lasting 8+ hours
**Time**: Full workday, you check in periodically

**Morning**: You describe the feature and create task queue
```json
{
  "max_iterations": 20,
  "safety": {
    "allow_git_commit": true,
    "target_branch": "feature/new-worksheet-type"
  },
  "tasks": [
    { "id": 1, "description": "Plan implementation: analyze existing worksheet types, propose architecture" },
    { "id": 2, "description": "Implement data model and API routes", "depends_on": [1] },
    { "id": 3, "description": "Implement UI components", "depends_on": [2] },
    { "id": 4, "description": "Write E2E tests using playwright-test-generator", "depends_on": [3] },
    { "id": 5, "description": "Run full test suite, fix any regressions", "depends_on": [4] },
    { "id": 6, "description": "Code review using code-reviewer + security-reviewer agents", "depends_on": [5] },
    { "id": 7, "description": "Deploy to production", "depends_on": [6], "requires_approval": true }
  ]
}
```

**Throughout the day**: Claude works autonomously through tasks 1-6, committing after each task. You check in at lunch to review progress. Task 7 waits for your approval.

---

### Scenario 5: Weekend Library Population Marathon

**Goal**: Generate and save 50+ worksheets across all year groups
**Time**: Friday night to Monday morning

**Friday night**:
```json
{
  "max_iterations": 50,
  "max_runtime_hours": 48,
  "safety": {
    "allow_git_commit": true,
    "target_branch": "content/weekend-batch"
  },
  "tasks": [
    { "id": 1, "description": "Generate and save all missing Reception worksheets from populate-worksheet-from-scratch.md" },
    { "id": 2, "description": "Generate and save all missing Year 1 worksheets", "depends_on": [1] },
    { "id": 3, "description": "Generate and save all missing Year 2 worksheets", "depends_on": [2] },
    { "id": 4, "description": "Run quality assessment on all newly generated worksheets", "depends_on": [3] },
    { "id": 5, "description": "Fix any worksheets that failed quality assessment", "depends_on": [4] },
    { "id": 6, "description": "Run all E2E interactive tests for generated worksheets", "depends_on": [5] }
  ]
}
```

**Monday morning**: Review the comprehensive morning report covering all weekend work.

---

## 14. Emergency Procedures

### Stop Night Worker Immediately

Three ways:

1. **Delete task-queue.json** — Stop hook sees no tasks, allows Claude to stop
   ```powershell
   Remove-Item .claude\task-queue.json
   ```

2. **Kill the watchdog** — Prevents restarts
   ```powershell
   taskkill /F /IM powershell.exe /FI "WINDOWTITLE eq night-worker*"
   ```

3. **Set max_iterations to 0** — Claude stops at next iteration check
   ```powershell
   # Edit .claude/task-queue.json: set "current_iteration" >= "max_iterations"
   ```

### Revert Night Worker Changes

```powershell
# See what was changed
git log feature/night-worker-output --oneline

# Revert everything
git branch -D feature/night-worker-output

# Or keep some commits, revert others
git revert <commit-hash>
```

### Deploy Rollback

```powershell
# Vercel automatic rollback
vercel rollback

# Or deploy previous commit
git checkout HEAD~1
vercel --prod
```

### Disable All Hooks Temporarily

```powershell
# Rename settings file to disable all hooks
Rename-Item .claude\settings.local.json .claude\settings.local.json.bak

# Re-enable
Rename-Item .claude\settings.local.json.bak .claude\settings.local.json
```

---

## 15. Complete Inventory (Final State)

### All Files After All Phases

```
.claude/
  CONTEXT.md                           # Persistent notes (survives compaction)
  task-queue.json                      # Night Worker task queue (gitignored)
  data/
    prompt-count.json                  # UserPromptSubmit counter (gitignored)
  agent-memory/                        # Persistent agent memory (gitignored)
    code-reviewer/MEMORY.md
    playwright-test-healer/MEMORY.md
    worksheet-quality-assessor/MEMORY.md
    build-error-resolver/MEMORY.md
    night-worker-coordinator/MEMORY.md
  hooks/
    # Phase 1 (DONE)
    pre-tool-use.js                    # Safety layer (fail-closed)
    post-tool-use.js                   # Scoped lint
    stop-quality-gate.js               # tsc --noEmit + task queue
    session-start.js                   # Context injection

    # Phase 4
    deploy-verify.js                   # Pre-deploy build + smoke tests
    post-deploy-health.js              # Post-deploy health checks
    db-promote-gate.js                 # DB promotion safety

    # Phase 5
    pre-compact.js                     # Transcript backup + CONTEXT.md update
    task-completed-gate.js             # Quality gate for task completion

    # Phase 6
    context-injector.js                # Domain-aware rule injection
    user-prompt-refresh.js             # Periodic context refresh
    subagent-observer.js               # Agent lifecycle logging
    failure-tracker.js                 # Error pattern detection
    session-end.js                     # Cleanup
    intent-safety.json                 # AI-powered prompt-type hook config (Non-Deterministic Armor)

    logs/                              # All hook logs (gitignored)
      stop-quality-gate.log
      deploy.log
      failures.log
      sessions/
      transcripts/

  rules/                               # Path-scoped rules (IMPLEMENTED)
    e2e-testing.md                     # Loads for tests/e2e/**
    supabase.md                        # Loads for supabase/**
    worksheet-prompts.md               # Loads for src/lib/prompts/**
    nextjs-app.md                      # Loads for src/app/**

  agents/
    # Existing (upgraded with frontmatter)
    worksheet-quality-assessor.md      # +memory, +maxTurns, +skills
    playwright-test-planner.md         # +maxTurns, +skills
    playwright-test-generator.md       # +maxTurns, +skills
    playwright-test-healer.md          # +memory, +maxTurns, +skills
    planner.md                         # +maxTurns, +skills, +disallowedTools
    code-reviewer.md                   # +memory, +maxTurns, +skills
    security-reviewer.md               # +maxTurns, +model:haiku
    refactor-cleaner.md                # +maxTurns, +skills
    tdd-guide.md                       # +maxTurns, +skills

    # New (Phase 3)
    build-error-resolver.md            # Diagnose + fix build failures
    deploy-verifier.md                 # Read-only deploy verification
    db-migration-expert.md             # Supabase migration guidance
    night-worker-coordinator.md        # Autonomous task queue coordinator

  skills/
    # Existing (upgraded with frontmatter)
    worksheet-generation.md
    interactive-worksheet-testing.md
    e2e-test-patterns.md
    coding-standards.md
    deployment-checklist.md
    verification-loop.md
    worksheet-quality-criteria.md
    security-review.md

    # New (Phase 3)
    supabase-best-practices.md
    dispatching-agents.md
    improvement-loop.md

scripts/
  night-worker.ps1                     # External watchdog script (Phase 5)
  parallel-workspace.ps1               # Git worktree manager for P-Threads (Phase 6)
```

### All 13 Agents (Final State)

| Agent | Model | Memory | MaxTurns | Skills Preloaded |
|-------|-------|--------|----------|-----------------|
| worksheet-quality-assessor | sonnet | project | 100 | worksheet-quality-criteria |
| playwright-test-planner | sonnet | — | 30 | e2e-test-patterns, interactive-worksheet-testing |
| playwright-test-generator | sonnet | — | 30 | e2e-test-patterns, interactive-worksheet-testing |
| playwright-test-healer | sonnet | project | 50 | e2e-test-patterns, interactive-worksheet-testing |
| planner | inherit | — | 15 | coding-standards |
| code-reviewer | inherit | project | 20 | coding-standards, security-review |
| security-reviewer | haiku | — | 15 | — |
| refactor-cleaner | inherit | — | 30 | coding-standards, verification-loop |
| tdd-guide | inherit | — | 40 | verification-loop, e2e-test-patterns |
| **build-error-resolver** | sonnet | project | 25 | coding-standards, verification-loop |
| **deploy-verifier** | haiku | — | 15 | deployment-checklist |
| **db-migration-expert** | sonnet | — | 20 | supabase-best-practices |
| **night-worker-coordinator** | sonnet | project | 200 | verification-loop, dispatching-agents |

### All 11 Skills (Final State)

| Skill | User-Invocable | Auto-Invoke | Preloaded By |
|-------|---------------|-------------|-------------|
| worksheet-generation | Yes | Yes | — |
| interactive-worksheet-testing | Yes | Yes | test-planner, test-generator, test-healer |
| e2e-test-patterns | No | Yes (Claude-only) | test-planner, test-generator, test-healer, tdd-guide |
| coding-standards | No | Yes (Claude-only) | code-reviewer, planner, refactor-cleaner, build-error-resolver |
| deployment-checklist | Yes | Yes | deploy-verifier |
| verification-loop | No | Yes (Claude-only) | refactor-cleaner, tdd-guide, build-error-resolver, night-worker |
| worksheet-quality-criteria | No | Yes (Claude-only) | worksheet-quality-assessor |
| security-review | Yes | Yes | code-reviewer |
| **supabase-best-practices** | No | Yes (Claude-only) | db-migration-expert |
| **dispatching-agents** | No | Yes (Claude-only) | night-worker-coordinator |
| **improvement-loop** | Yes (user-only) | No | — |

### Final settings.local.json Hooks Section

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
          { "type": "command", "command": "node \"$CLAUDE_PROJECT_DIR/.claude/hooks/post-tool-use.js\"", "timeout": 60 }
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

---

## 16. Implementation Priority & Dependencies

### Gap Analysis (Assessed Against Agentic Singularity Framework)

| Area | Current Score | Target | Biggest Gap |
|------|-------------|--------|------------|
| Core 4 (Context/Model/Prompt/Tools) | 73% | 90%+ | No `memory:` on agents, no model tier strategy active |
| Thread Engineering | 37% | 70%+ | No L-Threads (overnight), no P-Threads (parallel worktrees) |
| Agentic Layer Class | Class 1→2 transition | Solid Class 3 | No prompt-type hooks, no closed-loop validation |
| Context R&D | 70% | 85%+ | No agent memory = context not truly delegated |
| Non-Deterministic Armor | 52% | 80%+ | All hooks are regex-based; no AI-powered intent analysis |
| Four Vectors (Para/Auto/Orch/Trust) | 35% | 65%+ | Single-terminal workflow, no auto-resume |

### Priority-Ordered Implementation (Maximum Impact Per Hour)

Based on the gap analysis, the implementation order is re-prioritized by **impact**, not just dependencies:

```
IMMEDIATE (Highest ROI — unlocks everything else)
═══════════════════════════════════════════════════
Phase 2: Agent & Skill Upgrades              [2-3h]  ← Transforms Class 1 → Class 2
  │  Adds: memory, maxTurns, disallowedTools, skills to all 9 agents + 8 skills
  │  Unlocks: Agent learning, tool constraints, focused context delegation
  │  Thread impact: Thicker threads (better orchestration)
  │
Phase 3: New Agents & Skills                 [3-4h]  ← Fills critical specialist gaps
  │  Creates: build-error-resolver, deploy-verifier, db-migration-expert, night-worker-coordinator
  │  Unlocks: B-Threads (agents orchestrating agents), deploy safety, auto-recovery
  │
HIGH PRIORITY (Unlock autonomy)
═══════════════════════════════════════════════════
Phase 5: Night Worker                        [4-5h]  ← Unlocks L-Threads
  │  Creates: pre-compact.js, task-completed-gate.js, night-worker.ps1
  │  Unlocks: 8+ hours autonomous work, auto-resume on token limit, morning reports
  │  Thread impact: Long-duration threads — the payoff for all prior work
  │
Phase 4: Deployment Pipeline                 [2-3h]  ← Safe production workflow
  │  Creates: deploy-verify.js, post-deploy-health.js, db-promote-gate.js
  │  Unlocks: Automated deploy verification, reduces human checkpoints for deploys
  │  Thread impact: Fewer human-in-the-loop checkpoints (Trust vector)
  │
STRATEGIC (Class 3 capabilities)
═══════════════════════════════════════════════════
Phase 6: Intelligence & Observability        [4-5h]  ← Unlocks Class 3
    Creates: AI-powered intent hook (prompt-type), parallel workspace script,
             context priming, subagent observer, failure tracker, closed-loop validation
    Unlocks: P-Threads (parallel worktrees), non-deterministic armor, self-healing agents
    Thread impact: Parallel + thicker threads, approaching Z-Thread trust level
```

### Dependency Graph

```
Phase 1 (DONE) ──────────────────────────────────────────────────────────┐
CLAUDE.md (DONE) ────────────────────────────────────────────────────────┤
Path-Scoped Rules (DONE) ───────────────────────────────────────────────┤
                                                                         │
Phase 2 (Agent & Skill Upgrades) ──┐  ← START HERE                     │
  No dependencies, immediate start  │                                    │
                                    ├── Phase 3 (New Agents)             │
                                    │     │                              │
                                    │     ├── Phase 5 (Night Worker)     │
                                    │     │     L-Threads unlocked       │
                                    │     │                              │
                                    │     ├── Phase 4 (Deploy Pipeline)  │
                                    │     │     Trust vector advances    │
                                    │     │                              │
                                    │     └── Phase 6 (Intelligence)     │
                                    │           P-Threads + Class 3      │
                                    │           AI-powered hooks         │
                                    │           Parallel workspaces      │
                                    │                                    │
                                    └────────────────────────────────────┘
```

### Phase-to-Thread Mapping

| Phase | Thread Types Unlocked | Agentic Class | Key Capability |
|-------|----------------------|--------------|----------------|
| Phase 1 (DONE) | Base Thread | Class 1 | Safety armor (Exit Code 2), quality gates |
| CLAUDE.md (DONE) | Base Thread (optimized) | Class 1 | Context efficiency (-63% bloat) |
| Phase 2 | Thicker Base Threads | Class 1→2 | Agent memory, constraints, skill preloading |
| Phase 3 | B-Threads (orchestration) | Class 2 | Specialist agents, delegation, Scout/Build/Review |
| Phase 4 | Fewer checkpoints | Class 2 | Automated deploy verification |
| Phase 5 | L-Threads + C-Threads | Class 2→3 | Overnight autonomy, auto-resume, context persistence |
| Phase 6 | P-Threads + approaching Z | Class 3 | AI intent hooks, parallel worktrees, closed-loop validation |

### Total Effort: 16-20 hours across Phases 2-6

### Checkpoint Strategy

After each phase:
1. Commit to feature branch
2. Run type-check (`tsc --noEmit`)
3. Run smoke tests
4. User reviews changes
5. Proceed to next phase or fix issues

### Merge Strategy

1. Each phase committed to `feature/claude-code-hooks`
2. After Phase 5 (Night Worker), merge to master
3. Tag as `v1.0-hooks-agents-skills`
4. Phase 6 can continue on a new feature branch

### Success Criteria (When Are We Done?)

| Milestone | Criteria | Target Thread |
|-----------|----------|--------------|
| **MVP** | All agents have memory + constraints. Night Worker runs 2+ hours unattended. | L-Thread (basic) |
| **Production** | Deploy pipeline automated. Morning reports generated. 3+ parallel agents. | L-Thread + P-Thread |
| **Advanced** | AI-powered hooks catch novel dangers. Agents self-correct without human. Closed-loop validation. | Approaching Z-Thread |
| **Singularity** | You sleep 8 hours, wake up to a morning report with all tasks done, all tests passing, code reviewed. You merge and deploy. | Z-Thread |

---

> **This document is the single source of truth** for the hooks, skills, agents, and subagents workflow. Update this document as phases are completed. Mark phases as DONE with completion dates.
>
> **Applicable to any software project**: The patterns in sections 1-4 (Vision, Research, CLAUDE.md Strategy, Task System) and the Thread Maturity Model are universal. Sections 5-16 are project-specific implementations that serve as concrete examples of each pattern.
>
> **Last updated**: 2026-02-07
> **Current status**: Phase 1 COMPLETED. CLAUDE.md optimized (170->63 lines). Path-scoped rules created. Gap analysis scored 50% against Agentic Singularity framework. Phases 2-6 planned with priority-ordered implementation.
