# Playwright Agents

This directory contains Playwright test automation agents that help with creating, generating, and maintaining E2E tests.

## Available Agents

### 1. 🟢 Planner Agent (`planner.md`)
**Purpose:** Create comprehensive test plans for web applications

**When to use:**
- When you need to explore and understand your application's functionality
- Before writing new test suites
- To identify test scenarios and edge cases

**How to use:**
```
Use the planner agent to create a test plan for [feature/page name]
```

The agent will:
- Navigate through your application
- Identify interactive elements and user flows
- Create detailed test scenarios with step-by-step instructions
- Generate comprehensive test documentation

---

### 2. 🔵 Generator Agent (`generator.md`)
**Purpose:** Automatically generate Playwright test code from test plans

**When to use:**
- After creating a test plan with the planner agent
- To convert manual test scenarios into automated tests
- To generate valid Playwright test syntax

**How to use:**
```
Use the generator agent to create tests from the plan in [file path]
```

The agent will:
- Read your test plan
- Generate Playwright test code with proper syntax
- Create valid test files with assertions
- Ensure tests follow best practices

---

### 3. 🟡 Healer Agent (`healer.md`)
**Purpose:** Debug and fix failing Playwright tests

**When to use:**
- When tests are failing
- To update tests after UI changes
- To fix selector issues or timing problems

**How to use:**
```
Use the healer agent to fix the failing test in [file path]
```

The agent will:
- Analyze test failures
- Navigate to the application to understand current state
- Update selectors and assertions
- Fix timing and synchronization issues

---

## Workflow

The recommended workflow for using these agents is:

```
1. Planner → 2. Generator → 3. Healer (if needed)
```

### Example Workflow:

#### Step 1: Plan
```
Use the planner agent to create a test plan for the worksheet library page
```

#### Step 2: Generate
```
Use the generator agent to create tests from the test plan
```

#### Step 3: Run Tests
```bash
npx playwright test
```

#### Step 4: Fix (if tests fail)
```
Use the healer agent to fix the failing library tests
```

---

## MCP Server Configuration

The Playwright MCP server is configured in `.mcp.json`:

```json
{
  "mcpServers": {
    "playwright-test": {
      "command": "npx",
      "args": ["playwright", "run-test-mcp-server"]
    }
  }
}
```

---

## Quick Commands

### Run all E2E tests:
```bash
npx playwright test tests/e2e/
```

### Run specific test file:
```bash
npx playwright test tests/e2e/[test-name].spec.ts
```

### Run tests in headed mode (see browser):
```bash
npx playwright test --headed
```

### Run tests on specific browser:
```bash
npx playwright test --project=chromium
```

### View test report:
```bash
npx playwright show-report
```

---

## Project Information

**Test Directory:** `/home/user/TeacherBuddy/tests/e2e/`

**Existing Tests:**
- `new-user-flow.spec.ts` - Core authentication flows
- `name-lists.spec.ts` - Name lists functionality
- `library-browse.spec.ts` - Library browsing
- `library-save.spec.ts` - Saving to library
- `library-generate-similar.spec.ts` - Generate similar worksheets
- `comprehensive-library-save.spec.ts` - Comprehensive library tests
- `test-worksheet-generation.spec.ts` - Worksheet generation

**Configuration:** `playwright.config.ts`

**Test Strategy:**
- Run only on chromium-desktop for speed
- NO screenshots in tests (functional testing only)
- Videos recorded automatically on failure
- Focus on actual functionality, not just element visibility

---

## Tips

1. **Always use agents in order** - Planner → Generator → Healer
2. **Let agents do the work** - They understand selectors and patterns better than manual coding
3. **Start the dev server first** - Ensure `npm run dev` is running before using agents
4. **Clear test plan** - The better your planner output, the better the generated tests
5. **Review generated code** - While agents are smart, always review the output

---

## Notes from CLAUDE.md

From the project's CLAUDE.md file:

> **Playwright Agent Workflow**: ALWAYS use the appropriate Playwright agents in this order:
> 1. **playwright-test-planner**: First, use this to explore the app and create comprehensive test scenarios/plans
> 2. **playwright-test-generator**: Then, use this to automatically generate and validate the test code from the plan
> 3. **playwright-test-healer**: If tests fail, use this to debug and fix the issues automatically
> - DO NOT manually write test code when these agents can do it better and faster
> - The agents understand the app structure, selectors, and patterns better than manual coding

---

## Installation Verification

✅ Playwright installed: v1.56.1
✅ MCP server configured: `.mcp.json`
✅ Agents installed: `.claude/agents/`
✅ Test directory exists: `tests/e2e/`

All components are ready to use!
