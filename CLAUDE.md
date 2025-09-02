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
## Core E2E Tests (Simplified Strategy)
- Run all E2E tests: npx playwright test tests/e2e/
- Run core authentication flows: npx playwright test user-authentication-flows.spec.ts new-user-flow-simple.spec.ts --project=chromium-desktop
- Run name lists tests: npx playwright test name-lists.spec.ts --project=chromium-desktop

- Mobile: add --project=chromium-mobile
- Kill ports before testing: npx kill-port 3000 && npx kill-port 3001
  