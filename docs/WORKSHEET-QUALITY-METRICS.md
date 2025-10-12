# Worksheet Quality Assessment Metrics

**Version**: 2.0
**Date**: 2025-10-12
**Status**: Active

---

## Overview

This document defines the quality assessment criteria used by the worksheet-quality-assessor agent to evaluate generated worksheets across multiple iterations.

---

## Quality Assessment Criteria

### 1. **Image Loading Success** ⭐ Quality Gate
**Description**: Verify all images load correctly in the generated worksheet.

**Evaluation**:
- Count total images in worksheet
- Count images that display correctly (not showing as ALT text)
- Verify images match the question content
- Check correct WORKSHEET_OBJECTS paths are used

**Targets**:
- Image load success rate: **100%**
- Image-content alignment: **100%**

**Scoring**:
- 100% success = 15/15 points
- 90-99% success = 12/15 points
- 80-89% success = 9/15 points
- <80% success = FAIL (quality gate not met)

---

### 2. **Question Count Accuracy** ⭐ Quality Gate
**Description**: Verify the exact number of questions configured is generated.

**Evaluation**:
- Count questions in the generated worksheet
- Compare to configured question count
- Must match EXACTLY (not ±1, not ±2)

**Example**:
- Configured: 5 questions
- Generated: 5 questions ✅
- Generated: 6 questions ❌ FAIL

**Target**: **100%** accuracy

**Scoring**:
- Exact match = 10/10 points
- Off by 1 = 5/10 points
- Off by 2+ = 0/10 points (FAIL)

---

### 3. **Number Range Compliance** ⭐ Quality Gate
**Description**: Verify all numbers in questions are age-appropriate for the target year group.

**Year Group Ranges**:
| Year Group | Valid Range | Forbidden Examples |
|------------|-------------|-------------------|
| Reception | 1-10 only | 0, 11, 12, 15, 20, 100, 666, 000 |
| Year 1 | 1-20 only | 0, 21, 50, 100 |
| Year 2 | 1-50 only | 0, 51, 100 |

**Evaluation**:
- Extract all numbers from question text
- Verify each number falls within the valid range
- Flag any numbers outside the range

**Target**: **100%** compliance

**Scoring**:
- 100% valid = 15/15 points
- 90-99% valid = 10/15 points
- 80-89% valid = 5/15 points
- <80% valid = 0/15 points (FAIL)

---

### 4. **Within-Worksheet Freshness**
**Description**: Verify diverse objects are used across questions in the SAME worksheet.

**Evaluation**:
- Extract objects from all questions in the worksheet
- Count unique objects vs. total questions
- Check for any object repetition

**Example** (5 questions):
- Objects: pears, butterflies, markers, corn, stars ✅ (5 unique = 100%)
- Objects: apples, apples, oranges, pears, apples ❌ (3 unique = 60%)

**Target**: **100%** (all objects unique within worksheet)

**Scoring**:
- 100% unique = 10/10 points
- 80-99% unique = 7/10 points
- 60-79% unique = 4/10 points
- <60% unique = 0/10 points

---

### 5. **Cross-Iteration Freshness** ⭐ Quality Gate
**Description**: Verify subsequent worksheets use different objects than previous iterations.

**Evaluation**:
- Track all objects used across iterations
- Calculate percentage of NEW objects in each iteration
- Compare Iteration 2 vs. Iteration 1, Iteration 3 vs. Iterations 1+2, etc.

**Example** (5 questions per worksheet):

**Iteration 1**: apples, bananas, oranges, pears, grapes (5 objects)
**Iteration 2**: strawberries, lemons, peaches, apples, watermelons
- New objects: 4/5 (80%) ✅
- Repeated: apples (1/5 = 20%)

**Iteration 3**: chickens, cows, pigs, sheep, horses
- New objects: 5/5 (100%) ✅
- No overlap with Iterations 1 or 2

**Cumulative Tracking**:
- Iteration 1: Baseline (5 objects)
- Iteration 2: 4 new + 1 repeated = 80% fresh
- Iteration 3: 5 new + 0 repeated = 100% fresh
- Average freshness: (100% + 80% + 100%) / 3 = 93%

**Target**: **≥70%** new objects per iteration (average across all iterations)

**Scoring**:
- ≥90% fresh = 20/20 points
- 80-89% fresh = 17/20 points
- 70-79% fresh = 14/20 points (minimum pass)
- <70% fresh = 0/20 points (FAIL)

---

### 6. **Pedagogical Quality**
**Description**: Evaluate age-appropriate language, clear instructions, and realistic contexts.

**Evaluation Criteria**:
- Age-appropriate vocabulary (Reception = simple words, no jargon)
- Clear, concise instructions (e.g., "Count the apples" not "Enumerate the Malus domestica")
- One object type per question (no "count apples AND oranges")
- Realistic contexts (no "666 school cows" or "100 mice in flowerpots")
- Consistent question structure
- Proper grammar and punctuation

**Target**: ≥9/10

**Scoring**:
- Perfect quality = 15/15 points
- Minor issues (1-2) = 12/15 points
- Moderate issues (3-4) = 8/15 points
- Major issues (5+) = 0/15 points

---

### 7. **Visual Layout Quality**
**Description**: Evaluate professional appearance, readability, and print readiness.

**Evaluation Criteria**:
- Professional, clean layout
- Readable fonts (Comic Sans MS or similar child-friendly fonts)
- Appropriate font sizes (18pt for questions, 11pt for metadata)
- Proper spacing and padding
- Images aligned and sized correctly (80x80px standard)
- Student info section (Name, Date fields)
- Clear question numbering
- Print-ready format (A4 or Letter)

**Target**: ≥9/10

**Scoring**:
- Excellent layout = 15/15 points
- Good layout (minor issues) = 12/15 points
- Acceptable layout = 8/15 points
- Poor layout = 0/15 points

---

### 8. **Overall Quality Score** ⭐ Quality Gate
**Description**: Combined assessment across all metrics.

**Total Points**: 100

**Point Distribution**:
1. Image Loading: 15 points
2. Question Count: 10 points
3. Number Range: 15 points
4. Within-Worksheet Freshness: 10 points
5. Cross-Iteration Freshness: 20 points
6. Pedagogical Quality: 15 points
7. Visual Layout: 15 points

**Target**: **≥89/100**

**Grade Scale**:
- 95-100: A+ (Exceptional - premium quality)
- 89-94: A (Excellent - production ready)
- 85-88: B+ (Good - minor improvements needed)
- 80-84: B (Satisfactory - some improvements needed)
- 75-79: C (Acceptable - significant improvements needed)
- <75: F (Fail - major issues, not classroom-ready)

---

## Quality Gates (Must Pass)

Worksheets must meet ALL quality gates to be marked as **PRODUCTION READY**:

1. ✅ **Image Loading**: ≥95% success rate
2. ✅ **Question Count**: 100% accuracy (exact match)
3. ✅ **Number Range**: 100% compliance
4. ✅ **Cross-Iteration Freshness**: ≥70% average
5. ✅ **Overall Quality**: ≥89/100

If ANY quality gate fails, the worksheet is marked as **NOT PRODUCTION READY** and requires prompt engineering improvements.

---

## Multi-Iteration Assessment

The worksheet-quality-assessor agent runs **5 iterations** by default to evaluate consistency and stability.

### Iteration Process:
1. Generate worksheet
2. Capture screenshots (config, ready state, final worksheet)
3. Evaluate against all 8 criteria
4. Record metrics and scores
5. Repeat for next iteration

### Statistical Analysis:
- **Average scores** across all iterations
- **Standard deviation** (consistency check)
- **Success rate** (iterations that passed quality gates)
- **Cross-iteration freshness tracking**

### Success Criteria:
- **≥4/5 iterations** must pass all quality gates
- **Average overall score** ≥89/100
- **Cross-iteration freshness** ≥70% average
- **Standard deviation** <5 points (consistency)

---

## Reporting

### Per-Iteration Reports:
- Markdown file with detailed assessment
- JSON file with raw metrics
- Screenshots (config, ready, worksheet)
- Timestamp and generation time

### Summary Reports:
- Executive summary (2-3 pages)
- Comprehensive assessment (detailed analysis)
- Statistical summary (averages, std dev, trends)
- Final recommendation (production ready: yes/no)

### Report Location:
```
worksheet-quality-reports/
├── {config-name}-{timestamp}/
│   ├── EXECUTIVE-SUMMARY.md
│   ├── COMPREHENSIVE-ASSESSMENT.md
│   ├── iteration-1.md
│   ├── iteration-2.md
│   ├── iteration-3.md
│   ├── iteration-4.md
│   ├── iteration-5.md
│   ├── results.json
│   └── screenshots/
│       ├── iter-1-config.png
│       ├── iter-1-ready.png
│       ├── iter-1-worksheet.png
│       └── ...
```

---

## Teacher's Verdict

Each assessment includes a qualitative review from an experienced Reception teacher's perspective:

**Questions to Answer**:
1. Would I use this worksheet in my classroom?
2. Does it meet EYFS curriculum standards?
3. How does it compare to commercial resources (Twinkl, TES)?
4. What grade would I assign? (A+, A, B+, B, C, F)
5. Are there any blocking issues?

**Verdict Options**:
- ✅ **APPROVED FOR CLASSROOM USE** (Grade A- or higher)
- ⚠️ **APPROVED WITH MINOR EDITS** (Grade B to B+)
- ❌ **NOT APPROVED** (Grade C or lower)

---

## Version History

### v2.0 (2025-10-12) - Current
- **UPDATED**: Cross-iteration freshness is now a quality gate (≥70% target)
- **UPDATED**: Overall quality target raised to ≥89/100 (was ≥85/100)
- **REMOVED**: "Avoid overused objects" restriction from freshness scoring
- **CLARIFIED**: Freshness now measures NEW objects across iterations, not avoidance of common objects
- **REMOVED**: Dropdown interaction metrics (moved to performance monitoring, not quality gates)

### v1.0 (2025-10-11)
- Initial quality metrics definition
- 7 core criteria established
- Quality gates defined
- Multi-iteration assessment process created

---

**Last Updated**: 2025-10-12
**Next Review**: After 50+ worksheet assessments or major prompt changes
