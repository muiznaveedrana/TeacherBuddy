# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Claude Memories

- yolo
- For all Supabase queries, use `supabase` CLI (global CLI)
- For all Playwright queries, use `playwright` CLI (global CLI)
- When port 3000 is already in use, kill the existing process using that port first, then restart the dev server on port 3000 (rather than moving to a new port) use "npx kill-port 3000" and kill 3001 if it is there as well
- use dev environment only
-  rm -rf .next to clean trace file, which may have permission issue
- before build or clean operation,make usre that already available ports starting from 3000 to 3005 are killed, if they are there
- **E2E Tests Strategy**: NO screenshots in E2E tests - only functional testing. Videos are recorded automatically on failure. Focus on element visibility and functionality, not visual regression. E2E tests MUST test actual button functionality (clicks, navigation, state changes) - not just element visibility.

## Core E2E Tests (Simplified Strategy)
- Run all E2E tests: npx playwright test tests/e2e/
- Run core authentication flows: npx playwright test new-user-flow.spec.ts
- Run name lists tests: npx playwright test name-lists.spec.ts
- Tests run only on chromium-desktop for speed and simplicity
- Kill ports before testing: npx kill-port 3000 && npx kill-port 3001 and check untill 3010 and kill if availble

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
