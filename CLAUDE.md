# Worksheet Generator AI

Next.js 14 educational worksheet generator. Supabase backend, Vercel deployment, Playwright E2E testing.

## Commands
- `npm run dev` — Dev server (always port 3000; kill ports 3000-3010 first if occupied)
- `npx supabase` — All Supabase CLI operations (v2.54.11, auth persists at ~/.supabase/access-token)
- `npx playwright test tests/e2e/` — All E2E tests (chromium-desktop only)
- `npx playwright test tests/e2e/interactive/{year-group}/` — Interactive tests per year group
- `rm -rf .next` — Clean build cache (may need elevated permissions)

## Environment
- **Dev only** — never target production database directly
- Kill ports 3000-3010 before build/clean/dev operations
- ImageKit MCP available (`mcp__imagekit__*` tools for CDN)

## Testing (491 tests across 6 year groups)
- Standard flags: `--project=chromium-desktop --workers=4 --timeout=30000`
- Use Playwright agents in order: **planner -> generator -> healer** (never write tests manually)
- Use `fill(answer)` not `pressSequentially()` for inputs
- ALWAYS remove `.cookie-consent-container` before clicking buttons
- Tests MUST verify functionality (clicks, navigation, state), not just visibility
- NO screenshots — only functional testing; videos recorded on failure
- File pattern: `tests/e2e/interactive/{year-group}/{worksheet-slug}.spec.ts`

## Deployment (Two Steps)
1. `vercel --prod` — Deploy code/app to Vercel
2. `npm run db:promote` — Copy worksheet data DEV -> PROD (backs up PROD first, copies only NEW worksheets by slug)
- Always deploy code first, then promote data

## Key Documents
| Document | Purpose |
|----------|---------|
| `docs/interactive-test-coverage-plan.md` | E2E test coverage tracking (SINGLE SOURCE OF TRUTH) |
| `docs/populate-worksheet-from-scratch.md` | Worksheet population guide and progress |
| `docs/optimal-hooks-skills-agents-subagents-workflow.md` | Hooks, agents, skills architecture (SINGLE SOURCE OF TRUTH) |

## Agent Defaults
- `run agent` — worksheet-quality-assessor: 3 worksheets/cycle, 2 cycles
- `run parallel agent` — batch-parallel-agent with HTML report + screenshots, open in Chrome
- Always use worksheet-quality-assessor agent for quality testing (never fall back to simpler testing)
- Before creating new JS for quality agent, confirm why it cannot use `autonomous-worksheet-quality-agent.js`

## Worksheet Quality (Zero-Tolerance)
- Broken images, identical comparison objects, or missing questions = AUTOMATIC FAIL
- Production ready = Score >= 95 AND zero critical issues
- Test: "Can a 4-year-old answer this by LOOKING at the images?"

## Path-Scoped Rules (loaded automatically)
- `.claude/rules/e2e-testing.md` — E2E test patterns (loads for `tests/e2e/**`)
- `.claude/rules/supabase.md` — Database safety rules (loads for `supabase/**`)
- `.claude/rules/worksheet-prompts.md` — Prompt engineering rules (loads for `src/lib/prompts/**`)
- `.claude/rules/nextjs-app.md` — Next.js conventions (loads for `src/app/**`)

## Skills & Commands (use /command to invoke)
- `/snip` — Capture clipboard screenshot
- `/assess` — Worksheet quality assessment
- `/deploy` — Two-step production deployment
- `/access-notebook` — Connect to NotebookLM
- `/test-year` — Run interactive tests by year group
- `/commit` — Smart git commit
- `/clean` — Clean environment (ports, cache, build artifacts)
