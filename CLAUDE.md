# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Skills
- **Worksheet Generation**: See `.claude/skills/worksheet-generation.md` for generating worksheets from prompts, previewing, and saving to library

## Claude Memories

- yolo
- For all Supabase queries, use `npx supabase` (Supabase CLI v2.54.11 available via npx)
- **Supabase CLI Authentication**: User runs `npx supabase login` in their own terminal (Option 1). Token is stored locally at ~/.supabase/access-token and persists across sessions. Claude Code can then use all supabase CLI commands without re-authentication.
- For all Playwright queries, use `playwright` CLI (global CLI)
- **ImageKit MCP Server**: Installed at user scope (mcp__imagekit__* tools available for CDN uploads, folder management, and URL transformations)
- When port 3000 is already in use, kill the existing process using that port first, then restart the dev server on port 3000, if 3000 is in use then kill it first and then always run server on port 3000
- use dev environment only
-  rm -rf .next to clean trace file, which may have permission issue
- before build or clean operation,make usre that already available ports starting from 3000 to 3005 are killed, if they are there
- **E2E Tests Strategy**: NO screenshots in E2E tests - only functional testing. Videos are recorded automatically on failure. Focus on element visibility and functionality, not visual regression. E2E tests MUST test actual button functionality (clicks, navigation, state changes) - not just element visibility.
- **Playwright Agent Workflow**: ALWAYS use the appropriate Playwright agents in this order:
  1. **playwright-test-planner**: First, use this to explore the app and create comprehensive test scenarios/plans
  2. **playwright-test-generator**: Then, use this to automatically generate and validate the test code from the plan
  3. **playwright-test-healer**: If tests fail, use this to debug and fix the issues automatically
  - DO NOT manually write test code when these agents can do it better and faster
  - The agents understand the app structure, selectors, and patterns better than manual coding

## Production Deployment (Two-Step Process)
- **Step 1: Vercel Deployment** (`vercel --prod`) - Deploys the **code/app** to production (frontend, API routes)
- **Step 2: Database Promotion** (`npm run db:promote`) - Copies **worksheet data** from DEV → PROD Supabase database
- These are TWO SEPARATE things:
  - **Vercel** = Application code (Next.js app, API routes, UI)
  - **Supabase** = Database content (worksheets, user data)
- Always run Vercel deployment first, then promote database data
- The `db:promote` script backs up PROD before copying, asks for confirmation, and only copies NEW worksheets (by slug)

## Core E2E Tests (Simplified Strategy)
- Run all E2E tests: npx playwright test tests/e2e/
- Run core authentication flows: npx playwright test new-user-flow.spec.ts
- Run name lists tests: npx playwright test name-lists.spec.ts
- Tests run only on chromium-desktop for speed and simplicity
- Kill ports before testing: npx kill-port 3000 && npx kill-port 3001 and check untill 3010 and kill if availble

## Interactive Worksheet Tests
- **Prompt Guide**: See `.claude/prompts/interactive-worksheet-test-prompt.md` for comprehensive test generation instructions
- **Test Command**: When user says "create interactive test for {url}", use the playwright-test-healer agent with the prompt guide
- **Answer Extraction**: Parse answers from worksheet `html_content` field in Supabase using regex: `/<p><strong>(\d+)\.<\/strong>\s*(.+?)<\/p>/g`
- **File Naming**: `tests/e2e/interactive-{worksheet-slug}.spec.ts`
- **Success Criteria**: Test must achieve 100% score by filling correct answers
- **Cookie Consent**: ALWAYS remove `.cookie-consent-container` before clicking buttons
- **Input Filling**: Use `pressSequentially(answer, { delay: 50 })` for React controlled inputs
- **Generic Test**: `tests/e2e/interactive-worksheet-generic.spec.ts` can be used with `WORKSHEET_SLUG` env var

## Prompt Engineering Automation (Story Engine 1.1-1.3)
- **Complete automation available**: `npm run prompt-automation` (requires GEMINI_API_KEY). pick gemni api key from .env.local
- **System implemented**: Full 6-phase workflow (Baseline → Golden Reference → Variant Testing → A/B Testing → Quality Gates → Reporting)
- **Default config**: Year 3 Addition (year3-addition-standard-average-5q)
- **Custom configs**: Use `CONFIG_ID=<config> npm run prompt-automation`
- **Available variants**: baseline, enhanced-v1, enhanced-v2
- **Statistical analysis**: 5 iterations default, t-tests, p-values, effect sizes
- **Quality assessment**: 3D scoring (Visual 30%, Content 40%, Layout 30%)
- **Output location**: ./prompt-engineering-results/session_TIMESTAMP/
- **Cross-platform scripts**: Node.js (.js), PowerShell (.ps1), Bash (.sh)
- **Documentation**: scripts/AUTOMATION-QUICKSTART.md and docs/prompt-engineering-guide.md
  
- ./scripts/sequential-baseline-generation.sh to run sequential baseline generation
- when I say run agent then run claude claude agent worksheet-quality-assessor.md under claude\agents
- whenever you are going to create a new js file for worksheet-quality-assessor agent then first ask get confirmation and tell why it can not be done via  autonomous-worksheet-quality-agent.js to help keeping the path straight and unambigous.
- Always use the worksheet-quality-assessor  agent for test. do not fallback to simpler testing.
- when I say run agent then it should default 3 worksheets(iterations) per cycle and two cycles
- when I say run paralell agent then run batch-paralell-agent and show html report with screenshots after worksheet vision assessment in the same agent and open final html with screenshots and assessment using chrome
- **Screenshot workflow (snip)**: When user says "snip", automatically run `powershell -ExecutionPolicy Bypass -File save-snip.ps1` to save clipboard screenshot as latest-snip.png, then immediately read and display the image. User workflow: Win+Shift+S → take screenshot → type "snip" to Claude.

## Worksheet Vision Assessment (CRITICAL - STRICT CRITERIA)
- **When user says "assess worksheets"**: Apply STRICT criteria from `scripts/STRICT-VISION-ASSESSMENT-CRITERIA.md`
- **Zero-tolerance policy**: ANY broken images, identical objects in comparisons, or missing questions = AUTOMATIC FAIL
- **Critical checks**:
  1. ALL images must load correctly (no broken/placeholder/empty boxes)
  2. Comparison questions MUST have OBVIOUS visual differences (30-50%+ size difference)
  3. ALL expected questions must be visible (no cut-off/missing content)
  4. For Reception (4-5 years): Visual differences must be immediately apparent
- **Scoring**: Production Ready = Score ≥95 AND zero critical issues
- **Auto-fail caps**:
  - Any broken images: Max score 65
  - Missing questions: Max score = (% visible × 100)
  - Unanswerable comparisons (identical objects): Max score 40
- **Always check**: Can a 4-year-old answer this question by LOOKING at the images?
- **When in doubt**: FAIL it. Quality > Quantity.

## Worksheet Auto Assessment Agent (Two-Stage Quality Scanner)
- **TRIGGER PHRASES**:
  - `auto assessment reception` - Scan all Reception mixed layout worksheets
  - `auto assessment year1` - Scan all Year 1 mixed layout worksheets
  - `auto assessment year2` - Scan all Year 2 mixed layout worksheets
  - `approve fixes` - Proceed to Stage 2 (fix identified issues)
  - `export learnings` - Export learnings to worksheet-population-from-scratch.md
- **Two-Stage Workflow**:
  - **Stage 1**: Scan → Assess → Generate Report (Pass/Fail with issues) → Request Approval
  - **Stage 2**: Fix issues (only after approval)
- **Assessment Criteria**:
  - AUTO-FAIL: Broken images, empty answer keys, mismatched question counts
  - CRITICAL: Cross-out marks (any X marks), answer clues, split visual representations
  - DIFFICULTY: Q5 complexity check (Reception: 2 steps max with guidance)
  - VISUAL: Image size, layout clarity, contrast
- **Child Simulation**: Each question tested from age-appropriate child perspective
- **Key Learnings**: Stored in `worksheet-quality-learnings.json`, accumulated across sessions
- **Post-Assessment**: Show learnings summary, ask permission before exporting to documentation
- **Prompt Location**: See full assessment criteria in this conversation or `.claude/prompts/worksheet-quality-assessment-prompt.md`

## Worksheet Library Implementation (AUTONOMOUS STRATEGY)
- **TRIGGER PHRASE**: When user types `execute complete implementation guide`, Claude Code autonomously implements COMPLETE-IMPLEMENTATION-GUIDE.md
- **Strategy Document**: LIBRARY-IMPLEMENTATION-STRATEGY.md (comprehensive autonomous workflow)
- **Progress Tracking**: LIBRARY-IMPLEMENTATION-PROGRESS.md (auto-updated each phase)
- **7 Mandatory Checkpoints**: Claude Code pauses for user review after each phase
- **Full Autonomy**: Claude Code makes all technical decisions, user only approves checkpoints
- **Phase-Based**: Database → Services → API → UI → Admin → SEO → Testing
- **Git Branching Strategy (Stacked Branches)**:
  - Base branch: `feature/worksheet-library` (created on first run)
  - Phase branches: `feature/library-phase-N-description` (one per phase)
  - Merge flow: Phase branch → Base branch (at each checkpoint)
  - Final merge: Base branch → master (after checkpoint 7)
  - Safety tags: `checkpoint-N-phase-name` (created at each checkpoint)
  - Rollback: `git reset --hard checkpoint-N-phase-name` on base branch
- **Quality Gates**: Unit tests → Integration tests → E2E tests → Code review
- **User Commands**:
  - `execute complete implementation guide` - Start/resume autonomous implementation
  - `continue to phase N` - Approve checkpoint and proceed
  - `show progress` - Display current phase status
  - `pause implementation` - Save progress and create checkpoint
- **Multi-Session Safe**: Can pause/resume at any of 7 checkpoints across multiple days
- **Testing Strategy**: Test after every phase before moving forward
- **Region Field**: All worksheets default to region='UK' for MVP (future-proof for US/AU expansion)

 # Run ALL 54 configurations (complete library generation)- use playwright healer agent
  npx playwright test tests/e2e/comprehensive-library-save.spec.ts

  # Run SMOKE tests (3 quick tests - 1 per year group)
  npx playwright test tests/e2e/comprehensive-library-save.spec.ts --grep "SMOKE"

  # Run specific year group only
  npx playwright test tests/e2e/comprehensive-library-save.spec.ts --grep "Reception"  # 15 tests
  npx playwright test tests/e2e/comprehensive-library-save.spec.ts --grep "Year 1"    # 13 tests
  npx playwright test tests/e2e/comprehensive-library-save.spec.ts --grep "Year 2"    # 26 tests
Use `docs/populate-worksheet-from-scratch.md` to populate library.