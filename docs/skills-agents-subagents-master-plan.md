# Skills, Agents & Subagents Master Plan — WorksheetGenerator-AI

## Table of Contents
1. [Research Summary](#1-research-summary)
2. [Current State Audit](#2-current-state-audit)
3. [Gap Analysis: What We're Missing](#3-gap-analysis)
4. [Recommended Improvements to Existing Agents](#4-improve-existing)
5. [New Agents to Create](#5-new-agents)
6. [Skill Upgrades](#6-skill-upgrades)
7. [New Skills to Add](#7-new-skills)
8. [Agent Orchestration Patterns](#8-orchestration)
9. [Hooks + Agents Integration](#9-hooks-agents)
10. [Implementation Plan](#10-implementation)

---

## 1. Research Summary

### Key Findings

**Vercel's 56% skill skip rate**: Skills are only loaded when the model *decides* to invoke them. In evaluations, this meant Claude skipped skills 56% of the time. CLAUDE.md content (always in context) achieved 100% pass rate vs skills' 53%. **Implication**: Move critical rules to CLAUDE.md, use skills only for optional task-specific workflows.

**Agent frontmatter features we're not using**: The official spec supports `memory`, `maxTurns`, `skills` (preloading), `mcpServers`, `hooks` (scoped to agent), `disallowedTools`, `permissionMode`, and `context: fork`. Our agents use almost none of these.

**Best-in-class repos analyzed**:

| Repo | Agents | Skills | Key Innovation |
|------|--------|--------|----------------|
| aaddrick/claude-pipeline | 10 | 21 | Shell-based orchestration, specialist agents with deferral rules, improvement loop meta-skill |
| wshobson/agents | 112 | 146 | Three-tier model strategy (Opus/Sonnet/Haiku by task complexity) |
| carlrannaberg/claudekit | 6 | — | Parallel code review (6 agents), git checkpoints, typecheck/lint/test on PostToolUse |
| affaan-m/everything-claude-code | 9+ | — | Memory persistence, continuous learning, multi-agent commands |
| VoltAgent/awesome-subagents | 130+ | — | nextjs-developer, seo-specialist, qa-expert agent definitions |
| supabase/agent-skills | — | 1 | Official Supabase Postgres best practices skill |
| wsimmonds/claude-nextjs-skills | — | 20+ | Improved Next.js eval pass rate from 32% to 78% |

**Three patterns that transform development workflows**:
1. **Persistent memory** — Agents remember patterns across sessions
2. **Specialist delegation** — Agents have explicit scope boundaries and defer to others
3. **Progressive disclosure** — Skills load core instructions first, detailed references on demand

---

## 2. Current State Audit

### Existing Agents (9)

| Agent | Model | Tools | Memory | Hooks | Skills Preloaded | Verdict |
|-------|-------|-------|--------|-------|-----------------|---------|
| worksheet-quality-assessor | sonnet | All | No | No | No | Missing memory, hooks, maxTurns |
| playwright-test-planner | sonnet | Playwright | No | No | No | Missing e2e-test-patterns skill preload |
| playwright-test-generator | sonnet | Playwright | No | No | No | Missing e2e-test-patterns skill preload |
| playwright-test-healer | sonnet | Playwright | No | No | No | Missing e2e-test-patterns skill preload |
| planner | — | Read, Glob, Grep | No | No | No | Missing coding-standards skill |
| code-reviewer | — | Read, Glob, Grep | No | No | No | Missing memory, security-review skill |
| security-reviewer | — | Read, Glob, Grep | No | No | No | OK — focused |
| refactor-cleaner | — | Read, Write, Edit, Grep, Glob | No | No | No | Missing coding-standards skill |
| tdd-guide | — | Read, Write, Edit, Bash | No | No | No | Missing verification-loop skill |

**Key gaps in all agents**:
- No `memory` field — agents can't learn across sessions
- No `skills` preloading — agents don't auto-load relevant skills
- No `hooks` — no agent-specific quality gates
- No `maxTurns` — agents can run indefinitely
- No `disallowedTools` — no protection against unintended actions
- No `permissionMode` — all use default (prompt for everything)

### Existing Skills (8)

| Skill | Format | Has Frontmatter | context:fork | Supporting Files |
|-------|--------|----------------|-------------|-----------------|
| worksheet-generation.md | Single file | No | No | No |
| interactive-worksheet-testing.md | Single file | No | No | No |
| e2e-test-patterns.md | Single file | No | No | No |
| worksheet-quality-criteria.md | Single file | No | No | No |
| coding-standards.md | Single file | No | No | No |
| deployment-checklist.md | Single file | No | No | No |
| security-review.md | Single file | No | No | No |
| verification-loop.md | Single file | No | No | No |

**Key gaps in all skills**:
- No YAML frontmatter — no `name`, `description`, `allowed-tools`, `model`
- Not using directory format (`SKILL.md` + supporting files)
- No `context: fork` — heavy skills pollute main context
- No dynamic context injection (`!command` syntax)
- No `disable-model-invocation` for user-only skills
- Skills are large markdown files without progressive disclosure

### Existing Commands (12)

Commands are functional but could benefit from being upgraded to skills (for auto-invocation) where appropriate. Some commands duplicate agent functionality.

---

## 3. Gap Analysis: What We're Missing

### Critical Missing Capabilities

| Capability | Impact | Where It Goes |
|-----------|--------|--------------|
| **Agent memory** (`memory: project`) | Agents forget everything between sessions; can't build up knowledge of codebase patterns, common test failures, worksheet quality issues | Add to: code-reviewer, playwright-test-healer, worksheet-quality-assessor |
| **Skill preloading** in agents | Agents don't auto-load relevant skills; e.g., test agents don't know test patterns | Add `skills:` field to agents |
| **Agent-scoped hooks** | No per-agent quality gates; e.g., test generator should verify test compiles | Add `hooks:` to agent frontmatter |
| **Tool restrictions** | Agents can use any tool including destructive ones | Add `tools:` or `disallowedTools:` |
| **maxTurns cap** | Agents can run forever in edge cases | Add `maxTurns:` to all agents |
| **Supabase best practices** | No database expertise skill | Install supabase/agent-skills |
| **Next.js patterns** | No framework-specific guidance beyond CLAUDE.md | Create or install Next.js skills |
| **Improvement loop** | No systematic way to improve agents/skills based on failures | Create improvement-loop skill |
| **Orchestration skill** | No guidance for when to use which agent | Create dispatching/orchestration skill |

### Missing Agent Types

| Agent | Purpose | Why Needed |
|-------|---------|-----------|
| **deploy-verifier** | Pre/post deploy verification | Automate the two-step deploy with health checks |
| **db-migration-expert** | Supabase migration guidance | Safe schema changes with rollback plans |
| **worksheet-generator** | Autonomous worksheet creation | End-to-end generation without manual steps |
| **build-error-resolver** | Diagnose and fix build failures | Stop hook triggers this when build fails |

---

## 4. Recommended Improvements to Existing Agents

### 4.1 worksheet-quality-assessor (Flagship Agent)

```yaml
# ADD to frontmatter:
memory: project                    # Remember quality patterns across sessions
maxTurns: 100                      # Cap for autonomous assessment
skills:
  - worksheet-quality-criteria     # Auto-load quality criteria
hooks:
  Stop:
    - hooks:
        - type: command
          command: "node \"$CLAUDE_PROJECT_DIR/.claude/hooks/assessment-report.js\""
```

**Memory benefits**: After 10+ assessment sessions, the agent accumulates knowledge of:
- Which image combinations commonly fail
- Which question types are too difficult for each year group
- Common prompt engineering fixes that work
- Patterns that lead to broken layouts

### 4.2 playwright-test-healer (Test Debugger)

```yaml
# ADD to frontmatter:
memory: project                    # Remember common test failure patterns
maxTurns: 50
skills:
  - e2e-test-patterns             # Auto-load test patterns
  - interactive-worksheet-testing  # Know worksheet test structure
disallowedTools: Write             # Only edit existing tests, never create new files
```

**Memory benefits**: Remembers:
- Selectors that changed and how they were fixed
- Flaky test patterns and their solutions
- Which worksheets have chronic test issues
- Cookie consent handling gotchas

### 4.3 playwright-test-planner + generator

```yaml
# ADD to both:
skills:
  - e2e-test-patterns
  - interactive-worksheet-testing
maxTurns: 30
```

### 4.4 code-reviewer

```yaml
# ADD to frontmatter:
memory: project                    # Remember codebase patterns across reviews
skills:
  - coding-standards
  - security-review
maxTurns: 20
```

**Memory benefits**: Builds up understanding of:
- Project-specific code patterns
- Previously flagged issues (don't repeat yourself)
- Team preferences and style conventions

### 4.5 planner

```yaml
# ADD to frontmatter:
skills:
  - coding-standards
maxTurns: 15
disallowedTools: Write, Edit, Bash   # Planning only, no implementation
```

### 4.6 refactor-cleaner

```yaml
# ADD to frontmatter:
skills:
  - coding-standards
  - verification-loop
maxTurns: 30
hooks:
  Stop:
    - hooks:
        - type: command
          command: "npx tsc --noEmit"
```

### 4.7 tdd-guide

```yaml
# ADD to frontmatter:
skills:
  - verification-loop
  - e2e-test-patterns
maxTurns: 40
```

---

## 5. New Agents to Create

### 5.1 deploy-verifier

```yaml
---
name: deploy-verifier
description: Verifies deployments are safe and healthy. Use for pre-deploy checks, post-deploy health verification, and rollback decisions.
tools: Read, Glob, Grep, Bash
model: haiku
maxTurns: 15
skills:
  - deployment-checklist
disallowedTools: Write, Edit
---

You are a deployment verification specialist for a Next.js app deployed on Vercel with Supabase.

Your responsibilities:
1. Pre-deploy: Verify build passes, smoke tests pass, no uncommitted changes
2. Post-deploy: Health check production URLs, verify API responses
3. DB promotion: Verify dev data is ready, confirm backup exists
4. Rollback: Assess whether rollback is needed based on health checks

Production URL: Check Vercel dashboard or vercel.json
Dev URL: http://localhost:3000

Health check endpoints:
- / (home page - expect 200)
- /library (worksheet library - expect 200)
- /api/health (API health - expect 200 with JSON)

NEVER modify any files. NEVER deploy. Only verify and report.
```

### 5.2 db-migration-expert

```yaml
---
name: db-migration-expert
description: Expert in Supabase database migrations. Use for schema changes, RLS policies, migration planning, and data integrity verification.
tools: Read, Glob, Grep, Bash
model: sonnet
maxTurns: 20
skills:
  - supabase-best-practices
disallowedTools: Write, Edit
---

You are a Supabase database migration specialist.

Project database: Supabase PostgreSQL
CLI: npx supabase (v2.54.11)
Environment: ALWAYS target DEV database (never production)

Your responsibilities:
1. Plan migrations with rollback strategy
2. Review existing migrations in supabase/migrations/
3. Verify RLS policies are correct
4. Check indexes for query performance
5. Validate data integrity after changes

Current schema:
- library_worksheets (main worksheet table)
- library_downloads (analytics)
- user_profiles (user management)
- Region field: UK (MVP), future-proof for US/AU

Rules:
- NEVER modify production database
- ALWAYS create migration files (not inline SQL)
- ALWAYS include rollback in migration comments
- ALWAYS verify RLS policies after changes
- Use npx supabase db execute for dev testing
```

### 5.3 build-error-resolver

```yaml
---
name: build-error-resolver
description: Diagnoses and fixes Next.js build failures. Use when npm run build fails or TypeScript compilation errors occur.
tools: Read, Write, Edit, Bash, Glob, Grep
model: sonnet
maxTurns: 25
memory: project
skills:
  - coding-standards
  - verification-loop
---

You are a build failure specialist for a Next.js 14 TypeScript project.

When invoked:
1. Run `npm run build` to reproduce the failure
2. Analyze the error output
3. Categorize: TypeScript error, ESLint error, import error, runtime error
4. Fix the root cause (not the symptom)
5. Verify build passes after fix
6. If multiple errors, fix them one at a time

Common patterns in this project:
- Server/client component mismatch (missing "use client")
- Missing type exports from library files
- Image import issues with Next.js Image component
- Tailwind class typos

Remember previous build failures and their solutions in your memory.
NEVER skip a build error — fix all of them.
```

### 5.4 night-worker-coordinator

```yaml
---
name: night-worker-coordinator
description: Coordinates autonomous overnight work from a task queue. Use when task-queue.json exists and has pending tasks.
tools: Read, Write, Edit, Bash, Glob, Grep, Task
model: sonnet
maxTurns: 200
memory: project
skills:
  - verification-loop
hooks:
  Stop:
    - hooks:
        - type: command
          command: "node \"$CLAUDE_PROJECT_DIR/.claude/hooks/stop-quality-gate.js\""
---

You are the Night Worker coordinator. You work autonomously from a task queue.

On startup:
1. Read .claude/task-queue.json
2. Find the next pending task (lowest priority number)
3. Update task status to "in_progress"
4. Execute the task
5. Verify results
6. Update task status to "completed" with results
7. Move to next task

Safety rules:
- NEVER push to remote (safety.allow_git_push must be true)
- NEVER deploy to production
- NEVER modify database without safety.allow_db_changes
- Commit to the target branch only
- Create git tags after each task: night-worker-task-{id}

If a task has requires_approval: true, skip it and move to the next one.

On context compaction:
- Update .claude/CONTEXT.md with current progress
- Increment current_iteration in task-queue.json

Delegate to specialist agents when appropriate:
- Test tasks → playwright-test-healer
- Quality tasks → worksheet-quality-assessor
- Build failures → build-error-resolver
```

---

## 6. Skill Upgrades

### 6.1 Upgrade All Skills to Directory Format with Frontmatter

Current skills are bare markdown files. Upgrade to the official format:

**Before**: `.claude/skills/e2e-test-patterns.md`
**After**: `.claude/skills/e2e-test-patterns/SKILL.md` (with frontmatter)

### 6.2 Add Frontmatter to Every Skill

#### worksheet-generation

```yaml
---
name: worksheet-generation
description: Generate worksheets from prompt configurations. Use when creating new worksheets for any year group.
argument-hint: "[year-group/topic/subtopic]"
allowed-tools: Read, Write, Bash, Glob
---
```

#### interactive-worksheet-testing

```yaml
---
name: interactive-worksheet-testing
description: Create E2E tests for interactive worksheets. Use when testing worksheet functionality.
argument-hint: "[worksheet-slug]"
allowed-tools: Read, Write, Bash, Glob, Grep
---
```

#### e2e-test-patterns

```yaml
---
name: e2e-test-patterns
description: Playwright E2E test patterns for this project. Use when writing or debugging tests.
user-invocable: false
---
```

Note: `user-invocable: false` — this is reference material for agents, not a user workflow.

#### coding-standards

```yaml
---
name: coding-standards
description: Project coding standards and conventions. Loaded automatically by code-reviewer and refactor-cleaner agents.
user-invocable: false
---
```

#### deployment-checklist

```yaml
---
name: deployment-checklist
description: Two-step production deployment workflow for Vercel and Supabase.
---
```

#### verification-loop

```yaml
---
name: verification-loop
description: Continuous verification cycle after code changes. Ensures lint, types, tests, and build all pass.
user-invocable: false
---
```

#### worksheet-quality-criteria

```yaml
---
name: worksheet-quality-criteria
description: Strict quality assessment criteria for worksheets. Zero-tolerance for broken images and missing questions.
user-invocable: false
---
```

#### security-review

```yaml
---
name: security-review
description: Security review checklist for code changes. Covers OWASP top 10, secrets, auth, and data exposure.
---
```

---

## 7. New Skills to Add

### 7.1 supabase-best-practices (from official repo)

Install via: `claude plugin add supabase/agent-skills`

Or create manually:

```yaml
---
name: supabase-best-practices
description: Supabase PostgreSQL best practices for query performance, RLS, schema design, and connection management.
user-invocable: false
---

# Supabase PostgreSQL Best Practices

## Query Performance (Critical)
- Always use indexes for WHERE clauses and JOIN conditions
- Use EXPLAIN ANALYZE to verify query plans
- Avoid SELECT * — specify columns
- Use parameterized queries ($1, $2) never string concatenation

## RLS Policies (Critical)
- Enable RLS on every table
- Test policies with different roles
- Use auth.uid() for user-scoped access
- Admin policies: role-based checks

## Schema Design
- Use proper data types (not text for everything)
- Add created_at, updated_at timestamps
- Use ENUM types for fixed value sets
- Normalize, then denormalize for performance

## Connection Management
- Use connection pooling (Supabase handles this)
- Close connections promptly
- Use transactions for multi-step operations

## Project-Specific
- DEV database: awfojaogzevmzqztlxjj.supabase.co
- NEVER target production from code
- Use npx supabase CLI (v2.54.11)
- Migrations in supabase/migrations/
```

### 7.2 improvement-loop (meta-skill from claude-pipeline)

```yaml
---
name: improvement-loop
description: Systematic process for improving agents, skills, and hooks based on failures. Use after fixing issues to prevent recurrence.
disable-model-invocation: true
---

# Improvement Loop

Fix first. Understand fully. Improve last. Premature edits encode partial understanding.

## Mandatory Gate
Before ANY improvement:
1. Original task is complete
2. All tests pass
3. User confirms the issue is resolved

## Five-Step Process

### Step 1: Document What Failed
- Which agent/skill/hook was involved?
- What was the expected behavior?
- What actually happened?
- What was the root cause?

### Step 2: Classify the Improvement
- Anti-pattern: Agent does something it shouldn't
- Missing guidance: Agent lacks knowledge for a scenario
- Hook gap: No quality gate caught the issue
- Scope creep: Agent went beyond its responsibilities

### Step 3: Make the Minimal Change
- Edit ONE file only
- Change the minimum needed
- Add specific guidance, not general principles

### Step 4: Verify
- Run relevant tests
- Verify the agent/skill loads correctly
- Test the specific scenario that failed

### Step 5: Document
- Update the memory file if agent has memory
- Log the improvement for future reference
```

### 7.3 dispatching-agents (orchestration guide)

```yaml
---
name: dispatching-agents
description: Guide for when to use which agent and how to orchestrate multi-agent workflows.
user-invocable: false
---

# Agent Dispatch Guide

## Decision Matrix

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

## Parallel Dispatch

These agents can run in parallel (no dependencies):
- code-reviewer + security-reviewer (both read-only)
- playwright-test-planner + code-reviewer (different concerns)

These must be sequential:
- playwright-test-planner → playwright-test-generator → playwright-test-healer
- planner → implementation → code-reviewer
- build-error-resolver → verification-loop

## Orchestration Patterns

### Full Test Cycle
1. planner: "Plan tests for [feature]"
2. playwright-test-generator: Generate from plan
3. playwright-test-healer: Fix any failures
4. code-reviewer: Review test quality

### Full Deploy Cycle
1. code-reviewer + security-reviewer (parallel)
2. verification-loop: lint + types + tests + build
3. deploy-verifier: Pre-deploy checks
4. User approval
5. deploy-verifier: Post-deploy health check
```

---

## 8. Agent Orchestration Patterns

### 8.1 Pattern: Specialist with Deferral Rules

From claude-pipeline — the most effective agent pattern. Each agent has explicit scope boundaries:

```markdown
## In Scope
- Worksheet HTML generation
- Image selection and layout
- Answer key creation

## NOT In Scope (Defer to other agents)
- E2E test writing → playwright-test-generator
- Quality assessment → worksheet-quality-assessor
- Database operations → db-migration-expert
- Deployment → deploy-verifier
```

### 8.2 Pattern: Three-Tier Model Strategy

From wshobson/agents — match model cost to task complexity:

| Tier | Model | Our Agents |
|------|-------|-----------|
| **Opus** | Complex reasoning, architecture | planner, night-worker-coordinator |
| **Sonnet** | Implementation, testing, review | code-reviewer, playwright-test-*, refactor-cleaner, tdd-guide, build-error-resolver |
| **Haiku** | Fast, cheap, read-only | deploy-verifier, security-reviewer, db-migration-expert (read-only mode) |

### 8.3 Pattern: Parallel Code Review (from claudekit)

Spawn 4 reviewers in parallel for comprehensive code review:

```
/thorough-review →
  ├─ code-reviewer (quality + bugs)
  ├─ security-reviewer (vulnerabilities)
  ├─ planner (architecture alignment)
  └─ refactor-cleaner (dead code scan)
```

All run in parallel since they're read-only. Results aggregated.

### 8.4 Pattern: Progressive Skill Loading

Don't load everything upfront. Use the `skills:` field in agent frontmatter to preload only relevant skills:

```yaml
# playwright-test-healer loads ONLY test-related skills
skills:
  - e2e-test-patterns
  - interactive-worksheet-testing

# code-reviewer loads ONLY review-related skills
skills:
  - coding-standards
  - security-review
```

This keeps each agent's context focused and avoids wasting tokens on irrelevant guidance.

---

## 9. Hooks + Agents Integration

### 9.1 SubagentStart Hook — Agent Lifecycle Logging

```json
{
  "SubagentStart": [{
    "hooks": [{
      "type": "command",
      "command": "node \"$CLAUDE_PROJECT_DIR/.claude/hooks/subagent-observer.js\"",
      "timeout": 5
    }]
  }]
}
```

Logs: which agent was spawned, when, for what task. Enables observability.

### 9.2 SubagentStop Hook — Quality Verification

```json
{
  "SubagentStop": [{
    "matcher": "playwright-test-generator",
    "hooks": [{
      "type": "command",
      "command": "npx tsc --noEmit"
    }]
  }]
}
```

When test-generator finishes, verify generated tests compile.

### 9.3 TaskCompleted Hook — Prevent Premature Completion

```json
{
  "TaskCompleted": [{
    "hooks": [{
      "type": "command",
      "command": "node \"$CLAUDE_PROJECT_DIR/.claude/hooks/task-completed-gate.js\"",
      "timeout": 120
    }]
  }]
}
```

Before any task is marked complete, run relevant tests.

### 9.4 Agent-Scoped Hooks (in frontmatter)

```yaml
---
name: refactor-cleaner
hooks:
  Stop:
    - hooks:
        - type: command
          command: "npx tsc --noEmit && npm run lint"
---
```

When this specific agent finishes, verify no type/lint errors introduced. The `Stop` hook in agent frontmatter auto-converts to `SubagentStop`.

---

## 10. Implementation Plan

### Phase A: Agent Upgrades (Highest Impact, Lowest Risk)

Add frontmatter fields to all 9 existing agents. No behavior change — just enabling new capabilities.

| Step | Agent | Changes |
|------|-------|---------|
| 1 | worksheet-quality-assessor | Add `memory: project`, `maxTurns: 100`, `skills: [worksheet-quality-criteria]` |
| 2 | playwright-test-healer | Add `memory: project`, `maxTurns: 50`, `skills: [e2e-test-patterns, interactive-worksheet-testing]`, `disallowedTools: Write` |
| 3 | playwright-test-planner | Add `maxTurns: 30`, `skills: [e2e-test-patterns, interactive-worksheet-testing]` |
| 4 | playwright-test-generator | Add `maxTurns: 30`, `skills: [e2e-test-patterns, interactive-worksheet-testing]` |
| 5 | code-reviewer | Add `memory: project`, `maxTurns: 20`, `skills: [coding-standards, security-review]` |
| 6 | planner | Add `maxTurns: 15`, `skills: [coding-standards]`, `disallowedTools: Write, Edit, Bash` |
| 7 | refactor-cleaner | Add `maxTurns: 30`, `skills: [coding-standards, verification-loop]` |
| 8 | tdd-guide | Add `maxTurns: 40`, `skills: [verification-loop, e2e-test-patterns]` |
| 9 | security-reviewer | Add `maxTurns: 15`, `model: haiku` |

### Phase B: Skill Upgrades (Medium Impact)

Add YAML frontmatter to all 8 existing skills.

| Step | Skill | Key Additions |
|------|-------|--------------|
| 1 | worksheet-generation | `name`, `description`, `argument-hint`, `allowed-tools` |
| 2 | interactive-worksheet-testing | `name`, `description`, `argument-hint` |
| 3 | e2e-test-patterns | `name`, `description`, `user-invocable: false` |
| 4 | coding-standards | `name`, `description`, `user-invocable: false` |
| 5 | deployment-checklist | `name`, `description` |
| 6 | verification-loop | `name`, `description`, `user-invocable: false` |
| 7 | worksheet-quality-criteria | `name`, `description`, `user-invocable: false` |
| 8 | security-review | `name`, `description` |

### Phase C: New Agents (High Impact)

| Step | Agent | Priority | Reason |
|------|-------|----------|--------|
| 1 | build-error-resolver | HIGH | Immediate value — Stop hook can trigger it |
| 2 | deploy-verifier | HIGH | Safety for Phase 2 hooks |
| 3 | night-worker-coordinator | HIGH | Foundation for Phase 3 |
| 4 | db-migration-expert | MEDIUM | Safety for database operations |

### Phase D: New Skills (Medium Impact)

| Step | Skill | Priority |
|------|-------|----------|
| 1 | supabase-best-practices | HIGH |
| 2 | dispatching-agents | HIGH |
| 3 | improvement-loop | MEDIUM |

### Phase E: Hooks Integration

| Step | Hook | Purpose |
|------|------|---------|
| 1 | SubagentStart/Stop observer | Lifecycle logging |
| 2 | TaskCompleted gate | Quality verification |
| 3 | Agent-scoped hooks | Per-agent quality gates |

---

## Appendix A: Agent Memory File Structure

After implementing persistent memory, agents will create:

```
.claude/agent-memory/
  code-reviewer/
    MEMORY.md              # Auto-loaded (first 200 lines)
    patterns.md            # Common codebase patterns
    previous-reviews.md    # Summary of past reviews
  playwright-test-healer/
    MEMORY.md
    failure-patterns.md    # Common test failures and fixes
    selector-changes.md    # Selector evolution history
  worksheet-quality-assessor/
    MEMORY.md
    quality-patterns.md    # Common quality issues
    fix-strategies.md      # What fixes work for what issues
    year-group-insights.md # Per-year-group observations
```

## Appendix B: Complete Agent Inventory (After Implementation)

| Agent | Model | Memory | MaxTurns | Skills |
|-------|-------|--------|----------|--------|
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
| **night-worker-coordinator** | sonnet | project | 200 | verification-loop |

## Appendix C: Complete Skill Inventory (After Implementation)

| Skill | Auto-Invoke | User-Invoke | Preloaded By |
|-------|------------|-------------|-------------|
| worksheet-generation | Yes | Yes | — |
| interactive-worksheet-testing | Yes | Yes | test-planner, test-generator, test-healer |
| e2e-test-patterns | Yes (Claude-only) | No | test-planner, test-generator, test-healer, tdd-guide |
| coding-standards | Yes (Claude-only) | No | code-reviewer, planner, refactor-cleaner, build-error-resolver |
| deployment-checklist | Yes | Yes | deploy-verifier |
| verification-loop | Yes (Claude-only) | No | refactor-cleaner, tdd-guide, build-error-resolver, night-worker |
| worksheet-quality-criteria | Yes (Claude-only) | No | worksheet-quality-assessor |
| security-review | Yes | Yes | code-reviewer |
| **supabase-best-practices** | Yes (Claude-only) | No | db-migration-expert |
| **dispatching-agents** | Yes (Claude-only) | No | night-worker-coordinator |
| **improvement-loop** | No (user-only) | Yes | — |
