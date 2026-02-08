# Solo Dev Workflow
## Claude Code Setup for WorksheetGenerator-AI

> Practical guide for one developer using Claude Code effectively. No theory, no aspirational frameworks — just what works.

---

## What's Set Up Today

### Hooks (4 active)

| Hook | File | What It Does |
|------|------|-------------|
| Safety blocker | `pre-tool-use.js` | Blocks force push, .env access, critical deletes. Exits 2 on error (fail-closed). |
| Scoped lint | `post-tool-use.js` | Lints only the changed file after Edit/Write. |
| Type-check gate | `stop-quality-gate.js` | Runs `tsc --noEmit` before Claude stops. Blocks if types are broken. |
| Context injection | `session-start.js` | Injects git status, build state, CONTEXT.md on session start. |

Plus a Windows notification on task completion (PowerShell MessageBox).

### Path-Scoped Rules (4 active)

Load automatically when editing files in matching directories — zero context cost otherwise:

| Rule | Triggers On | Content |
|------|------------|---------|
| `e2e-testing.md` | `tests/e2e/**` | Playwright patterns, fill(), cookie consent |
| `supabase.md` | `supabase/**` | DB safety, migrations, RLS |
| `worksheet-prompts.md` | `src/lib/prompts/**` | Curriculum taxonomy, image catalogs |
| `nextjs-app.md` | `src/app/**` | App Router, server components, Zod |

### Agents (9 available)

| Agent | Best For |
|-------|---------|
| **worksheet-quality-assessor** | Batch quality checks on worksheets |
| **playwright-test-planner** | Design test scenarios for a page |
| **playwright-test-generator** | Write test code from a plan |
| **playwright-test-healer** | Debug and fix failing tests |
| **code-reviewer** | Review code for quality issues |
| **security-reviewer** | Spot security vulnerabilities |
| **planner** | Plan implementation approach |
| **refactor-cleaner** | Remove dead code, improve structure |
| **tdd-guide** | Red-green-refactor workflow |

### Slash Commands (14 available)

| Command | Purpose |
|---------|---------|
| `/pipeline` | Full test pipeline: run tests, heal failures, assess quality, HTML report |
| `/assess` | Worksheet quality assessment |
| `/test-year` | Run E2E tests by year group |
| `/deploy` | Two-step production deployment |
| `/commit` | Smart git commit |
| `/clean` | Kill ports, clear caches |
| `/snip` | Capture clipboard screenshot |
| `/review` | Code review |
| `/refactor` | Code refactoring |
| `/plan` | Implementation planning |
| `/tdd` | Test-driven development |
| `/primer` | Load project context |
| `/db-sync` | Database sync operations |
| `/access-notebook` | Connect to NotebookLM |

---

## Safety Model

Three layers. Simple rule: **the more irreversible the action, the more protection it gets.**

```
ALWAYS BLOCKED (hook enforced, no exceptions)
  - Force push to master/main
  - .env file access (except .env.example)
  - DROP TABLE / TRUNCATE
  - rm -rf on src/, .claude/, supabase/

YOU DECIDE (Claude asks, you approve/deny)
  - Production deploy
  - Database promotion
  - Anything you're not sure about

AUTO-CORRECTED (Claude fixes before stopping)
  - Type errors after code changes
  - Lint issues in edited files
```

---

## When to Use What

### Decision Flowchart

```
Does this need to happen 100% of the time, no exceptions?
  YES --> HOOK (guaranteed, zero context cost)
  NO  -->
    Does it apply to every task?
      YES --> CLAUDE.md (always loaded, keep it short)
      NO  -->
        Does it apply to specific file types?
          YES --> .claude/rules/ (loaded on-demand)
          NO  -->
            Should Claude auto-detect when to use it?
              YES --> SKILL (auto-discovered by description)
              NO  --> SLASH COMMAND (manually triggered)
```

### Which Agent for Which Job

| I want to... | Use |
|-------------|-----|
| Run all tests + heal + quality in one go | `/pipeline` |
| Quick test a single year group | `/pipeline` with `--year=reception --skip-quality` |
| Check worksheet quality | `/assess` or worksheet-quality-assessor agent |
| Write new E2E tests | Playwright agents in order: **planner -> generator -> healer** |
| Fix failing tests | playwright-test-healer agent |
| Review my code | `/review` |
| Plan a feature | `/plan` |
| Refactor something | `/refactor` |
| Do TDD | `/tdd` |
| Deploy | `/deploy` (two-step: code first, then data) |

---

## Practical Patterns

### Pattern 1: Long Sessions (Document & Clear)

When context gets large or Claude starts forgetting things:

1. Tell Claude: "Save your progress to .claude/CONTEXT.md"
2. Run `/clear`
3. New session picks up CONTEXT.md automatically via session-start hook

### Pattern 2: Multi-Step Features

For anything touching 3+ files:

1. Use `/plan` to design the approach
2. Review the plan
3. Let Claude execute step by step
4. Each step should be independently testable and committable

### Pattern 3: Batch Worksheet Work

For generating or assessing many worksheets:

1. Use worksheet-quality-assessor agent (handles 3 worksheets per cycle)
2. Let it run, review results
3. Fix issues it finds, re-assess

### Pattern 4: Test Fix Campaign

When multiple tests are failing:

1. Run `/test-year` to see what's broken
2. Let playwright-test-healer fix them one by one
3. Re-run the full suite to confirm

### Pattern 5: Pipeline (Test + Heal + Quality)

The pipeline replaces manually running tests, healing, and assessing quality separately. One command does all three phases and produces a single HTML report.

**How it works**: Phase 0 adds screenshot capture to all test files (one-time) → Phase 1 runs all Playwright tests at 8 workers → Phase 2 auto-heals failures via the healer agent → Phase 3 reads each screenshot with Claude Code vision and scores 7 quality dimensions → Report updates progressively after each phase.

**Quality scoring**: 7 dimensions (Curriculum Alignment 50%, Answer Correctness 20%, Intuitive Look & Feel 10%, Image Integrity 5%, Visual Answerability 5%, Presentation Quality 5%, Image-Question Match 5%). GREEN >= 95 with zero auto-fails, AMBER 70-94, RED < 70 or test failed.

---

## Pipeline Examples

### Example 1: Full Suite Before a Release

Run everything on all 455 tests. Takes ~60-90 min with quality assessment.

```bash
node scripts/pipeline-orchestrator.js --open-report
```

**What you get**: `pipeline-results/pipeline-report.html` with GREEN/AMBER/RED for every worksheet, plus `pipeline-results/action-points.json` listing what to fix, sorted P0 → P1 → P2.

**When to use**: Before a major deploy. Gives you confidence that all tests pass AND all worksheets are production-quality.

### Example 2: Quick Validation After Changes

You just changed a component that affects Year 2 worksheets. Run tests + healer on Year 2 only, skip the slow quality assessment.

```bash
node scripts/pipeline-orchestrator.js --year=year2 --skip-quality --open-report
```

**What you get**: Pass/fail for all Year 2 tests, healer fixes for any breakages, report in ~5 min.

**When to use**: After UI changes, component refactors, or CSS updates that might break specific year groups.

### Example 3: Quality Audit on Reception

You want to know which Reception worksheets are production-ready. Run full pipeline on just reception.

```bash
node scripts/pipeline-orchestrator.js --year=reception --open-report
```

**What you get**: All 46 reception tests run, failures healed, every passing worksheet scored on 7 dimensions. Action points tell you exactly which worksheets need image fixes, answer corrections, or layout improvements.

**When to use**: When populating a new year group or auditing an existing one before promoting to production.

### Example 4: Test-Only Run (CI-Style)

Just want to know what passes and what fails. No healing, no quality — raw results.

```bash
node scripts/pipeline-orchestrator.js --skip-healer --skip-quality
```

**What you get**: Pass/fail counts in ~3-5 min. Report shows first-pass results only.

**When to use**: Quick smoke test. Fastest pipeline mode.

### Example 5: Slow Machine / Limited Resources

Running on a laptop or low-spec machine. Reduce parallelism.

```bash
node scripts/pipeline-orchestrator.js --workers=4 --quality-parallel=2 --year=year1
```

**What you get**: Same results, just slower. Workers=4 means 4 parallel Playwright browsers, quality-parallel=2 means 2 concurrent Claude Code vision assessments.

### Example 6: Fix Everything in One Session

Full pipeline, review the report, then fix AMBER issues:

```bash
# Step 1: Run the pipeline
node scripts/pipeline-orchestrator.js --open-report

# Step 2: Review action-points.json
# P0 = auto-fail (broken images, wrong answers) — fix first
# P1 = low quality (score < 80) — fix second
# P2 = near-production (score 80-94) — polish last

# Step 3: Fix issues, then re-run just the affected year group
node scripts/pipeline-orchestrator.js --year=year3 --open-report
```

**When to use**: Dedicated quality improvement session. The action points file is your TODO list.

---

## Deploy Checklist

Two steps, always in this order:

```
Step 1: Deploy code
  vercel --prod
  (pre-tool-use.js blocks this if build hasn't passed)

Step 2: Promote data
  npm run db:promote
  (backs up PROD first, copies only NEW worksheets by slug)
```

Never promote data without deploying code first.

---

## Next Improvements (Do in Order)

These are the highest-value upgrades, prioritized by what will actually save you time:

### 1. Upgrade 3 Core Agents (~1 hour)

Add frontmatter to the agents you use most. This gives them memory (learn from past sessions), turn limits (don't run forever), and skill preloading (get domain knowledge automatically).

**worksheet-quality-assessor:**
```yaml
---
model: sonnet
memory: project
maxTurns: 100
skills: [worksheet-quality-criteria]
---
```

**playwright-test-healer:**
```yaml
---
model: sonnet
memory: project
maxTurns: 50
skills: [e2e-test-patterns, interactive-worksheet-testing]
disallowedTools: [Write]
---
```

**code-reviewer:**
```yaml
---
memory: project
maxTurns: 20
skills: [coding-standards, security-review]
---
```

Memory means: worksheet-quality-assessor remembers which image combos fail, test-healer remembers selector patterns, code-reviewer builds understanding of project conventions. Files live at `.claude/agent-memory/{agent-name}/MEMORY.md`.

**Verify it helps**: After 1-2 weeks, check the memory files. If they contain useful patterns, upgrade remaining agents. If they're full of noise, reconsider.

### 2. Deploy Safety Hooks (~2 hours)

Create three hooks that make deploys safer:

**`deploy-verify.js`** (PreToolUse on `vercel --prod`):
- Run `npm run build` — block if it fails
- Run Playwright smoke tests — block if they fail
- Ask you to confirm before proceeding

**`post-deploy-health.js`** (PostToolUse after deploy):
- Wait 15s for propagation
- Hit production URLs, check for 200 status
- Windows notification on success or failure

**`db-promote-gate.js`** (PreToolUse on `npm run db:promote`):
- Check that a deploy happened recently
- Auto-run backup before promoting
- Ask you to confirm with worksheet count

### 3. PreCompact Hook (~30 min)

Create `.claude/hooks/pre-compact.js` that fires before context compression:
- Save current task progress to `.claude/CONTEXT.md`
- Log which files were being edited
- Session-start hook already reads CONTEXT.md, so recovery is automatic

This alone solves 80% of the "Claude forgot what it was doing" problem.

---

## What NOT to Build (Yet)

These ideas from the original plan sound good but aren't worth the complexity for solo dev:

| Idea | Why Skip It |
|------|------------|
| Night Worker (autonomous overnight) | Fragile on Windows, hard to debug, unproven ROI |
| Parallel workspaces (git worktrees) | You're one person — sequential is fine |
| AI-powered intent hooks (prompt-type) | Regex hooks catch 99% of real dangers |
| Builder+Validator agent pairing | Overkill for solo — just review your own code |
| Agent dispatching orchestrator | You know which agent to use; a meta-agent adds indirection |
| 5 agent memory stores | Start with 1-2, prove it helps |
| Subagent observer/failure tracker | Nice for debugging but not urgent |

**Note**: The pipeline (`/pipeline`) already covers the "agent dispatching orchestrator" pattern for the test+heal+quality workflow. Other orchestration patterns should prove their value before building.

**Revisit the rest if**: You consistently wish Claude could keep working while you sleep, or you find another 3+ step workflow you repeat often.

---

## Emergency Procedures

### Disable a specific hook

Comment it out in `.claude/settings.local.json` under the relevant event.

### Disable ALL hooks

```powershell
Rename-Item .claude\settings.local.json .claude\settings.local.json.bak
# Re-enable:
Rename-Item .claude\settings.local.json.bak .claude\settings.local.json
```

### Rollback a deploy

```powershell
vercel rollback
```

### Claude stuck in a loop

If the Stop hook keeps blocking Claude from stopping:
1. The hook checks for `stop_hook_active` to prevent infinite loops
2. If truly stuck, disable hooks (above) and restart the session

---

## File Map

```
.claude/
  CONTEXT.md                    # Persistent notes (survives compaction)
  settings.local.json           # Hook configuration
  hooks/
    pre-tool-use.js             # Safety blocker (fail-closed)
    post-tool-use.js            # Scoped lint after edits
    stop-quality-gate.js        # Type-check before stopping
    session-start.js            # Context injection on start
    logs/                       # Hook logs (gitignored)
  rules/
    e2e-testing.md              # Loads for tests/e2e/**
    supabase.md                 # Loads for supabase/**
    worksheet-prompts.md        # Loads for src/lib/prompts/**
    nextjs-app.md               # Loads for src/app/**
  agents/                       # 9 specialist agents
  skills/                       # 8 knowledge modules
  commands/                     # 14 slash commands (incl. /pipeline)

scripts/
  pipeline-orchestrator.js      # Pipeline entry point (all 4 phases)
  pipeline/
    add-quality-screenshots.js  # Phase 0: inject screenshot line into tests
    phase1-runner.js            # Phase 1: Playwright execution + JSON parse
    phase2-healer.js            # Phase 2: healer agent invocation + regression
    phase3-quality.js           # Phase 3: Claude Code vision assessment
    report-generator.js         # Progressive HTML report builder
    quality-criteria.js         # 7-dimension scoring + auto-fail logic
    utils.js                    # Slug extraction, path helpers, logging

pipeline-results/               # Generated output (gitignored)
  pipeline-report.html          # HTML report with filters + expandable rows
  action-points.json            # Prioritized fixes (P0/P1/P2)
```

---

## CLAUDE.md Principles

Your CLAUDE.md is 63 lines. Keep it that way.

**Every line must answer**: "Would removing this cause Claude to make mistakes?" If no, cut it.

- Commands Claude can't guess: **keep**
- Environment quirks: **keep**
- Standard language conventions: **delete** (Claude already knows)
- Detailed docs: **link, don't paste**
- Multi-step workflows: **move to /commands**

---

> **This document replaces** `docs/optimal-hooks-skills-agents-subagents-workflow.md` as the practical daily reference.
> The original remains as an architectural reference and long-term roadmap.
>
> **Last updated**: 2026-02-07
