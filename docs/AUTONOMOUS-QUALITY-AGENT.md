# Autonomous Worksheet Quality Agent

## Overview

The **Autonomous Worksheet Quality Agent** is a self-healing, iterative quality assurance system that automatically:

1. **Generates** worksheets for a given configuration
2. **Assesses** quality against comprehensive gates (P0/P1/P2 priorities)
3. **Detects** failures (broken images, catalog mismatches, code errors)
4. **Fixes** issues automatically where possible
5. **Re-tests** until the configuration is production-ready

## Key Features

### 🤖 Fully Autonomous
- Runs end-to-end without human intervention
- Iterative improvement loop (up to 10 cycles by default)
- Exits automatically when production-ready or max cycles reached

### 🔧 Self-Healing
- **Catalog Fixes**: Automatically corrects collection priorities and curriculum topics
- **Image Mismatch Detection**: Identifies and fixes common catalog issues (e.g., football→sailor)
- **Error Logging**: Documents issues that require manual intervention

### 📊 Comprehensive Quality Assessment
- **P0 Gates**: Broken images, generation errors (MUST pass for production)
- **P1 Gates**: Question count accuracy, object count validation
- **P2 Gates**: Vocabulary diversity, layout structure

### 📈 Progress Tracking
- Cycle-by-cycle improvement metrics
- Pass rate monitoring
- P0/P1 failure tracking
- Detailed reports (JSON + Markdown)

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│          AUTONOMOUS WORKSHEET QUALITY AGENT                 │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
              ┌─────────────────────────┐
              │    CYCLE LOOP (1-10)    │
              └─────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
   ┌─────────┐       ┌─────────┐       ┌─────────┐
   │ GENERATE│       │ ASSESS  │       │  FIX    │
   │  (5x)   │  ───> │ QUALITY │  ───> │ ISSUES  │
   └─────────┘       └─────────┘       └─────────┘
        │                   │                   │
        │                   │                   │
        └───────────────────┴───────────────────┘
                            │
                            ▼
              ┌─────────────────────────┐
              │  PRODUCTION READY?      │
              │  - Pass Rate ≥ 90%      │
              │  - 0 P0 Failures        │
              │  - 0 Code Errors        │
              └─────────────────────────┘
                            │
                    ┌───────┴───────┐
                    │               │
                  YES              NO
                    │               │
                    ▼               ▼
              ┌─────────┐     ┌─────────┐
              │  EXIT   │     │  NEXT   │
              │ SUCCESS │     │  CYCLE  │
              └─────────┘     └─────────┘
```

---

## Usage

### Basic Usage

```bash
node scripts/autonomous-worksheet-quality-agent.js reception-counting-to-10
```

### With Custom Max Cycles

```bash
node scripts/autonomous-worksheet-quality-agent.js reception-counting-to-10 5
```

### Parameters

- **config-name** (required): Name of the worksheet configuration to test
  - Example: `reception-counting-to-10`, `year3-addition-standard`

- **max-cycles** (optional, default: 10): Maximum improvement cycles
  - Agent will exit early if production-ready

---

## What It Does

### Cycle Flow

Each cycle performs the following steps:

#### 1. **Generate Worksheets** (5 iterations)
```
For each iteration:
  ✓ Navigate to worksheet generator
  ✓ Click "Generate" button
  ✓ Capture full-page screenshot
  ✓ Extract worksheet data (questions, images, objects)
  ✓ Assess quality (P0/P1/P2 gates)
```

#### 2. **Analyze Results**
```
Calculate:
  ✓ Pass rate (target: ≥90%)
  ✓ P0 failures (target: 0)
  ✓ P1 failures
  ✓ Average quality score
  ✓ Production readiness
```

#### 3. **Detect Issues**
```
Categorize:
  ✓ Broken images
  ✓ Image-question mismatches
  ✓ Question count errors
  ✓ Code/generation errors
```

#### 4. **Apply Fixes**
```
Auto-fix where possible:
  ✓ Catalog priority adjustments
  ✓ Curriculum topic corrections
  ✓ Collection selection fixes

Log for manual review:
  ✓ Complex catalog issues
  ✓ Code errors
  ✓ Prompt engineering needs
```

#### 5. **Re-Test**
```
Next cycle uses fixed configuration:
  ✓ Catalog changes applied
  ✓ Issues logged
  ✓ Improved pass rate expected
```

---

## Auto-Fix Capabilities

### 1. **Football→Sailor Catalog Fix** (Automatic)

**Issue Detected**: Questions asking for "footballs" showing sailor/school uniform images

**Auto-Fix Applied**:
```javascript
// Sailor_Kids_School_byScrappinDoodles
priority: 9 → 5  // Lower priority
curriculumTopics: ['counting-to-10'] → []  // Remove topic
ageGroups: ['Year 1', 'Year 2', 'Year 3']  // Keep as-is

// Football_Kids_by_ScrappinDoodles
priority: 8 → 9  // Increase priority

// Football_Frogs_by_ScrappinDoodles
priority: 9  // Maintain high priority
```

**Expected Result**: Football questions now select Football collections, not Sailor

---

### 2. **Broken Image Detection** (Logged)

**Issue Detected**: Images not loading (broken image icons)

**Action**: Logs affected objects for manual catalog verification
```json
{
  "type": "BROKEN_IMAGES",
  "affectedObjects": ["sandwich", "teddy bear"],
  "action": "LOGGED",
  "message": "Manual catalog verification required"
}
```

---

### 3. **Image Mismatch Patterns** (Detected + Logged)

**Issue Detected**: Same object appears with suspicious frequency across iterations

**Action**: Identifies suspect objects, applies known fixes, logs unknowns
```json
{
  "type": "IMAGE_MISMATCH",
  "suspectObjects": ["football", "car"],
  "action": "CATALOG_AUDIT_REQUIRED"
}
```

---

## Output Files

### Session Directory Structure

```
worksheet-quality-reports/autonomous-sessions/<config>-<timestamp>/
│
├── catalog-backup.json                    # Original catalog backup
│
├── cycle-1-results.json                   # Cycle 1 assessment data
├── cycle-1-screenshots/
│   ├── iteration-1.png
│   ├── iteration-2.png
│   └── ...
│
├── cycle-2-results.json                   # Cycle 2 assessment data
├── cycle-2-screenshots/
│   └── ...
│
├── FINAL-REPORT.json                      # Complete session report
└── FINAL-REPORT.md                        # Human-readable summary
```

---

## Final Report Contents

### JSON Report (`FINAL-REPORT.json`)

```json
{
  "sessionId": "reception-counting-to-10-2025-10-12T14-30-15-123Z",
  "config": "reception-counting-to-10",
  "timestamp": "2025-10-12T14:45:30.456Z",
  "totalCycles": 3,
  "productionReady": true,
  "cycleHistory": [
    {
      "cycle": 1,
      "assessment": { /* full assessment data */ },
      "analysis": { /* pass rate, failures, etc. */ },
      "fixes": [ /* fixes applied */ ]
    },
    // ... more cycles
  ],
  "fixesApplied": [
    {
      "type": "CATALOG_FIX",
      "target": "football_sailor_mismatch",
      "action": "APPLIED",
      "changes": ["Sailor priority 9→5", "Football priority 8→9"]
    }
  ],
  "summary": "🎯 PRODUCTION READY: ✅ YES..."
}
```

### Markdown Report (`FINAL-REPORT.md`)

Human-readable summary with:
- Executive summary
- Cycle-by-cycle breakdown
- Fixes applied
- Production readiness verdict

---

## Production Readiness Criteria

### PASS Requirements (ALL must be true):

✅ **Pass Rate** ≥ 90%
✅ **P0 Failures** = 0
✅ **Code Errors** = 0
✅ **Average Score** ≥ 80/100

### Example Output:

```
🎯 PRODUCTION READY: ✅ YES

📊 Performance:
   • Total Cycles: 3
   • Fixes Applied: 2
   • Final Pass Rate: 100.0%
   • Pass Rate Improvement: +80.0%
   • Final P0 Failures: 0

🔧 Fixes Applied:
   1. [CATALOG_FIX] Applied catalog fixes to resolve football→sailor image mismatch
   2. [IMAGE_MISMATCH] Logged image mismatch issues for catalog audit

✅ Configuration is PRODUCTION READY. Deploy with confidence!
```

---

## Integration with Existing Tools

### Complements Existing Assessment Scripts

| Script | Purpose | Autonomous Agent Benefit |
|--------|---------|--------------------------|
| `worksheet-quality-assessment-with-diversity.js` | Single-run assessment with diversity metrics | Agent runs this multiple times, tracking improvements |
| `worksheet-quality-assessment-vision-enhanced.js` | Per-question validation with P0/P1 gates | Agent uses similar logic + auto-fix |
| `CATALOG-AUDIT-REPORT.md` | Manual catalog audit documentation | Agent applies fixes from audit automatically |

### Workflow Recommendation

**Development/QA**:
```bash
# Run autonomous agent for new configurations
node scripts/autonomous-worksheet-quality-agent.js new-config 5

# Review final report
cat worksheet-quality-reports/autonomous-sessions/<session>/FINAL-REPORT.md

# If production ready → deploy
# If not → review fixes needed and apply manually
```

**Pre-Production Validation**:
```bash
# Run agent for all critical configs
for config in reception-counting-to-10 year3-addition; do
  node scripts/autonomous-worksheet-quality-agent.js $config 3
done

# Review all final reports
# Deploy only configs that achieved production-ready
```

---

## Configuration Options

### In-Script Configuration

```javascript
const CONFIG = {
  MAX_CYCLES: 10,                    // Max improvement cycles
  ITERATIONS_PER_CYCLE: 5,           // Worksheets per cycle
  PRODUCTION_READY_THRESHOLD: 0.90,  // 90% pass rate
  MAX_P0_FAILURES: 0,                // Zero P0 allowed
  BASE_URL: 'http://localhost:3000',
  HEADLESS: false,                   // Browser visibility
  TIMEOUT: 120000,                   // 2 min per worksheet
};
```

### Customization

Edit `scripts/autonomous-worksheet-quality-agent.js` to adjust:
- Production readiness thresholds
- Number of iterations per cycle
- Timeout values
- Screenshot settings
- Fix strategies

---

## Known Limitations

### 1. **Manual Fixes Required For**:
- Complex code errors (TypeScript/JavaScript bugs)
- Prompt engineering issues
- Missing image files
- Database/API connectivity problems

### 2. **Semi-Automatic Fixes**:
- Simple catalog priority adjustments (automatic)
- Complex catalog restructuring (logged, needs review)

### 3. **Vision-Based Validation**:
- Currently detects mismatches by heuristics (object frequency)
- Full vision AI validation (Claude Vision API) planned for future

---

## Troubleshooting

### Issue: Agent hangs during generation

**Solution**: Check if dev server is running on port 3000
```bash
# Check if server is running
curl http://localhost:3000

# Start server if needed
npm run dev
```

---

### Issue: All iterations fail with same error

**Solution**: Check browser console for errors
```javascript
// In script, set:
HEADLESS: false  // Watch browser interactions

// Check for:
// - Network errors
// - API failures
// - UI component issues
```

---

### Issue: Catalog fixes not applying

**Solution**: Verify catalog path and permissions
```bash
# Check catalog exists
ls scripts/catalogs/master-vision-catalog.json

# Check write permissions
# Agent needs write access to apply fixes
```

---

### Issue: Production ready not achieved after 10 cycles

**Solution**: Review final report for recurring issues
```bash
# Check final report
cat worksheet-quality-reports/autonomous-sessions/<latest>/FINAL-REPORT.md

# Look for:
# - Issues that couldn't be auto-fixed
# - Code errors requiring dev intervention
# - Manual review recommendations
```

---

## Future Enhancements

### Planned Features:

1. **Vision AI Integration**
   - Use Claude Vision API to analyze actual image content
   - Verify images match question text
   - Auto-detect object types in images

2. **Prompt Engineering Fixes**
   - Detect common prompt issues
   - Suggest/apply prompt improvements
   - A/B test prompt variants

3. **Database/API Monitoring**
   - Detect backend errors
   - Monitor API response times
   - Auto-retry on transient failures

4. **Multi-Config Batch Mode**
   - Run agent on multiple configs in parallel
   - Generate cross-config comparison reports
   - Prioritize fixes by impact

5. **Learning Mode**
   - Track fix effectiveness over time
   - Build fix pattern library
   - Improve fix selection heuristics

---

## Best Practices

### 1. **Run Before Deployment**
Always run the autonomous agent on critical configurations before deploying to production.

### 2. **Review Fix Reports**
Even automatic fixes should be reviewed in the final report to understand what changed.

### 3. **Monitor Trends**
Track pass rate improvements across cycles to gauge system health.

### 4. **Keep Catalog Backup**
Agent creates backups, but maintain separate backups of critical catalogs.

### 5. **Test Fixes Manually**
After agent completes, manually test a few worksheets to verify fixes.

---

## Examples

### Example 1: Perfect Run (Production Ready Cycle 1)

```bash
$ node scripts/autonomous-worksheet-quality-agent.js year3-addition-easy

🤖 AUTONOMOUS WORKSHEET QUALITY AGENT
================================================================================

📋 Configuration: year3-addition-easy
🔄 Max Cycles: 10
📊 Iterations Per Cycle: 5
🎯 Production Ready Threshold: 90%

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔄 CYCLE 1/10
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Running quality assessment (5 iterations)...

  📄 Iteration 1/5...
    ✓ Score: 100/100 | P0: 0 | Status: PASS
  📄 Iteration 2/5...
    ✓ Score: 100/100 | P0: 0 | Status: PASS
  ...

🔍 Analyzing results...

  📊 Pass Rate: 100.0% (target: 90.0%)
  🚨 P0 Failures: 0 (target: 0)
  ⚠️  P1 Failures: 0
  📈 Avg Score: 100.0/100
  ✅ Production Ready: YES

🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉
✅ PRODUCTION READY ACHIEVED IN CYCLE 1!
🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉
```

### Example 2: Auto-Fix Run (Production Ready Cycle 3)

```bash
$ node scripts/autonomous-worksheet-quality-agent.js reception-counting-to-10

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔄 CYCLE 1/10
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  📊 Pass Rate: 20.0% (target: 90.0%)
  🚨 P0 Failures: 1 (target: 0)
  ✅ Production Ready: NO

🔧 Detecting and fixing issues...

  🔍 Detected potential image-question mismatches
    🎯 Detected known issue: football → sailor mismatch
    🔧 Applying football catalog fix...
      ✓ Sailor_Kids_School priority: 9 → 5
      ✓ Removed 'counting-to-10' from Sailor curriculum topics
      ✓ Football_Kids priority set to 9
      ✓ Football_Frogs priority set to 9
    ✅ Catalog fixes applied successfully

✅ Applied 1 fix(es). Re-testing in next cycle...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔄 CYCLE 2/10
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  📊 Pass Rate: 60.0% (target: 90.0%)
  🚨 P0 Failures: 0 (target: 0)
  ✅ Production Ready: NO

(Additional iterations improve to 100%...)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔄 CYCLE 3/10
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  📊 Pass Rate: 100.0% (target: 90.0%)
  🚨 P0 Failures: 0 (target: 0)
  ✅ Production Ready: YES

✅ PRODUCTION READY ACHIEVED IN CYCLE 3!
```

---

## Conclusion

The Autonomous Worksheet Quality Agent provides:

✅ **Hands-Free Quality Assurance** - Runs without intervention
✅ **Self-Healing** - Fixes common issues automatically
✅ **Iterative Improvement** - Loops until production-ready
✅ **Comprehensive Reporting** - Detailed cycle-by-cycle analysis
✅ **Production Confidence** - Rigorous quality gates

**Use it before every deployment to ensure worksheet quality and reduce manual QA time!**

---

**Last Updated**: 2025-10-12
**Version**: 1.0.0
**Maintainer**: Worksheet Generator AI Team
