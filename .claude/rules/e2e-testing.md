---
paths:
  - "tests/e2e/**/*.ts"
  - "tests/e2e/**/*.spec.ts"
---

# E2E Testing Rules

- Use `fill(answer)` not `pressSequentially()` for test inputs
- ALWAYS remove `.cookie-consent-container` before clicking buttons
- NO screenshots in tests — only functional testing. Videos recorded on failure.
- Tests MUST verify actual button functionality (clicks, navigation, state changes), not just visibility
- Standard flags: `--project=chromium-desktop --workers=4 --timeout=30000`
- Use Playwright agents in order: planner -> generator -> healer. NEVER write test code manually.
- Cookie consent MUST be dismissed in every test
- Success criteria: test must achieve 100% score by filling correct answers
