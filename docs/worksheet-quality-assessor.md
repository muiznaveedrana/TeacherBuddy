# Worksheet Quality Assessor Agent

This document provides guidance for the `worksheet-quality-assessor` Claude Code agent when generating and assessing worksheet quality.

---

## CRITICAL: Which Script to Use

**ALWAYS use this script for worksheet quality assessment:**

```bash
node scripts/autonomous-worksheet-quality-agent.js <config-name> [max-cycles]
```

### Script Purpose

- **`scripts/autonomous-worksheet-quality-agent.js`** ✅ **USE THIS**
  - Uses Playwright with **visible browser UI**
  - Multi-cycle quality improvement loop (1-10 cycles)
  - Automated screenshot capture
  - Comprehensive quality assessment with P0/P1/P2 gates
  - Production readiness verdict
  - Self-healing fix detection
  - Supports multiple configurations

### DO NOT Use These Scripts

- **`scripts/autonomous-reception-qa.js`** ❌ **DO NOT USE**
  - Reception-only, not configurable
  - Single-run only (no multi-cycle)
  - Legacy script, superseded by `autonomous-worksheet-quality-agent.js`

- **`scripts/reception-counting-qa-5-iterations.js`** ❌ **DO NOT USE**
  - API-only (no Playwright UI)
  - No browser window shown
  - No screenshots captured
  - Wrong testing approach for UI validation

---

## Usage Examples

### Basic Usage (Quick Test)

```bash
# Single cycle (5 worksheets) for quick validation
node scripts/autonomous-worksheet-quality-agent.js reception-counting-to-10 1
```

### Recommended Usage (Quality Assurance)

```bash
# 3-5 cycles for comprehensive assessment
node scripts/autonomous-worksheet-quality-agent.js reception-counting-to-10 3
```

### Production Validation

```bash
# 10 cycles for production-grade validation
node scripts/autonomous-worksheet-quality-agent.js reception-counting-to-10 10
```

---

## Available Configurations

| Config Name | Year Group | Topic | Subtopic | Number Range |
|-------------|-----------|-------|----------|--------------|
| `reception-counting-to-10` | Reception | Number and Counting | Counting to 10 | 1-10 |
| `reception-counting-to-5` | Reception | Number and Counting | Counting to 5 | 1-5 |
| `year3-addition-standard` | Year 3 | Addition | Standard | 1-100 |

---

## What to Expect

### 1. Console Output
- Real-time cycle progress
- Iteration-by-iteration quality scores
- P0/P1/P2 failure counts
- Pass rate tracking
- Production readiness assessment

### 2. Browser Window
- Chrome/Chromium opens visibly
- Automated dropdown selections
- Worksheet generation
- Full page screenshots captured

### 3. Generated Files
```
worksheet-quality-reports/autonomous-sessions/<session-id>/
├── cycle-1-results.json
├── cycle-1-screenshots/
│   ├── iter-1-01-config.png
│   ├── iter-1-02-ready.png
│   ├── iter-1-03-worksheet.png
│   └── ... (15 screenshots per cycle)
├── cycle-2-results.json
├── cycle-2-screenshots/
├── FINAL-REPORT.json
└── FINAL-REPORT.md
```

---

## Quality Gates

### P0 (Blocker) - Critical Failures
- Wrong question count
- Numbers outside allowed range
- **Must be 0 for production readiness**

### P1 (Warning) - Quality Issues
- Object repetition in questions
- Low diversity scores

### P2 (Info) - Minor Improvements
- Collection diversity suggestions

---

## Production Ready Criteria

✅ **Production Ready** when ALL of these are true:
- Pass Rate ≥ 90% (at least 4.5 out of 5 iterations pass)
- Zero P0 failures
- All worksheets generated successfully
- Average score ≥ 80/100

---

## Multi-Cycle Improvement Loop

The script runs multiple cycles, each with 5 worksheet iterations:

```
Cycle 1: Generate 5 worksheets → Assess quality → Detect issues → Log fixes needed
                                                                      ↓
Cycle 2: Generate 5 worksheets → Assess quality → Check improvement ─┤
                                                                      ↓
Cycle 3: Generate 5 worksheets → Assess quality → Production ready? YES → Exit
```

The agent exits early if production-ready criteria are met before reaching max cycles.

---

## Prerequisites

### 1. Server Must Be Running

Before running the script, ensure the dev server is running:

```bash
# Terminal 1: Start server
npm run dev

# Terminal 2: Run agent
node scripts/autonomous-worksheet-quality-agent.js reception-counting-to-10 1
```

### 2. Playwright Must Be Installed

```bash
npm install
npx playwright install
```

---

## Common Errors and Solutions

### Error: "Server not ready"

**Solution**: Start the dev server first
```bash
npm run dev
```

Wait until you see "Ready on http://localhost:3000" before running the agent.

### Error: "Unknown configuration"

**Solution**: Use exact config name
```bash
# ❌ Wrong
node scripts/autonomous-worksheet-quality-agent.js reception-counting

# ✅ Correct
node scripts/autonomous-worksheet-quality-agent.js reception-counting-to-10
```

### Error: Timeout waiting for selectors

**Possible causes:**
- Server not fully loaded
- UI elements changed
- Network slow

**Solutions:**
- Wait for server to be fully ready
- Increase timeout in script (line 85: `TIMEOUT: 120000`)
- Check if dashboard UI matches expected selectors

---

## Agent Behavior Guidelines

When the `worksheet-quality-assessor` agent is invoked:

### DO:
1. ✅ Use `scripts/autonomous-worksheet-quality-agent.js`
2. ✅ Start with 1 cycle for quick validation
3. ✅ Use 3-5 cycles for comprehensive assessment
4. ✅ Check that server is running before executing
5. ✅ Wait for script to complete all cycles
6. ✅ Review FINAL-REPORT.md for production readiness
7. ✅ Check screenshots for visual quality issues

### DON'T:
1. ❌ Use `autonomous-reception-qa.js` (legacy, Reception-only)
2. ❌ Use `reception-counting-qa-5-iterations.js` (API-only, no UI)
3. ❌ Create custom scripts when the standard one exists
4. ❌ Skip checking server status before running
5. ❌ Interrupt the script mid-cycle

---

## Example Agent Workflow

When a user requests: **"Generate a Reception level worksheet for counting to 10"**

The agent should execute:

```bash
# Step 1: Verify server is running
# (Check if http://localhost:3000 is accessible)

# Step 2: Run the autonomous agent with appropriate cycles
node scripts/autonomous-worksheet-quality-agent.js reception-counting-to-10 5

# Step 3: Wait for completion

# Step 4: Review results
# - Check FINAL-REPORT.md for production readiness
# - Review screenshots in the session directory
# - Report findings to user
```

---

## Output Interpretation

### Success Output Example

```
================================================================================
📊 FINAL REPORT
================================================================================

🎯 PRODUCTION READY: ✅ YES

📊 Performance:
   • Total Cycles: 2
   • Fixes Applied: 1
   • Final Pass Rate: 100.0%
   • Pass Rate Improvement: +20.0%
   • Final P0 Failures: 0

✅ Configuration is PRODUCTION READY. Deploy with confidence!
```

### Failure Output Example

```
================================================================================
📊 FINAL REPORT
================================================================================

🎯 PRODUCTION READY: ❌ NO

📊 Performance:
   • Total Cycles: 3
   • Fixes Applied: 2
   • Final Pass Rate: 70.0%
   • Pass Rate Improvement: +10.0%
   • Final P0 Failures: 1

❌ NOT production ready. Review cycle reports and fix critical issues.
```

---

## Related Documentation

- **Quick Start Guide**: `docs/AUTONOMOUS-AGENT-QUICKSTART.md`
- **Detailed Technical Guide**: `docs/AUTONOMOUS-QUALITY-AGENT.md`
- **Script Source**: `scripts/autonomous-worksheet-quality-agent.js`

---

## Troubleshooting

If the agent seems confused or uses the wrong script:

1. **Verify this documentation** - Ensure `docs/worksheet-quality-assessor.md` exists
2. **Check agent description** - Confirm it references this file
3. **Review error logs** - Check console output for script paths
4. **Validate server status** - Ensure dev server is running on port 3000
5. **Check screenshots** - Look at generated screenshots to see what happened

---

**Last Updated**: 2025-10-12
**Version**: 1.0.0
**Script**: `scripts/autonomous-worksheet-quality-agent.js`
