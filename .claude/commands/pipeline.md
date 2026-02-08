# Test Pipeline + Quality Assessment

Run the full test pipeline: execute all interactive E2E tests, auto-heal failures, assess quality via in-session vision, and produce an HTML report.

## Usage

```
/pipeline                      # Full pipeline (all year groups)
/pipeline --year=reception     # Single year group
/pipeline --skip-healer        # Skip Phase 2 (healer)
/pipeline --skip-quality       # Skip Phase 3 (quality)
```

## Instructions

When invoked, follow these steps **in order**:

### Step 1: Run Phases 0-2 (automated)

Run the orchestrator via Bash. Pass through any arguments the user provided (e.g. `--year=year1`):

```bash
node scripts/pipeline-orchestrator.js $ARGUMENTS
```

This runs:
- **Phase 0**: Add screenshot capture lines to test files
- **Phase 1**: Run Playwright tests (parallel, JSON results)
- **Phase 2**: Heal failing tests (if not skipped)

It writes `pipeline-results/pending-assessments.json` with the list of worksheets to assess.

### Step 2: In-session Quality Assessment (Phase 3)

If `--skip-quality` was NOT passed:

1. Read `pipeline-results/pending-assessments.json` to get the list of worksheets
2. For **each entry** in the manifest:
   a. Read the screenshot file at `entry.screenshotPath` using the Read tool (it supports images)
   b. Assess the worksheet against the 7 quality dimensions (0-10 each):
      - **Curriculum Alignment** (50%): Age-appropriate numbers/language? Question count matches year group?
      - **Answer Correctness** (20%): Questions mathematically/logically valid? Answers correct?
      - **Intuitive Look & Feel** (10%): Visually self-explanatory? Child knows what to do?
      - **Image Integrity** (5%): All images loaded? No broken/placeholder? Correct sizes?
      - **Visual Answerability** (5%): Can target-age child answer by looking at images?
      - **Presentation Quality** (5%): Clear layout, readable, no cut-offs?
      - **Image-Question Match** (5%): Images match their questions?
   c. Check auto-fail conditions:
      - Broken images → cap score at 65
      - Identical objects in comparison questions → cap at 40
      - Missing questions (content cut off) → cap at (% visible x 100)
      - Wrong answers in answer key → cap at 70
   d. Calculate the weighted score (sum of score * weight * 10, rounded)
   e. Apply auto-fail caps
   f. Classify: GREEN (>=95, no auto-fails), RED (<70), else AMBER
3. Build the result array and write it to `pipeline-results/phase3-results.json`:

```json
[
  {
    "slug": "worksheet-slug",
    "yearGroup": "year1",
    "testId": "...",
    "dimensions": [
      {"id": "curriculumAlignment", "score": 9, "feedback": "..."},
      {"id": "answerCorrectness", "score": 8, "feedback": "..."},
      {"id": "intuitiveLookAndFeel", "score": 9, "feedback": "..."},
      {"id": "imageIntegrity", "score": 10, "feedback": "..."},
      {"id": "visualAnswerability", "score": 9, "feedback": "..."},
      {"id": "presentationQuality", "score": 8, "feedback": "..."},
      {"id": "imageQuestionMatch", "score": 9, "feedback": "..."}
    ],
    "autoFails": [],
    "actionPoints": [],
    "rawScore": 89,
    "finalScore": 89,
    "appliedCaps": [],
    "classification": "AMBER",
    "productionReady": false,
    "screenshotPath": "..."
  }
]
```

### Step 3: Generate Final Report

Run the finalize script:

```bash
node scripts/pipeline/finalize-report.js --open-report
```

This merges Phase 1+2+3 data into the final HTML report and opens it.

### Step 4: Report Summary

Print a summary showing:
- Total tests, passed/failed counts
- Quality breakdown: GREEN / AMBER / RED counts
- Any P0 action points (auto-fails or test failures)

## Quality Dimensions (7)

| # | Dimension | Weight |
|---|-----------|--------|
| 1 | Curriculum Alignment | 50% |
| 2 | Answer Correctness | 20% |
| 3 | Intuitive Look & Feel | 10% |
| 4 | Image Integrity | 5% |
| 5 | Visual Answerability | 5% |
| 6 | Presentation Quality | 5% |
| 7 | Image-Question Match | 5% |

## Classification

- **GREEN**: Score >= 95, zero auto-fails -> Production ready
- **AMBER**: Score 70-94 or has auto-fails -> Listed in action points
- **RED**: Score < 70 or test failed -> Requires investigation
