# Autonomous Worksheet Quality Agent - Quick Start Guide

## Overview

The **Autonomous Worksheet Quality Agent** is a self-running Playwright-based testing system that:
- ✅ Opens a **visible browser window** (you can watch it work!)
- ✅ Automatically generates worksheets through the UI
- ✅ Performs comprehensive quality assessment
- ✅ Runs multiple improvement cycles
- ✅ Provides production readiness verdict
- ✅ Saves screenshots and detailed reports

---

## Quick Start

### Basic Usage

```bash
# Navigate to project directory
cd M:\ClaudeCodeProjects\worksheetgenerator-ai

# Ensure dev server is running (in another terminal)
npm run dev

# Run the agent (1 cycle = 5 worksheets)
node scripts/autonomous-worksheet-quality-agent.js reception-counting-to-10 1
```

### What You'll See

1. **Console Output**:
   ```
   🤖 AUTONOMOUS WORKSHEET QUALITY AGENT
   ================================================================================

   📋 Configuration: reception-counting-to-10
   🔄 Max Cycles: 1
   📊 Iterations Per Cycle: 5
   🎯 Production Ready Threshold: 90%

   ⏳ Waiting for server at http://localhost:3000...
   ✅ Server is ready!

   🚀 STARTING AUTONOMOUS QUALITY IMPROVEMENT LOOP

   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   🔄 CYCLE 1/1
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

   📊 Running quality assessment (5 iterations)...

     📄 Iteration 1/5...
       ✅ Score: 90/100 | P0: 0 | Status: PASS
     📄 Iteration 2/5...
       ✅ Score: 85/100 | P0: 0 | Status: PASS
     ...
   ```

2. **Browser Window Opens**:
   - Chrome/Chromium window appears
   - You see the dashboard loading
   - Dropdowns being selected automatically
   - "Generate Worksheet" button clicked
   - Worksheet appears
   - Process repeats 5 times

3. **Files Created**:
   ```
   worksheet-quality-reports/autonomous-sessions/reception-counting-to-10-2025-10-12.../
   ├── cycle-1-results.json
   ├── cycle-1-screenshots/
   │   ├── iter-1-01-config.png
   │   ├── iter-1-02-ready.png
   │   ├── iter-1-03-worksheet.png
   │   ├── iter-2-01-config.png
   │   ... (15 screenshots total)
   ├── FINAL-REPORT.json
   └── FINAL-REPORT.md
   ```

---

## Available Configurations

The agent supports these pre-configured worksheet types:

| Config Name | Year Group | Topic | Subtopic | Number Range |
|-------------|-----------|-------|----------|--------------|
| `reception-counting-to-10` | Reception | Number and Counting | Counting to 10 | 1-10 |
| `reception-counting-to-5` | Reception | Number and Counting | Counting to 5 | 1-5 |
| `year3-addition-standard` | Year 3 | Addition | Standard | 1-100 |

### Usage Examples

```bash
# Reception - Counting to 10 (3 cycles)
node scripts/autonomous-worksheet-quality-agent.js reception-counting-to-10 3

# Reception - Counting to 5 (single cycle)
node scripts/autonomous-worksheet-quality-agent.js reception-counting-to-5 1

# Year 3 Addition (default 10 cycles)
node scripts/autonomous-worksheet-quality-agent.js year3-addition-standard
```

---

## Command Syntax

```bash
node scripts/autonomous-worksheet-quality-agent.js <config-name> [max-cycles]
```

**Parameters**:
- `<config-name>` (required): One of the configurations listed above
- `[max-cycles]` (optional): Number of improvement cycles (default: 10)
  - Each cycle runs 5 worksheet iterations
  - Agent exits early if production-ready achieved

---

## Understanding the Output

### Quality Scores

Each worksheet is scored 0-100 based on:

| Dimension | Weight | Description |
|-----------|--------|-------------|
| **Question Count** | 30 points | Must match configured count exactly |
| **Number Range** | 30 points | All numbers within allowed range |
| **Object Diversity** | 20 points | No repeated objects in questions |
| **Collection Diversity** | 20 points | Different image collections used |

### Quality Gates

**P0 (Blocker)**: Critical failures that prevent production
- Wrong question count
- Numbers outside allowed range

**P1 (Warning)**: Issues that reduce quality
- Object repetition
- Low diversity

**P2 (Info)**: Minor improvements suggested
- Collection diversity could be better

### Production Ready Criteria

✅ **Production Ready** when ALL of these are true:
- Pass Rate ≥ 90% (at least 4.5 out of 5 iterations pass)
- Zero P0 failures
- All worksheets generated successfully
- Average score ≥ 80/100

---

## Multi-Cycle Improvement Loop

### How It Works

```
Cycle 1: Generate 5 worksheets → Assess quality → Detect issues → Log fixes needed
                                                                      ↓
Cycle 2: Generate 5 worksheets → Assess quality → Check improvement ─┤
                                                                      ↓
Cycle 3: Generate 5 worksheets → Assess quality → Production ready? YES → Exit
```

### Example Output

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔄 CYCLE 1/3
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Running quality assessment (5 iterations)...

  📄 Iteration 1/5...
    ✅ Score: 90/100 | P0: 0 | Status: PASS
  📄 Iteration 2/5...
    ⚠️ Score: 70/100 | P0: 1 | Status: FAIL
  📄 Iteration 3/5...
    ✅ Score: 85/100 | P0: 0 | Status: PASS
  📄 Iteration 4/5...
    ✅ Score: 90/100 | P0: 0 | Status: PASS
  📄 Iteration 5/5...
    ✅ Score: 80/100 | P0: 0 | Status: PASS

🔍 Analyzing results...

  📊 Pass Rate: 80.0% (target: 90.0%)
  🚨 P0 Failures: 1 (target: 0)
  ⚠️  P1 Failures: 2
  📈 Avg Score: 83.0/100
  ✅ Production Ready: NO

🔧 Detecting and fixing issues...

  ❌ [NUMBER_RANGE] 1 iterations violated number range - prompt needs stronger constraints

✅ Applied 1 fix(es). Re-testing in next cycle...
```

---

## Final Report

After all cycles complete, you'll see:

```
================================================================================
📊 FINAL REPORT
================================================================================

📄 Final report saved:

   JSON: M:\...\FINAL-REPORT.json
   Markdown: M:\...\FINAL-REPORT.md


🎯 PRODUCTION READY: ✅ YES

📊 Performance:
   • Total Cycles: 2
   • Fixes Applied: 1
   • Final Pass Rate: 100.0%
   • Pass Rate Improvement: +20.0%
   • Final P0 Failures: 0

🔧 Fixes Applied:
   1. [NUMBER_RANGE] 1 iterations violated number range - prompt needs stronger constraints

✅ Configuration is PRODUCTION READY. Deploy with confidence!
```

---

## Viewing Results

### Screenshots

Screenshots are automatically saved for each iteration:

```
cycle-1-screenshots/
├── iter-1-01-config.png    ← Configuration screen before generation
├── iter-1-02-ready.png     ← Ready to generate (all fields selected)
├── iter-1-03-worksheet.png ← Generated worksheet (full page)
├── iter-2-01-config.png
... (3 screenshots × 5 iterations = 15 per cycle)
```

### JSON Report

```json
{
  "sessionId": "reception-counting-to-10-2025-10-12T21-15-30-123Z",
  "config": "reception-counting-to-10",
  "totalCycles": 2,
  "productionReady": true,
  "cycleHistory": [
    {
      "cycle": 1,
      "analysis": {
        "passRate": 0.8,
        "p0Failures": 1,
        "avgScore": 83.0
      }
    },
    {
      "cycle": 2,
      "analysis": {
        "passRate": 1.0,
        "p0Failures": 0,
        "avgScore": 90.0
      }
    }
  ],
  "fixesApplied": [...]
}
```

### Markdown Report

The markdown report (`FINAL-REPORT.md`) includes:
- Executive summary
- Cycle-by-cycle breakdown table
- All fixes applied with details
- Production readiness verdict
- Recommendations

---

## Troubleshooting

### Issue: "Server not ready"

**Solution**: Start the dev server first
```bash
# Terminal 1: Start server
npm run dev

# Terminal 2: Run agent
node scripts/autonomous-worksheet-quality-agent.js reception-counting-to-10 1
```

### Issue: "Unknown configuration"

**Error**: `❌ Error: Unknown configuration "reception-counting"`

**Solution**: Use exact config name
```bash
# ❌ Wrong
node scripts/autonomous-worksheet-quality-agent.js reception-counting

# ✅ Correct
node scripts/autonomous-worksheet-quality-agent.js reception-counting-to-10
```

### Issue: Browser not visible

The script is configured with `headless: false` (line 84), so the browser should be visible.

**If you want headless mode** (no browser window):
1. Edit `scripts/autonomous-worksheet-quality-agent.js`
2. Change line 84: `HEADLESS: false,` → `HEADLESS: true,`

### Issue: Timeout errors

**Error**: `page.click: Timeout 30000ms exceeded`

**Possible causes**:
- Server not fully loaded
- UI elements changed
- Network slow

**Solutions**:
- Wait for server to be fully ready before running
- Increase timeout in script (line 85: `TIMEOUT: 120000`)
- Check if dashboard UI matches expected selectors

---

## Advanced Usage

### Adding New Configurations

Edit `scripts/autonomous-worksheet-quality-agent.js`, lines 38-63:

```javascript
const CONFIG_MAP = {
  // Add your configuration here
  'year4-subtraction': {
    yearGroup: 'Year 4',
    topic: 'Subtraction',
    subtopic: 'Standard',
    difficulty: 'average',
    questionCount: 5,
    allowedNumberRange: [1, 100]
  },

  // Existing configs...
  'reception-counting-to-10': { ... }
};
```

Then use it:
```bash
node scripts/autonomous-worksheet-quality-agent.js year4-subtraction 3
```

### Customizing Thresholds

Edit the `AGENT_CONFIG` object (lines 78-86):

```javascript
const AGENT_CONFIG = {
  MAX_CYCLES,                        // From command line
  ITERATIONS_PER_CYCLE: 5,           // Change to 3, 10, etc.
  PRODUCTION_READY_THRESHOLD: 0.90,  // 90% pass rate (change to 0.80 for 80%)
  MAX_P0_FAILURES: 0,                // Zero tolerance for P0 (change to allow some)
  BASE_URL: 'http://localhost:3000',
  HEADLESS: false,                   // true = no browser window
  TIMEOUT: 120000                    // 2 minutes (increase if needed)
};
```

---

## Comparison with Other Scripts

| Feature | `autonomous-worksheet-quality-agent.js` (NEW) | `autonomous-reception-qa.js` (OLD) | `reception-counting-qa-5-iterations.js` (API-only) |
|---------|----------------------------------------------|-----------------------------------|---------------------------------------------------|
| **Playwright UI** | ✅ YES (visible) | ✅ YES (visible) | ❌ NO (API only) |
| **Multi-Cycle** | ✅ 1-10 cycles | ❌ Single run | ❌ Single run |
| **Configurable** | ✅ Multiple configs | ❌ Reception only | ❌ Reception only |
| **Production Ready** | ✅ YES | ❌ NO | ❌ NO |
| **Self-Healing** | ✅ Logs fixes | ❌ NO | ❌ NO |
| **Screenshots** | ✅ YES | ✅ YES | ❌ NO |

**Recommendation**: Use the **new** `autonomous-worksheet-quality-agent.js` for all testing going forward.

---

## Integration with Claude Code Agent

The `worksheet-quality-assessor` Claude Code agent can now use this script properly!

When you run:
```
execute claude agent
> 4-Generate a Reception level worksheet for counting to 10
```

The agent **should** invoke:
```bash
node scripts/autonomous-worksheet-quality-agent.js reception-counting-to-10 5
```

And you'll see:
- ✅ Playwright browser opens (visible!)
- ✅ 5 cycles of quality assessment
- ✅ Comprehensive final report
- ✅ Production readiness verdict

---

## Best Practices

### 1. **Start with 1 Cycle for Quick Tests**
```bash
node scripts/autonomous-worksheet-quality-agent.js reception-counting-to-10 1
```
- Fast feedback (5 worksheets only)
- Good for verifying script works
- Use during development

### 2. **Use 3-5 Cycles for Quality Assurance**
```bash
node scripts/autonomous-worksheet-quality-agent.js reception-counting-to-10 3
```
- Catches intermittent issues
- Validates consistency
- Good for pre-deployment checks

### 3. **Use 10 Cycles for Production Validation**
```bash
node scripts/autonomous-worksheet-quality-agent.js reception-counting-to-10 10
```
- Comprehensive validation
- Statistical confidence
- Use before major releases

### 4. **Review Screenshots After Failures**
```
worksheet-quality-reports/autonomous-sessions/<session>/cycle-1-screenshots/
```
- Check `iter-X-error.png` for failures
- Verify UI state when issues occur
- Debug configuration problems

### 5. **Monitor Pass Rates Across Cycles**

Look for improvement trends:
```
Cycle 1: 60% pass rate → Issues detected
Cycle 2: 80% pass rate → Improvement
Cycle 3: 100% pass rate → Production ready! 🎉
```

---

## Exit Codes

The script exits with different codes for automation:

- **Exit 0**: Production ready (all quality gates passed)
- **Exit 1**: Not production ready (failed quality gates)

Use in CI/CD:
```bash
#!/bin/bash
node scripts/autonomous-worksheet-quality-agent.js reception-counting-to-10 3

if [ $? -eq 0 ]; then
  echo "✅ Production ready - deploying..."
  # Deploy commands here
else
  echo "❌ Quality gates failed - blocking deployment"
  exit 1
fi
```

---

## FAQ

### Q: How long does it take?

**A**: Approximately:
- 1 cycle (5 worksheets): 2-5 minutes
- 3 cycles (15 worksheets): 6-15 minutes
- 10 cycles (50 worksheets): 20-50 minutes

Depends on worksheet complexity and server performance.

### Q: Can I run it headless (no browser window)?

**A**: Yes! Edit the script:
```javascript
// Line 84
HEADLESS: true,  // Changed from false
```

### Q: What if I want more than 5 iterations per cycle?

**A**: Edit the script:
```javascript
// Line 80
ITERATIONS_PER_CYCLE: 10,  // Changed from 5
```

### Q: Can I test multiple configurations in one run?

**A**: Yes, with a bash script:
```bash
#!/bin/bash
for config in reception-counting-to-10 reception-counting-to-5 year3-addition-standard
do
  echo "Testing $config..."
  node scripts/autonomous-worksheet-quality-agent.js $config 3
done
```

### Q: Where are the generated worksheet HTML files?

**A**: They're **not** saved by default (only screenshots). To save HTML, you'd need to modify the script at line 420 to add:

```javascript
// After line 420
fs.writeFileSync(
  path.join(screenshotDir, `iter-${iterationNumber}-worksheet.html`),
  html
);
```

---

## Next Steps

After running the agent:

1. **✅ Review FINAL-REPORT.md**
   - Check production readiness verdict
   - Read recommendations

2. **📸 Check Screenshots**
   - Verify visual quality
   - Look for UI issues

3. **📊 Analyze Quality Scores**
   - Identify weak areas
   - Plan improvements

4. **🔧 Apply Fixes**
   - Address logged issues
   - Re-run agent to verify

5. **🚀 Deploy When Ready**
   - Exit code 0 = safe to deploy
   - All quality gates passed

---

## Support

For issues or questions:
- Check this guide first
- Review the `AUTONOMOUS-QUALITY-AGENT.md` documentation
- Check error screenshots in session directory
- Verify server is running on port 3000

---

**Last Updated**: 2025-10-12
**Version**: 1.0.0
**Script**: `scripts/autonomous-worksheet-quality-agent.js`
